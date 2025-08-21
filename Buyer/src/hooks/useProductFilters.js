// src/hooks/useProductFilters.js

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
// Assuming arraysEqual handles deep comparison for arrays of primitives.
// We will add a more robust deepEquals for objects and nested structures.
import { arraysEqual } from "@/utils/arraysEqual";

/**
 * Helper function for deep equality comparison of objects and arrays.
 * This is crucial to prevent unnecessary state updates when references change but content does not.
 * @param {*} a - First value to compare.
 * @param {*} b - Second value to compare.
 * @returns {boolean} True if values are deeply equal, false otherwise.
 */
function deepEquals(a, b) {
  if (a === b) return true; // Same reference or primitive value

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (Array.isArray(a)) {
      if (!Array.isArray(b) || a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!deepEquals(a[i], b[i])) return false;
      }
      return true;
    }

    if (Array.isArray(b)) return false; // One is array, other is object

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
      if (!keysB.includes(key) || !deepEquals(a[key], b[key])) return false;
    }

    return false; // Not objects or not deeply equal
  }

  return false; // Not objects or not deeply equal
}

/**
 * Custom hook to manage product filtering logic and URL synchronization.
 * It initializes filter state from URL parameters and updates it based on
 * user interactions. It also ensures the filterable data (like allProducts,
 * allBrands, etc.) is kept in sync with the latest data from the server.
 *
 * @param {object} initialData - Initial product data (allProducts, allBrands, etc.)
 * from the useProductData hook. This data is expected
 * to update when new products are fetched.
 * @param {object} urlSearchParamsObj - Current URL search parameters as a plain object
 * obtained from next/navigation's useSearchParams.
 * @returns {{
 * filterState: object,
 * setFilterState: function,
 * handleFilterChange: function,
 * handlePriceRangeChange: function,
 * handleResetAllFilters: function,
 * }} Filter state and handlers.
 */
export function useProductFilters(initialData, urlSearchParamsObj) {
  const router = useRouter();
  const pathname = usePathname();

  // Memoize URLSearchParams object to ensure its reference is stable.
  const memoizedSearchParams = useMemo(() => {
    const params = new URLSearchParams();
    if (urlSearchParamsObj) {
      // Use urlSearchParamsObj.entries() for robust iteration over all params,
      // including those with multiple values for the same key.
      for (const [key, value] of urlSearchParamsObj.entries()) {
        params.append(key, value);
      }
    }
    return params;
  }, [urlSearchParamsObj]);

  const searchParams = memoizedSearchParams; // Use this derived searchParams

  // Initialize filterState with default values and initialData's limits.
  // This state will be fully managed by the single useEffect below based on URL and initialData.
  const [filterState, setFilterState] = useState(() => ({
    selectedGenders: [],
    selectedBrands: [],
    priceRange: initialData.priceLimits || [0, 1000],
    checkedCategoryIds: [],
    selectedAvailabilities: [],
    selectedColors: [],
    allProducts: initialData.allProducts,
    allBrands: initialData.allBrands,
    category: initialData.category,
    allGenders: initialData.allGenders,
    allAvailabilities: initialData.allAvailabilities,
    allColors: initialData.allColors,
    priceLimits: initialData.priceLimits || [0, 1000],
  }));

  // Consolidate Data Sync and URL Filter Apply into a single useEffect.
  // This effect is the SINGLE SOURCE OF TRUTH for initializing and updating `filterState`.
  useEffect(() => {
    // console.log('useProductFilters useEffect: Syncing state from URL and initialData');

    setFilterState(prevState => {
      let newState = { ...prevState };
      let hasChanged = false;

      // --- 1. Synchronize static initial data (Effect 1's role) ---
      if (!deepEquals(prevState.allProducts, initialData.allProducts)) {
        newState.allProducts = initialData.allProducts;
        hasChanged = true;
      }
      if (!deepEquals(prevState.allBrands, initialData.allBrands)) {
        newState.allBrands = initialData.allBrands;
        hasChanged = true;
      }
      if (!deepEquals(prevState.category, initialData.category)) {
        newState.category = initialData.category;
        hasChanged = true;
      }
      if (!deepEquals(prevState.allGenders, initialData.allGenders)) {
        newState.allGenders = initialData.allGenders;
        hasChanged = true;
      }
      if (!deepEquals(prevState.allAvailabilities, initialData.allAvailabilities)) {
        newState.allAvailabilities = initialData.allAvailabilities;
        hasChanged = true;
      }
      if (!deepEquals(prevState.allColors, initialData.allColors)) {
        newState.allColors = initialData.allColors;
        hasChanged = true;
      }
      // Special handling for priceLimits, update priceRange if limits change significantly
      if (!deepEquals(prevState.priceLimits, initialData.priceLimits)) {
        newState.priceLimits = initialData.priceLimits;
        newState.priceRange = initialData.priceLimits; // Reset price range to new limits
        hasChanged = true;
      }


      // --- 2. Initialize filter selections from URL parameters (Effect 2's role) ---
      // Genders
      const currentGenderQuery = searchParams.getAll("gender").map(g => g.toLowerCase());
      const validGenders = initialData.allGenders || [];
      const filteredQueryGenders = currentGenderQuery.filter(g => validGenders.includes(g));
      if (!deepEquals(prevState.selectedGenders, filteredQueryGenders)) {
        newState.selectedGenders = filteredQueryGenders;
        hasChanged = true;
      }

      // Categories (assuming single category selection, using 'category' param)
      let initialCheckedCategoryIds = [];
      const urlCategoryName = searchParams.get("category")?.toLowerCase();
      if (urlCategoryName && initialData.category) {
        for (const cat of initialData.category) {
          for (const sub of cat.subCategory || []) {
            if (sub.subcategoryItem && sub.subcategoryItem.name.toLowerCase() === urlCategoryName) {
              initialCheckedCategoryIds.push(sub.subcategoryItem.id);
              break; // Found it, assuming single selection
            }
          }
          if (initialCheckedCategoryIds.length > 0) break;
        }
      }
      if (!deepEquals(prevState.checkedCategoryIds, initialCheckedCategoryIds)) {
        newState.checkedCategoryIds = initialCheckedCategoryIds;
        hasChanged = true;
      }

      // Price Range from URL
      const urlMinPrice = parseFloat(searchParams.get("price_min"));
      const urlMaxPrice = parseFloat(searchParams.get("price_max"));
      const defaultMin = initialData.priceLimits?.[0] || 0;
      const defaultMax = initialData.priceLimits?.[1] || 1000;
      const newPriceRange = [
        isNaN(urlMinPrice) ? defaultMin : Math.max(urlMinPrice, defaultMin),
        isNaN(urlMaxPrice) ? defaultMax : Math.min(urlMaxPrice, defaultMax),
      ];
      if (!deepEquals(prevState.priceRange, newPriceRange)) {
        newState.priceRange = newPriceRange;
        hasChanged = true;
      }

      // Brands
      const urlBrandIds = searchParams.getAll("brand");
      const newSelectedBrands = urlBrandIds.map(id => initialData.allBrands.find(b => b.id === id)).filter(Boolean);
      if (!deepEquals(prevState.selectedBrands, newSelectedBrands)) {
        newState.selectedBrands = newSelectedBrands;
        hasChanged = true;
      }

      // Availabilities
      const urlAvailabilities = searchParams.getAll("availability");
      const newSelectedAvailabilities = urlAvailabilities.filter(avail => initialData.allAvailabilities.includes(avail));
      if (!deepEquals(prevState.selectedAvailabilities, newSelectedAvailabilities)) {
        newState.selectedAvailabilities = newSelectedAvailabilities;
        hasChanged = true;
      }

      // Colors
      const urlColorCodes = searchParams.getAll("colors");
      const newSelectedColors = urlColorCodes.map(code => initialData.allColors.find(c => c.code === code)).filter(Boolean);
      if (!deepEquals(prevState.selectedColors, newSelectedColors)) {
        newState.selectedColors = newSelectedColors;
        hasChanged = true;
      }

      return hasChanged ? newState : prevState;
    });
  }, [initialData, searchParams]); // Dependencies: initialData and the memoized searchParams

  /**
   * Generic handler for filter changes (checkboxes, radio buttons) that updates the URL.
   * This function should NOT directly modify filterState for URL-driven filters.
   * Instead, it constructs the new URL and pushes it. The useEffect above will then
   * react to the URL change and update the filterState.
   * @param {string} filterType - The type of filter being changed (e.g., 'gender', 'category').
   * @param {*} value - The value of the filter item (e.g., 'men', {code: '#fff'}).
   * @param {boolean} isChecked - True if the item is being selected, false if deselected.
   */
  const handleFilterChange = useCallback((filterType, value, isChecked) => {
    // Start with a copy of the current URL parameters
    const newUrlParams = new URLSearchParams(window.location.search);

    switch (filterType) {
      case 'gender': {
        const currentGenders = newUrlParams.getAll('gender');
        let updatedGenders = isChecked
          ? [...new Set([...currentGenders, value])]
          : currentGenders.filter(g => g !== value);
        
        newUrlParams.delete('gender');
        updatedGenders.forEach(g => newUrlParams.append('gender', g));
        break;
      }
      case 'category': {
        // Assuming single selection for category based on previous code.
        // Value here is the ID, but we want to store the name in the URL.
        newUrlParams.delete('category'); // Ensure only one category is active
        if (isChecked) {
          // Find the category name by ID from initialData
          let categoryName = '';
          if (initialData.category) {
            for (const cat of initialData.category) {
              for (const sub of cat.subCategory || []) {
                if (sub.subcategoryItem && sub.subcategoryItem.id === value) {
                  categoryName = sub.subcategoryItem.name.toLowerCase();
                  break;
                }
              }
              if (categoryName) break;
            }
          }
          if (categoryName) {
            newUrlParams.set('category', categoryName);
          }
        }
        // Also clean up old subcategory specific params
        newUrlParams.delete('subcategoryItem');
        newUrlParams.delete('subcategoryItemChild');
        newUrlParams.delete('subcategory');
        break;
      }
      case 'availability': {
        const currentAvailabilities = newUrlParams.getAll('availability');
        let updatedAvailabilities = isChecked
          ? [...new Set([...currentAvailabilities, value])]
          : currentAvailabilities.filter(a => a !== value);

        newUrlParams.delete('availability');
        updatedAvailabilities.forEach(a => newUrlParams.append('availability', a));
        break;
      }
      case 'colors': {
        const currentColors = newUrlParams.getAll('colors');
        const colorCode = value.code; // Assuming value is { code, name }
        let updatedColors = isChecked
          ? [...new Set([...currentColors, colorCode])]
          : currentColors.filter(c => c !== colorCode);

        newUrlParams.delete('colors');
        updatedColors.forEach(c => newUrlParams.append('colors', c));
        break;
      }
      case 'brand': {
        const currentBrands = newUrlParams.getAll('brand');
        const brandId = value.id; // Assuming value is { id, entityName }
        let updatedBrands = isChecked
          ? [...new Set([...currentBrands, brandId])]
          : currentBrands.filter(b => b !== brandId);
        
        newUrlParams.delete('brand');
        updatedBrands.forEach(b => newUrlParams.append('brand', b));
        break;
      }
      default:
        // For any filter types not explicitly handled above, do nothing or log an error.
        console.warn(`handleFilterChange: Unhandled filterType: ${filterType}`);
        return; // Do not push URL if nothing was changed
    }

    // Push the new URL to trigger re-sync and filtering
    router.push(`${pathname}?${newUrlParams.toString()}`);
  }, [router, pathname, initialData]); // Added initialData as dependency for category name lookup

  // Handler for price range slider/inputs, updates URL directly
  const handlePriceRangeChange = useCallback((value) => {
    const newUrlParams = new URLSearchParams(window.location.search);
    newUrlParams.set('price_min', value[0].toString());
    newUrlParams.set('price_max', value[1].toString());
    router.push(`${pathname}?${newUrlParams.toString()}`);
  }, [router, pathname]);

  /**
   * Resets all filters by clearing relevant URL parameters.
   */
  const handleResetAllFilters = useCallback(() => {
    const newUrlParams = new URLSearchParams(window.location.search);
    // Remove all filter parameters that this hook manages
    ['gender', 'category', 'price_min', 'price_max', 'brand', 'availability', 'colors', 'subcategoryItem', 'subcategoryItemChild', 'subcategory'].forEach(key => {
      newUrlParams.delete(key);
    });
    // Push the URL without filter parameters
    router.push(`${pathname}?${newUrlParams.toString()}`);
  }, [router, pathname]);

  // Return the filter state and the functions to interact with it.
  return { filterState, setFilterState, handleFilterChange, handlePriceRangeChange, handleResetAllFilters };
}