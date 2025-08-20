// src/context/TitleContext.js
"use client";

import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const TitleContext = createContext(null);

// Create a provider component
export function TitleProvider({ children }) {
  const [title, setTitle] = useState("Product Search"); // Default title
  const [slug, setSlug] = useState("Product Search"); // Default title

  // Effect to apply the title to the document
  useEffect(() => {
    document.title = title;
    document.description = `Discover and Augment ${slug} like never before. View with AR for more convenience and confidence when shopping- only on Symspace.`;
  }, [title]);

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
}

// Custom hook to consume the context
export function useTitle() {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error('useTitle must be used within a TitleProvider');
  }
  return context;
}