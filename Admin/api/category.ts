// src/api/category.ts (or wherever this file is located)

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
import { SubcategoryDetails } from "@/types/category.type";

/**
 * Fetch subcategory item details by slug
 * @param slug - Subcategory item slug
 * @returns Promise<SubcategoryDetails> Subcategory details with tags and defaults
 */
export async function fetchSubcategoryDetailsBySlug(
  slug: string
): Promise<SubcategoryDetails> {
  const url = `${BACKEND_URL}/subcategory-items/slug/${slug}`;

  console.log('📡 Fetching subcategory details:', url);

  try {
    const response = await fetch(url);

    // ✅ Check for HTTP errors
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} - ${response.statusText}`
      );
    }

    // ✅ Parse JSON response
    const data: SubcategoryDetails = await response.json();
    
    console.log('✅ Subcategory details fetched:', data);
    
    return data;
  } catch (error) {
    console.error(`❌ Error fetching subcategory ${slug}:`, error);
    throw new Error(
      `Failed to fetch subcategory details: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// ============================================
// BONUS: Add a function to fetch by ID specifically
// (since your endpoint uses /slug/ but you're passing IDs)
// ============================================

/**
 * Fetch subcategory item details by ID
 * @param id - Subcategory item UUID
 * @returns Promise<SubcategoryDetails> Subcategory details with tags and defaults
 */
export async function fetchSubcategoryDetailsById(
  id: string
): Promise<SubcategoryDetails> {
  // Check if your backend has an endpoint like /subcategory-items/:id
  // If not, you might need to use the slug endpoint and the backend
  // should handle UUID lookups
  const url = `${BACKEND_URL}/subcategory-items/${id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {     
      throw new Error(
        `HTTP error! status: ${response.status} - ${response.statusText}`
      );
    }

    const data: SubcategoryDetails = await response.json();
       
    return data;
  } catch (error) {
    console.error(`❌ Error fetching subcategory by ID ${id}:`, error);
    throw new Error(
      `Failed to fetch subcategory: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}