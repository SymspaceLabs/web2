import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductColorDto } from 'src/product-colors/dto/create-product-color.dto';
import { CreateProductVariantDto } from 'src/product-variant/dto/create-product-variant.dto';
import { ProductGender } from '../entities/product.entity';
import { CreateProductImageDto } from 'src/product-images/dto/create-product-image.dto';
import { CreateProduct3dModelDto } from 'src/product-3d-models/dto/create-product-3d-model.dto';
import { CreateProductSizeDto } from 'src/product-sizes/dto/create-product-size.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

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
  sizeFit?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductSizeDto)
  @IsOptional()
  sizes?: CreateProductSizeDto[]; 

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

  // ============================================
  // EXISTING OPTIONAL TAG FIELDS
  // ============================================
  @IsString()
  @IsOptional()
  occasion?: string;

  @IsString()
  @IsOptional()
  season?: string;

  @IsString()
  @IsOptional()
  age_group?: string;

  @IsString()
  @IsOptional()
  ar_type?: string;

  @IsString()
  @IsOptional()
  indoor_outdoor?: string;

  @IsString()
  @IsOptional()
  material?: string;

  @IsString()
  @IsOptional()
  style?: string;

  @IsString()
  @IsOptional()
  shape?: string; // For rugs/mats: rectangle, square, round, oval, runner, hexagon, irregular

  @IsString()
  @IsOptional()
  pattern?: string; // For decorative products: solid, striped, geometric, etc.

  @IsString()
  @IsOptional()
  pile_height?: string; // For rugs/carpets: low, medium, high

  @IsString()
  @IsOptional()
  room_type?: string; // For home products: living room, bedroom, bathroom, kitchen, hallway, office

  @IsBoolean()
  @IsOptional()
  washable?: boolean; // Machine washable flag

  @IsString()
  @IsOptional()
  backing_type?: string; // For rugs/mats: Non-slip, Rubber, Felt

}