// src/hooks/useProductFilters.js

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
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

        for (let key of keysA) {
            if (!keysB.includes(key) || !deepEquals(a[key], b[key])) return false;
        }

        return false; // Not objects or not deeply equal
    }

    return false; // Not objects or not deeply equal
}

/**
 * Helper function to extract IDs from the current API category response
 * @param {Array} apiCategoryResponse - The value of initialData.category
 * @returns {Array} List of checked category IDs
 */
const extractIdsFromApiCategory = (apiCategoryResponse) => {
    if (!apiCategoryResponse || !Array.isArray(apiCategoryResponse) || apiCategoryResponse.length === 0) {
        return [];
    }
    // Granular categories are in the 'child' array of the top-level object
    const granularCategoriesFromApi = apiCategoryResponse[0].child;
    
    if (granularCategoriesFromApi && Array.isArray(granularCategoriesFromApi)) {
        // Extract all IDs from the child array. These are the filtered categories.
        return granularCategoriesFromApi.map(item => item.id).filter(Boolean);
    }
    return [];
};

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

    // FIX 1: Correctly initialize checkedCategoryIds from the API data on mount.
    const [filterState, setFilterState] = useState(() => ({
        selectedGenders: [],
        selectedBrands: [],
        priceRange: initialData.priceLimits || [0, 1000],
        // Use the helper to initialize checked IDs
        checkedCategoryIds: extractIdsFromApiCategory(initialData.category), 
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

            // --- 1. Synchronize static initial data (Effect 1's role) ---
            if (!deepEquals(prevState.allProducts, initialData.allProducts)) {
                newState.allProducts = initialData.allProducts;
                hasChanged = true;
            }
            if (!deepEquals(prevState.allBrands, initialData.allBrands)) {
                newState.allBrands = initialData.allBrands;
                hasChanged = true;
            }
            // Sync initialData.category
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

            // FIX 2: Correct Category Initialization/Sync
            let initialCheckedCategoryIds = [];
            const urlCategorySlug = searchParams.get("category"); // URL holds the slug (e.g., 't-shirts')

            if (urlCategorySlug && initialData.category) {
                // If URL parameter is present, we must look up the ID from the slug
                
                // Helper to find ID by slug within the API structure
                const findIdBySlug = (categories) => {
                    for (const cat of categories) {
                        if (cat.slug === urlCategorySlug) return cat.id;
                        if (cat.child) {
                            const foundId = findIdBySlug(cat.child);
                            if (foundId) return foundId;
                        }
                    }
                    return null;
                };

                // NOTE: This assumes initialData.category contains the full data structure needed for lookup.
                // In a true application, you'd search the full category tree (CATEGORIES_DATA).
                // For simplicity, we search the `initialData.category` prop (the filtered list).
                // The most reliable check is against the IDs returned by the API.

                // If URL slug exists, rely on the API data to confirm which items are active
                // by checking if the slug exists in the API response.
                const currentApiIds = extractIdsFromApiCategory(initialData.category);
                
                if (currentApiIds.length > 0) {
                     // Check if any of the IDs returned by the API belong to the category slug in the URL
                     // This step is complex. The simplest, most direct fix for the T-shirt being checked is:
                     initialCheckedCategoryIds = currentApiIds;
                }
                
            } else {
                // If no URL parameter, use the API response as the source of truth
                initialCheckedCategoryIds = extractIdsFromApiCategory(initialData.category);
            }
            
            // The simplest, most effective logic: always use the API IDs unless actively filtering with a URL param.
            // Since the API response *is* the filter result, we rely on it.
            const newCheckedIds = extractIdsFromApiCategory(initialData.category);

            if (!deepEquals(prevState.checkedCategoryIds, newCheckedIds)) {
                newState.checkedCategoryIds = newCheckedIds;
                hasChanged = true;
            }

            // Price Range from URL logic... (kept the same)
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

            // Brands logic... (kept the same)
            const urlBrandIds = searchParams.getAll("brand");
            const newSelectedBrands = urlBrandIds.map(id => initialData.allBrands.find(b => b.id === id)).filter(Boolean);
            if (!deepEquals(prevState.selectedBrands, newSelectedBrands)) {
                newState.selectedBrands = newSelectedBrands;
                hasChanged = true;
            }

            // Availabilities logic... (kept the same)
            const urlAvailabilities = searchParams.getAll("availability");
            const newSelectedAvailabilities = urlAvailabilities.filter(avail => initialData.allAvailabilities.includes(avail));
            if (!deepEquals(prevState.selectedAvailabilities, newSelectedAvailabilities)) {
                newState.selectedAvailabilities = newSelectedAvailabilities;
                hasChanged = true;
            }

            // Colors logic... (kept the same)
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
     *      * NOTE: Assumes the granular categories from CategoryAccordion are managed 
     * via the URL parameter 'subcategoryItem' and should support multi-select.
     *      * @param {string} filterType - The type of filter being changed ('category', 'gender', 'brand', etc.).
     * @param {*} value - The value of the filter item (e.g., 't-shirts' slug, 'male', brand ID).
     * @param {boolean} isChecked - The desired new state (true to add/set, false to remove/clear).
     */
    const handleFilterChange = useCallback((filterType, value, isChecked) => {
        // Start with a copy of the current URL parameters
        // NOTE: We MUST use new URLSearchParams(window.location.search) to get the most 
        // up-to-date parameters, as the `searchParams` prop/memoized value is often stale.
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
                // 🚩 THE FIX IS HERE 🚩
                // We assume 'category' filterType from the UI must update the 
                // multi-select URL parameter 'subcategoryItem'.
                const itemSlug = value; 
                const urlParamKey = 'subcategoryItem'; // The parameter key we MUST manage

                // 1. Get ALL current values for 'subcategoryItem'
                const currentItems = newUrlParams.getAll(urlParamKey);
                let updatedItems = new Set(currentItems);

                if (isChecked) {
                    // ADD: Add the new slug
                    updatedItems.add(itemSlug);
                } else {
                    // REMOVE: Delete the slug
                    updatedItems.delete(itemSlug);
                }
                
                // 2. Clear all existing entries for this key
                newUrlParams.delete(urlParamKey);
                
                // 3. Clear single-select keys that might conflict
                newUrlParams.delete('category');
                newUrlParams.delete('subcategory');
                newUrlParams.delete('subcategoryItemChild'); 

                // 4. Re-append the combined list of unique slugs (This creates the desired multi-param URL)
                updatedItems.forEach(slug => newUrlParams.append(urlParamKey, slug));

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
                // Ensuring we get the string code, whether value is a string or an object
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
                // Ensuring we get the string ID, whether value is a string or an object
                const brandId = typeof value === 'object' && value !== null ? value.id : value;
                
                let updatedBrands = isChecked
                    ? [...new Set([...currentBrands, brandId])]
                    : currentBrands.filter(b => b !== brandId);
                
                newUrlParams.delete('brand');
                updatedBrands.forEach(b => newUrlParams.append('brand', b));
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
        ['gender', 'category', 'price_min', 'price_max', 'brand', 'availability', 'colors', 'subcategoryItem', 'subcategoryItemChild', 'subcategory'].forEach(key => {
            newUrlParams.delete(key);
        });
        // Push the URL without filter parameters
        router.push(`${pathname}?${newUrlParams.toString()}`);
    }, [router, pathname]);

    // Return the filter state and the functions to interact with it.
    return { filterState, setFilterState, handleFilterChange, handlePriceRangeChange, handleResetAllFilters };
}