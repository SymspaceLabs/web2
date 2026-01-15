import { useMemo } from "react";

/**
 * Client-side product filtering, sorting, AND pagination
 * Server already handles: category, gender from URL
 * This handles: brands, price, colors, availability, sorting, and pagination
 * 
 * @param {Array} products - All products from backend
 * @param {Object} filters - Active filters
 * @param {string} sortOption - Sorting method
 * @param {number} currentPage - Current page number
 * @param {number} pageSize - Products per page
 * @returns {Object} Filtered products, pagination info
 */
export function useFilteredProducts(products = [], filters = {}, sortOption = "latest", currentPage = 1, pageSize = 20) {
  return useMemo(() => {
    // Early return if no products
    if (!products || products.length === 0) {
      return {
        products: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalProducts: 0,
          pageSize,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      };
    }

    let filtered = [...products];

    // =============================
    // FILTERING
    // =============================

    // Brand filter
    if (filters?.brands?.length > 0) {
      const brandIds = new Set(filters.brands.map(b => b.id));
      filtered = filtered.filter(p => 
        p.company?.id && brandIds.has(p.company.id)
      );
    }

    // Price range filter
    if (filters?.priceRange?.length === 2) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(p => {
        const price = p.displayPrice?.hasSale 
          ? p.displayPrice.salePrice 
          : p.displayPrice?.price || 0;
        return price >= min && price <= max;
      });
    }

    // Color filter
    if (filters?.colors?.length > 0) {
      const colorCodes = new Set(
        filters.colors.map(c => c.code?.toLowerCase())
      );
      filtered = filtered.filter(p =>
        p.colors?.some(c => colorCodes.has(c.code?.toLowerCase()))
      );
    }

    // Availability filter
    if (filters?.availability?.length > 0) {
      const availSet = new Set(filters.availability);
      filtered = filtered.filter(p => availSet.has(p.availability));
    }

    // Additional category filter (from UI checkboxes)
    if (filters?.categories?.length > 0) {
      const categoryIds = new Set(filters.categories.map(c => String(c.id)));
      filtered = filtered.filter(p => {
        if (!p.categoryHierarchy) return false;
        
        return (
          categoryIds.has(String(p.categoryHierarchy.childId)) ||
          categoryIds.has(String(p.categoryHierarchy.parentId))
        );
      });
    }

    // =============================
    // SORTING
    // =============================
    
    const getPrice = (product) => {
      return product.displayPrice?.hasSale 
        ? product.displayPrice.salePrice 
        : product.displayPrice?.price || 0;
    };

    switch (sortOption) {
      case "latest":
        filtered.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "price-asc":
      case "relevance":
        filtered.sort((a, b) => getPrice(a) - getPrice(b));
        break;
      case "price-desc":
        filtered.sort((a, b) => getPrice(b) - getPrice(a));
        break;
    }

    // =============================
    // PAGINATION
    // =============================
    
    const totalProducts = filtered.length;
    const totalPages = Math.ceil(totalProducts / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filtered.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      pagination: {
        currentPage,
        totalPages,
        totalProducts,
        pageSize,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      }
    };
  }, [products, filters, sortOption, currentPage, pageSize]);
}