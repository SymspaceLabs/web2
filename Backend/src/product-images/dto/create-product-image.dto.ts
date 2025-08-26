// src/products/dto/create-product-image.dto.ts
import { IsUrl, IsString, IsOptional } from 'class-validator';

export class CreateProductImageDto {
  @IsUrl()
  url: string;

  @IsString()
  @IsOptional()
  colorCode?: string; // Add this property
}