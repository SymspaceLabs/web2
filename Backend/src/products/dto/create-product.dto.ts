import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductColorDto } from 'src/product-colors/dto/create-product-color.dto';
import { CreateProductVariantDto } from 'src/product-variant/dto/create-product-variant.dto';

class CreateProductVariantPropertyDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

class CreatePriceDto {
  @IsNumber()
  amount: number;
}

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
  company?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  images?: string[];

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


  // @IsString()
  // @IsOptional()
  // type?: 'dynamic' | 'static';

  // @IsString()
  // @IsOptional()
  // material?: string;

  // @IsString()
  // @IsOptional()
  // productFitting?: 'True to Size' | 'Runs Small' | 'Runs Big';

}
