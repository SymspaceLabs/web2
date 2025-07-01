// src/user-promo-codes/user-promo-codes.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPromoCode } from './entities/user-promo-code.entity'; // Ensure this path is correct
import { CreateUserPromoCodeDto } from './dto/create-user-promo-code.dto';
import { UpdateUserPromoCodeDto } from './dto/update-user-promo-code.dto';

@Injectable()
export class UserPromoCodesService {
  constructor(
    @InjectRepository(UserPromoCode)
    private userPromoCodeRepository: Repository<UserPromoCode>,
  ) {}

  /**
   * Creates a new user promo code usage record.
   * This would typically be called when a promo code is successfully consumed (e.g., at checkout).
   */
  async create(createUserPromoCodeDto: CreateUserPromoCodeDto): Promise<UserPromoCode> {
    // Optional: Add validation here to prevent duplicate entries if not handled by DB unique constraint
    // const existingUsage = await this.userPromoCodeRepository.findOne({
    //   where: {
    //     userId: createUserPromoCodeDto.userId,
    //     promoCodeId: createUserPromoCodeDto.promoCodeId
    //   }
    // });
    // if (existingUsage) {
    //   throw new BadRequestException('This user has already used this promo code.');
    // }

    const newUserPromoCode = this.userPromoCodeRepository.create(createUserPromoCodeDto);
    return this.userPromoCodeRepository.save(newUserPromoCode);
  }

  /**
   * Retrieves all user promo code usage records.
   * (Typically for administrative purposes).
   */
  async findAll(): Promise<UserPromoCode[]> {
    return this.userPromoCodeRepository.find();
  }

  /**
   * Retrieves a single user promo code usage record by its ID.
   */
  async findOne(id: string): Promise<UserPromoCode> { // ID type changed to string
    const userPromoCode = await this.userPromoCodeRepository.findOne({ where: { id } });
    if (!userPromoCode) {
      throw new NotFoundException(`User promo code usage record with ID "${id}" not found.`);
    }
    return userPromoCode;
  }

  /**
   * Updates an existing user promo code usage record.
   */
  async update(id: string, updateUserPromoCodeDto: UpdateUserPromoCodeDto): Promise<UserPromoCode> { // ID type changed to string
    const userPromoCode = await this.userPromoCodeRepository.findOne({ where: { id } });
    if (!userPromoCode) {
      throw new NotFoundException(`User promo code usage record with ID "${id}" not found.`);
    }

    // Apply updates from DTO
    this.userPromoCodeRepository.merge(userPromoCode, updateUserPromoCodeDto);
    return this.userPromoCodeRepository.save(userPromoCode);
  }

  /**
   * Removes a user promo code usage record by its ID.
   * Note: This is similar to `PromoCodeService.deleteUserPromoCodeUsage`.
   * You might choose to use one or the other, or keep both for different contexts.
   */
  async remove(id: string): Promise<void> { // ID type changed to string
    const result = await this.userPromoCodeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User promo code usage record with ID "${id}" not found.`);
    }
  }
}