import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import User from '../users/entities/user.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const { userId, isDefault, ...addressData } = createAddressDto;

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const existingAddressesCount = await this.addressRepo.count({
      where: { user: { id: userId } },
    });

    let newAddressIsDefault = isDefault;

    // If this is the first address for the user, make it default regardless of input
    if (existingAddressesCount === 0) {
      newAddressIsDefault = true;
    } else if (newAddressIsDefault) {
      // If user explicitly wants this new address to be default,
      // find and deactivate the current default address for this user.
      const currentDefaultAddress = await this.addressRepo.findOne({
        where: { user: { id: userId }, isDefault: true },
      });

      if (currentDefaultAddress) {
        currentDefaultAddress.isDefault = false;
        await this.addressRepo.save(currentDefaultAddress);
      }
    }

    const address = this.addressRepo.create({
      ...addressData,
      isDefault: newAddressIsDefault,
      user,
    });

    return this.addressRepo.save(address);
  }

  async findAll(): Promise<Address[]> {
    return this.addressRepo.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Address> {
    // This query should automatically include the 'isDefault' column
    // once your database schema is updated to include it.
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
  async findAddressesByUserId(userId: string): Promise<Address[]> {
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
    const addressToUpdate = await this.findOne(id); // Find the existing address

    // If the updateDto explicitly sets isDefault to true
    if (updateDto.isDefault === true) {
      // Find the current default address for this user (excluding the one being updated)
      const currentDefaultAddress = await this.addressRepo.findOne({
        where: { user: { id: addressToUpdate.user.id }, isDefault: true },
      });

      // If a current default exists and it's not the address we are updating,
      // set its isDefault to false.
      if (currentDefaultAddress && currentDefaultAddress.id !== addressToUpdate.id) {
        currentDefaultAddress.isDefault = false;
        await this.addressRepo.save(currentDefaultAddress);
      }
    } else if (updateDto.isDefault === false) {
      // If the address being updated is currently the default, and we are setting it to false,
      // ensure there's still a default address for the user (optional, but good practice).
      // For simplicity, we'll just update this one to false.
      // More complex logic might involve selecting a new default if this was the only one.
    }

    // Apply partial updates from the DTO to the found address entity
    Object.assign(addressToUpdate, updateDto);
    
    return this.addressRepo.save(addressToUpdate); // Save the updated address
  }

  async remove(id: string): Promise<{ message: string }> {
    const address = await this.findOne(id);
    await this.addressRepo.remove(address);
    return { message: `Address with ID ${id} has been deleted` };
  }
}
