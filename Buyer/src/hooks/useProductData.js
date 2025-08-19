import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

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

  // const searchParams = useSearchParams();
  // const paramsString = searchParams.toString(); // ✅ stable dependency

  useEffect(() => {
    setLoading(true);

    const queryString = paramsString ? `?${paramsString}` : "";

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products${queryString}`, {
        cache: "no-store", // 👈 disable Next.js fetch cache
      })
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
  }, [paramsString]); // ✅ depends on string version

  return { ...data, loading, error };
}
