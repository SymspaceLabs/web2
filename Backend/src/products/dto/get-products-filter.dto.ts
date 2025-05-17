import { IsOptional, IsArray } from 'class-validator';

export class GetProductsFilterDto {
  @IsOptional()
  @IsArray()
  brands?: string[];

  @IsOptional()
  @IsArray()
  subcategoryItemIds?: string[];

}
