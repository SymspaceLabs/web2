// src/hooks/useFilteredAndSortedProducts.js

import { useMemo } from "react";

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
    
    const checkedCategoryIds = filterState.checkedCategoryIds || [];
    
    // =============================
    // CATEGORY FILTER (FIXED) 🛠️
    // =============================
    if (checkedCategoryIds.length > 0) {
      
      // Convert checked filter IDs to a Set of strings for efficient lookup
      const checkedIds = new Set(checkedCategoryIds.map(id => String(id)));
      
      list = list.filter(product => {
        
        // Use the most granular category ID available on the product object:
        // 1. subcategoryItemChildId (leaf category)
        // 2. subcategoryItemId (mid-level category, if no child exists)
        // Ensure the ID is converted to a string for comparison
        const productCategoryMatchId = String(
            product.subcategoryItemChildId || product.subcategoryItemId || ''
        );
        
        // Filter: Keep the product only if its granular ID is present in the checked filter IDs
        return checkedIds.has(productCategoryMatchId);
      });
    }


    // =============================
    // BRAND FILTER
    // =============================
    if (filterState.selectedBrands && filterState.selectedBrands.length > 0) {
      const brandIds = new Set(filterState.selectedBrands.map(b => b.id));
      list = list.filter(p => p.company && p.company.id && brandIds.has(p.company.id));
    }

    // =============================
    // GENDER FILTER
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
    // PRICE RANGE FILTER
    // =============================
    if (filterState.priceRange && filterState.priceRange.length === 2) {
      list = list.filter(
        p => {
          const rawPrice = p.price;
          const rawSalePrice = p.salePrice;
          const effectivePrice = (typeof rawSalePrice === 'number' && rawSalePrice !== null) ? rawSalePrice : rawPrice;
          return (effectivePrice >= filterState.priceRange[0] && effectivePrice <= filterState.priceRange[1]);
        }
      );
    } 

    // =============================
    // AVAILABILITY FILTER
    // =============================
    if (filterState.selectedAvailabilities && filterState.selectedAvailabilities.length > 0) {
      const availSet = new Set(filterState.selectedAvailabilities);
      list = list.filter(p => p.availability && availSet.has(p.availability));
    }

    // =============================
    // COLOR FILTER
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
    } else if (sortOption === "price-asc") {
      list.sort((a, b) => {
        const priceA = (typeof a.salePrice === 'number' && a.salePrice !== null) ? a.salePrice : a.price;
        const priceB = (typeof b.salePrice === 'number' && b.salePrice !== null) ? b.salePrice : b.price;
        return priceA - priceB;
      });
    } else if (sortOption === "price-desc") {
      list.sort((a, b) => {
        const priceA = (typeof a.salePrice === 'number' && a.salePrice !== null) ? a.salePrice : a.price;
        const priceB = (typeof b.salePrice === 'number' && b.salePrice !== null) ? b.salePrice : b.price;
        return priceB - priceA;
      });
    }

    // =============================
    // RETURN FINAL FILTERED LIST
    // =============================
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