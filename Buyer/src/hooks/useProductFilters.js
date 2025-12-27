import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

/**
 * Helper function for deep equality comparison of objects and arrays.
 */
function deepEquals(a, b) {
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

// Add this helper function at the top of the file
function findCategoryIdBySlug(categoryTree, slug) {
  if (!categoryTree || !slug) return null;
  
  for (const topLevel of categoryTree) {
    // Check top level
    if (topLevel.slug === slug) return topLevel.id;
    
    // Check children
    if (topLevel.child) {
      for (const child of topLevel.child) {
        if (child.slug === slug) return child.id;
      }
    }
  }
  return null;
}

/**
 * Custom hook to manage product filtering logic and URL synchronization.
 * Price range, Gender, Brands, AND Colors are now managed purely client-side unless initial data changes.
 */
export function useProductFilters(initialData, urlSearchParamsObj) {
    const router = useRouter();
    const pathname = usePathname();

    const memoizedSearchParams = useMemo(() => {
        const params = new URLSearchParams();
        if (urlSearchParamsObj) {
            for (const [key, value] of urlSearchParamsObj.entries()) {
                params.append(key, value);
            }
        }
        return params;
    }, [urlSearchParamsObj]);

    const searchParams = memoizedSearchParams;

    // Initialize state using initialData (fetched from the server/URL on load)
    const [filterState, setFilterState] = useState(() => ({
        selectedGenders: [], 
        selectedBrands: [], // Now managed locally
        priceRange: initialData.priceLimits || [0, 1000], 
        checkedCategoryIds: [], 
        selectedAvailabilities: [], // Remains URL-synced
        selectedColors: [], // Now managed locally
        allProducts: initialData.allProducts,
        allBrands: initialData.allBrands,
        category: initialData.category,
        allGenders: initialData.allGenders,
        allAvailabilities: initialData.allAvailabilities,
        allColors: initialData.allColors,
        priceLimits: initialData.priceLimits || [0, 1000],
    }));

    // Effect to synchronize all filter state with incoming data and URL parameters.
    useEffect(() => {
        setFilterState(prevState => {
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
            const urlMinPrice = parseFloat(searchParams.get("price_min"));
            const urlMaxPrice = parseFloat(searchParams.get("price_max"));
            
            const newPriceRangeFromURL = [
            isNaN(urlMinPrice) ? defaultMin : Math.max(urlMinPrice, defaultMin),
            isNaN(urlMaxPrice) ? defaultMax : Math.min(urlMaxPrice, defaultMax),
            ];

            const isLocalPriceDefault = deepEquals(prevState.priceRange, prevState.priceLimits);
            
            if (limitsChanged) {
            if (!deepEquals(prevState.priceRange, newPriceRangeFromURL)) {
                newState.priceRange = newPriceRangeFromURL;
                    hasChanged = true;
            }
            } 
            else if (isLocalPriceDefault && !deepEquals(prevState.priceRange, newPriceRangeFromURL)) {
            newState.priceRange = newPriceRangeFromURL;
                hasChanged = true;
            }

            // ❌ REMOVE: Category filtering from URL slugs
            // The backend already handles this, so we don't need to filter again
            // Just keep checkedCategoryIds empty for the UI accordion
            
            return hasChanged ? newState : prevState;
        });
    }, [initialData, searchParams]);
    
    // --- NEW: Client-side Brand Filter Handler ---

    const handleBrandChange = useCallback((brand, isChecked) => {
        setFilterState(prevState => {
            const brandId = brand?.id;
            if (!brandId) return prevState;

            let newSelectedBrands;
            
            if (isChecked) {
                if (!prevState.selectedBrands.some(b => b.id === brandId)) {
                    newSelectedBrands = [...prevState.selectedBrands, brand];
                } else {
                    return prevState;
                }
            } else {
                newSelectedBrands = prevState.selectedBrands.filter(b => b.id !== brandId);
            }

            return {
                ...prevState,
                selectedBrands: newSelectedBrands,
            };
        });
    }, []);
    
    // --- NEW: Client-side Color Filter Handler ---
    const handleColorChange = useCallback((color, isChecked) => {
        setFilterState(prevState => {
            const colorCode = color?.code;
            if (!colorCode) return prevState;

            let newSelectedColors;
            
            if (isChecked) {
                // Correctly adds the color object if its code is not already selected
                if (!prevState.selectedColors.some(c => c.code === colorCode)) {
                    newSelectedColors = [...prevState.selectedColors, color];
                } else {
                    return prevState;
                }
            } else {
                // Correctly removes the color object by code
                newSelectedColors = prevState.selectedColors.filter(c => c.code !== colorCode);
            }

            return {
                ...prevState,
                selectedColors: newSelectedColors,
            };
        });
    }, []);

    // --- NEW: Client-side Availability Filter Handler ---
    const handleAvailabilityChange = useCallback((avail, isChecked) => {
      setFilterState(prevState => {
        let newSelectedAvailabilities;
        
        if (isChecked) {
          if (!prevState.selectedAvailabilities.includes(avail)) {
            newSelectedAvailabilities = [...prevState.selectedAvailabilities, avail];
          } else {
            return prevState;
          }
        } else {
          newSelectedAvailabilities = prevState.selectedAvailabilities.filter(a => a !== avail);
        }

        return {
          ...prevState,
          selectedAvailabilities: newSelectedAvailabilities,
        };
      });
    }, []);

    // --- End NEW Handlers ---


    /**
     * Generic handler for filter changes that updates the URL.
     * Brand, Gender, Category, and COLOR are now blocked.
     */
    const handleFilterChange = useCallback((filterType, value, isChecked) => {
        const newUrlParams = new URLSearchParams(window.location.search);

        switch (filterType) {
            case 'gender':
            case 'category':
            case 'brand':
            case 'colors':
            case 'availability':            
            default:
            return;
        }

        router.push(`${pathname}?${newUrlParams.toString()}`);
    }, [router, pathname]);

    // This handler is now for local state update
    const handlePriceRangeChange = useCallback((value) => {
        setFilterState(prevState => ({ 
            ...prevState, 
            priceRange: value 
        }));
    }, []);

    /**
     * Resets all filters by clearing relevant URL parameters and local state.
     */
    const handleResetAllFilters = useCallback(() => {
        const newUrlParams = new URLSearchParams(window.location.search);
        
        // Delete all URL-synced params
        ['price_min', 'price_max', 'availability', 'subcategoryItem', 'category', 'subcategory'].forEach(key => {
            newUrlParams.delete(key);
        });
        
        // Note: We leave 'gender', 'brand', 'colors' off the delete list because they aren't expected in the URL anymore.

        // Reset local state filters immediately
        setFilterState(prevState => ({
            ...prevState,
            selectedGenders: [],
            selectedBrands: [],
            selectedColors: [], // Reset colors locally
            priceRange: prevState.priceLimits || [0, 1000],
        }));

        router.push(`${pathname}?${newUrlParams.toString()}`);
    }, [router, pathname]);
    
    // Return the filter state, functions, AND the new filtered product list.
    return { 
        filterState, 
        setFilterState, 
        handleFilterChange, 
        handlePriceRangeChange,
        handleBrandChange,
        handleColorChange, // IMPORTANT: New handler for colors
        handleAvailabilityChange,
        handleResetAllFilters, 
    };
}