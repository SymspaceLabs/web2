// src/product-variants/dto/update-variant-stock.dto.ts
import { IsUUID, IsInt, Min } from 'class-validator';

export class UpdateVariantStockDto {
  @IsUUID()
  id: string;

  @IsInt()
  @Min(0)
  stock: number;
}
