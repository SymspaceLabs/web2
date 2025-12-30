"use client";
// ==============================================================
// Favorites Context - With Variant-Level Support
// ==============================================================

import { createContext, useContext, useReducer, useMemo, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

// ✅ UPDATED: Store favorites with variant identifiers
const INITIAL_STATE = { 
  favoriteIds: [], // Array of composite keys: "productId-colorCode-sizeId"
  favoriteData: {}, // { "productId-colorCode-sizeId": { ...productSnapshot } }
  loading: false,
  error: null
};

const FavoritesContext = createContext();

// ✅ Helper function to create composite key for variant-level favorites
const createFavoriteKey = (productId, colorCode, sizeId) => {
  if (!colorCode || !sizeId) return productId; // Fallback for legacy favorites
  return `${productId}-${colorCode}-${sizeId}`;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const key = createFavoriteKey(
        action.payload.id, 
        action.payload.selectedColor?.value,
        action.payload.selectedSize
      );
      
      const exists = state.favoriteIds.includes(key);
      
      if (exists) {
        // Remove from favorites
        const newFavoriteData = { ...state.favoriteData };
        delete newFavoriteData[key];
        
        return {
          ...state,
          favoriteIds: state.favoriteIds.filter((id) => id !== key),
          favoriteData: newFavoriteData,
        };
      } else {
        // Add to favorites with variant info
        return {
          ...state,
          favoriteIds: [...state.favoriteIds, key],
          favoriteData: {
            ...state.favoriteData,
            [key]: {
              ...action.payload.snapshot,
              _favoriteKey: key // Store the key for easy removal
            }
          }
        };
      }

    case "REMOVE_FAVORITE":
      const removeKey = action.payload;
      const updatedData = { ...state.favoriteData };
      delete updatedData[removeKey];
      
      return {
        ...state,
        favoriteIds: state.favoriteIds.filter((id) => id !== removeKey),
        favoriteData: updatedData,
      };

    case "INITIALIZE_FAVORITES":
      return {
        ...state,
        favoriteIds: action.payload.ids || [],
        favoriteData: action.payload.data || {},
      };

    case "UPDATE_FAVORITE_DATA":
      return {
        ...state,
        favoriteData: {
          ...state.favoriteData,
          [action.payload.id]: {
            ...state.favoriteData[action.payload.id],
            ...action.payload.data
          }
        }
      };

    case "BATCH_UPDATE_FAVORITE_DATA":
      return {
        ...state,
        favoriteData: {
          ...state.favoriteData,
          ...action.payload,
        },
        loading: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "CLEAR_FAVORITES":
      return {
        ...state,
        favoriteIds: [],
        favoriteData: {},
      };

    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { isAuthenticated, user } = useAuth();

  // Load favorites from localStorage on mount (for non-authenticated users)
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isAuthenticated) {
      const storedIds = localStorage.getItem("favoriteIds");
      const storedData = localStorage.getItem("favoriteData");
      
      if (storedIds && storedData) {
        try {
          dispatch({
            type: "INITIALIZE_FAVORITES",
            payload: {
              ids: JSON.parse(storedIds),
              data: JSON.parse(storedData),
            },
          });
        } catch (e) {
          console.error("Failed to parse favorites from localStorage", e);
        }
      }
    }
  }, [isAuthenticated]);

  // Persist to localStorage for non-authenticated users
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isAuthenticated) {
      localStorage.setItem("favoriteIds", JSON.stringify(state.favoriteIds));
      localStorage.setItem("favoriteData", JSON.stringify(state.favoriteData));
    }
  }, [state.favoriteIds, state.favoriteData, isAuthenticated]);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      // ✅ UPDATED: Check if specific variant is favorited
      isFavorited: (productId, colorCode, sizeId) => {
        const key = createFavoriteKey(productId, colorCode, sizeId);
        return state.favoriteIds.includes(key);
      },
      // Helper to get cached product data by key
      getFavoriteData: (key) => state.favoriteData[key],
      // ✅ Get all favorite products with variant info
      getFavoriteProducts: () => {
        return state.favoriteIds
          .map(id => state.favoriteData[id])
          .filter(Boolean);
      },
    }),
    [state]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};