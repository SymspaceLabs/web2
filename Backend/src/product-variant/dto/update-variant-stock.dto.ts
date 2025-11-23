// src/product-variants/dto/update-variant-stock.dto.ts

import { 
  IsUUID, 
  IsInt, 
  Min, 
  IsOptional, 
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// --- Reused Nested DTOs (Assuming you have these defined/imported) ---

// DTO for partial updates to productWeight (reuse if possible)
export class PartialProductWeightDto {
  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsNumber()
  value?: number | null; 
}

// DTO for partial updates to dimensions (reuse if possible)
export class PartialProductDimensionsDto {
  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsNumber()
  length?: number | null; 

  @IsOptional()
  @IsNumber()
  width?: number | null; 

  @IsOptional()
  @IsNumber()
  height?: number | null; 
}

// --- Main Update DTO ---

export class UpdateVariantStockDto {
  @IsUUID()
  id: string;

  @IsInt()
  @Min(0)
  stock: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => PartialProductDimensionsDto)
  dimensions?: PartialProductDimensionsDto;
  
  @IsOptional()
  @ValidateNested()
  @Type(() => PartialProductWeightDto)
  productWeight?: PartialProductWeightDto;

  // ⭐ FIX: Add the missing properties: sizeChart and sizeFit

  @IsOptional()
  @IsString()
  sizeChart?: string;
  
  @IsOptional()
  @IsString()
  sizeFit?: string;
}