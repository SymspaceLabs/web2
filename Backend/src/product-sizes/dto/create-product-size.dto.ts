import { IsString, IsOptional, IsNumber, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

// DTO for size dimensions
export class SizeDimensionsDto {
  @IsString()
  @IsOptional()
  length?: string;

  @IsString()
  @IsOptional()
  width?: string;

  @IsString()
  @IsOptional()
  height?: string;

  @IsEnum(['cm', 'in'])
  @IsOptional()
  unit?: 'cm' | 'in';
}

class ProductWeightDto {
  @IsOptional()
  @IsNumber()
  value?: number | null;

  @IsEnum(['kg', 'lbs'])
  unit: 'kg' | 'lbs'; // Frontend can send either, backend converts to kg
}

export class CreateProductSizeDto {
  @IsString()
  size: string;

  @IsString()
  @IsOptional()
  sizeChart?: string;

  @IsNumber()
  @IsOptional()
  sortOrder?: number;

  @ValidateNested()
  @Type(() => SizeDimensionsDto)
  @IsOptional()
  dimensions?: SizeDimensionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductWeightDto)
  productWeight?: ProductWeightDto;
}