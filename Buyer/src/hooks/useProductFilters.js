// src/hooks/useProductFilters.js
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { arraysEqual } from "@/utils/arraysEqual"; // Import the helper function

/**
 * Custom hook to manage product filtering logic and URL synchronization.
 * @param {object} initialData - Initial product data (allProducts, allBrands, etc.) from useProductData.
 * @param {object} urlSearchParamsObj - Current URL search parameters as a plain object.
 * @returns {{
 * filterState: object,
 * setFilterState: function,
 * handleFilterChange: function,
 * handleResetAllFilters: function,
 * }} Filter state and handlers.
 */
export function useProductFilters(initialData, urlSearchParamsObj) {
  const router = useRouter();
  const isInitialLoadRef = useRef(true);

  // Create a URLSearchParams object from the prop for easier API usage
  const searchParams = new URLSearchParams();
  if (urlSearchParamsObj) {
    Object.keys(urlSearchParamsObj).forEach(key => {
      const value = urlSearchParamsObj[key];
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, v));
      } else {
        searchParams.append(key, value);
      }
    });
  }

  // Initialize filterState with default values and initialData's limits
  const [filterState, setFilterState] = useState(() => ({
    selectedGenders: [],
    selectedBrands: [],
    priceRange: initialData.priceLimits, // Use initialData's priceLimits as default
    checkedCategoryIds: [],
    selectedAvailabilities: [],
    selectedColors: [],
    ...initialData, // Include all initial data for filter options
  }));

  // Effect to initialize filters from URL on initial load and when initialData becomes available
  useEffect(() => {
    // Only run if it's the initial load AND we have actual product data (not just empty arrays)
    if (isInitialLoadRef.current && initialData.allProducts.length > 0) {
      setFilterState(prevState => {
        const currentGenderQuery = searchParams.getAll("gender").map(g => g.toLowerCase());
        const validGenders = initialData.allGenders;
        const filteredQueryGenders = currentGenderQuery.filter(g => validGenders.includes(g));

        // Extract unique subcategory item IDs from the fetched products
        const productSubcategoryIds = [...new Set(
          initialData.allProducts
            .filter(product => product.subcategoryItem?.id) // Ensure subcategoryItem exists
            .map(product => product.subcategoryItem.id)
        )];

        const currentCategoryQuery = searchParams.getAll("category").map(c => c.toLowerCase());
        let initialCheckedCategoryIds = []; // Use 'let' as it will be reassigned
        const initialCheckedCategoryNames = new Set(currentCategoryQuery);

        if (currentCategoryQuery.length > 0 && initialData.category) {
          // If category names are present in the URL, derive IDs from them
          initialData.category.forEach(cat => {
            cat.subCategory?.forEach(sub => {
              if (sub.subcategoryItem && initialCheckedCategoryNames.has(sub.subcategoryItem.name.toLowerCase())) {
                initialCheckedCategoryIds.push(sub.subcategoryItem.id);
              }
            });
          });
        } else {
          // If no category names in URL, use the subcategory IDs from the fetched products
          initialCheckedCategoryIds = productSubcategoryIds;
        }

        return {
          ...prevState,
          selectedGenders: filteredQueryGenders,
          checkedCategoryIds: initialCheckedCategoryIds, // THIS IS THE KEY CHANGE
          priceRange: initialData.priceLimits, // Ensure price range is reset to initial limits
          // Also ensure allData properties from initialData are correctly set
          allProducts: initialData.allProducts,
          allBrands: initialData.allBrands,
          category: initialData.category,
          allGenders: initialData.allGenders,
          allAvailabilities: initialData.allAvailabilities,
          allColors: initialData.allColors,
          priceLimits: initialData.priceLimits,
        };
      });
      isInitialLoadRef.current = false; // Mark initial load as complete
    }
  }, [initialData, searchParams]); // Dependencies: initialData (for data availability) and searchParams (for URL values)

  /**
   * Constructs the target URL query string based on the current filterState.
   * This ensures all filter parameters are considered.
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
        if (name) params.append("category", name);
      });
    } else {
      // Preserve categories from URL if none are checked in filter state
      searchParams.getAll("category").forEach(cat => params.append("category", cat));
    }

    filterState.selectedBrands.forEach(b => params.append("brand", b.id));
    filterState.selectedAvailabilities.forEach(a => params.append("availability", a));
    filterState.selectedColors.forEach(c => params.append("color", c.code.toLowerCase()));

    // Preserve any existing parameters from the current URL that are not managed by these filters
    const currentUrlParams = new URLSearchParams(searchParams.toString());
    Array.from(currentUrlParams.keys()).forEach(key => {
      if (!['gender', 'category', 'brand', 'availability', 'color', 'price_min', 'price_max'].includes(key)) {
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

  // URL synchronization effect
  useEffect(() => {
    // Only sync URL if initial data load is complete AND filterState has been initialized from URL
    if (!isInitialLoadRef.current) {
      const currentUrlQueryString = searchParams.toString();
      const desiredUrlQueryString = constructTargetUrlQueryString();

      if (desiredUrlQueryString !== currentUrlQueryString) {
        router.replace(`${window.location.pathname}?${desiredUrlQueryString}`, undefined, { shallow: true });
      }
    }
  }, [constructTargetUrlQueryString, searchParams, router]);

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
        default:
          return prevState;
      }
      return arraysEqual(updatedArray, currentArray) ? prevState : { ...prevState, [stateKey]: updatedArray };
    });
  }, []);

  const handleResetAllFilters = useCallback(() => {
    setFilterState(prevState => ({
      ...prevState,
      selectedBrands: [],
      selectedGenders: [],
      priceRange: initialData.priceLimits, // Reset to initial limits
      checkedCategoryIds: [],
      selectedAvailabilities: [],
      selectedColors: [],
    }));
  }, [initialData.priceLimits]);

  return { filterState, setFilterState, handleFilterChange, handleResetAllFilters };
}
