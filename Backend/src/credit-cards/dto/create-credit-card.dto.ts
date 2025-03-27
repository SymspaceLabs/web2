import { IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateCreditCardDto {
  @IsString()
  @Length(16, 16, { message: 'Card number must be exactly 16 digits' })
  cardNo: string;

  @IsNumber()
  @Min(1)
  @Max(12)
  expiryMonth: number;

  @IsNumber()
  @Min(new Date().getFullYear())
  expiryYear: number;

  @IsString()
  @Length(3, 4, { message: 'CVV must be 3 or 4 digits' })
  cvv: string;

  @IsString()
  @IsNotEmpty()
  cardHolderName: string;
}
