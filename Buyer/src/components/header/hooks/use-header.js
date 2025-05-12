// contexts/HeaderContext.js or similar

"use client";

import React, { createContext, useContext, useState } from "react";

// Create the context
const HeaderContext = createContext(null);

// Provider component
export const HeaderProvider = ({ children }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [favouriteOpen, setFavouriteOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const toggleDialog = () => setDialogOpen(state => !state);
  const toggleCartOpen = () => setCartOpen(state => !state);
  const toggleFavouriteOpen = () => setFavouriteOpen(state => !state);
  const toggleSearchBar = () => setSearchBarOpen(state => !state);

  return (
    <HeaderContext.Provider
      value={{
        dialogOpen,
        cartOpen,
        favouriteOpen,
        searchBarOpen,
        toggleDialog,
        toggleCartOpen,
        toggleFavouriteOpen,
        toggleSearchBar
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

// Hook to access the context
export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};
