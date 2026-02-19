import { ProductCategory } from "./category";

export interface ProductColor {
  id: string;
  name: string;
  code: string;
}

export interface ProductSize {
  id: string;
  size: string;
  sizeChartUrl?: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

export interface ProductImage {
  url: string;
  colorId?: string;
  alt?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  stock: number;
  availability: string;
  gender?: string;
  createdAt: string;
  material?: string;
  company?: { 
    id: string | number;
    entityName: string
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
  variants: Array<{ 
    id: string;
    stock: number;
    colorId: string;
    sizeId: string;
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