// context/cartContext.jsx

"use client";

import { createContext, useMemo, useReducer, useEffect } from "react";

const INITIAL_CART = [];
const INITIAL_STATE = { cart: INITIAL_CART };

export const CartContext = createContext({});

// ============================================================================
// NEW REDUCER - Stores only references
// ============================================================================
const reducer = (state, action) => {
  switch (action.type) {
    // ========================================
    // NEW ACTION: ADD_TO_CART (Reference-based)
    // ========================================
    case "ADD_TO_CART": {
      const { variantId, quantity = 1 } = action.payload;

      // Validate required fields
      if (!variantId) {
        console.error("variantId is required");
        return state;
      }

      const cartList = [...state.cart];

      // Find existing item by variantId (simplified!)
      const existingIndex = cartList.findIndex(
        item => item.variantId === variantId
      );

      if (existingIndex >= 0) {
        // Update quantity
        cartList[existingIndex] = {
          ...cartList[existingIndex],
          quantity: cartList[existingIndex].quantity + quantity,
        };
      } else {
        // Add new item
        cartList.push({
          variantId,
          quantity,
          addedAt: Date.now(),
        });
      }

      return { ...state, cart: cartList };
    }

    // ========================================
    // NEW ACTION: UPDATE_QUANTITY
    // ========================================
    case "UPDATE_QUANTITY": {
      const { variantId, quantity } = action.payload;

      if (quantity < 1) {
        // Remove item if quantity is 0
        return {
          ...state,
          cart: state.cart.filter(item => item.variantId !== variantId),
        };
      }

      return {
        ...state,
        cart: state.cart.map(item =>
          item.variantId === variantId ? { ...item, quantity } : item
        ),
      };
    }

    // ========================================
    // NEW ACTION: REMOVE_FROM_CART
    // ========================================
    case "REMOVE_FROM_CART": {
      const { variantId } = action.payload;

      return {
        ...state,
        cart: state.cart.filter(item => item.variantId !== variantId),
      };
    }

    // ========================================
    // LEGACY ACTION: CHANGE_CART_AMOUNT (Keep for backward compatibility)
    // This will be removed once all components are updated
    // ========================================
    case "CHANGE_CART_AMOUNT": {
      console.warn(
        "CHANGE_CART_AMOUNT is deprecated. Use ADD_TO_CART instead."
      );

      const { id, qty, selectedColor, selectedSize, variant, ...rest } = action.payload;

      // If variant ID exists, use new format
      if (variant) {
        const existingIndex = state.cart.findIndex(
          item => item.variantId === variant
        );

        if (qty < 1) {
          return {
            ...state,
            cart: state.cart.filter(item => item.variantId !== variant),
          };
        }

        if (existingIndex >= 0) {
          const newCart = [...state.cart];
          newCart[existingIndex] = {
            ...newCart[existingIndex],
            quantity: qty,
          };
          return { ...state, cart: newCart };
        }

        return {
          ...state,
          cart: [
            ...state.cart,
            {
              variantId: variant,
              quantity: qty,
              addedAt: Date.now(),
            },
          ],
        };
      }

      // Legacy format (old way) - for migration period only
      let cartList = state.cart;
      let exist = cartList.find(
        item =>
          item.id === id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (qty < 1) {
        return {
          ...state,
          cart: cartList.filter(
            item =>
              !(
                item.id === id &&
                item.selectedColor === selectedColor &&
                item.selectedSize === selectedSize
              )
          ),
        };
      }

      return {
        ...state,
        cart: exist
          ? cartList.map(item =>
              item.id === id &&
              item.selectedColor === selectedColor &&
              item.selectedSize === selectedSize
                ? { ...item, qty }
                : item
            )
          : [...cartList, { id, qty, selectedColor, selectedSize, ...rest }],
      };
    }

    case "INITIALIZE_CART":
      return {
        ...state,
        cart: action.payload,
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

// ============================================================================
// CartProvider with Migration Logic
// ============================================================================
export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Load cart from localStorage on first render
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Try new format first
      let storedCart = localStorage.getItem("cart_v2");
      
      if (storedCart) {
        try {
          const parsed = JSON.parse(storedCart);
          dispatch({
            type: "INITIALIZE_CART",
            payload: parsed,
          });
          return;
        } catch (e) {
          console.error("Failed to parse cart_v2 from localStorage", e);
        }
      }

      // Fall back to old format and migrate
      storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          const oldCart = JSON.parse(storedCart);

          // Migrate old format to new format
          const migratedCart = oldCart
            .map(item => {
              // Old format has 'variant' field with variantId
              if (item.variant) {
                return {
                  variantId: item.variant,
                  quantity: item.qty || 1,
                  addedAt: Date.now(),
                };
              }
              // If no variant field, skip (can't migrate)
              console.warn("⚠️ Skipping item without variant:", item);
              return null;
            })
            .filter(Boolean);

          dispatch({
            type: "INITIALIZE_CART",
            payload: migratedCart,
          });

          // Save in new format
          localStorage.setItem("cart_v2", JSON.stringify(migratedCart));
        } catch (e) {
          console.error("Failed to migrate cart from localStorage", e);
        }
      }
    }
  }, []);

  // Save cart to localStorage on every change (new format)
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart_v2", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

