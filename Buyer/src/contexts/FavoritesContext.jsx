"use client";
// ==============================================================
// Favorites Context
// ==============================================================

import { createContext, useContext, useReducer, useMemo, useEffect } from "react";

// Initial state
const INITIAL_STATE = { favorites: [] };

// Create context
const FavoritesContext = createContext();

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const exists = state.favorites.find((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          favorites: state.favorites.filter((item) => item.id !== action.payload.id),
        };
      } else {
          return {
            ...state,
            favorites: [...state.favorites, action.payload],
          };
      }

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.id !== action.payload),
      };

    case "INITIALIZE_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
      };

    default:
      return state;
  }
};

// Provider
export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Load favorites from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        try {
          dispatch({
            type: "INITIALIZE_FAVORITES",
            payload: JSON.parse(stored),
          });
        } catch (e) {
          console.error("Failed to parse favorites from localStorage", e);
        }
      }
    }
  }, []);

    // Save to localStorage on every change
    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    }, [state.favorites]);


  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use Favorites
export const useFavorites = () => useContext(FavoritesContext);
