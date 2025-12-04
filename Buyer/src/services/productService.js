// services/productService.js
// Consolidated product service functions, including the missing updateProduct.

/**
 * Fetches product data by ID from the backend API.
 * This is required for loading product data in the edit mode (useEffect in ProductCreatePageView).
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product data.
 */
export const fetchProductById = async (id) => {
    console.log(`[API CALL] Fetching product by ID: ${id}`);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product by ID");
        return await response.json();
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        // Re-throw to allow the calling component to handle it.
        throw error; 
    }
};

/**
 * Creates a new product on the backend API (Required for Step 1 of the create flow).
 * @param {Object} productData - The product data to create.
 * @returns {Promise<Object>} A promise that resolves to the newly created product object.
 */
export const createProduct = async (productData) => {
    console.log("[API CALL] Creating product with data:", productData);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });
        if (!response.ok) throw new Error("Failed to create product");
        const createdProduct = await response.json();
        return createdProduct; 
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

/**
 * Updates an existing product on the backend API (THE MISSING FUNCTION).
 * Sends a PUT request to update the product data.
 * @param {string} id - The ID of the product to update.
 * @param {Object} updatedData - The partial product data to update.
 * @returns {Promise<Object>} A promise that resolves to the updated product object.
 */
export const updateProduct = async (id, updatedData) => {
    console.log(`[API CALL] Updating product ${id} with data:`, updatedData);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, {
            method: 'PUT', // Use PUT or PATCH based on your backend convention
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to update product ${id}. Status: ${response.status}. Body: ${errorBody}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error; 
    }
};

/**
 * Fetches product data by slug from the backend API.
 * @param {string} slug - The slug of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product data.
 * @throws {Error} If the network request fails or the response is not OK.
 */
export const fetchProductBySlug = async (slug) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/slug/${slug}`);
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

/**
 * Fetches a list of products from the backend API.
 * This is required for displaying products on the landing page/product list pages.
 * @param {Object} [params={}] - Optional parameters for filtering or pagination (e.g., { limit: 10, category: 'newArrival' }).
 * @returns {Promise<{products: Array, error: Object | null}>} An object containing the product list and a potential error.
 */
export const fetchProducts = async (params = {}) => {
    // Construct the query string from params (e.g., ?limit=10&category=newArrival)
    // const queryString = new URLSearchParams(params).toString();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`;
    
    console.log(`[API CALL] Fetching products from: ${url}`);
    
    try {
        const response = await fetch(url);

        if (!response.ok) {
            // Log the detailed error from the server if available
            const errorBody = await response.text().catch(() => 'No response body');
            console.error(`API Error: ${response.status} - ${response.statusText}`, errorBody);
            throw new Error("Failed to fetch products list");
        }

        const responseData = await response.json();
        const productsArray = responseData.products || [];
        
        // Ensure the response structure matches what the component expects
        return { products: productsArray, error: null }; 

    } catch (error) {
        console.error("Error fetching products list:", error);
        // Return an error object to be handled by the calling component
        return { products: [], error: { message: error.message || "Network error" } };
    }
};