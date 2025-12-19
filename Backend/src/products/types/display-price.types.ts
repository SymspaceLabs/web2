// ============================================================================
// 1. TYPE DEFINITIONS (create a new file: src/products/types/display-price.types.ts)
// ============================================================================

export interface DisplayPrice {
  minPrice: number;
  maxPrice: number;
  displayType: 'single' | 'range' | 'from';
  formattedDisplay: string;
  hasSale: boolean;
  originalMinPrice?: number;
  originalMaxPrice?: number;
}

export interface ProductWithDisplayPrice {
  displayPrice: DisplayPrice;
  selectedVariantPrice?: number;
}