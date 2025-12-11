/**
 * Helper function to determine the initial category display path 
 * based on the initial product data for editing.
 * @param {object} initialValuesProp - The initial values object (from API/props).
 * @returns {string} The formatted path string (e.g., "Men/Apparel/Tops").
 */
export const getInitialCategoryPath = (initialValuesProp) => {
    const item = initialValuesProp.subcategoryItem;

    if (!item) {
        return '';
    }

    // Construct the path: Category / Subcategory / Subcategory Item Name
    const pathSegments = [
        item.category?.name,
        item.subcategory?.name,
        item.name
    ].filter(Boolean); // Filter out any null/undefined segments

    return pathSegments.join(' / ');
};