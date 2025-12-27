// src/product-variants/dto/bulk-variant-request.dto.ts

import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

/**
 * DTO for bulk variant fetch request
 * Used when cart needs to fetch multiple variant details at once
 */
export class BulkVariantRequestDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'variantIds array cannot be empty' })
  @IsString({ each: true, message: 'Each variant ID must be a string' })
  variantIds: string[];
}