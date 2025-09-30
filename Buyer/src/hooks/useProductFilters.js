// src/hooks/useProductFilters.js

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

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

        // Ensure keys in A are also in B and values are deeply equal
        for (let key of keysA) {
            if (!keysB.includes(key) || !deepEquals(a[key], b[key])) return false;
        }

        return true; // All checks passed for objects
    }

    return false; // Not objects or not deeply equal
}

/**
 * Custom hook to manage product filtering logic and URL synchronization.
 * ...
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

    // FIX 1: Initialize checkedCategoryIds to an empty array.
    const [filterState, setFilterState] = useState(() => ({
        selectedGenders: [],
        selectedBrands: [],
        priceRange: initialData.priceLimits || [0, 1000],
        checkedCategoryIds: [], // <-- CORRECT: Start with no categories checked by default
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
    useEffect(() => {
        setFilterState(prevState => {
            let newState = { ...prevState };
            let hasChanged = false;

            // --- 1. Synchronize static initial data (if they change) ---
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


            // --- 2. Initialize filter selections from URL parameters ---
            
            // Genders
            const currentGenderQuery = searchParams.getAll("gender").map(g => g.toLowerCase());
            const validGenders = initialData.allGenders || [];
            const filteredQueryGenders = currentGenderQuery.filter(g => validGenders.includes(g));
            if (!deepEquals(prevState.selectedGenders, filteredQueryGenders)) {
                newState.selectedGenders = filteredQueryGenders;
                hasChanged = true;
            }

            // FIX 2: CATEGORY FILTER SYNC REMOVED
            // To prevent checkboxes from being checked by default based on the URL,
            // we skip reading any category parameters from the URL.
            // We ensure checkedCategoryIds remains [] (its initial state) unless a user interacts.
            
            /* const urlCategorySlugs = searchParams.getAll("subcategoryItem");
            let newCheckedIds = [];
            
            // ... (Removed the findIdsBySlugs logic) ...
            
            if (!deepEquals(prevState.checkedCategoryIds, newCheckedIds)) {
                // If the user wants client-side only, we should ensure this is always []
                // on initial load, unless other non-URL sync logic is applied.
                newState.checkedCategoryIds = []; 
                hasChanged = true;
            }
            */
            // Since `checkedCategoryIds` is initialized to `[]`, we do nothing here
            // to maintain the state as `[]`.

            
            // Price Range from URL logic...
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

            // Brands logic...
            const urlBrandIds = searchParams.getAll("brand");
            // NOTE: Assuming allBrands contains objects with 'id'
            const newSelectedBrands = urlBrandIds.map(id => initialData.allBrands?.find(b => b.id === id)).filter(Boolean);
            if (!deepEquals(prevState.selectedBrands, newSelectedBrands)) {
                newState.selectedBrands = newSelectedBrands;
                hasChanged = true;
            }

            // Availabilities logic...
            const urlAvailabilities = searchParams.getAll("availability");
            const newSelectedAvailabilities = urlAvailabilities.filter(avail => initialData.allAvailabilities?.includes(avail));
            if (!deepEquals(prevState.selectedAvailabilities, newSelectedAvailabilities)) {
                newState.selectedAvailabilities = newSelectedAvailabilities;
                hasChanged = true;
            }

            // Colors logic...
            const urlColorCodes = searchParams.getAll("colors");
            // NOTE: Assuming allColors contains objects with 'code'
            const newSelectedColors = urlColorCodes.map(code => initialData.allColors?.find(c => c.code === code)).filter(Boolean);
            if (!deepEquals(prevState.selectedColors, newSelectedColors)) {
                newState.selectedColors = newSelectedColors;
                hasChanged = true;
            }

            return hasChanged ? newState : prevState;
        });
    }, [initialData, searchParams]); // Dependencies: initialData and the memoized searchParams

    /**
     * Generic handler for filter changes (checkboxes, radio buttons) that updates the URL.
     * NOTE: This function IS used to update the URL for all filters EXCEPT category,
     * which you now manage via setFilterState in ProductSearchPageView.js
     */
    const handleFilterChange = useCallback((filterType, value, isChecked) => {
        // NOTE: Use window.location.search to get the most up-to-date parameters.
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
                // IMPORTANT: This case should now be unused if you update the category 
                // state directly via setFilterState in the parent component.
                console.warn("Category filter should be handled by updating setFilterState in the parent component, not pushing to URL here.");
                return; 
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
                const colorCode = typeof value === 'object' && value !== null ? value.code : value; 
                
                let updatedColors = isChecked
                    ? [...new Set([...currentColors, colorCode])]
                    : currentColors.filter(c => c !== colorCode);

                newUrlParams.delete('colors');
                updatedColors.forEach(c => newUrlParams.append('colors', c));
                break;
            }

            case 'brand': {
                const currentBrands = newUrlParams.getAll('brand');
                const brandId = typeof value === 'object' && value !== null ? value.id : value;
                
                let updatedBrands = isChecked
                    ? [...new Set([...currentBrands, brandId])]
                    : currentBrands.filter(b => b !== brandId);
                
                newUrlParams.delete('brand');
                updatedBrands.forEach(b => newUrlParams.append('brand', brandId)); // Fix: use brandId instead of b in the append
                break;
            }
            
            default:
                console.warn(`handleFilterChange: Unhandled filterType: ${filterType}`);
                return;
        }

        // Push the new URL to trigger re-sync and filtering
        router.push(`${pathname}?${newUrlParams.toString()}`);
    }, [router, pathname]);

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
        ['gender', 'price_min', 'price_max', 'brand', 'availability', 'colors', 'subcategoryItem', 'category', 'subcategory'].forEach(key => {
            newUrlParams.delete(key);
        });
        // Push the URL without filter parameters
        router.push(`${pathname}?${newUrlParams.toString()}`);
    }, [router, pathname]);

    // Return the filter state and the functions to interact with it.
    return { filterState, setFilterState, handleFilterChange, handlePriceRangeChange, handleResetAllFilters };
}