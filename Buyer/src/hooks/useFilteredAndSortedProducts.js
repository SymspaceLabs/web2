// src/hooks/useFilteredAndSortedProducts.js
import { useMemo } from "react";

/**
 * Custom hook to apply filters and sorting to products.
 * @param {object} filterState - The current state of all filters (including allProducts).
 * @param {string} sortOption - The current sorting option.
 * @param {Array<string>} categoryQuery - Category names from URL query (for handling non-matching categories).
 * @returns {Array<object>} The filtered and sorted list of products.
 */
export function useFilteredAndSortedProducts(filterState, sortOption, categoryQuery) {
  return useMemo(() => {
    let list = [...filterState.allProducts]; // Start with a fresh copy to avoid mutating original

    // Apply category filter
    if (filterState.checkedCategoryIds.length > 0) {
      const subIds = new Set(filterState.checkedCategoryIds);
      list = list.filter(p => p.subcategoryItem && subIds.has(p.subcategoryItem.id));
    } else if (categoryQuery.length > 0 && filterState.checkedCategoryIds.length === 0) {
      // If categories are in URL but none match in the filterState (e.g., no products for that category), show empty list
      list = [];
    }

    // Apply brand filter
    if (filterState.selectedBrands.length) {
      const brandIds = new Set(filterState.selectedBrands.map(b => b.id));
      list = list.filter(p => p.company && brandIds.has(p.company.id));
    }

    // Apply gender filter
    if (filterState.selectedGenders.length) {
      const selectedGendersLower = new Set(filterState.selectedGenders.map(g => g.toLowerCase()));
      list = list.filter(p => {
        const productGenderLower = p.gender ? p.gender.toLowerCase() : '';

        // If the product's gender is directly selected
        // OR if the product is 'unisex' and 'men' or 'women' is among the selected genders
        return selectedGendersLower.has(productGenderLower) ||
               (productGenderLower === 'unisex' && 
                (selectedGendersLower.has('men') || selectedGendersLower.has('women')));
      });
    }

    // Apply price range filter
    list = list.filter(
      p => p.price >= filterState.priceRange[0] && p.price <= filterState.priceRange[1]
    );

    // Apply availability filter
    if (filterState.selectedAvailabilities.length) {
      if (!Array.isArray(filterState.selectedAvailabilities)) {
        console.warn("filterState.selectedAvailabilities is not an array:", filterState.selectedAvailabilities);
        list = [];
        return list;
      }
      const availSet = new Set(filterState.selectedAvailabilities);
      list = list.filter(p => Array.isArray(p.availability) ? p.availability.some(a => availSet.has(a)) : availSet.has(p.availability));
    }

    // Apply color filter
    if (filterState.selectedColors.length) {
      if (!Array.isArray(filterState.selectedColors)) {
        console.warn("filterState.selectedColors is not an array:", filterState.selectedColors);
        list = [];
        return list;
      }
      const colorCodes = new Set(filterState.selectedColors.map(c => c.code?.toLowerCase()));
      list = list.filter(p =>
        p.colors?.some(c => colorCodes.has(c.code?.toLowerCase()))
      );
    }

    // Apply sorting
    if (sortOption === "latest") {
      // Assuming 'postedDate' exists on your product objects for sorting by latest.
      // If not, you might need to use 'createdAt' or another suitable timestamp.
      list.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } else if (sortOption === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [
    filterState.allProducts, filterState.selectedBrands, filterState.checkedCategoryIds,
    filterState.selectedGenders, filterState.priceRange, filterState.selectedAvailabilities,
    filterState.selectedColors, categoryQuery, sortOption,
  ]);
}