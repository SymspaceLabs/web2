"use client";
// =============================================================
// Cart Context
// =============================================================

import { createContext, useMemo, useReducer, useEffect  } from "react";

const INITIAL_CART = [];
const INITIAL_STATE = { cart: INITIAL_CART };

export const CartContext = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CART_AMOUNT":
      const { id, qty, selectedColor, selectedSize, ...rest } = action.payload;
      let cartList = state.cart;

      // Find if a product with the same ID, Color, and Size exists
      let exist = cartList.find(
        item =>
          item.id === id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      // Remove item if qty is less than 1
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

      case "INITIALIZE_CART":
        return {
          ...state,
          cart: action.payload,
        };

    default:
      return state;
  }
};

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Load cart from localStorage on first render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          dispatch({
            type: "INITIALIZE_CART",
            payload: JSON.parse(storedCart),
          });
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
    }
  }, []);

  // Save cart to localStorage on every change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
