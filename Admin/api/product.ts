// --- 1. Define necessary types (You might have these already in product-form.ts or a types file) ---

import { notFound } from "next/navigation";

// Define the shape of the data that the API returns after a successful update
// This should ideally match the full structure of your product model.
interface ProductApiResponse {
    id: string;
    name: string;
    category: string;
    description: string;
    variants: any[]; // Use the actual Variant type if available
    images: any[];   // Use the actual Image type if available
    // ... all other product fields
}

// Assume you import your main form data interface/type
// import type { FormData } from './product-form';

// Use a generic record if FormData is complex and not fully available here
type PartialFormData = Record<string, any>; 
// Or better: type PartialFormData = Partial<FormData>; if FormData is imported

/**
 * Updates an existing product on the backend API.
 * Sends a PATCH request to update the product data.
 * * @param id - The ID of the product to update.
 * @param updatedData - The partial product data to update (Partial<FormData>).
 * @returns A promise that resolves to the updated product object (ProductApiResponse).
 * @throws {Error} If the network request fails or the API returns an error status.
 */
export const updateProduct = async (
    id: string, // Explicitly define ID as a string
    updatedData: PartialFormData // Explicitly define updatedData as the partial form type
): Promise<ProductApiResponse> => { // Explicitly define the return type

    try {
        if (!id) {
            // TypeScript automatically knows 'id' is a string now
            throw new Error("Product ID is required for updating product data.");
        }

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`;

        const response = await fetch(url, {
            // Your API uses PATCH, which is common for partial updates
            method: 'PATCH', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            // Handle error response body
            const errorData: { message?: string } = await response.json().catch(() => ({}));

            throw new Error(
                `Failed to update product ${id}: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`
            );
        }

        // TypeScript now expects the result to match ProductApiResponse
        const data: ProductApiResponse = await response.json(); 
        return data;

    } catch (error) {
        // Use an 'instanceof' check for safety, or cast 'error' as needed.
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during product update.";
        console.error("Error updating product:", errorMessage);
        
        // Re-throw the original error to be handled by the calling component (ProductForm)
        throw error;
    }
};

/**
 * Updates an existing product on the backend API.
 * Sends a PATCH request to update the product data.
 * * @param id - The ID of the product to update.
 * @param updatedData - The partial product data to update (Partial<FormData>).
 * @returns A promise that resolves to the updated product object (ProductApiResponse).
 * @throws {Error} If the network request fails or the API returns an error status.
 */
export const createProduct = async (
    updatedData: PartialFormData // Explicitly define updatedData as the partial form type
): Promise<ProductApiResponse> => { // Explicitly define the return type

    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`;

        const response = await fetch(url, {
            // Your API uses PATCH, which is common for partial updates
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            // Handle error response body
            const errorData: { message?: string } = await response.json().catch(() => ({}));

            throw new Error(
                `Failed to create product : ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`
            );
        }

        // TypeScript now expects the result to match ProductApiResponse
        const data: ProductApiResponse = await response.json(); 
        return data;

    } catch (error) {
        // Use an 'instanceof' check for safety, or cast 'error' as needed.
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during product update.";
        console.error("Error creating product:", errorMessage);
        
        // Re-throw the original error to be handled by the calling component (ProductForm)
        throw error;
    }
};

export async function getProduct(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  const res = await fetch(`${baseUrl}/products/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    if (res.status === 404) {
      notFound()
    }
    throw new Error("Failed to fetch product")
  }

  return res.json()
}


/**
 * Updates an existing product on the backend API.
 * Sends a PATCH request to update the product data.
 * * @param id - The ID of the product to update.
 * @param updatedData - The partial product data to update (Partial<FormData>).
 * @returns A promise that resolves to the updated product object (ProductApiResponse).
 * @throws {Error} If the network request fails or the API returns an error status.
 */
export const deleteProduct = async (
    id: string, // Explicitly define ID as a string
): Promise<ProductApiResponse> => { // Explicitly define the return type

    try {
        if (!id) {
            // TypeScript automatically knows 'id' is a string now
            throw new Error("Product ID is required for updating product data.");
        }

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`;

        const response = await fetch(url, {
            // Your API uses PATCH, which is common for partial updates
            method: 'DELETE', 
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            // Handle error response body
            const errorData: { message?: string } = await response.json().catch(() => ({}));

            throw new Error(
                `Failed to update product ${id}: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`
            );
        }

        // TypeScript now expects the result to match ProductApiResponse
        const data: ProductApiResponse = await response.json(); 
        return data;

    } catch (error) {
        // Use an 'instanceof' check for safety, or cast 'error' as needed.
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during product update.";
        console.error("Error updating product:", errorMessage);
        
        // Re-throw the original error to be handled by the calling component (ProductForm)
        throw error;
    }
};