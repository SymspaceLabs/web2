import { useState, useRef, useEffect, useCallback, useTransition } from "react";
import { debounce } from 'lodash'; // <--- THIS LINE WAS MISSING AND CAUSED THE ERROR

// You might still keep CATEGORIES_DATA if you plan to search categories in parallel,
// but for now, we'll focus on products from the API.
// import CATEGORIES_DATA from "@/data/categories";

// No longer needed if we're fetching from API directly
// function flattenCategories(categories, parentPath = '') { /* ... */ }
// const allCategorySuggestions = flattenCategories(CATEGORIES_DATA);

// Removed since filtering is now done on the backend
// const normalizeText = (text) => text.toLowerCase().replace(/-/g, '');

const SEARCH_DEBOUNCE_DELAY = 300; // milliseconds

/**
 * `useSearch` is a custom React hook that provides search functionality
 * by fetching data from a backend API.
 * It manages search state (results, loading, error) and handles user input with debouncing.
 */
export default function useSearch() {
  const parentRef = useRef();
  const [_, startTransition] = useTransition(); // Keep useTransition for smoother UI updates
  const [resultList, setResultList] = useState([]); // This will now hold an array of product objects
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchAbortControllerRef = useRef(null); // Ref to store AbortController for cancelling previous requests

  /**
   * Fetches search results from the backend API based on the provided search term.
   * Uses AbortController to cancel previous pending requests if a new one is initiated.
   * @param {string} term The search query entered by the user.
   */
  const fetchSearchResults = useCallback(async (term) => {
    // Abort any ongoing request before starting a new one
    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort();
    }

    if (!term.trim()) {
      setResultList([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    // Create a new AbortController for the current request
    const controller = new AbortController();
    const signal = controller.signal;
    searchAbortControllerRef.current = controller;

    try {
      // Construct the URL for your dedicated search endpoint
      // Adjust the API_BASE_URL to your actual backend URL if it's different from the frontend host
      // Ensure NEXT_PUBLIC_API_URL is set in your .env.local or similar config
      const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const url = `${API_BASE_URL}/products/search?q=${encodeURIComponent(term)}`;

      const response = await fetch(url, { signal }); // Pass the signal to the fetch call

      // Check if the request was aborted before processing the response
      if (signal.aborted) {
        console.log('Fetch aborted for term:', term);
        return; // Exit early if aborted
      }

      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          console.error("Error parsing API error response:", parseError);
        }
        throw new Error(errorMessage);
      }

      const products = await response.json(); // Backend now directly returns an array of products

      startTransition(() => {
        // Map the product data to the format your SearchResult component expects.
        // Assuming SearchResult expects objects with 'id', 'title', 'link', etc.
        // You'll need to decide how to map your product's name, slug, company name, etc.,
        // into a 'title' and 'link' for the search results display.
        // For now, I'll provide a basic mapping, you can adjust as needed.

        const mappedResults = products.map(product => ({
          id: product.id,
          // You can combine product name and company name for the title
          title: `${product.name} by ${product.company ? product.company.entityName : 'N/A'}`,
          // Adjust the link based on how you want to navigate to product details
          // This example uses a generic product detail page slug
          link: `/products/${product.slug}`,
          // You might want to include price or a small description for display
          price: product.price,
          description: product.description,
          // Add a type property if SearchResult uses it to render different result types
          type: 'product'
        }));

        setResultList(mappedResults);
      });

    } catch (err) {
      // Check if the error is due to an aborted request
      if (err.name === 'AbortError') {
        console.log('Fetch operation was aborted:', err.message);
      } else {
        console.error("Search API error:", err);
        startTransition(() => {
          setError(err.message || "An unexpected error occurred during search.");
          setResultList([]);
        });
      }
    } finally {
      // Clear the AbortController ref once the request is complete or aborted
      searchAbortControllerRef.current = null;
      setLoading(false);
    }
  }, []);


  // Debounce the API call
  // Use useMemo here to ensure the debounced function reference is stable
  // This is a common pattern when debouncing functions used in event handlers or effects
  const debouncedFetchSearchResults = useCallback(
    debounce((term) => {
      fetchSearchResults(term);
    }, SEARCH_DEBOUNCE_DELAY),
    [fetchSearchResults] // Dependency array ensures debounced function updates if fetchSearchResults changes
  );

  /**
   * Event handler for changes in the search input field.
   * Calls the debounced API fetch function.
   * @param {Event} e The change event from the input field.
   */
  const handleSearch = (e) => {
    const value = e.target?.value;
    if (!value || value.trim() === '') {
      setResultList([]);
      setError(null);
      // If the input is empty, also cancel any pending debounced calls
      debouncedFetchSearchResults.cancel(); // Use .cancel() from lodash debounce
    }
    debouncedFetchSearchResults(value);
  };

  /**
   * Handles clicks outside the search input area to clear results.
   * @param {Event} event The click event.
   */
  const handleDocumentClick = useCallback((event) => {
    if (parentRef.current && !parentRef.current.contains(event.target)) {
      setResultList([]);
      setError(null);
      // Abort any pending requests when results are dismissed
      if (searchAbortControllerRef.current) {
        searchAbortControllerRef.current.abort();
        searchAbortControllerRef.current = null;
      }
      // Also cancel any pending debounced calls
      debouncedFetchSearchResults.cancel();
      setLoading(false); // Ensure loading is reset
    }
  }, [debouncedFetchSearchResults]); // Add debouncedFetchSearchResults as a dependency

  // Effect hook to add and remove a global click event listener for dismissing results.
  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
      // Cleanup: Abort any pending request when the component unmounts
      if (searchAbortControllerRef.current) {
        searchAbortControllerRef.current.abort();
        searchAbortControllerRef.current = null;
      }
      // Cleanup: Also cancel any pending debounced calls on unmount
      debouncedFetchSearchResults.cancel();
    };
  }, [handleDocumentClick, debouncedFetchSearchResults]); // Add debouncedFetchSearchResults as a dependency

  return {
    parentRef,
    resultList,
    handleSearch,
    loading,
    error,
  };
}