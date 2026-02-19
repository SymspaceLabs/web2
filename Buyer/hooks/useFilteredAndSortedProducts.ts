// src/hooks/useFilteredAndSortedProducts.ts
import { useMemo } from 'react';
import { Product } from '@/types/products';
import { ProductCategory } from '@/types/category';

interface Color {
  code: string;
  name: string;
}

interface Company {
  id: string | number;
  entityName: string;
}

interface Brand {
  id: string | number;
  entityName: string;
}

interface FilterState {
  allProducts: Product[];
  checkedCategoryIds?: string[];
  selectedBrands?: Brand[];
  selectedGenders?: string[];
  priceRange?: [number, number];
  selectedAvailabilities?: string[];
  selectedColors?: Color[];
}

type SortOption = 'latest' | 'relevance' | 'price-asc' | 'price-desc';

/**
 * Helper function to check if a product matches any of the selected category IDs
 * Traverses up the category hierarchy (category -> parent -> parent)
 */
function productMatchesCategory(product: Product, categoryIds: string[]): boolean {
  if (!categoryIds || categoryIds.length === 0) return true;
  if (!product.category) return false;

  let currentCategory: ProductCategory | undefined = product.category;

  while (currentCategory) {
    if (categoryIds.includes(String(currentCategory.id))) {
      return true;
    }
    currentCategory = currentCategory.parent;
  }

  return false;
}

/**
 * Helper function to get the effective price (sale price if available, otherwise regular price)
 */
function getEffectivePrice(product: Product): number {
  const rawPrice = product.displayPrice?.price || 0;
  const rawSalePrice = product.displayPrice?.salePrice || 0;
  const hasSale = product.displayPrice?.hasSale || false;

  // Use sale price if it exists and is a valid sale
  return hasSale && rawSalePrice > 0 ? rawSalePrice : rawPrice;
}

/**
 * Custom React hook to apply client-side filters and sorting to products
 *
 * @param filterState - Object containing the current filter selections
 * @param sortOption - The currently selected sorting option
 * @returns The final array of filtered and sorted products
 */
export function useFilteredAndSortedProducts(
  filterState: any,
  sortOption: SortOption
): any[] {
  return useMemo(() => {
    // Start with a fresh copy of the product list
    let list = [...filterState.allProducts];

    // =============================
    // CATEGORY FILTER (Client-side)
    // =============================
    // Even though backend does initial filtering from URL,
    // we need client-side filtering for the UI checkboxes
    if (filterState.checkedCategoryIds && filterState.checkedCategoryIds.length > 0) {
      list = list.filter((p) => productMatchesCategory(p, filterState.checkedCategoryIds!));
    }

    // =============================
    // BRAND FILTER (Client-side only)
    // =============================
    if (filterState.selectedBrands && filterState.selectedBrands.length > 0) {
      const brandIds = new Set(filterState.selectedBrands.map((b:any) => b.id));
      list = list.filter((p) => p.company && p.company.id && brandIds.has(p.company.id));
    }

    // =============================
    // GENDER FILTER (Client-side only)
    // =============================
    if (filterState.selectedGenders && filterState.selectedGenders.length > 0) {
      const selectedGendersLower = new Set(
        filterState.selectedGenders.map((g:any) => g.toLowerCase())
      );

      list = list.filter((p) => {
        const productGenderLower = p.gender ? p.gender.toLowerCase() : '';
        return (
          selectedGendersLower.has(productGenderLower) ||
          (productGenderLower === 'unisex' &&
            (selectedGendersLower.has('men') || selectedGendersLower.has('women')))
        );
      });
    }

    // =============================
    // PRICE RANGE FILTER (Client-side only)
    // =============================
    if (filterState.priceRange && filterState.priceRange.length === 2) {
      list = list.filter((p) => {
        const effectivePrice = getEffectivePrice(p);

        // If price is 0 or not set, include the product
        if (!effectivePrice && effectivePrice !== 0) return true;

        return (
          effectivePrice >= filterState.priceRange![0] &&
          effectivePrice <= filterState.priceRange![1]
        );
      });
    }

    // =============================
    // AVAILABILITY FILTER (Client-side only)
    // =============================
    if (filterState.selectedAvailabilities && filterState.selectedAvailabilities.length > 0) {
      const availSet = new Set(filterState.selectedAvailabilities);
      list = list.filter((p) => p.availability && availSet.has(p.availability));
    }

    // =============================
    // COLOR FILTER (Client-side only)
    // =============================
    if (filterState.selectedColors && filterState.selectedColors.length > 0) {
      const colorCodes = new Set(
        filterState.selectedColors.map((c:any) => c.code?.toLowerCase()).filter(Boolean)
      );
      list = list.filter((p) =>
        p.colors?.some((c:any) => c.code && colorCodes.has(c.code.toLowerCase()))
      );
    }

    // =============================
    // SORTING LOGIC
    // =============================
    if (sortOption === 'latest') {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOption === 'relevance' || sortOption === 'price-asc') {
      // Both relevance and price-asc sort by price ascending
      list.sort((a, b) => {
        const priceA = getEffectivePrice(a);
        const priceB = getEffectivePrice(b);
        return priceA - priceB;
      });
    } else if (sortOption === 'price-desc') {
      list.sort((a, b) => {
        const priceA = getEffectivePrice(a);
        const priceB = getEffectivePrice(b);
        return priceB - priceA;
      });
    }

    return list;
  }, [
    filterState.allProducts,
    filterState.checkedCategoryIds,
    filterState.selectedBrands,
    filterState.selectedGenders,
    filterState.priceRange,
    filterState.selectedAvailabilities,
    filterState.selectedColors,
    sortOption,
  ]);
}