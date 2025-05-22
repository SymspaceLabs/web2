import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
// import { UpdateAddressDto } from './dto/update-address.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const { userId, ...addressData } = createAddressDto;

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const address = this.addressRepo.create({
      ...addressData,
      user,
    });

    return this.addressRepo.save(address);
  }

  findAll(): Promise<Address[]> {
    return this.addressRepo.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Address> {
    const address = await this.addressRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    return address;
  }

//   async update(id: string, updateDto: UpdateAddressDto): Promise<Address> {
//     const address = await this.findOne(id);

//     Object.assign(address, updateDto);
//     return this.addressRepo.save(address);
//   }

  async remove(id: string): Promise<{ message: string }> {
    const address = await this.findOne(id);
    await this.addressRepo.remove(address);
    return { message: `Address with ID ${id} has been deleted` };
  }
}
