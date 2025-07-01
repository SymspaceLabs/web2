// src/promo-code/promo-code.service.ts
import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common'; // Import ConflictException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { PromoCode } from './entities/promo-code.entity';
import { UserPromoCode } from 'src/user-promo-codes/entities/user-promo-code.entity';
// You might need to import your Order entity here if you're marking usage directly in this service
// import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class PromoCodeService {
  constructor(
    @InjectRepository(PromoCode)
    private promoCodeRepository: Repository<PromoCode>,
    @InjectRepository(UserPromoCode)
    private userPromoCodeRepository: Repository<UserPromoCode>,
  ) {}

  async createPromoCode(createPromoCodeDto: {
    code: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
    maxTotalUsages?: number;
  }): Promise<PromoCode> {
    const { code, discountPercentage, startDate, endDate, maxTotalUsages } = createPromoCodeDto;

    const existingCode = await this.promoCodeRepository.findOne({ where: { code } });
    if (existingCode) {
      throw new BadRequestException('Promo code with this code already exists.');
    }

    const decimalDiscountPercentage = discountPercentage / 100;
    if (decimalDiscountPercentage <= 0 || decimalDiscountPercentage > 1) {
        throw new BadRequestException('Discount percentage must be between 1 and 100 (inclusive).');
    }

    const promoCode = this.promoCodeRepository.create({
      code,
      discountPercentage: decimalDiscountPercentage,
      startDate,
      endDate,
      maxTotalUsages,
      isActive: true,
    });

    return this.promoCodeRepository.save(promoCode);
  }

  /**
   * Validates a promo code for a given user and returns its details.
   * This method does NOT mark the promo code as used.
   */
  async validatePromoCode(userId: string, promoCodeString: string): Promise<{ discountPercentage: number; promoCodeId: string }> {
    const now = new Date();

    const promoCode = await this.promoCodeRepository.findOne({
      where: {
        code: promoCodeString,
        isActive: true,
        startDate: LessThanOrEqual(now),
        endDate: MoreThanOrEqual(now),
      },
    });

    if (!promoCode) {
      throw new NotFoundException('Invalid or expired promo code.');
    }

    // Check if this user has ALREADY COMPLETED an order with this promo code.
    // We assume 'UserPromoCode' entries are only created upon successful checkout.
    const userPromoCodeEntry = await this.userPromoCodeRepository.findOne({
      where: { userId, promoCodeId: promoCode.id },
    });

    if (userPromoCodeEntry) {
      // If an entry exists, it means the user has already successfully used this code in a completed order.
      throw new ConflictException('You have already used this promo code for a completed order.');
    }

    // Check total usage limit (if applicable) across all unique users for completed orders.
    // This assumes `UserPromoCode` entries are only created/counted for completed orders.
    if (promoCode.maxTotalUsages !== null) {
      const distinctUsersUsedCount = await this.userPromoCodeRepository
        .createQueryBuilder('userPromoCode')
        .select('COUNT(DISTINCT userPromoCode.userId)', 'count')
        .where('userPromoCode.promoCodeId = :promoCodeId', { promoCodeId: promoCode.id })
        .getRawOne();

      if (parseInt(distinctUsersUsedCount.count, 10) >= promoCode.maxTotalUsages) {
        throw new BadRequestException('This promo code has reached its total unique user limit.');
      }
    }

    // IMPORTANT: No `save` operation here!
    // The promo code is NOT marked as used at this stage.

    return { discountPercentage: promoCode.discountPercentage, promoCodeId: promoCode.id };
  }

  /**
   * Marks a promo code as used by a user for a specific order.
   * This method should ONLY be called upon successful order completion/payment.
   * @param userId The ID of the user who used the promo code.
   * @param promoCodeId The ID of the promo code used.
   * @param orderId The ID of the completed order (optional, but good for tracking).
   */
  async markPromoCodeAsUsed(userId: string, promoCodeId: string, orderId?: string): Promise<UserPromoCode> {
    const now = new Date();

    // Check if an entry already exists to prevent duplicates (though unique index should handle this)
    let userPromoCodeEntry = await this.userPromoCodeRepository.findOne({
      where: { userId, promoCodeId },
    });

    if (userPromoCodeEntry) {
        // If it exists, it means it was already marked as used (e.g., for a previous order)
        // You might want to update lastUsedAt or throw an error if it's strictly one-time per user.
        // For now, let's just update lastUsedAt.
        userPromoCodeEntry.lastUsedAt = now;
        // If you had an `orderId` column in UserPromoCode, you'd update it here too.
        // userPromoCodeEntry.orderId = orderId;
        return this.userPromoCodeRepository.save(userPromoCodeEntry);
    } else {
        // Create a new entry, marking it as used for this user.
        const newUserPromoCode = this.userPromoCodeRepository.create({
            userId,
            promoCodeId,
            usageCount: 1, // Always 1 for "once per user"
            lastUsedAt: now,
            // orderId: orderId, // If you add an orderId column to UserPromoCode
        });
        return this.userPromoCodeRepository.save(newUserPromoCode);
    }
  }

  // --- NEW METHOD TO GET ALL PROMO CODES ---
  async findAllPromoCodes(): Promise<PromoCode[]> {
    return this.promoCodeRepository.find();
  }

  // --- NEW METHOD TO DELETE A USER PROMO CODE USAGE ---
  async deleteUserPromoCodeUsage(id: string): Promise<void> {
    // Attempt to find the usage record first
    const usage = await this.userPromoCodeRepository.findOne({ where: { id } });

    if (!usage) {
      throw new NotFoundException(`Promo code usage record with ID "${id}" not found.`);
    }

    // Delete the record
    await this.userPromoCodeRepository.remove(usage);
  }

}