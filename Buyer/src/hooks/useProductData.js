import { useState, useEffect, useCallback } from "react";

/**
 * Fetches all product data from the backend (no server-side pagination)
 * 
 * @param {string} paramsString - URL search parameters
 * @returns {Object} Product data, loading state, and error
 */
export function useProductData(paramsString) {
  const [data, setData] = useState({
    products: [],
    allBrands: [],
    priceLimits: [0, 300],
    category: [],
    allGenders: [],
    allAvailabilities: [],
    allColors: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Normalizes product category hierarchy for easier filtering
   * Adds flattened category IDs and slugs to each product
   */
  const normalizeProduct = useCallback((product) => {
    if (!product.category) {
      return {
        ...product,
        categoryHierarchy: {
          childId: null,
          parentId: null,
          childSlug: null,
          parentSlug: null,
        }
      };
    }

    // Build hierarchy array from deepest child to root
    const hierarchy = [];
    let current = product.category;
    while (current) {
      hierarchy.push(current);
      current = current.parent;
    }
    
    return {
      ...product,
      categoryHierarchy: {
        childId: hierarchy[0]?.id || null,
        parentId: hierarchy[1]?.id || null,
        childSlug: hierarchy[0]?.slug || null,
        parentSlug: hierarchy[1]?.slug || null,
      }
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryString = paramsString ? `?${paramsString}` : "";
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/products${queryString}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const fetchedData = await response.json();
        
        // Normalize all products
        const normalizedProducts = (fetchedData.products || []).map(normalizeProduct);

        setData({
          products: normalizedProducts,
          allBrands: fetchedData.brands || [],
          priceLimits: [
            fetchedData.priceRange?.min || 0,
            fetchedData.priceRange?.max || 300
          ],
          category: fetchedData.category || [],
          allGenders: (fetchedData.genders || []).map(g => g.toLowerCase()),
          allAvailabilities: fetchedData.availabilities || [],
          allColors: fetchedData.colors || [],
        });
      } catch (err) {
        console.error("Failed to fetch product data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [paramsString, normalizeProduct]);

  return {
    ...data,
    loading,
    error,
  };
}