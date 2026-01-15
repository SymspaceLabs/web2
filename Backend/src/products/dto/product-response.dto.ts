// ============================================================================
// dto/product-response.dto.ts
// Clean separation of internal entities from API responses
// ============================================================================

import { ProductStatus } from "../entities/product.entity";

export class CategoryDto {
  id: string;
  name: string;
  slug: string;
  
  // Full breadcrumb for navigation
  breadcrumb: {
    category: { id: string; name: string; slug: string };
    subcategory: { id: string; name: string; slug: string };
    parent?: { id: string; name: string; slug: string }; // Only if level is 'child'
  };
}

export class ProductImageDto {
  url: string;
  colorCode?: string;
  colorId?: string;
  sortOrder: number;
}

export class ProductModelDto {
  id: string;
  url: string;
  colorCode?: string;
  pivot?: any; // Define proper type based on your needs
  format?: string;
  boundingBox?: any; // Define proper type based on your needs
}

export class ProductColorDto {
  id: string;
  name: string;
  code: string;
}

export class ProductSizeDto {
  id: string;
  size: string;
  sortOrder: number;
  sizeChartUrl?: string;
  dimensions?: {
    length?: string;
    width?: string;
    height?: string;
    unit: 'cm' | 'in';
  };
  productWeight?: {
    value: number;
    unit: 'kg' | 'lbs';
  };
}

export class ProductVariantDto {
  id: string;
  sku: string;
  stock: number;
  price: number;
  salePrice: number;
  cost: number;
  color?: ProductColorDto;
  size?: ProductSizeDto;
}

export class CompanyDto {
  id: string;
  entityName: string;
  slug: string;
  description?: string;
}

export class ProductListItemDto {
  id: string;
  name: string;
  slug: string;
  description?: string;
  material?: string;
  gender?: string;
  ageGroup?: string;
  ar_type?: string;
  
  company: CompanyDto;
  category: any;
  status?: ProductStatus;
  
  threeDModels: ProductModelDto[];
  images: ProductImageDto[];
  thumbnail: string;
  colors: ProductColorDto[];
  sizes: ProductSizeDto[];
  stock?: number;

  // Computed fields
  displayPrice: any;
  availability: 'in_stock' | 'out_of_stock' | 'low_stock';
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export class ProductDetailDto extends ProductListItemDto {
  variants: ProductVariantDto[];
}