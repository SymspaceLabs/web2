import { useState, useEffect } from "react";

export function useProductData(paramsString) {
  const [data, setData] = useState({
    allProducts: [],
    allBrands: [],
    priceLimits: [0, 300],
    category: [],
    allGenders: [],
    allAvailabilities: [],
    allColors: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const queryString = paramsString ? `?${paramsString}` : "";

    // ✅ Helper function to normalize category IDs AND slugs
    function normalizeCategoryIds(product) {
      if (!product.category) {
        return {
          ...product,
          subcategoryItemChildId: null,
          subcategoryItemId: null,
          subcategoryItemChildSlug: null,
          subcategoryItemSlug: null,
        };
      }

      const hierarchy = [];
      let current = product.category;
      
      // Build hierarchy from deepest to root
      while (current) {
        hierarchy.push(current);
        current = current.parent;
      }
      
      return {
        ...product,
        // IDs for filtering by ID
        subcategoryItemChildId: hierarchy[0]?.id || null,
        subcategoryItemId: hierarchy[1]?.id || null,
        // ✅ ADD: Slugs for filtering by URL params
        subcategoryItemChildSlug: hierarchy[0]?.slug || null,
        subcategoryItemSlug: hierarchy[1]?.slug || null,
      };
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products${queryString}`, {
        cache: "no-store",
      })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(fetchedData => {
        // ✅ Apply normalization to products BEFORE setting state
        const normalizedProducts = fetchedData.products.map(normalizeCategoryIds);
                
        setData({
          allProducts: normalizedProducts,
          allBrands: fetchedData.brands,
          priceLimits: [fetchedData.priceRange.min, fetchedData.priceRange.max],
          category: fetchedData.category,
          allGenders: fetchedData.genders?.map(g => g.toLowerCase()) || [],
          allAvailabilities: fetchedData.availabilities || [],
          allColors: fetchedData.colors || [],
        });
      })
      .catch(err => {
        console.error("Failed to fetch product data:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [paramsString]);

  return { ...data, loading, error };
}