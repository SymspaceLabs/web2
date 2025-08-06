import { useMemo } from "react";

// Custom React hook to apply client-side filters and sorting to an already fetched product list.
export function useFilteredAndSortedProducts(filterState, sortOption) {
  // We'll no longer need categoryQuery or subcategoryItemQuery in the dependency array
  // because the `allProducts` list from `useProductData` is already pre-filtered.

  // useMemo ensures the filtered/sorted product list is recomputed
  // ONLY when any of the dependencies change (for performance).
  return useMemo(() => {
    // Make a copy of the full product list to start filtering from
    // This list is already filtered by the server based on the URL slug.
    let list = [...filterState.allProducts];

    // =============================
    // BRAND FILTER
    // =============================

    if (filterState.selectedBrands.length > 0) {
      const brandIds = new Set(filterState.selectedBrands.map(b => b.id));
      list = list.filter(p => p.company && brandIds.has(p.company.id));
    }

    // =============================
    // GENDER FILTER
    // =============================

    if (filterState.selectedGenders.length > 0) {
      const selectedGendersLower = new Set(
        filterState.selectedGenders.map(g => g.toLowerCase())
      );

      list = list.filter(p => {
        const productGenderLower = p.gender ? p.gender.toLowerCase() : "";
        return (
          selectedGendersLower.has(productGenderLower) ||
          (productGenderLower === "unisex" &&
            (selectedGendersLower.has("men") || selectedGendersLower.has("women")))
        );
      });
    }

    // =============================
    // PRICE RANGE FILTER
    // =============================

    list = list.filter(
      p => p.price >= filterState.priceRange[0] && p.price <= filterState.priceRange[1]
    );

    // =============================
    // AVAILABILITY FILTER
    // =============================

    if (filterState.selectedAvailabilities.length > 0) {
      const availSet = new Set(filterState.selectedAvailabilities);
      list = list.filter(p => availSet.has(p.availability));
    }

    // =============================
    // COLOR FILTER
    // =============================

    if (filterState.selectedColors.length > 0) {
      const colorCodes = new Set(
        filterState.selectedColors.map(c => c.code?.toLowerCase())
      );
      list = list.filter(p =>
        p.colors?.some(c => colorCodes.has(c.code?.toLowerCase()))
      );
    }

    // =============================
    // SORTING LOGIC
    // =============================

    if (sortOption === "latest") {
      // Assuming 'createdAt' or a similar timestamp is available on the product entity
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }

    // =============================
    // RETURN FINAL FILTERED LIST
    // =============================

    return list;
  }, [
    // Dependencies — only recompute when any of these change
    filterState.allProducts,
    filterState.selectedBrands,
    filterState.selectedGenders,
    filterState.priceRange,
    filterState.selectedAvailabilities,
    filterState.selectedColors,
    sortOption,
  ]);
}