import { useMemo } from "react";

// Custom React hook to filter and sort products
export function useFilteredAndSortedProducts(filterState, sortOption, categoryQuery) {
    
    // useMemo ensures the filtered/sorted product list is recomputed
    // ONLY when any of the dependencies change (for performance)
    return useMemo(() => {

        // Make a copy of the full product list to start filtering from
        let list = [...filterState.allProducts];

        // =============================
        // CATEGORY FILTERING LOGIC
        // =============================

        // Priority 1: If user manually checked categories via UI, apply that filter
        if (filterState.checkedCategoryIds.length > 0) {
            const subIds = new Set(filterState.checkedCategoryIds); // Convert array to Set for fast lookup
            list = list.filter(p =>
                p.subcategoryItem && subIds.has(p.subcategoryItem.id) // Keep only products whose subcategory ID is selected
            );
        }


        // Priority 2: If no UI categories checked, but category filters exist in the URL
        // This section is currently commented out, but if re-enabled it would:
        // - Convert URL query categories to lowercase
        // - Match against subcategory name in product
        /*
        else if (categoryQuery.length > 0) {
            const urlCategoriesLower = new Set(categoryQuery.map(c => c.toLowerCase()));
            list = list.filter(p => {
                const productSubcategoryName = p.subcategoryItem?.subcategory?.name?.toLowerCase();
                return urlCategoriesLower.has(productSubcategoryName);
            });
        }
        */

        // =============================
        // BRAND FILTER
        // =============================

        if (filterState.selectedBrands.length) {
            const brandIds = new Set(filterState.selectedBrands.map(b => b.id)); // Extract brand IDs
            list = list.filter(p =>
                p.company && brandIds.has(p.company.id) // Keep if product's brand matches selected brand
            );
        }


        // =============================
        // GENDER FILTER
        // =============================

        if (filterState.selectedGenders.length) {
            const selectedGendersLower = new Set(
                filterState.selectedGenders.map(g => g.toLowerCase())
            );

            list = list.filter(p => {
                const productGenderLower = p.gender ? p.gender.toLowerCase() : '';

                // Match exact gender or allow "unisex" if either "men" or "women" is selected
                return selectedGendersLower.has(productGenderLower) ||
                    (productGenderLower === 'unisex' &&
                     (selectedGendersLower.has('men') || selectedGendersLower.has('women')));
            });
        }

        // Add this to check current price range values

        // =============================
        // PRICE RANGE FILTER
        // =============================

        list = list.filter(p =>
            p.price >= filterState.priceRange[0] && p.price <= filterState.priceRange[1]
        );


        // =============================
        // AVAILABILITY FILTER
        // =============================

        if (filterState.selectedAvailabilities.length) {
            // Validate that the availabilities list is an array
            if (!Array.isArray(filterState.selectedAvailabilities)) {
                console.warn("filterState.selectedAvailabilities is not an array:", filterState.selectedAvailabilities);
                list = [];
                return list;
            }

            const availSet = new Set(filterState.selectedAvailabilities);

            list = list.filter(p =>
                Array.isArray(p.availability)
                    ? p.availability.some(a => availSet.has(a)) // For array-based availability
                    : availSet.has(p.availability)              // For single value
            );
        }


        // =============================
        // COLOR FILTER
        // =============================

        if (filterState.selectedColors.length) {
            if (!Array.isArray(filterState.selectedColors)) {
                console.warn("filterState.selectedColors is not an array:", filterState.selectedColors);
                list = [];
                return list;
            }

            const colorCodes = new Set(
                filterState.selectedColors.map(c => c.code?.toLowerCase())
            );

            list = list.filter(p =>
                p.colors?.some(c =>
                    colorCodes.has(c.code?.toLowerCase()) // Match at least one color in product
                )
            );
        }


        // =============================
        // SORTING LOGIC
        // =============================

        if (sortOption === "latest") {
            list.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate)); // Newest first
        } else if (sortOption === "price-asc") {
            list.sort((a, b) => a.price - b.price); // Price low to high
        } else if (sortOption === "price-desc") {
            list.sort((a, b) => b.price - a.price); // Price high to low
        }


        // =============================
        // RETURN FINAL FILTERED LIST
        // =============================

        return list;

    }, [
        // Dependencies — only recompute when any of these change
        filterState.allProducts,
        filterState.selectedBrands,
        filterState.checkedCategoryIds,
        filterState.selectedGenders,
        filterState.priceRange,
        filterState.selectedAvailabilities,
        filterState.selectedColors,
        categoryQuery,
        sortOption,
    ]);
}
