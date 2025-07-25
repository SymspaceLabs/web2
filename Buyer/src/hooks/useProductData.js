// src/hooks/useProductData.js
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Custom hook to fetch product data and initialize filter options.
 */
export function useProductData() {
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

  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const subcategoryParam = searchParams.get("subcategory");


  useEffect(() => {
    setLoading(true);

    // Construct query string only if category is present
    const queryString = subcategoryParam ? `?subcategory=${encodeURIComponent(subcategoryParam)}` : "";  

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products${queryString}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(fetchedData => {
        setData({
          allProducts: fetchedData.products,
          allBrands: fetchedData.brands,
          priceLimits: [fetchedData.priceRange.min, fetchedData.priceRange.max],
          category: fetchedData.category,
          allGenders: fetchedData.genders.map(g => g.toLowerCase()),
          allAvailabilities: fetchedData.availabilities,
          allColors: fetchedData.colors,
        });
      })
      .catch(err => {
        console.error("Failed to fetch product data:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [categoryParam]); // Refetch if category changes

  return { ...data, loading, error };
}
