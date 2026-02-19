// api/product.ts

import { AvailabilityData } from "@/types/products";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Fetches product data by ID
 */
export const fetchProductById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product by ID");
    return await response.json();
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

/**
 * Creates a new product
 */
export const createProduct = async (productData: any) => {
  try {
    const response = await fetch(`${BASE_URL}/products/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Failed to create product");
    return await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

/**
 * Updates an existing product
 */
export const updateProduct = async (id: string, updatedData: any) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to update product ${id}. Status: ${response.status}. Body: ${errorBody}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

/**
 * Fetches product data by slug
 */
export const fetchProductBySlug = async (slug: string) => {
  try {
    const response = await fetch(`${BASE_URL}/products/slug/${slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

/**
 * Fetches the availability of a specific product variant
 */
export const fetchProductAvailability = async (
  productId: string,
  colorId: string,
  sizeId: string
): Promise<AvailabilityData> => {
  if (!colorId || !sizeId) {
    throw new Error("Color ID and Size ID are required.");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/product-variants/${productId}/availability?colorId=${colorId}&sizeId=${sizeId}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Availability fetch failed: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    return {
      ...data,
      status: data.status || (data.available ? 'In Stock' : 'Out of Stock'),
      statusColor: data.statusColor || (data.available ? '#10b981' : '#ef4444')
    };
  } catch (error) {
    console.error("Error fetching product availability:", error);
    throw error;
  }
};

/**
 * Fetches a list of products
 */
export const fetchProducts = async (params = {}) => {
  const url = `${BASE_URL}/products`;
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorBody = await response.text().catch(() => 'No response body');
      console.error(`API Error: ${response.status} - ${response.statusText}`, errorBody);
      throw new Error("Failed to fetch products list");
    }

    const responseData = await response.json();
    const productsArray = responseData.products || [];
    
    return { products: productsArray, error: null };
  } catch (error: any) {
    console.error("Error fetching products list:", error);
    return { products: [], error: { message: error.message || "Network error" } };
  }
};

/**
 * Fetch complete details for a product variant by variantId
 */
export async function fetchVariantDetails(variantId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-variants/details/${variantId}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch variant details: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Log the response to debug
    console.log('🔍 Variant details API response:', data);
    
    return data;
  } catch (error) {
    console.error("Error fetching variant details:", error);
    throw error;
  }
}

/**
 * Fetch details for multiple variants at once
 */
export async function fetchVariantDetailsBatch(variantIds: string[]) {
  try {
    const response = await fetch(`${BASE_URL}/product-variants/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variantIds })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to batch fetch variants: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error batch fetching variants:", error);
    throw error;
  }
}