import { IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductGender } from '../entities/product.entity';
import { CreateProductSizeDto } from 'src/product-sizes/dto/create-product-size.dto';

// ============================================
// Interface matching your production data format
// ============================================
export interface ProductionProductData {
  id: string;
  name: string;
  slug: string;
  description: string;
  material: string | null;
  gender: ProductGender;
  ar_type: string;
  company: {
    id: string;
    entityName: string;
    slug: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
    parent?: any;
  };
  images: Array<{
    url: string;
    colorCode: string;
    colorId: string;
    sortOrder: number;
  }>;
  thumbnail: string;
  threeDModels: Array<{
    id: string;
    url: string;
    colorCode: string;
    pivot: number[];
    format: string;
    boundingBox: {
      max: number[];
      min: number[];
    };
  }>;
  colors: Array<{
    id: string;
    name: string;
    code: string;
  }>;
  sizes: CreateProductSizeDto[];
  stock: number;
  displayPrice: {
    price: number;
    salePrice: number;
    hasSale: boolean;
    range: string;
  };
  availability: string;
  status: string;
  // Optional new fields
  shape?: string;
  pattern?: string;
  pile_height?: string;
  room_type?: string;
  washable?: boolean;
  backing_type?: string;
  occasion?: string;
  season?: string;
  age_group?: string;
  indoor_outdoor?: string;
  style?: string;
}

// ============================================
// DTO for bulk import request
// ============================================
export class BulkImportDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  products: ProductionProductData[];

  @IsOptional()
  skipExisting?: boolean; // If true, skip products that already exist by slug

  @IsOptional()
  updateExisting?: boolean; // If true, update existing products instead of skipping
}

// ============================================
// DTO for bulk import response
// ============================================
export interface ImportResult {
  slug: string;
  status: 'created' | 'updated' | 'skipped' | 'failed';
  productId?: string;
  error?: string;
}

export class BulkImportResponseDto {
  totalProcessed: number;
  created: number;
  updated: number;
  skipped: number;
  failed: number;
  results: ImportResult[];
  errors: Array<{
    slug: string;
    error: string;
  }>;
}