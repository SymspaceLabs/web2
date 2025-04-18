"use client";
// ==============================================================
// Favourites Context
// ==============================================================

import { createContext, useContext, useReducer, useMemo } from "react";

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

    default:
      return state;
  }
};

// Provider
export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use Favorites
export const useFavorites = () => useContext(FavoritesContext);
