import { IsString, IsNotEmpty, IsCreditCard, IsNumberString, Length, Matches, IsOptional, IsBoolean } from 'class-validator';

// IMPORTANT SECURITY NOTE:
// This DTO contains sensitive credit card information.
// In a real application, this DTO would typically be used to receive data
// directly from the frontend (e.g., via a payment gateway's client-side SDK)
// and then immediately sent to the payment gateway's API for tokenization.
// You should NEVER store the full card number, CVC, or raw expiration date
// directly in your database. Only store the token and non-sensitive details.

export class CreateCreditCardDto {
  @IsNotEmpty()
  @IsString()
  // @IsCreditCard() // Optional: Use this if you want basic format validation, but rely on payment gateway for full validation
  @Length(13, 19, { message: 'Card number must be between 13 and 19 digits' })
  @IsNumberString() // Ensure it's only digits for server-side processing before sending to gateway
  cardNumber: string; // Full card number (e.g., "4111222233334444")

  @IsNotEmpty()
  @IsString()
  cardHolderName: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(2, 2, { message: 'Expiration month must be 2 digits (MM)' })
  @Matches(/^(0[1-9]|1[0-2])$/, { message: 'Expiration month must be between 01 and 12' })
  expirationMonth: string; // MM (e.g., "01", "12")

  @IsNotEmpty()
  @IsNumberString()
  @Length(2, 2, { message: 'Expiration year must be 2 digits (YY)' })
  expirationYear: string; // YY (e.g., "25", "30")

  @IsNotEmpty()
  @IsNumberString()
  @Length(3, 4, { message: 'CVC must be 3 or 4 digits' })
  cvc: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsOptional() // userId will typically be derived from authentication context, not sent by frontend
  @IsString()
  userId?: string; // NEW: Added userId to DTO
}