// hooks/useEnrichedCart.js

import { useState, useEffect } from "react";
import { useCart } from "./useCart";
import { fetchVariantDetailsBatch } from "@/services/productService";

/**
 * Hook that enriches minimal cart data with full product details
 * Uses bulk API for optimal performance
 */
export function useEnrichedCart() {
  const { state, dispatch } = useCart();
  const [enrichedCart, setEnrichedCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const enrichCart = async () => {
      if (!state.cart || state.cart.length === 0) {
        setEnrichedCart([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const variantIds = state.cart.map(item => item.variantId);

        // ✅ Use bulk fetch for better performance
        const variants = await fetchVariantDetailsBatch(variantIds);

        // Create lookup map
        const variantMap = new Map(variants.map(v => [v.variantId, v]));

        // Enrich cart items
        const enriched = state.cart
          .map(cartItem => {
            const variant = variantMap.get(cartItem.variantId);

            if (!variant) {
              console.error(`Variant ${cartItem.variantId} not found`);
              return null;
            }

            const currentPrice = variant.salePrice || variant.price;
            const subtotal = currentPrice * cartItem.quantity;

            return {
              // Cart-specific data
              variantId: cartItem.variantId,
              quantity: cartItem.quantity,
              addedAt: cartItem.addedAt,

              // Product data (enriched)
              product: {
                id: variant.productId,
                name: variant.productName,
                slug: variant.productSlug,
              },

              // Variant data (enriched)
              variant: {
                sku: variant.sku,
                price: variant.price,
                salePrice: variant.salePrice,
                stock: variant.stock,
                imageUrl: variant.imageUrl,
                color: variant.color,
                size: variant.size,
              },

              // Calculated fields
              currentPrice,
              subtotal,
            };
          })
          .filter(Boolean);

        setEnrichedCart(enriched);
      } catch (err) {
        console.error("Error enriching cart:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    enrichCart();
  }, [state.cart]);

  // Calculate summary
  const summary = {
    subtotal: enrichedCart.reduce((sum, item) => sum + item.subtotal, 0),
    totalItems: enrichedCart.reduce((sum, item) => sum + item.quantity, 0),
    itemCount: enrichedCart.length,
  };

  return {
    cart: enrichedCart,
    rawCart: state.cart, // For debugging
    loading,
    error,
    summary,
    dispatch,
  };
}