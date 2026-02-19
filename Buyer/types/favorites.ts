// types/favorites.ts

import { ProductColor, ProductSize } from "./products";


export interface ProductVariant {
  color: ProductColor | null;
  size: ProductSize | null;
}

export interface FavoriteProduct {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  displayPrice: {
    price: number;
    salePrice?: number;
    hasSale: boolean;
  };
  stock: number;
  selectedColor?: ProductColor;
  selectedSize?: string;
  _favoriteKey?: string;
}

export interface FavoritesState {
  favoriteIds: string[];
  favoriteData: Record<string, FavoriteProduct>;
  loading: boolean;
  error: string | null;
}

export type FavoritesAction =
  | {
      type: "TOGGLE_FAVORITE";
      payload: {
        id: string;
        selectedColor: ProductColor | null;
        selectedSize: string | null;
        snapshot: Omit<FavoriteProduct, "_favoriteKey">;
      };
    }
  | { type: "REMOVE_FAVORITE"; payload: string }
  | { type: "INITIALIZE_FAVORITES"; payload: { ids: string[]; data: Record<string, FavoriteProduct> } }
  | { type: "UPDATE_FAVORITE_DATA"; payload: { id: string; data: Partial<FavoriteProduct> } }
  | { type: "BATCH_UPDATE_FAVORITE_DATA"; payload: Record<string, FavoriteProduct> }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR_FAVORITES" };

export type { ProductColor, ProductSize };
