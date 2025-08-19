// src/hooks/useProductFilters.js

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
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

    return true;
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
 * handleResetAllFilters: function,
 * }} Filter state and handlers.
 */
export function useProductFilters(initialData, urlSearchParamsObj) {
  const router = useRouter();
  // Removed isInitialLoadRef as effects will now rely on deepEquals to prevent unnecessary updates.
  // const isInitialLoadRef = useRef(true);

  // Memoize URLSearchParams object to ensure its reference is stable.
  const memoizedSearchParams = useMemo(() => {
    const params = new URLSearchParams();
    if (urlSearchParamsObj) {
      Object.keys(urlSearchParamsObj).forEach(key => {
        const value = urlSearchParamsObj[key];
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v));
        } else if (value !== null && value !== undefined) {
          params.append(key, value);
        }
      });
    }
    return params;
  }, [urlSearchParamsObj]);

  const searchParams = memoizedSearchParams;

  // Initialize filterState with default values and initialData's limits.
  const [filterState, setFilterState] = useState(() => ({
    selectedGenders: [],
    selectedBrands: [],
    priceRange: initialData.priceLimits,
    checkedCategoryIds: [],
    selectedAvailabilities: [],
    selectedColors: [],
    // These initialData properties will be explicitly updated in Effect 1 if they change
    allProducts: initialData.allProducts,
    allBrands: initialData.allBrands,
    category: initialData.category,
    allGenders: initialData.allGenders,
    allAvailabilities: initialData.allAvailabilities,
    allColors: initialData.allColors,
    priceLimits: initialData.priceLimits,
  }));

  // Effect 1: Synchronize core product data (allProducts, etc.) with filterState using deep equality.
  // This is crucial to prevent re-renders when initialData reference changes but content is the same.
  useEffect(() => {
    console.log('Effect 1: Running (Data Sync)');
    console.log('  InitialData received:', initialData);

    setFilterState(prevState => {
      let newState = { ...prevState };
      let hasChanged = false;

      // Deep comparison for each relevant data property
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
      if (!deepEquals(prevState.priceLimits, initialData.priceLimits)) {
        newState.priceLimits = initialData.priceLimits;
        hasChanged = true;
      }

      console.log('  Effect 1: Data content changed (setFilterState called):', hasChanged);
      return hasChanged ? newState : prevState;
    });
  }, [initialData]); // Dependency is initialData, but internal checks prevent loop

  // Effect 2: Initialize filter selections from URL parameters and re-evaluate on changes.
  useEffect(() => {
    console.log('Effect 2: Running (URL Filter Apply)');
    console.log('  InitialData for category processing (Effect 2):', initialData);
    console.log('  SearchParams for category processing (Effect 2):', searchParams.toString());

    // Only proceed if we have valid product data and category structure
    if (initialData.allProducts && initialData.allProducts.length > 0 && initialData.category) {
      setFilterState(prevState => {
        let newState = { ...prevState };
        let hasSelectionsChanged = false;

        const currentGenderQuery = searchParams.getAll("gender").map(g => g.toLowerCase());
        const validGenders = initialData.allGenders || [];
        const filteredQueryGenders = currentGenderQuery.filter(g => validGenders.includes(g));

        if (!deepEquals(prevState.selectedGenders, filteredQueryGenders)) {
            newState.selectedGenders = filteredQueryGenders;
            hasSelectionsChanged = true;
        }

        const productSubcategoryIds = [...new Set(
          (initialData.allProducts || [])
            .filter(product => product.subcategoryItem?.id)
            .map(product => product.subcategoryItem.id)
        )];

        // --- CATEGORY PARSING FIX ---
        // Collect all relevant category names from various URL parameters
        const urlCategoryNames = new Set();
        searchParams.getAll("subcategoryItemChild").forEach(name => urlCategoryNames.add(name.toLowerCase()));
        searchParams.getAll("subcategoryItem").forEach(name => urlCategoryNames.add(name.toLowerCase()));
        searchParams.getAll("subcategory").forEach(name => urlCategoryNames.add(name.toLowerCase()));
        searchParams.getAll("category").forEach(name => urlCategoryNames.add(name.toLowerCase()));

        console.log('  Effect 2: URL-derived category names:', Array.from(urlCategoryNames));

        let initialCheckedCategoryIds = [];
        if (urlCategoryNames.size > 0 && initialData.category) {
          // If category names are present in the URL, derive IDs from them
          (initialData.category || []).forEach(cat => {
            cat.subCategory?.forEach(sub => {
              if (sub.subcategoryItem && urlCategoryNames.has(sub.subcategoryItem.name.toLowerCase())) {
                initialCheckedCategoryIds.push(sub.subcategoryItem.id);
              }
            });
          });
        } else {
          // If no specific category names in URL, use the subcategory IDs from the fetched products
          // This ensures that default categories for the fetched products are selected.
          initialCheckedCategoryIds = productSubcategoryIds;
        }
        // --- END CATEGORY PARSING FIX ---

        console.log('  Effect 2: Derived initialCheckedCategoryIds:', initialCheckedCategoryIds);
        console.log('  Effect 2: Previous checkedCategoryIds:', prevState.checkedCategoryIds);

        if (!deepEquals(prevState.checkedCategoryIds, initialCheckedCategoryIds)) {
            newState.checkedCategoryIds = initialCheckedCategoryIds;
            hasSelectionsChanged = true;
        }

        // Ensure price range is reset to initial limits only if different
        if (!deepEquals(prevState.priceRange, initialData.priceLimits)) {
            newState.priceRange = initialData.priceLimits;
            hasSelectionsChanged = true;
        }

        console.log('  Effect 2: Selections content changed (setFilterState called):', hasSelectionsChanged);
        return hasSelectionsChanged ? newState : prevState;
      });
    } else {
      console.log('  Effect 2: Skipping, initialData.allProducts or initialData.category not ready.');
    }
  }, [initialData, searchParams]); // Dependencies: initialData and searchParams

  /**
   * Constructs the target URL query string based on the current filterState.
   * @returns {string} The canonical URL query string.
   */
  const constructTargetUrlQueryString = useCallback(() => {
    const params = new URLSearchParams();

    filterState.selectedGenders.forEach(g => params.append("gender", g));

    if (filterState.checkedCategoryIds.length > 0) {
      const categoryNameMap = new Map();
      if (Array.isArray(filterState.category)) {
        filterState.category.forEach(cat => {
          cat.subCategory?.forEach(sub => {
            if (sub.subcategoryItem) {
              categoryNameMap.set(sub.subcategoryItem.id, sub.subcategoryItem.name.toLowerCase());
            }
          });
        });
      }
      filterState.checkedCategoryIds.forEach(id => {
        const name = categoryNameMap.get(id);
        if (name) params.append("category", name); // Continue to use 'category' in URL for consistency
      });
    }

    filterState.selectedBrands.forEach(b => params.append("brand", b.id));
    filterState.selectedAvailabilities.forEach(a => params.append("availability", a));
    filterState.selectedColors.forEach(c => params.append("color", c.code.toLowerCase()));

    const currentUrlParams = new URLSearchParams(searchParams.toString());
    Array.from(currentUrlParams.keys()).forEach(key => {
      // Preserve other params, but explicitly remove the specific subcategory params
      // if they are not being actively managed by 'category' filter now.
      if (!['gender', 'category', 'brand', 'availability', 'color', 'price_min', 'price_max', 'subcategoryItem', 'subcategoryItemChild', 'subcategory'].includes(key)) {
        currentUrlParams.getAll(key).forEach(val => params.append(key, val));
      }
    });

    return params.toString();
  }, [
    filterState.selectedGenders,
    filterState.checkedCategoryIds,
    filterState.category,
    filterState.selectedBrands,
    filterState.selectedAvailabilities,
    filterState.selectedColors,
    searchParams
  ]);

  // Effect 3: URL synchronization.
  useEffect(() => {
    console.log('Effect 3: Running (URL Sync)');
    const currentUrlQueryString = searchParams.toString();
    const desiredUrlQueryString = constructTargetUrlQueryString();

    console.log('  Effect 3: Current URL Query String:', currentUrlQueryString);
    console.log('  Effect 3: Desired URL Query String:', desiredUrlQueryString);

    if (desiredUrlQueryString !== currentUrlQueryString) {
      console.log('  Effect 3: Replacing URL to:', `${window.location.pathname}?${desiredUrlQueryString}`);
      router.replace(`${window.location.pathname}?${desiredUrlQueryString}`, undefined, { shallow: true });
    } else {
      console.log('  Effect 3: URL is already in desired state. No replacement needed.');
    }
  }, [constructTargetUrlQueryString, searchParams, router]);

  /**
   * Generic handler for filter changes (checkboxes, radio buttons).
   * It updates the relevant state array based on the filter type and selection.
   * @param {string} filterType - The type of filter being changed (e.g., 'gender', 'category').
   * @param {*} value - The value of the filter item (e.g., 'men', '123').
   * @param {boolean} isChecked - True if the item is being selected, false if deselected.
   */
  const handleFilterChange = useCallback((filterType, value, isChecked) => {
    setFilterState(prevState => {
      let updatedArray;
      let stateKey;
      let currentArray;

      switch (filterType) {
        case 'gender':
          stateKey = 'selectedGenders';
          currentArray = prevState.selectedGenders;
          updatedArray = isChecked
            ? (currentArray.includes(value) ? currentArray : [...currentArray, value])
            : currentArray.filter(g => g !== value);
          break;
        case 'category':
          stateKey = 'checkedCategoryIds';
          currentArray = prevState.checkedCategoryIds;
          updatedArray = isChecked
            ? (currentArray.includes(value) ? currentArray : [...currentArray, value])
            : currentArray.filter(id => id !== value);
          break;
        case 'availability':
          stateKey = 'selectedAvailabilities';
          currentArray = prevState.selectedAvailabilities;
          updatedArray = isChecked
            ? (currentArray.includes(value) ? currentArray : [...currentArray, value])
            : currentArray.filter(a => a !== value);
          break;
        case 'colors':
          stateKey = 'selectedColors';
          currentArray = prevState.selectedColors;
          const colorCode = value.code?.toLowerCase();
          updatedArray = isChecked
            ? (currentArray.some(c => c.code?.toLowerCase() === colorCode) ? currentArray : [...currentArray, value])
            : currentArray.filter(c => c.code?.toLowerCase() !== colorCode);
          break;
        case 'brand':
          stateKey = 'selectedBrands';
          currentArray = prevState.selectedBrands;
          const brandId = value.id;
          updatedArray = isChecked
            ? (currentArray.some(b => b.id === brandId) ? currentArray : [...currentArray, value])
            : currentArray.filter(b => b.id !== brandId);
          break;
        default:
          return prevState;
      }
      return arraysEqual(updatedArray, currentArray) ? prevState : { ...prevState, [stateKey]: updatedArray };
    });
  }, []);

  /**
   * Resets all filters to their default (empty or initial) states.
   * Also ensures the URL is updated to reflect the cleared filters.
   */
  const handleResetAllFilters = useCallback(() => {
    setFilterState(prevState => ({
      ...prevState,
      selectedBrands: [],
      selectedGenders: [],
      priceRange: initialData.priceLimits,
      checkedCategoryIds: [],
      selectedAvailabilities: [],
      selectedColors: [],
    }));
  }, [initialData.priceLimits]);

  // Return the filter state and the functions to interact with it.
  return { filterState, setFilterState, handleFilterChange, handleResetAllFilters };
}
