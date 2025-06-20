// lib/api.js or services/productService.js

export async function fetchProducts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    return { products: data.products, error: null };
  } catch (error) {
    return { products: [], error };
  }
}

/**
 * Fetches product data by slug from the backend API.
 * @param {string} slug - The slug of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product data.
 * @throws {Error} If the network request fails or the response is not OK.
 */
export const fetchProductBySlug = async (slug) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

/**
 * Fetches the availability of a specific product variant (color and size).
 * @param {string} productId - The ID of the product.
 * @param {string} colorId - The ID of the selected color.
 * @param {string} sizeId - The ID of the selected size.
 * @returns {Promise<Object>} A promise that resolves to the availability data (e.g., { stock: number, status: string, statusColor: string, variantId: string }).
 * @throws {Error} If the network request fails or the response is not OK.
 */
export const fetchProductAvailability = async (productId, colorId, sizeId) => {
  if (!colorId || !sizeId) {
    throw new Error("Color ID and Size ID are required to fetch availability.");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-variants/${productId}/availability?colorId=${colorId}&sizeId=${sizeId}`
    );

    if (!response.ok) {
      // It's good to get more specific error messages from the backend if possible.
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Failed to fetch product availability: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product availability:", error);
    throw error; // Re-throw to allow the calling component to handle it.
  }
};
