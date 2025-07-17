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

  // Removed the hardcoded 'private readonly userId' field.
  // All methods requiring a userId will now accept it as a parameter.

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
   * Creates a new credit card record in the database for a specific user.
   * @param createCreditCardDto Data for the new credit card.
   * @param userId The ID of the user creating the credit card (should come from authentication context).
   * @returns The created CreditCard.
   */
  async create(createCreditCardDto: CreateCreditCardDto, userId: string): Promise<CreditCard> {

    const paymentGatewayToken = `tok_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    const last4 = createCreditCardDto.cardNumber.slice(-4);
    const cardBrand = this.getCardBrandFromNumber(createCreditCardDto.cardNumber);

    // Determine if this card should be default for the given userId
    const existingCardsCount = await this.creditCardRepository.count({ where: { userId: userId } });
    let isDefault = false;
    if (existingCardsCount === 0) {
      isDefault = true;
    } else if (createCreditCardDto.isDefault === true) {
      await this.unsetAllDefaultCards(userId); // Pass userId to helper
      isDefault = true;
    }

    // Create a new entity instance, assigning the explicit userId column
    const newCreditCard = this.creditCardRepository.create({
      userId: userId, // Use the userId passed as a parameter
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
   * Retrieves all credit card records for a specific user with pagination.
   * @param userId The ID of the user whose cards to fetch.
   * @param page The current page number (1-indexed).
   * @param limit The number of items per page.
   * @returns A paginated response containing credit card data and metadata.
   */
  async findAll(userId: string, page: number = 1, limit: number = 10): Promise<PaginatedCreditCardsResponse> {
    const [userCards, totalItems] = await this.creditCardRepository.findAndCount({
      where: { userId: userId }, // Filter by userId parameter
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
   * Retrieves credit card records for a specific user ID with pagination.
   * This method is essentially a duplicate of findAll now, but kept for clarity if different logic were needed.
   * @param targetUserId The ID of the user whose cards to fetch.
   * @param page The current page number (1-indexed).
   * @param limit The number of items per page.
   * @returns A paginated response containing credit card data and metadata.
   */
  async findByUserId(targetUserId: string, page: number = 1, limit: number = 10): Promise<PaginatedCreditCardsResponse> {
    // This method now calls findAll internally, as their logic is identical after refactoring
    return this.findAll(targetUserId, page, limit);
  }

  /**
   * Retrieves a single credit card record by its ID for a specific user.
   * @param id The ID of the credit card.
   * @param userId The ID of the user who owns the credit card.
   * @returns The CreditCard found.
   */
  async findOne(id: string, userId: string): Promise<CreditCard> {
    const card = await this.creditCardRepository.findOne({
      where: { id: id, userId: userId }, // Filter by userId parameter
    });
    if (!card) {
      throw new NotFoundException(`Credit card with ID "${id}" not found for this user.`);
    }
    return card;
  }

  /**
   * Updates an existing credit card record for a specific user.
   * @param id The ID of the credit card to update.
   * @param updateCreditCardDto Data to update the credit card.
   * @param userId The ID of the user who owns the credit card.
   * @returns The updated CreditCard.
   */
  async update(id: string, updateCreditCardDto: UpdateCreditCardDto, userId: string): Promise<CreditCard> {
    const existingCard = await this.creditCardRepository.findOne({
      where: { id: id, userId: userId }, // Filter by userId parameter
    });

    if (!existingCard) {
      throw new NotFoundException(`Credit card with ID "${id}" not found for this user.`);
    }

    if (updateCreditCardDto.isDefault !== undefined) {
      if (updateCreditCardDto.isDefault === true) {
        await this.unsetAllDefaultCards(userId); // Pass userId to helper
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
   * Removes a credit card record for a specific user.
   * @param id The ID of the credit card to remove.
   * @param userId The ID of the user who owns the credit card.
   * @returns A message indicating success.
   */
  async remove(id: string, userId: string): Promise<{ message: string }> {
    // Find the card to be removed
    const cardToRemove = await this.creditCardRepository.findOne({
      where: { id: id }, // Filter by userId parameter
    });

    if (!cardToRemove) {
      throw new NotFoundException(`Credit card with ID "${id}" not found for this user.`);
    }

    // Perform the deletion
    const result = await this.creditCardRepository.delete({ id: id, userId: userId }); // Filter by userId parameter

    if (result.affected === 0) {
      throw new NotFoundException(`Credit card with ID "${id}" could not be deleted.`);
    }

    console.log(`Credit card with ID "${id}" removed.`);

    // After deletion, check if the removed card was the default and if there are other cards
    if (cardToRemove.isDefault) {
      const remainingCards = await this.creditCardRepository.find({
        where: { userId: userId }, // Filter by userId parameter
        order: { createdAt: 'ASC' }, // Order by creation date to pick the oldest as new default
      });

      if (remainingCards.length > 0) {
        // If there's at least one card left, set the first one as default
        const newDefaultCard = remainingCards[0];
        newDefaultCard.isDefault = true;
        newDefaultCard.updatedAt = new Date();
        await this.creditCardRepository.save(newDefaultCard);
        console.log(`New default card set: ${newDefaultCard.id}`);
      }
    }

    return { message: `Credit card with ID "${id}" removed successfully.` };
  }

  /**
   * Sets a specific card as default and unsets all other cards for a specific user.
   * @param cardId The ID of the credit card to set as default.
   * @param userId The ID of the user who owns the credit card.
   * @returns The updated list of credit cards for the user.
   */
  async setDefaultCard(cardId: string, userId: string): Promise<CreditCard[]> {

    const targetCard = await this.creditCardRepository.findOne({
      where: { id: cardId, userId: userId }, // Filter by userId parameter
    });

    if (!targetCard) {
      throw new NotFoundException(`Credit card with ID "${cardId}" not found for this user.`);
    }

    // Unset all other default cards for this user
    await this.creditCardRepository.update(
      { userId: userId, isDefault: true, id: Not(cardId) }, // Filter by userId parameter and Not(cardId)
      { isDefault: false, updatedAt: new Date() }
    );

    // Set the target card as default
    targetCard.isDefault = true;
    targetCard.updatedAt = new Date();
    await this.creditCardRepository.save(targetCard);

    // Return all cards for the user, with the new default status
    return this.creditCardRepository.find({ where: { userId: userId }, order: { isDefault: 'DESC', createdAt: 'ASC' } }); // Filter by userId parameter
  }

  /**
   * Helper to unset all default cards for a given user.
   * @param userId The ID of the user.
   */
  private async unsetAllDefaultCards(userId: string): Promise<void> {
    console.log(`Unsetting all default cards for user ${userId}`);
    await this.creditCardRepository.update(
      { userId: userId, isDefault: true }, // Filter by userId parameter
      { isDefault: false, updatedAt: new Date() }
    );
  }
}
