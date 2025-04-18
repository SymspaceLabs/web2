import { IsOptional, IsString, IsNumber, IsBoolean, IsUUID } from 'class-validator';

export class CreateProductVariantDto {
  @IsOptional()
  @IsString()
  sku?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  // Assume you're passing IDs to associate color and size
  @IsOptional()
  @IsString()
  colorCode?: string;

  @IsOptional()
  @IsString()
  size?: string;
}
