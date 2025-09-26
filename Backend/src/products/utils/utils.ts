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