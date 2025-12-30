// utils/utils.ts

/**
 * Converts text to a URL-friendly slug.
 * @param text The input string.
 * @returns The slugified string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}


/**
 * Helper function to normalize text for search: lowercase and remove hyphens.
 * @param text The input string.
 * @returns The normalized string.
 */
export function normalizeSearchText(text: string): string {
  return text.toLowerCase().replace(/-/g, '');
}

/**
 * Calculates 'In stock' or 'Sold Out' based on variants' stock count.
 * NOTE: Assumes Product type has a 'variants' array, and each variant has a 'stock' property.
 */

// --- Helper Constants (Define these outside the findAll method) ---
const IN_STOCK = 'In stock';
const OUT_OF_STOCK = 'Sold Out';

export function  determineProductAvailability (product: any): string  {
  // Check if the product has variants and if at least one variant's stock is > 0
  const isInStock = product.variants?.some(variant => (variant.stock || 0) > 0);
  
  return isInStock ? IN_STOCK : OUT_OF_STOCK;
};