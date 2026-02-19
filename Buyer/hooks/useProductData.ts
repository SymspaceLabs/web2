// src/hooks/useProductData.ts
import { useState, useEffect } from 'react';

interface Category {
  id: string | number;
  slug: string;
  parent?: Category;
}

interface Product {
  id: string | number;
  category?: Category;
  [key: string]: any;
}

interface Brand {
  id: string | number;
  entityName: string;
}

interface Color {
  code: string;
  name: string;
}

interface ProductDataResponse {
  products: Product[];
  brands: Brand[];
  priceRange: { min: number; max: number };
  category: any[];
  genders?: string[];
  availabilities?: string[];
  colors?: Color[];
}

interface UseProductDataReturn {
  allProducts: Product[];
  allBrands: Brand[];
  priceLimits: [number, number];
  category: any[];
  allGenders: string[];
  allAvailabilities: string[];
  allColors: Color[];
  loading: boolean;
  error: string | null;
}

/**
 * Normalizes product category IDs and slugs for hierarchical filtering
 */
function normalizeCategoryIds(product: Product): Product {
  if (!product.category) {
    return {
      ...product,
      subcategoryItemChildId: null,
      subcategoryItemId: null,
      subcategoryItemChildSlug: null,
      subcategoryItemSlug: null,
    };
  }

  const hierarchy: Category[] = [];
  let current: Category | undefined = product.category;

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
    // Slugs for filtering by URL params
    subcategoryItemChildSlug: hierarchy[0]?.slug || null,
    subcategoryItemSlug: hierarchy[1]?.slug || null,
  };
}

export function useProductData(paramsString: string): UseProductDataReturn {
  const [data, setData] = useState<UseProductDataReturn>({
    allProducts: [],
    allBrands: [],
    priceLimits: [0, 1000],
    category: [],
    allGenders: [],
    allAvailabilities: [],
    allColors: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchData = async () => {
      setData(prev => ({ ...prev, loading: true, error: null }));

      const queryString = paramsString ? `?${paramsString}` : '';

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/products${queryString}`,
          {
            signal: controller.signal,
            cache: 'no-store',
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fetchedData: ProductDataResponse = await response.json();

        // Normalize products before setting state
        const normalizedProducts = fetchedData.products.map(normalizeCategoryIds);

        setData({
          allProducts: normalizedProducts,
          allBrands: fetchedData.brands || [],
          priceLimits: [
            fetchedData.priceRange?.min ?? 0,
            fetchedData.priceRange?.max ?? 1000,
          ],
          category: fetchedData.category || [],
          allGenders: fetchedData.genders?.map((g) => g.toLowerCase()) || [],
          allAvailabilities: fetchedData.availabilities || [],
          allColors: fetchedData.colors || [],
          loading: false,
          error: null,
        });
      } catch (err) {
        // Don't set error if request was aborted
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products';
        console.error('Failed to fetch product data:', err);
        
        setData(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
      }
    };

    fetchData();

    // Cleanup: abort fetch on unmount or params change
    return () => controller.abort();
  }, [paramsString]);

  return data;
}