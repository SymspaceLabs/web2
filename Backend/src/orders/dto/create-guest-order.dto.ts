// src/orders/dto/create-guest-order.dto.ts

import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

// Define a DTO for the address structure when passed as raw data
class GuestAddressDto {
  @IsNotEmpty()
  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2?: string; // Optional second address line

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  country: string; // e.g., "US", "CA"

  @IsNotEmpty()
  @IsString()
  zip: string;
}

// Define a DTO for each item in the guest order
class CreateGuestOrderItemDto {
  @IsNotEmpty()
  @IsString()
  variantId: string; // The ID of the product variant

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateGuestOrderDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => GuestAddressDto)
  shippingAddress: GuestAddressDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => GuestAddressDto)
  billingAddress: GuestAddressDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGuestOrderItemDto)
  items: CreateGuestOrderItemDto[];

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  totalAmount: number; // The total amount sent from the frontend

  @IsOptional()
  @IsString()
  paypalOrderId?: string; // Optional: for PayPal payments
}
