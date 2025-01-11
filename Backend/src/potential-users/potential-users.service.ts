import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePotentialUserDto } from './dto/create-potential-user.dto';
import { UpdatePotentialUserDto } from './dto/update-potential-user.dto';
import { PotentialUser } from './entities/potential-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PotentialUsersService {
  constructor(
    @InjectRepository(PotentialUser)
    private readonly potentialUserRepository: Repository<PotentialUser>,
  ) {}
  
  async create(email: string): Promise<PotentialUser> {
    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestException('Invalid email format');
    }

    // Check if email already exists
    const existingUser = await this.potentialUserRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email is already in the database');
    }

    const potentialUser = this.potentialUserRepository.create({ email });
    return this.potentialUserRepository.save(potentialUser);
  }

  async findAll(): Promise<PotentialUser[]> {
    return this.potentialUserRepository.find();
  }
  

  findOne(id: number) {
    return `This action returns a #${id} potentialUser`;
  }

  update(id: number, updatePotentialUserDto: UpdatePotentialUserDto) {
    return `This action updates a #${id} potentialUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} potentialUser`;
  }
}
