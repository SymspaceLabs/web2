import { useEffect, useRef, useState, useTransition } from "react";
import CATEGORIES_DATA from "@/data/categories";

/**
 * Flattens a nested array of categories into a single-level array of suggestions.
 * Each suggestion includes an ID, title, and a generated link.
 * Defensive checks are added to ensure 'slug' and 'title' are strings to prevent '[object Object]' errors.
 * @param {Array<Object>} categories The array of category objects, potentially nested with 'child' arrays.
 * @param {string} parentPath The accumulated path for nested categories (used for unique ID generation).
 * @returns {Array<Object>} A flattened array of category suggestion objects.
 */
function flattenCategories(categories, parentPath = '') {
  let flattened = [];
  categories.forEach((cat, index) => {
    // Ensure slug and title are strings before using them in interpolation or checks.
    const safeSlug = typeof cat.slug === 'string' ? cat.slug : '';
    const safeTitle = typeof cat.title === 'string' ? cat.title : '';

    // Generate a unique ID for each category and suggestion.
    const idBase = safeSlug || `${parentPath}-${safeTitle}-${index}`.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();

    // Only add to flattened list if a safe slug exists.
    if (safeSlug) {
      // Modify link generation based on your new routing requirement
      if (safeTitle.toLowerCase() === 'handbags') {
        flattened.push({
          id: `${idBase}-women`,
          title: `${safeTitle} for women`,
          link: `/products/search/all?category=${safeSlug}&gender=women` // Updated link format
        });
      } else {
        flattened.push({
          id: `${idBase}-men`,
          title: `${safeTitle} for men`,
          link: `/products/search/all?category=${safeSlug}&gender=men` // Updated link format
        });
        flattened.push({
          id: `${idBase}-women`,
          title: `${safeTitle} for women`,
          link: `/products/search/all?category=${safeSlug}&gender=women` // Updated link format
        });
      }
    }

    // Recursively flatten child categories if they exist.
    if (cat.child) {
      flattened = flattened.concat(flattenCategories(cat.child, safeTitle));
    }
  });
  return flattened;
}

// Pre-process all possible category suggestions once when the module loads.
const allCategorySuggestions = flattenCategories(CATEGORIES_DATA);

/**
 * Normalizes text by converting it to lowercase and removing hyphens.
 * This function is crucial for making the search flexible,
 * e.g., allowing "tshirts" to match "t-shirts".
 * @param {string} text The input string to normalize.
 * @returns {string} The normalized string.
 */
const normalizeText = (text) => text.toLowerCase().replace(/-/g, '');

/**
 * `useSearch` is a custom React hook that provides search functionality
 * for category suggestions based on `CATEGORIES_DATA`.
 * It manages search state (results, loading, error) and handles user input.
 */
export default function useSearch() {
  const parentRef = useRef();
  const [_, startTransition] = useTransition();
  const [resultList, setResultList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Filters `allCategorySuggestions` based on the provided `searchText`.
   * It uses `normalizeText` for case-insensitive and hyphen-insensitive matching.
   * @param {string} searchText The text entered by the user in the search field.
   */
  const getCategorySuggestions = async (searchText) => {
    setLoading(true);
    setError(null);
    try {
      if (!searchText) {
        setResultList([]);
        return;
      }

      const normalizedSearchText = normalizeText(searchText);

      const filteredSuggestions = allCategorySuggestions.filter(suggestion =>
        normalizeText(suggestion.title).includes(normalizedSearchText)
      );
      setResultList(filteredSuggestions);
    } catch (err) {
      console.error("Failed to process category suggestions:", err);
      setError("Failed to load category suggestions. Please try again.");
      setResultList([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Event handler for changes in the search input field.
   * Uses `startTransition` to keep the UI responsive during search filtering.
   * @param {Event} e The change event from the input field.
   */
  const handleSearch = (e) => {
    const value = e.target?.value;
    startTransition(() => {
      if (!value || value.trim() === '') {
        setResultList([]);
        setError(null);
      } else {
        getCategorySuggestions(value);
      }
    });
  };

  /**
   * Handles clicks outside the search input area to clear results.
   * @param {Event} event The click event.
   */
  const handleDocumentClick = (event) => {
    if (parentRef.current && !parentRef.current.contains(event.target)) {
      setResultList([]);
      setError(null);
    }
  };

  // Effect hook to add and remove a global click event listener for dismissing results.
  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  return {
    parentRef,
    resultList,
    handleSearch,
    loading,
    error,
  };
}