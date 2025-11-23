// Assuming this is in your DTO file or imported from the update DTO file:
import { 
  IsOptional, 
  IsString, 
  IsNumber, 
  IsBoolean, 
  IsUUID, 
  ValidateNested,
  Min,
  IsNotEmptyObject,
} from 'class-validator';
import { Type } from 'class-transformer';

// --- Reused Nested DTOs (Can be placed in a shared DTO file) ---

/**
 * DTO for the productWeight JSON column.
 * Making all fields optional here allows reliance on entity defaults if not provided.
 */
export class ProductWeightDto {
  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  value?: number | null; 
}

/**
 * DTO for the dimensions JSON column.
 */
export class ProductDimensionsDto {
  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  length?: number | null; 

  @IsOptional()
  @IsNumber()
  @Min(0)
  width?: number | null; 

  @IsOptional()
  @IsNumber()
  @Min(0)
  height?: number | null; 
}

// --- Main Create DTO ---

export class CreateProductVariantDto {
  @IsOptional()
  @IsString()
  sku?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  colorCode?: string;

  @IsOptional()
  @IsString()
  size?: string;

  // --- New Fields for JSON Columns ---

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDimensionsDto)
  dimensions?: ProductDimensionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductWeightDto)
  productWeight?: ProductWeightDto;
  
  // You also have sizeChart and sizeFit on the entity:
  @IsOptional()
  @IsString()
  sizeChart?: string;
  
  @IsOptional()
  @IsString()
  sizeFit?: string;
}