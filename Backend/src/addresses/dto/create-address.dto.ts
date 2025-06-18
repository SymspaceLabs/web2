import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  name: string;

  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zip: string;

  @IsString()
  country: string;

  @IsUUID()
  userId: string;
}
