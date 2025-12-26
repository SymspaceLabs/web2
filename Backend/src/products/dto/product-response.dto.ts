// ============================================================================
// dto/product-response.dto.ts
// Clean separation of internal entities from API responses
// ============================================================================

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
  
  images: ProductImageDto[];
  colors: ProductColorDto[];
  sizes: ProductSizeDto[];
  
  // Computed fields
  displayPrice: any;
  availability: 'in_stock' | 'out_of_stock' | 'low_stock';
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export class ProductDetailDto extends ProductListItemDto {
  variants: ProductVariantDto[];
  threeDModels?: Array<{
    id: string;
    modelUrl: string;
    textureUrl?: string;
    thumbnailUrl?: string;
  }>;
}