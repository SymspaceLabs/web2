// src/promo-codes/dto/apply-promo-code.dto.ts

import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class ApplyPromoCodeDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsUUID() // Assuming userId is a UUID
  userId: string; // The user ID passed directly in the request body
}
