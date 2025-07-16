import {
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { RequestChangeEmailDto } from './dto/request-change-email.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { MailchimpService } from 'src/mailchimp/mailchimp.service';
import { ChangeEmailDto } from './dto/change-email.dto';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly mailchimpService: MailchimpService,
  ) {}

  async getAllUsers() {
    const users = this.usersRepository.find();
    return users;
  }

  /**
   * Fetches a user by ID, explicitly loading all specified relations using QueryBuilder.
   * This approach provides more control over generated SQL and can resolve "Unknown column" errors.
   * @param id The ID of the user to fetch.
   * @returns The User entity with specified relations.
   */
  async getUserById(id: string) {
    const user = await this.usersRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.measurement', 'measurement')
      .leftJoinAndSelect('user.preference', 'preference')
      .leftJoinAndSelect('user.company', 'company')
      .leftJoinAndSelect('user.banks', 'bank')
      .leftJoinAndSelect('user.creditCards', 'creditCard') // Alias creditCards as 'creditCard'
      .leftJoinAndSelect('user.billingAddresses', 'billingAddress')
      .leftJoinAndSelect('user.survey', 'survey')
      .leftJoinAndSelect('user.files', 'file')
      .leftJoinAndSelect('user.addresses', 'address')
      .leftJoinAndSelect('user.orders', 'order') // Include orders relation
      .leftJoinAndSelect('user.reviews', 'review') // Include reviews relation
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException('Could not find the user');
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    // Corrected: Save the entire newUser object created above.
    // The previous commented-out section was incomplete and incorrect.
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async deleteById(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
      // Load relations that have cascade: ['remove'] or ON DELETE CASCADE in DB
      // This ensures TypeORM attempts to delete related entities before the user
      relations: [
        'orders', // Explicitly load orders to trigger cascade: ['remove']
        'creditCards',
        'billingAddresses',
        'banks',
        'addresses',
        'files',
        'reviews',
        'measurement',
        'preference',
        'survey',
        'company' // Also include company if it has cascade delete
      ],
    });
    if (!user) {
      return null;
    }
    await this.usersRepository.remove(user); // TypeORM will cascade removals based on entity config
    return user;
  }

  async verifyUser(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    user.isVerified = true;
    await this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> { // Changed userId type to string (UUID)
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersRepository.update(userId, { password: hashedPassword });
  }

  async saveResetToken(
    userId: string,
    token: string,
    expiry: Date,
  ): Promise<void> {
    await this.usersRepository.update(userId, {
      resetToken: token,
      resetTokenExpiry: expiry,
    });
  }

  async changeEmail(
      userId: string, // Changed userId type to string (UUID)
      changeEmailDto: ChangeEmailDto,
    ): Promise<{ message: string }> {
      const { newEmail } = changeEmailDto;

      // Validate email format
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmail)) {
        // Corrected: Removed the duplicate 'new' keyword
        throw new HttpException('Invalid email format', 473);
      }

      // Check if the new email is already in use
      const existingUser = await this.usersRepository.findOne({
        where: { email: newEmail },
      });
      if (existingUser) {
        throw new HttpException('Email is already in use', 471);
      }

      // Update the user's email
      await this.usersRepository.update(userId, { email: newEmail });

      return { message: 'Email updated successfully' };
  }

  async editUser(userId: string, updates: Partial<User>): Promise<{ user: User; message: string }> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['addresses'], // ✅ Load addresses
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update user fields
    if (updates.dob) {
      updates.dob = new Date(updates.dob);
    }

    // Apply basic user updates
    Object.assign(user, updates);

    // ✅ Update the first address if address updates are provided
    if (updates.addresses && updates.addresses.length > 0 && user.addresses.length > 0) {
      const updatedAddress = updates.addresses[0];
      const addressToUpdate = user.addresses[0];

      Object.assign(addressToUpdate, updatedAddress);
    }

    try {
      const updatedUser = await this.usersRepository.save(user); // cascades save to addresses
      return {
        user: updatedUser,
        message: 'User information updated successfully',
      };
    } catch (error) {
      throw new BadRequestException('Failed to update user information');
    }
  }

}
