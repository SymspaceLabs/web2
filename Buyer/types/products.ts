import { ProductCategory } from "./category";

export interface ProductColor {
  id: string;
  name: string;
  code: string;
  sortOrder?: number;
}

export interface ProductSize {
  id: string;
  size: string;
  sizeChartUrl?: string | null;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  productWeight?: number | null;
}

export interface ProductImage {
  url: string;
  colorId?: string | null;
  colorCode?: string | null;  // ← added
  sortOrder?: number;
  alt?: string;
  altText?: string;
}

export interface ThreeDModel {
  id?: string;
  url: string;
  colorCode?: string | null;
  colorId?: string | null;
  format?: string;
  pivot?: number[];
  boundingBox?: {
    max: number[];
    min: number[];
  };
  texture?: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  thumbnail: string;
  stock: number;
  availability: string;
  gender?: string;
  createdAt?: string;
  material?: string;
  sizeFit?: string;
  company?: {
    id: string | number;
    entityName: string;
    slug?: string;
    description?: string;
  };
  category?: ProductCategory;
  displayPrice: {
    price: number;
    salePrice?: number;
    hasSale: boolean;
    range?: string;
  };
  colors: ProductColor[];
  sizes: ProductSize[];
  images: ProductImage[];
  threeDModels?: ThreeDModel[];   // ← added
  variants: Array<{
    id: string;
    stock: number;
    price?: number;
    salePrice?: number;
    cost?: number | null;
    sku?: string;
    color?: ProductColor;
    size?: ProductSize;
    colorId?: string;
    sizeId?: string;
  }>;
}

export interface AvailabilityData {
  variantId: string;
  stock: number;
  available: boolean;
  status: string;
  statusColor: string;
  price: number;
  salePrice?: number;
  cost?: number | null;
  hasSale: boolean;
  sku: string;
}