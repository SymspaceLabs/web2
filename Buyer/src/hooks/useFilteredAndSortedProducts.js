// src/hooks/useFilteredAndSortedProducts.js

import { useMemo } from "react";

/**
 * Helper function to check if a product matches any of the selected category IDs
 * Traverses up the category hierarchy (category -> parent -> parent)
 */
function productMatchesCategory(product, categoryIds) {
  if (!categoryIds || categoryIds.length === 0) return true;
  if (!product.category) return false;
  
  let currentCategory = product.category;
  
  // Traverse up the category hierarchy
  while (currentCategory) {
    if (categoryIds.includes(String(currentCategory.id))) {
      return true;
    }
    currentCategory = currentCategory.parent;
  }
  
  return false;
}

/**
 * @function useFilteredAndSortedProducts
 * @description Custom React hook to apply client-side filters and sorting to an
 * already fetched product list.
 *
 * @param {object} filterState - An object containing the current filter selections.
 * @param {string} sortOption - The currently selected sorting option (e.g., 'latest', 'price-asc').
 * @returns {Array} The final array of filtered and sorted products.
 */
export function useFilteredAndSortedProducts(filterState, sortOption) {
  return useMemo(() => {
    // Start with a fresh copy of the product list
    let list = [...filterState.allProducts];
    
    // =============================
    // CATEGORY FILTER (Client-side)
    // =============================
    // Even though backend does initial filtering from URL,
    // we need client-side filtering for the UI checkboxes
    if (filterState.checkedCategoryIds && filterState.checkedCategoryIds.length > 0) {
      list = list.filter(p => productMatchesCategory(p, filterState.checkedCategoryIds));
    }
    
    // =============================
    // BRAND FILTER (Client-side only)
    // =============================
    if (filterState.selectedBrands && filterState.selectedBrands.length > 0) {
      const brandIds = new Set(filterState.selectedBrands.map(b => b.id));
      list = list.filter(p => p.company && p.company.id && brandIds.has(p.company.id));
    }

    // =============================
    // GENDER FILTER (Client-side only)
    // =============================
    if (filterState.selectedGenders && filterState.selectedGenders.length > 0) {
      const selectedGendersLower = new Set(
        filterState.selectedGenders.map(g => g.toLowerCase())
      );

      list = list.filter(p => {
        const productGenderLower = p.gender ? p.gender.toLowerCase() : "";
        return (
          selectedGendersLower.has(productGenderLower) ||
          (productGenderLower === "unisex" &&
            (selectedGendersLower.has("men") || selectedGendersLower.has("women")))
        );
      });
    }

    // =============================
    // PRICE RANGE FILTER (Client-side only)
    // =============================
    if (filterState.priceRange && filterState.priceRange.length === 2) {
      list = list.filter(p => {
        // ✅ FIX: Use displayPrice object
        const rawPrice = p.displayPrice?.price || 0;
        const rawSalePrice = p.displayPrice?.salePrice || 0;
        const hasSale = p.displayPrice?.hasSale || false;
        
        // Use sale price if it exists and is a valid sale
        const effectivePrice = (hasSale && rawSalePrice > 0) ? rawSalePrice : rawPrice;

        // If price is 0 or not set, include the product
        if (!effectivePrice && effectivePrice !== 0) return true;
        
        return (
          effectivePrice >= filterState.priceRange[0] && 
          effectivePrice <= filterState.priceRange[1]
        );
      });
    } 

    // =============================
    // AVAILABILITY FILTER (Client-side only)
    // =============================
    if (filterState.selectedAvailabilities && filterState.selectedAvailabilities.length > 0) {
      const availSet = new Set(filterState.selectedAvailabilities);
      list = list.filter(p => p.availability && availSet.has(p.availability));
    }

    // =============================
    // COLOR FILTER (Client-side only)
    // =============================
    if (filterState.selectedColors && filterState.selectedColors.length > 0) {
      const colorCodes = new Set(
        filterState.selectedColors.map(c => c.code?.toLowerCase())
      );
      list = list.filter(p =>
        p.colors?.some(c => c.code && colorCodes.has(c.code.toLowerCase()))
      );
    }

    // =============================
    // SORTING LOGIC
    // =============================
    if (sortOption === "latest") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "relevance") {
      list.sort((a, b) => {
        const priceA = (a.displayPrice?.hasSale && a.displayPrice?.salePrice) 
          ? a.displayPrice.salePrice 
          : a.displayPrice?.price || 0;
        const priceB = (b.displayPrice?.hasSale && b.displayPrice?.salePrice) 
          ? b.displayPrice.salePrice 
          : b.displayPrice?.price || 0;
        return priceA - priceB;
      });
    } else if (sortOption === "price-asc") {
      list.sort((a, b) => {
        const priceA = (a.displayPrice?.hasSale && a.displayPrice?.salePrice) 
          ? a.displayPrice.salePrice 
          : a.displayPrice?.price || 0;
        const priceB = (b.displayPrice?.hasSale && b.displayPrice?.salePrice) 
          ? b.displayPrice.salePrice 
          : b.displayPrice?.price || 0;
        return priceA - priceB;
      });
    } else if (sortOption === "price-desc") {
      list.sort((a, b) => {
        const priceA = (a.displayPrice?.hasSale && a.displayPrice?.salePrice) 
          ? a.displayPrice.salePrice 
          : a.displayPrice?.price || 0;
        const priceB = (b.displayPrice?.hasSale && b.displayPrice?.salePrice) 
          ? b.displayPrice.salePrice 
          : b.displayPrice?.price || 0;
        return priceB - priceA;
      });
    }

    return list;
  }, [
    filterState.allProducts,
    filterState.checkedCategoryIds, // ✅ ADDED BACK: Needed for category filtering
    filterState.selectedBrands,
    filterState.selectedGenders,
    filterState.priceRange,
    filterState.selectedAvailabilities,
    filterState.selectedColors,
    sortOption,
  ]);
}