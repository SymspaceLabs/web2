// ============================================
// hooks/use-search.js (FINAL FIXED VERSION)
// ============================================

import { useState, useRef, useEffect, useCallback, useTransition } from "react";
import { debounce } from 'lodash'; 

const SEARCH_DEBOUNCE_DELAY = 300; // milliseconds

/**
 * `useSearch` is a custom React hook that provides search functionality
 * by fetching structured data from a backend API, managing state, and handling 
 * input with debouncing and request cancellation.
 */
export default function useSearch() {
  const parentRef = useRef();
  const [_, startTransition] = useTransition(); 
  const [resultList, setResultList] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State to hold the structured shop results (used ONLY for the conditional action link)
  const [shopResultList, setShopResultList] = useState([]);
  
  const searchAbortControllerRef = useRef(null); 

  /**
   * Fetches structured search results ({ shops: [], searchResults: [] }) from the API.
   */
  const fetchSearchResults = useCallback(async (term) => {
    // 1. Abort ongoing request
    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort();
    }

    // Exit on short/empty query
    if (!term || term.trim().length < 2) {
      setResultList([]);
      setShopResultList([]); 
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    // 2. Setup AbortController for the new request
    const controller = new AbortController();
    const signal = controller.signal;
    searchAbortControllerRef.current = controller;

    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search?q=${encodeURIComponent(term)}`;

      const response = await fetch(url, { signal }); 

      if (signal.aborted) return; 

      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) errorMessage = errorData.message;
        } catch (parseError) {
          console.error("Error parsing API error response:", parseError);
        }
        throw new Error(errorMessage);
      }

      // Data is structured: { shops: [], searchResults: [] }
      const data = await response.json(); 

      startTransition(() => {
        // 1. Store the shop results separately for the action link logic
        setShopResultList(data.shops || []);
        
        // 2. FIX: ONLY use searchResults for the main dropdown list. 
        // We explicitly exclude data.shops to prevent duplication.
        const generalResults = [
            ...(data.searchResults || [])
        ];
        
        // 3. Map the general results to the component's expected format
        const mappedResults = generalResults.map(item => {
            
            // Dynamic link generation logic (re-checking for safety/completeness)
            let link;
            if (item.type === 'company' && item.slug) {
                // This block should theoretically only run if a company result slipped into searchResults
                link = `/company/${item.slug}`;
            } else if (item.link) {
                // Fallback to any direct link provided by the backend
                link = item.link;
            } else {
                // Default to a generic search page
                link = `/search?q=${encodeURIComponent(item.label)}`;
            }
            
            return {
              id: item.id,
              title: item.label,
              link: link, 
              slug: item.slug, 
              type: item.type,
            };
        });

        setResultList(mappedResults);
      });

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error("Search API error:", err);
        startTransition(() => {
          setError(err.message || "An unexpected error occurred during search.");
          setResultList([]);
          setShopResultList([]); 
        });
      }
    } finally {
      if (searchAbortControllerRef.current && !signal.aborted) {
        searchAbortControllerRef.current = null;
        setLoading(false);
      }
    }
  }, []); 


  // Debounce the API call
  const debouncedFetchSearchResults = useCallback(
    debounce((term) => {
      fetchSearchResults(term);
    }, SEARCH_DEBOUNCE_DELAY),
    [fetchSearchResults] 
  );

  /**
   * Event handler for changes in the search input field.
   */
  const handleSearch = (e) => {
    const value = e.target?.value;
    
    if (!value || value.trim() === '') {
      // Clear all state on empty input
      setResultList([]);
      setShopResultList([]); 
      setError(null);
      setLoading(false);
      
      // Cancel pending operations
      debouncedFetchSearchResults.cancel(); 
      if (searchAbortControllerRef.current) {
         searchAbortControllerRef.current.abort();
         searchAbortControllerRef.current = null;
      }
      return;
    }
    
    debouncedFetchSearchResults(value);
  };
  
  // Effect hook cleanup on unmount/dependency change
  useEffect(() => {
    return () => {
      // Cleanup: Abort any pending request on unmount
      if (searchAbortControllerRef.current) {
        searchAbortControllerRef.current.abort();
      }
      // Cleanup: Also cancel any pending debounced calls on unmount
      debouncedFetchSearchResults.cancel();
    };
  }, [debouncedFetchSearchResults]); 

  return {
    parentRef,
    resultList,
    handleSearch,
    loading,
    error,
    shopResultList, // Exported for conditional rendering
  };
}