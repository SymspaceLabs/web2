// ============================================================================
// 1. TYPE DEFINITIONS (create a new file: src/products/types/display-price.types.ts)
// ============================================================================

export interface DisplayPrice {
  price: number;
  salePrice: number;
  hasSale: boolean;
  range: string;
}

export interface ProductWithDisplayPrice {
  displayPrice: DisplayPrice;
  selectedVariantPrice?: number;
}