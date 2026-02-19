"use client";

import { useAuth } from "@/contexts/AuthContext";
import { FavoritesState, FavoritesAction, FavoriteProduct } from "@/types/favorites";
import { createContext, useContext, useReducer, useMemo, useEffect, ReactNode, Dispatch } from "react";

const INITIAL_STATE: FavoritesState = { 
  favoriteIds: [],
  favoriteData: {},
  loading: false,
  error: null
};

interface FavoritesContextType {
  state: FavoritesState;
  dispatch: Dispatch<FavoritesAction>;
  isFavorited: (productId: string, colorCode?: string, sizeId?: string) => boolean;
  getFavoriteData: (key: string) => FavoriteProduct | undefined;
  getFavoriteProducts: () => FavoriteProduct[];
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Helper function to create composite key for variant-level favorites
const createFavoriteKey = (productId: string, colorCode?: string, sizeId?: string): string => {
  if (!colorCode || !sizeId) return productId;
  return `${productId}-${colorCode}-${sizeId}`;
};

const reducer = (state: FavoritesState, action: FavoritesAction): FavoritesState => {
  switch (action.type) {
    case "TOGGLE_FAVORITE": {
      const key = createFavoriteKey(
        action.payload.id, 
        action.payload.selectedColor?.code,
        action.payload.selectedSize ?? undefined
      );
      
      const exists = state.favoriteIds.includes(key);
      
      if (exists) {
        const newFavoriteData = { ...state.favoriteData };
        delete newFavoriteData[key];
        
        return {
          ...state,
          favoriteIds: state.favoriteIds.filter((id) => id !== key),
          favoriteData: newFavoriteData,
        };
      } else {
        return {
          ...state,
          favoriteIds: [...state.favoriteIds, key],
          favoriteData: {
            ...state.favoriteData,
            [key]: {
              ...action.payload.snapshot,
              _favoriteKey: key
            }
          }
        };
      }
    }

    case "REMOVE_FAVORITE": {
      const removeKey = action.payload;
      const updatedData = { ...state.favoriteData };
      delete updatedData[removeKey];
      
      return {
        ...state,
        favoriteIds: state.favoriteIds.filter((id) => id !== removeKey),
        favoriteData: updatedData,
      };
    }

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

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { isAuthenticated } = useAuth();

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

  const contextValue = useMemo<FavoritesContextType>(
    () => ({
      state,
      dispatch,
      isFavorited: (productId: string, colorCode?: string, sizeId?: string): boolean => {
        const key = createFavoriteKey(productId, colorCode, sizeId);
        return state.favoriteIds.includes(key);
      },
      getFavoriteData: (key: string): FavoriteProduct | undefined => state.favoriteData[key],
      getFavoriteProducts: (): FavoriteProduct[] => {
        return state.favoriteIds
          .map(id => state.favoriteData[id])
          .filter((item): item is FavoriteProduct => Boolean(item));
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

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};