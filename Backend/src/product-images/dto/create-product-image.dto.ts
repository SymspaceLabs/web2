// src/products/dto/create-product-image.dto.ts
import { IsUrl, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateProductImageDto {
  @IsUrl()
  url: string;

  @IsString()
  @IsOptional()
  colorCode?: string;

  @IsString()
  @IsOptional()
  colorId?: string;

  @IsNumber()
  @IsOptional()
  sortOrder?: number;
}