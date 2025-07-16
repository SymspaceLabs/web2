// src/hooks/useProductData.js
import { useState, useEffect } from "react";

/**
 * Custom hook to fetch product data and initialize filter options.
 * @returns {{
 * allProducts: Array<object>,
 * allBrands: Array<object>,
 * priceLimits: [number, number],
 * category: Array<object>,
 * allGenders: Array<string>,
 * allAvailabilities: Array<string>,
 * allColors: Array<object>,
 * loading: boolean,
 * error: string | null,
 * }} Fetched data and loading/error states.
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

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
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
  }, []); // Empty dependency array means this runs once on mount

  return { ...data, loading, error };
}
