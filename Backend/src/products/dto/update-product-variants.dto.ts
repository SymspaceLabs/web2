// update-product-variants.dto.ts
import { IsArray, ValidateNested, IsString, IsNumber, IsInt, Min, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class ColorDto {
  @IsString()
  name: string;

  @IsString()
  code: string;
}

export class SizeDto {
  @IsString()
  size: string;

  @IsOptional()
  dimensions?: any;

  @IsOptional()
  @IsString()
  sizeChart?: string;
  
  productWeight: any;
}

export class VariantInputDto {
  @IsOptional()
  @IsUUID()
  id?: string;
  
  @IsString()
  colorName: string;
  
  @IsString()
  sizeName: string;
  
  @IsString()
  sku: string;
  
  @IsInt()
  @Min(0)
  stock: number;
  
  @IsNumber()
  @Min(0)
  price: number;
  
  @IsOptional()
  @IsNumber()
  @Min(0)
  salePrice?: number;
  
  @IsNumber()
  @Min(0)
  cost: number;
}

export class UpdateProductVariantsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ColorDto)
  colors: ColorDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SizeDto)
  sizes: SizeDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantInputDto)
  variants: VariantInputDto[];
}