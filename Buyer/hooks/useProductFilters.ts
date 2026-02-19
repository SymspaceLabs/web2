// src/hooks/useProductFilters.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { Product } from '@/types/products';

type MinimalProduct = Record<string, any>;

interface Brand {
  id: string | number;
  entityName: string;
}

interface Color {
  code: string;
  name: string;
}

interface Category {
  id: string | number;
  name: string;
  slug: string;
  child?: Category[];
}

interface InitialData {
  allProducts: any[];
  allBrands: Brand[];
  priceLimits: [number, number];
  category: Category[];
  allGenders: string[];
  allAvailabilities: string[];
  allColors: Color[];
}

export interface FilterState {
  selectedGenders: string[];
  selectedBrands: Brand[];
  priceRange: [number, number];
  checkedCategoryIds: string[];
  selectedAvailabilities: string[];
  selectedColors: Color[];
  allProducts: MinimalProduct[];
  allBrands: Brand[];
  category: Category[];
  allGenders: string[];
  allAvailabilities: string[];
  allColors: Color[];
  priceLimits: [number, number];
}

/**
 * Helper function for deep equality comparison of objects and arrays
 */
function deepEquals(a: any, b: any): boolean {
  if (a === b) return true;

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (Array.isArray(a)) {
      if (!Array.isArray(b) || a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!deepEquals(a[i], b[i])) return false;
      }
      return true;
    }

    if (Array.isArray(b)) return false;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
      if (!keysB.includes(key) || !deepEquals(a[key], b[key])) return false;
    }

    return true;
  }

  return false;
}

/**
 * Custom hook to manage product filtering logic and URL synchronization
 * Manages filters client-side for instant feedback while keeping URL shareable
 */
export function useProductFilters(
  initialData: InitialData,
  urlSearchParamsObj: ReadonlyURLSearchParams
) {
  const router = useRouter();
  const pathname = usePathname();

  // Memoize search params to prevent unnecessary re-renders
  const searchParams = useMemo(() => {
    const params = new URLSearchParams();
    if (urlSearchParamsObj) {
      for (const [key, value] of urlSearchParamsObj.entries()) {
        params.append(key, value);
      }
    }
    return params;
  }, [urlSearchParamsObj]);

  // Initialize state using initialData
  const [filterState, setFilterState] = useState<FilterState>(() => ({
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

  // Effect to synchronize all filter state with incoming data and URL parameters
  useEffect(() => {
    setFilterState((prevState) => {
      let newState = { ...prevState };
      let hasChanged = false;

      // --- 1. Synchronize static initial data (if they change) ---

      // Special handling for priceLimits
      const limitsChanged = !deepEquals(prevState.priceLimits, initialData.priceLimits);
      if (limitsChanged) {
        newState.priceLimits = initialData.priceLimits;
        newState.priceRange = initialData.priceLimits;
        hasChanged = true;
      }

      // Sync other lists/objects
      if (prevState.allProducts !== initialData.allProducts) {
        newState.allProducts = initialData.allProducts;
        hasChanged = true;
      }
      if (prevState.allBrands !== initialData.allBrands) {
        newState.allBrands = initialData.allBrands;
        newState.selectedBrands = []; // Reset local filter
        hasChanged = true;
      }
      if (prevState.category !== initialData.category) {
        newState.category = initialData.category;
        hasChanged = true;
      }
      if (prevState.allGenders !== initialData.allGenders) {
        newState.allGenders = initialData.allGenders;
        newState.selectedGenders = []; // Reset local filter
        hasChanged = true;
      }
      if (prevState.allAvailabilities !== initialData.allAvailabilities) {
        newState.allAvailabilities = initialData.allAvailabilities;
        hasChanged = true;
      }
      if (prevState.allColors !== initialData.allColors) {
        newState.allColors = initialData.allColors;
        newState.selectedColors = []; // Reset local filter
        hasChanged = true;
      }

      // --- 2. Initialize filter selections from URL parameters / Apply limits ---

      // Price Range from URL logic
      const defaultMin = initialData.priceLimits?.[0] || 0;
      const defaultMax = initialData.priceLimits?.[1] || 1000;
      const urlMinPrice = parseFloat(searchParams.get('price_min') || '');
      const urlMaxPrice = parseFloat(searchParams.get('price_max') || '');

      const newPriceRangeFromURL: [number, number] = [
        isNaN(urlMinPrice) ? defaultMin : Math.max(urlMinPrice, defaultMin),
        isNaN(urlMaxPrice) ? defaultMax : Math.min(urlMaxPrice, defaultMax),
      ];

      const isLocalPriceDefault = deepEquals(prevState.priceRange, prevState.priceLimits);

      if (limitsChanged) {
        if (!deepEquals(prevState.priceRange, newPriceRangeFromURL)) {
          newState.priceRange = newPriceRangeFromURL;
          hasChanged = true;
        }
      } else if (isLocalPriceDefault && !deepEquals(prevState.priceRange, newPriceRangeFromURL)) {
        newState.priceRange = newPriceRangeFromURL;
        hasChanged = true;
      }

      return hasChanged ? newState : prevState;
    });
  }, [initialData, searchParams]);

  // --- Client-side Brand Filter Handler ---
  const handleBrandChange = useCallback((brand: Brand, isChecked: boolean) => {
    setFilterState((prevState) => {
      const brandId = brand?.id;
      if (!brandId) return prevState;

      let newSelectedBrands: Brand[];

      if (isChecked) {
        if (!prevState.selectedBrands.some((b) => b.id === brandId)) {
          newSelectedBrands = [...prevState.selectedBrands, brand];
        } else {
          return prevState;
        }
      } else {
        newSelectedBrands = prevState.selectedBrands.filter((b) => b.id !== brandId);
      }

      return {
        ...prevState,
        selectedBrands: newSelectedBrands,
      };
    });
  }, []);

  // --- Client-side Color Filter Handler ---
  const handleColorChange = useCallback((color: Color, isChecked: boolean) => {
    setFilterState((prevState) => {
      const colorCode = color?.code;
      if (!colorCode) return prevState;

      let newSelectedColors: Color[];

      if (isChecked) {
        // Add the color object if its code is not already selected
        if (!prevState.selectedColors.some((c) => c.code === colorCode)) {
          newSelectedColors = [...prevState.selectedColors, color];
        } else {
          return prevState;
        }
      } else {
        // Remove the color object by code
        newSelectedColors = prevState.selectedColors.filter((c) => c.code !== colorCode);
      }

      return {
        ...prevState,
        selectedColors: newSelectedColors,
      };
    });
  }, []);

  // --- Client-side Availability Filter Handler ---
  const handleAvailabilityChange = useCallback((avail: string, isChecked: boolean) => {
    setFilterState((prevState) => {
      let newSelectedAvailabilities: string[];

      if (isChecked) {
        if (!prevState.selectedAvailabilities.includes(avail)) {
          newSelectedAvailabilities = [...prevState.selectedAvailabilities, avail];
        } else {
          return prevState;
        }
      } else {
        newSelectedAvailabilities = prevState.selectedAvailabilities.filter((a) => a !== avail);
      }

      return {
        ...prevState,
        selectedAvailabilities: newSelectedAvailabilities,
      };
    });
  }, []);

  /**
   * Generic handler for filter changes that updates the URL
   * Most filters are now client-side only, so this is rarely used
   */
  const handleFilterChange = useCallback(
    (filterType: string, value: string, isChecked: boolean) => {
      // Most filters are now client-side only
      // This handler is kept for potential future URL-synced filters
      return;
    },
    []
  );

  // Price range handler for local state
  const handlePriceRangeChange = useCallback((value: [number, number]) => {
    setFilterState((prevState) => ({
      ...prevState,
      priceRange: value,
    }));
  }, []);

  /**
   * Resets all filters by clearing relevant URL parameters and local state
   */
  const handleResetAllFilters = useCallback(() => {
    const newUrlParams = new URLSearchParams(window.location.search);

    // Delete all URL-synced params
    ['price_min', 'price_max', 'availability', 'subcategoryItem', 'category', 'subcategory'].forEach(
      (key) => {
        newUrlParams.delete(key);
      }
    );

    // Reset local state filters immediately
    setFilterState((prevState) => ({
      ...prevState,
      selectedGenders: [],
      selectedBrands: [],
      selectedColors: [],
      selectedAvailabilities: [],
      checkedCategoryIds: [],
      priceRange: prevState.priceLimits || [0, 1000],
    }));

    router.push(`${pathname}?${newUrlParams.toString()}`);
  }, [router, pathname]);

  return {
    filterState,
    setFilterState,
    handleFilterChange,
    handlePriceRangeChange,
    handleBrandChange,
    handleColorChange,
    handleAvailabilityChange,
    handleResetAllFilters,
  };
}