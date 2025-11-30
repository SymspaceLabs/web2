import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

// This DTO reflects the structure of the ProductDimensions interface for partial updates
export class DimensionsDto {
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

export class UpdateVariantDimensionsRequestDto {
  @IsOptional()
  dimensions?: DimensionsDto;

  @IsOptional()
  @IsString()
  sizeChartFile?: string; // Corresponds to the 'sizeChart' column in the entity
}
