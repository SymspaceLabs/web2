    import { useMemo } from "react";

    /**
     * @function useFilteredAndSortedProducts
     * @description Custom React hook to apply client-side filters and sorting to an
     * already fetched product list. This version includes debug logs to help
     * identify at which stage the product array might be becoming empty.
     *
     * @param {object} filterState - An object containing the current filter selections.
     * - allProducts: Array of all products fetched from the data source (the starting point).
     * - selectedBrands: Array of selected brand objects.
     * - selectedGenders: Array of selected gender strings.
     * - priceRange: Array [minPrice, maxPrice] for the price filter.
     * - selectedAvailabilities: Array of selected availability strings.
     * - selectedColors: Array of selected color objects.
     * @param {string} sortOption - The currently selected sorting option (e.g., 'latest', 'price-asc').
     * @returns {Array} The final array of filtered and sorted products.
     */
    export function useFilteredAndSortedProducts(filterState, sortOption) {
      // useMemo ensures the filtered/sorted product list is recomputed
      // ONLY when any of the dependencies change (for performance).
      return useMemo(() => {
        // Make a copy of the full product list to start filtering from.
        // This `allProducts` list is assumed to be already filtered by the server
        // based on any initial URL slug (e.g., /products/category/handbags).
        let list = [...filterState.allProducts];

        // --- DEBUG START ---
        // --- DEBUG END ---

        // =============================
        // BRAND FILTER
        // Filters products based on selected brand IDs.
        // =============================
        if (filterState.selectedBrands && filterState.selectedBrands.length > 0) {
          // --- DEBUG START ---

          // --- DEBUG END ---
          const brandIds = new Set(filterState.selectedBrands.map(b => b.id));
          list = list.filter(p => p.company && p.company.id && brandIds.has(p.company.id));
          // --- DEBUG START ---

          // --- DEBUG END ---
        }

        // =============================
        // GENDER FILTER
        // Filters products based on selected genders, including 'unisex' logic.
        // =============================
        if (filterState.selectedGenders && filterState.selectedGenders.length > 0) {
          // --- DEBUG START ---

          // --- DEBUG END ---
          const selectedGendersLower = new Set(
            filterState.selectedGenders.map(g => g.toLowerCase())
          );

          list = list.filter(p => {
            const productGenderLower = p.gender ? p.gender.toLowerCase() : "";
            // A product is included if its gender matches a selected gender,
            // or if it's 'unisex' and either 'men' or 'women' is selected.
            return (
              selectedGendersLower.has(productGenderLower) ||
              (productGenderLower === "unisex" &&
                (selectedGendersLower.has("men") || selectedGendersLower.has("women")))
            );
          });
          // --- DEBUG START ---

          // --- DEBUG END ---
        }

        // =============================
        // PRICE RANGE FILTER
        // Filters products whose price falls within the selected range.
        // This filter is applied unconditionally. Ensure priceRange is correctly initialized.
        // The price used for filtering now prioritizes 'salePrice' if available.
        // =============================
        if (filterState.priceRange && filterState.priceRange.length === 2) {
          // --- DEBUG START ---

          // --- DEBUG END ---
          list = list.filter(
            p => {
              // --- DEEPER DEBUG FOR PRICE FILTER ---
              const rawPrice = p.price;
              const rawSalePrice = p.salePrice;
              const effectivePrice = (typeof rawSalePrice === 'number' && rawSalePrice !== null) ? rawSalePrice : rawPrice;
    
    
    
              const passesFilter = (effectivePrice >= filterState.priceRange[0] && effectivePrice <= filterState.priceRange[1]);
    
              // --- END DEEPER DEBUG ---
              return passesFilter;
            }
          );
          // --- DEBUG START ---

          // --- DEBUG END ---
        } else {
           // --- DEBUG START ---
           console.warn("Price range filter skipped: priceRange is invalid or missing.", filterState.priceRange);
           // --- DEBUG END ---
        }


        // =============================
        // AVAILABILITY FILTER
        // Filters products based on selected availability statuses.
        // =============================
        if (filterState.selectedAvailabilities && filterState.selectedAvailabilities.length > 0) {
          // --- DEBUG START ---

          // --- DEBUG END ---
          const availSet = new Set(filterState.selectedAvailabilities);
          list = list.filter(p => p.availability && availSet.has(p.availability));
          // --- DEBUG START ---

          // --- DEBUG END ---
        }

        // =============================
        // COLOR FILTER
        // Filters products based on selected color codes.
        // =============================
        if (filterState.selectedColors && filterState.selectedColors.length > 0) {
          // --- DEBUG START ---

          // --- DEBUG END ---
          const colorCodes = new Set(
            filterState.selectedColors.map(c => c.code?.toLowerCase())
          );
          list = list.filter(p =>
            p.colors?.some(c => c.code && colorCodes.has(c.code.toLowerCase()))
          );
          // --- DEBUG START ---

          // --- DEBUG END ---
        }

        // =============================
        // SORTING LOGIC
        // Sorts the remaining products based on the selected sort option.
        // Note: Sorting does not change the number of items in the list.
        // The price used for sorting now prioritizes 'salePrice' if available.
        // =============================
        // --- DEBUG START ---
        // --- DEBUG END ---
        if (sortOption === "latest") {
          // Assuming 'createdAt' or a similar timestamp is available on the product entity
          list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
        // --- DEBUG START ---
        // --- DEBUG END ---

        // =============================
        // RETURN FINAL FILTERED LIST
        // =============================
        return list;
      }, [
        // Dependencies — the memoized function will only recompute when any of these change.
        filterState.allProducts,
        filterState.selectedBrands,
        filterState.selectedGenders,
        filterState.priceRange,
        filterState.selectedAvailabilities,
        filterState.selectedColors,
        sortOption,
      ]);
    }
    