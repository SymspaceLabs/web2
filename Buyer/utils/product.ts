// utils/product.ts
export const createFavoriteKey = (
  productId: string,
  colorCode?: string,
  sizeId?: string
): string => {
  if (!colorCode || !sizeId) return productId;
  return `${productId}-${colorCode}-${sizeId}`;
};

export const cleanDescription = (html: string | undefined): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};