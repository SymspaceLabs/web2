// ============================================
// DTO (dto/bulk-delete.dto.ts)
// ============================================

import { IsArray, IsUUID, ArrayMinSize, IsNotEmpty } from 'class-validator';

export class BulkDeleteDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'Product IDs array must contain at least one ID' })
  @IsUUID('4', { each: true, message: 'Each product ID must be a valid UUID' })
  @IsNotEmpty({ each: true })
  productIds: string[];
}

export class BulkDeleteResponseDto {
  success: boolean;
  message: string;
  deletedCount: number;
  requestedCount: number;
  failedIds?: string[];
  errors?: Array<{ id: string; error: string }>;
}