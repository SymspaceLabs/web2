import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductColorDto } from 'src/product-colors/dto/create-product-color.dto';
import { CreateProductVariantDto } from 'src/product-variant/dto/create-product-variant.dto';
import { ProductGender } from '../entities/product.entity';
import { CreateProductModelDto } from 'src/product-models/dto/create-product-model.dto';
import { CreateProductImageDto } from 'src/product-images/dto/create-product-image.dto';
import { CreateProduct3dModelDto } from 'src/product-3d-models/dto/create-product-3d-model.dto';

// ----------------------------------------------------
// NEW DTO: CreateProductDimensionsDto
// ----------------------------------------------------
export class CreateProductDimensionsDto {
    // Unit remains mandatory if dimensions object is provided
    @IsString()
    @IsNotEmpty()
    unit: string; 

    // FIX: Remove '?' marker to satisfy TypeScript's strict assignment to ProductDimensions.
    // We keep @IsOptional() to allow the field to be omitted in the JSON body.
    @IsNumber()
    @IsOptional()
    length: number | null; 

    @IsNumber()
    @IsOptional()
    width: number | null;

    @IsNumber()
    @IsOptional()
    height: number | null;
}
// ----------------------------------------------------

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  subcategoryItem?: string;

  @IsString()
  @IsOptional()
  subcategoryItemChild?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  @IsOptional()
  images?: CreateProductImageDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductColorDto)
  @IsOptional()
  colors?: CreateProductColorDto[];
  
  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  composition?: string;

  @IsString()
  @IsOptional()
  sizeFit?: string;

  @IsArray()
  @IsOptional()
  sizes?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  variants: CreateProductVariantDto[];

  @IsOptional()
  @IsEnum(ProductGender)
  gender?: ProductGender;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProduct3dModelDto)
  threeDModels?: CreateProduct3dModelDto[];

  // ----------------------------------------------------
  // ADDED: Dimensions attribute (UNCOMMENTED)
  // ----------------------------------------------------
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateProductDimensionsDto)
  dimensions?: CreateProductDimensionsDto;

}