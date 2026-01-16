import { Product } from '../entities/product.entity';
import { DisplayPrice } from '../types/display-price.types';

/**
 * Calculates the display price for a product based on its variants
 * Returns the cheapest variant's pricing information
 * @param product - Product entity with variants loaded
 * @returns DisplayPrice object with price, salePrice, and hasSale flag
 */
export function calculateDisplayPrice(product: Product | any): DisplayPrice {
  const variants = product.variants || [];
  
  // Fallback to zero pricing if no variants
  if (variants.length === 0) {
    return {
      price: 0,
      salePrice: 0,
      hasSale: false,
      range: '$0',
    };
  }

  // Filter out-of-stock variants (optional - remove if you want to show all prices)
  const availableVariants = variants.filter(v => v.stock > 0);
  const variantsToUse = availableVariants.length > 0 ? availableVariants : variants;

  // Collect all valid prices
  const validPrices: number[] = [];
  let cheapestVariant = variantsToUse[0];
  let cheapestEffectivePrice = Infinity;

  for (const variant of variantsToUse) {
    const effectivePrice = variant.salePrice || variant.price;
    
    // Skip invalid prices
    if (!effectivePrice || effectivePrice <= 0) continue;
    
    validPrices.push(effectivePrice);
    
    // Track cheapest variant
    if (effectivePrice < cheapestEffectivePrice) {
      cheapestEffectivePrice = effectivePrice;
      cheapestVariant = variant;
    }
  }

  // Handle case where no valid prices exist
  if (validPrices.length === 0) {
    return {
      price: cheapestVariant.price || 0,
      salePrice: cheapestVariant.salePrice || 0,
      hasSale: false,
      range: '$0',
    };
  }

  // Calculate min and max from valid prices
  const minPrice = Math.min(...validPrices);
  const maxPrice = Math.max(...validPrices);

  // Check if the cheapest variant has a sale
  const hasSale = cheapestVariant.salePrice > 0 && cheapestVariant.salePrice < cheapestVariant.price;

  // Format the price range
  const range = formatPriceRange(minPrice, maxPrice);

  return {
    price: cheapestVariant.price,
    salePrice: cheapestVariant.salePrice || 0,
    hasSale,
    range,
  };
}

/**
 * Formats a price range for display
 * @param minPrice - Minimum price
 * @param maxPrice - Maximum price
 * @param currency - Currency symbol (default: '$')
 * @returns Formatted price range string
 */
export function formatPriceRange(minPrice: number, maxPrice: number, currency: string = '$'): string {
  if (minPrice === maxPrice) {
    return `${currency}${minPrice.toFixed(2)}`;
  }
  return `${currency}${minPrice.toFixed(2)} - ${currency}${maxPrice.toFixed(2)}`;
}