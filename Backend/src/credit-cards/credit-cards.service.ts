import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';
import { CreditCard } from './entities/credit-card.entity'; // Using CreditCard as the entity

// Interface for paginated response - now uses CreditCard
export interface PaginatedCreditCardsResponse {
  data: CreditCard[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

@Injectable()
export class CreditCardsService {
  constructor(
    @InjectRepository(CreditCard) // Inject repository for CreditCard
    private creditCardRepository: Repository<CreditCard>,
  ) {}

  // The userId will typically come from authentication context in a real app.
  // For this example, it remains a placeholder.
  // IMPORTANT: This 'test-user-id' must match an actual user ID in your database.
  // Based on your latest log, the ID is 'cc674c38-3785-405a-b6c0-97f6a6d462e5'.
  private readonly userId = 'cc674c38-3785-405a-b6c0-97f6a6d462e5'; // Updated to match your provided user ID

  private getCardBrandFromNumber(cardNumber: string): string {
    const cleanNum = cardNumber.replace(/\D/g, '');
    if (!cleanNum) return 'unknown';
    if (/^4/.test(cleanNum)) return 'visa';
    if (/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/.test(cleanNum)) return 'mastercard';
    if (/^3[47]/.test(cleanNum)) return 'amex';
    if (/^(6011|65|64[4-9])/.test(cleanNum)) return 'discover';
    if (/^3(?:0[0-5]|[689])/.test(cleanNum)) return 'diners';
    if (/^(352[8-9]|35[3-8][0-9])/.test(cleanNum)) return 'jcb';
    return 'unknown';
  }

  /**
   * Creates a new credit card record in the database.
   * @param createCreditCardDto Data for the new credit card.
   * @returns The created CreditCard.
   */
  async create(createCreditCardDto: CreateCreditCardDto): Promise<CreditCard> {
    console.log('Attempting to create credit card with DTO:', createCreditCardDto);

    const paymentGatewayToken = `tok_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    const last4 = createCreditCardDto.cardNumber.slice(-4);
    const cardBrand = this.getCardBrandFromNumber(createCreditCardDto.cardNumber);

    // Determine if this card should be default
    // Now directly use the userId column for counting
    const existingCardsCount = await this.creditCardRepository.count({ where: { userId: this.userId } });
    let isDefault = false;
    if (existingCardsCount === 0) {
      isDefault = true;
    } else if (createCreditCardDto.isDefault === true) {
      await this.unsetAllDefaultCards(this.userId);
      isDefault = true;
    }

    // Create a new entity instance, assigning the explicit userId column
    const newCreditCard = this.creditCardRepository.create({
      userId: this.userId, // Directly assign to the userId column
      last4: last4,
      cardBrand: cardBrand,
      expiryMonth: parseInt(createCreditCardDto.expirationMonth, 10), // Convert to number
      expiryYear: parseInt(createCreditCardDto.expirationYear, 10),   // Convert to number
      paymentGatewayToken: paymentGatewayToken,
      cardHolderName: createCreditCardDto.cardHolderName,
      isDefault: isDefault,
    });

    try {
      return await this.creditCardRepository.save(newCreditCard);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' || error.message.includes('duplicate key')) {
        throw new BadRequestException('A card with this token already exists.');
      }
      throw error;
    }
  }

  /**
   * Retrieves all credit card records for the current user with pagination.
   * This method now uses TypeORM's findAndCount method.
   * @param page The current page number (1-indexed).
   * @param limit The number of items per page.
   * @returns A paginated response containing credit card data and metadata.
   */
  async findAll(page: number = 1, limit: number = 10): Promise<PaginatedCreditCardsResponse> {
    const [userCards, totalItems] = await this.creditCardRepository.findAndCount({
      where: { userId: this.userId }, // Filter by userId column
      skip: (page - 1) * limit,
      take: limit,
      order: { isDefault: 'DESC', createdAt: 'ASC' },
    });

    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = Math.max(1, Math.min(page, totalPages || 1));

    return {
      data: userCards,
      totalItems: totalItems,
      currentPage: currentPage,
      totalPages: totalPages,
      itemsPerPage: limit,
    };
  }

  /**
   * NEW: Retrieves credit card records for a specific user ID with pagination.
   * @param targetUserId The ID of the user whose cards to fetch.
   * @param page The current page number (1-indexed).
   * @param limit The number of items per page.
   * @returns A paginated response containing credit card data and metadata.
   */
  async findByUserId(targetUserId: string, page: number = 1, limit: number = 10): Promise<PaginatedCreditCardsResponse> {
    const [userCards, totalItems] = await this.creditCardRepository.findAndCount({
      where: { userId: targetUserId }, // Filter by the provided targetUserId
      skip: (page - 1) * limit,
      take: limit,
      order: { isDefault: 'DESC', createdAt: 'ASC' },
    });

    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = Math.max(1, Math.min(page, totalPages || 1));

    return {
      data: userCards,
      totalItems: totalItems,
      currentPage: currentPage,
      totalPages: totalPages,
      itemsPerPage: limit,
    };
  }

  /**
   * Retrieves a single credit card record by its ID for the current user.
   * @param id The ID of the credit card.
   * @returns The CreditCard found.
   */
  async findOne(id: number): Promise<CreditCard> {
    const card = await this.creditCardRepository.findOne({
      where: { id: id, userId: this.userId }, // Filter by userId column
    });
    if (!card) {
      throw new NotFoundException(`Credit card with ID "${id}" not found for this user.`);
    }
    return card;
  }

  /**
   * Updates an existing credit card record.
   * @param id The ID of the credit card to update.
   * @param updateCreditCardDto Data to update the credit card.
   * @returns The updated CreditCard.
   */
  async update(id: number, updateCreditCardDto: UpdateCreditCardDto): Promise<CreditCard> {
    const existingCard = await this.creditCardRepository.findOne({
      where: { id: id, userId: this.userId }, // Filter by userId column
    });

    if (!existingCard) {
      throw new NotFoundException(`Credit card with ID "${id}" not found for this user.`);
    }

    if (updateCreditCardDto.isDefault !== undefined) {
      if (updateCreditCardDto.isDefault === true) {
        await this.unsetAllDefaultCards(this.userId);
      }
    }

    const updatedFields: Partial<CreditCard> = {};

    if (updateCreditCardDto.cardHolderName !== undefined) {
      updatedFields.cardHolderName = updateCreditCardDto.cardHolderName;
    }
    if (updateCreditCardDto.isDefault !== undefined) {
      updatedFields.isDefault = updateCreditCardDto.isDefault;
    }
    if (updateCreditCardDto.expirationMonth !== undefined) {
      updatedFields.expiryMonth = parseInt(updateCreditCardDto.expirationMonth, 10);
    }
    if (updateCreditCardDto.expirationYear !== undefined) {
      updatedFields.expiryYear = parseInt(updateCreditCardDto.expirationYear, 10);
    }

    this.creditCardRepository.merge(existingCard, updatedFields);
    const updatedCard = await this.creditCardRepository.save(existingCard);
    console.log('Credit card updated:', updatedCard);
    return updatedCard;
  }

  /**
   * Removes a credit card record.
   * @param id The ID of the credit card to remove.
   * @returns A message indicating success.
   */
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.creditCardRepository.delete({ id: id, userId: this.userId }); // Filter by userId column

    if (result.affected === 0) {
      throw new NotFoundException(`Credit card with ID "${id}" not found for this user.`);
    }
    console.log(`Credit card with ID "${id}" removed.`);
    return { message: `Credit card with ID "${id}" removed successfully.` };
  }

  /**
   * Sets a specific card as default and unsets all other cards for the user.
   * @param cardId The ID of the credit card to set as default.
   * @returns The updated list of credit cards for the user.
   */
  async setDefaultCard(cardId: number): Promise<CreditCard[]> {
    console.log(`Attempting to set card ${cardId} as default for user ${this.userId}`);

    const targetCard = await this.creditCardRepository.findOne({
      where: { id: cardId, userId: this.userId }, // Filter by userId column
    });

    if (!targetCard) {
      throw new NotFoundException(`Credit card with ID "${cardId}" not found for this user.`);
    }

    // Unset all other default cards for this user
    await this.creditCardRepository.update(
      { userId: this.userId, isDefault: true, id: Not(cardId) }, // Filter by userId column and Not(cardId)
      { isDefault: false, updatedAt: new Date() }
    );

    // Set the target card as default
    targetCard.isDefault = true;
    targetCard.updatedAt = new Date();
    await this.creditCardRepository.save(targetCard);

    // Return all cards for the user, with the new default status
    return this.creditCardRepository.find({ where: { userId: this.userId }, order: { isDefault: 'DESC', createdAt: 'ASC' } }); // Filter by userId column
  }

  /**
   * Helper to unset all default cards for a given user.
   * @param userId The ID of the user.
   */
  private async unsetAllDefaultCards(userId: string): Promise<void> {
    console.log(`Unsetting all default cards for user ${userId}`);
    await this.creditCardRepository.update(
      { userId: userId, isDefault: true }, // Filter by userId column
      { isDefault: false, updatedAt: new Date() }
    );
  }
}
