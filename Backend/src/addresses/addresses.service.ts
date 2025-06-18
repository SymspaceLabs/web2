import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

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

  async findAll(): Promise<Address[]> {
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

  /**
   * Finds all addresses associated with a given user ID.
   * This method queries the database for Address entities
   * where the 'user' relation's 'id' matches the provided userId.
   * It also includes a check to ensure the user exists before
   * attempting to retrieve their addresses.
   * @param userId The ID of the user.
   * @returns A promise that resolves to an array of Address entities.
   * @throws NotFoundException if the user with the given ID is not found.
   */
  async findByUserId(userId: string): Promise<Address[]> {
    // Check if the user exists to provide a more specific error if needed
    const userExists = await this.userRepo.exists({ where: { id: userId } });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    // Find all addresses linked to this user ID
    return this.addressRepo.find({
      where: {
        user: { id: userId }, // This is how you query by a nested relation's ID
      },
      order: {
        // Optional: Order by address creation or ID for consistent results
        id: 'ASC', // Example: Order by address ID ascending
      },
    });
  }

  /**
   * Updates an existing address.
   * @param id The ID of the address to update.
   * @param updateDto The DTO containing the updated address data.
   * @returns A promise that resolves to the updated Address entity.
   * @throws NotFoundException if the address with the given ID is not found.
   */
  async update(id: string, updateDto: UpdateAddressDto): Promise<Address> {
    const address = await this.findOne(id); // Find the existing address

    // Apply partial updates from the DTO to the found address entity
    // Object.assign is useful for merging properties from updateDto into address
    Object.assign(address, updateDto);
    
    return this.addressRepo.save(address); // Save the updated address
  }

  async remove(id: string): Promise<{ message: string }> {
    const address = await this.findOne(id);
    await this.addressRepo.remove(address);
    return { message: `Address with ID ${id} has been deleted` };
  }
}
