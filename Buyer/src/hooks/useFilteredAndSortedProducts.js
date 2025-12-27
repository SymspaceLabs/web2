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
    
    // ❌ REMOVE: Category filter - Backend already filtered by category
    // The products we receive are already filtered by the URL params on the backend
    
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
      list = list.filter(
        p => {
          const rawPrice = p.price;
          const rawSalePrice = p.salePrice;
          const effectivePrice = (typeof rawSalePrice === 'number' && rawSalePrice !== null) ? rawSalePrice : rawPrice;

          // ✅ FIX: Handle products with price = 0 or null
          // If price is 0 or not set, show the product (don't filter it out)
          if (!effectivePrice && effectivePrice !== 0) return true;
          return (effectivePrice >= filterState.priceRange[0] && effectivePrice <= filterState.priceRange[1]);
        }
      );
      console.log('🔍 After price filter:', list.length, 'products');
    } 

    // =============================
    // AVAILABILITY FILTER (Client-side only)
    // =============================
    // ✅ FIX: Only filter if user has explicitly selected availabilities
    if (filterState.selectedAvailabilities && filterState.selectedAvailabilities.length > 0) {
      const availSet = new Set(filterState.selectedAvailabilities);
      list = list.filter(p => p.availability && availSet.has(p.availability));
      console.log('🔍 After availability filter:', list.length, 'products', 'Selected:', filterState.selectedAvailabilities);
    } else {
      console.log('🔍 Skipping availability filter (none selected)');
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
        const priceA = (typeof a.salePrice === 'number' && a.salePrice !== null) ? a.salePrice : a.price;
        const priceB = (typeof b.salePrice === 'number' && b.salePrice !== null) ? b.salePrice : b.price;
        return priceA - priceB;
      });
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

    return list;
  }, [
    filterState.allProducts,
    // ❌ REMOVED: filterState.checkedCategoryIds - not needed anymore
    filterState.selectedBrands,
    filterState.selectedGenders,
    filterState.priceRange,
    filterState.selectedAvailabilities,
    filterState.selectedColors,
    sortOption,
  ]);
}