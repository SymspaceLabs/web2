import { IsNotEmpty, IsString, IsNumber, IsIn, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  paymentMethodNonce: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  // Ensure this matches the currencies supported by Braintree and your config
  @IsIn(['USD', 'EUR', 'GBP', 'MYR']) // Example currencies, add more as needed
  currency: string;

  // You can add more optional fields like customer info, billing/shipping addresses etc.
  // Example:
  // @IsOptional()
  // @IsString()
  // customerId?: string;

  // @IsOptional()
  // @IsObject()
  // billing?: {
  //   firstName: string;
  //   lastName: string;
  //   streetAddress: string;
  //   extendedAddress?: string;
  //   locality: string;
  //   region: string;
  //   postalCode: string;
  //   countryCodeAlpha2: string;
  // };

  // @IsOptional()
  // @IsObject()
  // shipping?: {
  //   firstName: string;
  //   lastName: string;
  //   streetAddress: string;
  //   extendedAddress?: string;
  //   locality: string;
  //   region: string;
  //   postalCode: string;
  //   countryCodeAlpha2: string;
  // };
}