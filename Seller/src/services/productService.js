/**
 * Fetches product data from the backend API, filtered by a specific Company ID.
 * @param {string} companyId - The ID of the company whose products should be fetched.
 * @returns {Promise<Object>} A promise that resolves to an object containing products and an error field.
 */
export async function fetchProductsByCompanyId(companyId) {
  try {
    if (!companyId) {
      throw new Error("Company ID is required for fetching products.");
    }

    // Constructing the URL with the companyId as a query parameter for filtering
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/company/${companyId}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      // Attempt to get more detail from the error response body if possible
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch products for company ${companyId}: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    return { products: data, error: null };
  } catch (error) {
    console.error("Error fetching products by company ID:", error);
    return { products: [], error };
  }
}

/**
 * Creates a new product on the backend API.
 * @param {Object} productData - The data for the new product (e.g., name, company, subcategoryItem).
 * @returns {Promise<Object>} A promise that resolves to the created product data including its ID.
 * @throws {Error} If the network request fails or the API returns an error status.
 */
export const createProduct = async (productData) => {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`;
    
    // Fallback for local development if NEXT_PUBLIC_BACKEND_URL isn't set,
    const url = process.env.NEXT_PUBLIC_BACKEND_URL ? endpoint : 'http://localhost:3000/products';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization header here if needed
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Failed to create product: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`
      );
    }

    const data = await response.json();
    
    // Check if the ID is present, which is crucial for subsequent steps
    if (!data || !data.id) {
        throw new Error("Product created successfully, but response is missing the 'id' field.");
    }

    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error; // Re-throw to be handled by the calling component
  }
};

/**
 * Updates an existing product on the backend API.
 * Sends a PUT request to update the product data.
 * @param {string} id - The ID of the product to update.
 * @param {Object} updatedData - The partial product data to update.
 * @returns {Promise<Object>} A promise that resolves to the updated product object.
 * @throws {Error} If the network request fails or the API returns an error status.
 */
export const updateProduct = async (id, updatedData) => {
    try {
        if (!id) {
          throw new Error("Product ID is required for updating product data.");
        }

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`;

        const response = await fetch(url, {
            method: 'PATCH', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                `Failed to update product ${id}: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};


// =============================================================================
// @function fetchProductById (NEW FUNCTION)
// =============================================================================
/**
 * Fetches product data by its unique ID from the backend API.
 * @param {string} id - The unique ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product data object.
 * @throws {Error} If the ID is missing, the network request fails, or the response is not OK.
 */
export const fetchProductById = async (id) => {
  try {
    if (!id) {
      throw new Error("Product ID is required for fetching product data.");
    }
    
    // Construct the URL using the product ID
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Failed to fetch product data for ID ${id}: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`
      );
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error; // Re-throw the error to be handled by the caller
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
 * Uploads a raw File object to the Minio backend and returns the resulting URL.
 * @param {File} file - The raw file object from the user's input.
 * @returns {Promise<string>} The permanent public URL of the uploaded file.
 */
export const uploadFileToBackend = async (file) => {
    const formData = new FormData();
    // 'file' must match the key used by NestJS's @UseInterceptors(FileInterceptor('file'))
    formData.append('file', file); 

    try {
        // NOTE: Adjust the endpoint URL as necessary
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/file`, { 
            method: 'POST',
            body: formData,
            // DO NOT manually set Content-Type for FormData; the browser handles it.
        });

        if (!response.ok) {
            throw new Error(`Upload failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data.url; // Returns the fileUrl from the NestJS controller
        
    } catch (error) {
        console.error("Image upload failed:", error);
        throw error;
    }
};

/**
 * Uploads a raw GLB/3D Model File object to the Minio/S3 backend and returns the resulting URL.
 * It is expected that the backend's /upload/file endpoint handles the storage (S3/Minio).
 * * @param {File} file - The raw file object from the user's input (expected to be .glb).
 * @param {string} productId - The ID of the product this model belongs to (for context/naming, if needed).
 * @returns {Promise<string>} The permanent public URL of the uploaded 3D model.
 */
export const uploadProductModel = async (file, productId) => {
    // 1. Basic Validation
    if (!file) {
        throw new Error("No file provided for upload.");
    }
    
    // Optional: Add specific file type validation (e.g., check for .glb extension)
    const fileNameLower = file.name.toLowerCase();
    if (!fileNameLower.endsWith('.glb') && !fileNameLower.endsWith('.gltf')) {
        console.warn(`Uploading file with non-standard 3D model extension: ${file.name}`);
        // Consider throwing an error here if strict file type enforcement is necessary.
    }

    // 2. Prepare FormData
    const formData = new FormData();
    // 'file' must match the key used by NestJS's @UseInterceptors(FileInterceptor('file'))
    formData.append('file', file); 
    
    // Optionally include product context in the FormData if the backend requires it 
    // for pathing/organizing (e.g., bucket/product_id/model.glb)
    // formData.append('productId', productId); 

    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/s3/upload`;
                
        // 3. API Call
        const response = await fetch(url, { 
            method: 'POST',
            body: formData,
            // DO NOT set Content-Type for FormData
        });

        // 4. Handle Response
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                `3D Model upload failed: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`
            );
        }

        const data = await response.json();
        
        // Ensure the backend returns the URL as expected
        if (!data || !data.url) {
            throw new Error("3D Model upload succeeded, but response is missing the 'url' field.");
        }
        
        return data.url; // The S3/Minio URL
        
    } catch (error) {
        console.error("3D Model upload failed:", error);
        throw error;
    }
};

// =============================================================================
// @function updateProductVariantsApi (Using native fetch())
// =============================================================================
/**
 * Triggers the backend PATCH endpoint to update specific fields for multiple variants.
 * @param {string} productId - The ID of the parent product.
 * @param {Array<Object>} updateList - An array of variant objects to update (UpdateVariantStockDto[]).
 * @returns {Promise<Array<Object>>} A promise that resolves to the array of updated variants.
 */
export const updateProductVariantsApi = async (productId, updateList) => {
    // 1. Define the URL for the PATCH endpoint
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-variants/product/${productId}`; // Adjust with your full base URL if necessary (e.g., 'https://api.yourdomain.com' + url)

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            // 2. Set headers to indicate we are sending and expecting JSON
            headers: {
                'Content-Type': 'application/json',
                // Add any necessary authorization headers here (e.g., Bearer Token)
                // 'Authorization': `Bearer ${yourAuthToken}`, 
            },
            // 3. Convert the request body (updateList) to a JSON string
            body: JSON.stringify(updateList),
        });

        // 4. Handle HTTP errors (4xx or 5xx status codes)
        if (!response.ok) {
            // Attempt to parse the error message from the response body
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                errorData = { message: `HTTP error! Status: ${response.status}` };
            }
            throw new Error(errorData.message || `Failed to update variants. Status: ${response.status}`);
        }

        // 5. Parse the successful JSON response
        const data = await response.json();

        // 6. Return the 'updated' array as per the backend contract
        return data.updated;
        
    } catch (error) {
        console.error("Error updating product variants using fetch():", error.message);
        // Re-throw the error to be handled by the calling function (handleUpdateVariants)
        throw error;
    }
};

// =============================================================================
// NEW FUNCTION: deleteProduct
// =============================================================================
/**
 * Deletes a product by its ID on the backend API.
 * @param {string} id - The ID of the product to delete.
 * @returns {Promise<void>} A promise that resolves when the product is successfully deleted.
 * @throws {Error} If the network request fails or the API returns an error status.
 */
export const deleteProduct = async (id) => {
    try {
        if (!id) {
          throw new Error("Product ID is required for deleting a product.");
        }

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`;

        const response = await fetch(url, {
            method: 'DELETE', 
            // Add Authorization header here if needed
        });

        if (!response.ok) {
            // Attempt to get more detail from the error response body if possible
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                `Failed to delete product ${id}: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`
            );
        }

        // A successful DELETE request often returns a 204 No Content, 
        // so we don't expect a body.
        console.log(`[API SUCCESS] Product ID: ${id} successfully deleted.`);
        return;

    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};