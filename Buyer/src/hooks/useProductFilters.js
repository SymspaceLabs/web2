import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

/**
 * Simplified product filter management
 * - Server-side filters: category, gender (from URL)
 * - Client-side filters: brands, price, colors, availability
 * 
 * @param {Object} serverData - Data from useProductData hook
 * @param {URLSearchParams} searchParams - Current URL search params
 */
export function useProductFilters(serverData = {}, searchParams) {
  const router = useRouter();
  const pathname = usePathname();

  // Client-side filter state with safe defaults
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: serverData?.priceLimits || [0, 300],
    colors: [],
    availability: [],
    categories: [], // For UI checkboxes (additional filtering)
  });

  // Reset filters when server data changes (new category/gender selected)
  useEffect(() => {
    if (serverData?.priceLimits) {
      setFilters(prev => ({
        ...prev,
        priceRange: serverData.priceLimits,
      }));
    }
  }, [serverData?.priceLimits]);

  /**
   * Generic filter update handler
   */
  const updateFilter = useCallback((filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  }, []);

  /**
   * Toggle array-based filters (brands, colors, etc.)
   */
  const toggleFilter = useCallback((filterName, item, idKey = 'id') => {
    setFilters(prev => {
      const currentArray = prev[filterName] || [];
      const itemId = item[idKey];
      const exists = currentArray.some(i => i[idKey] === itemId);

      return {
        ...prev,
        [filterName]: exists
          ? currentArray.filter(i => i[idKey] !== itemId)
          : [...currentArray, item]
      };
    });
  }, []);

  /**
   * Reset all client-side filters
   */
  const resetFilters = useCallback(() => {
    setFilters({
      brands: [],
      priceRange: serverData?.priceLimits || [0, 300],
      colors: [],
      availability: [],
      categories: [],
    });
  }, [serverData?.priceLimits]);

  /**
   * Update URL for server-side filters (category, gender)
   */
  const updateUrlFilter = useCallback((key, value) => {
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, router, pathname]);

  return {
    // Filter state
    filters,
    
    // Update functions
    updateFilter,
    toggleFilter,
    resetFilters,
    updateUrlFilter,
    
    // Convenience handlers
    setBrands: (brands) => updateFilter('brands', brands),
    setPriceRange: (range) => updateFilter('priceRange', range),
    setColors: (colors) => updateFilter('colors', colors),
    setAvailability: (avail) => updateFilter('availability', avail),
    setCategories: (cats) => updateFilter('categories', cats),
    
    toggleBrand: (brand) => toggleFilter('brands', brand, 'id'),
    toggleColor: (color) => toggleFilter('colors', color, 'code'),
    toggleAvailability: (avail) => toggleFilter('availability', avail, 'name'),
    toggleCategory: (cat) => toggleFilter('categories', cat, 'id'),
  };
}