"use client";

// ======================================================
// Product Search Page (Refactored)
// ======================================================

import { H5, Paragraph } from "@/components/Typography";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Grid,
  Container,
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
  Typography,
  Select,
  MenuItem,
  FormControl
} from "@mui/material";
import { useState, useEffect, useMemo, useCallback, useRef } from "react"; // Import useRef
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import SortIcon from '@mui/icons-material/Sort';

import ProductFilterCard from "../product-filter-card";
import ProductsGridView from "../products-grid-view";
import TopSortCard from "../top-sort-card";

// ======================================================
// 1. Helper Functions
// ======================================================

/**
 * Helper function for shallow array comparison to avoid unnecessary re-renders.
 * Sorts arrays before comparison to handle different orderings.
 * @param {Array} a - First array to compare.
 * @param {Array} b - Second array to compare.
 * @returns {boolean} True if arrays are equal, false otherwise.
 */
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  for (let i = 0; i < sortedA.length; i++) {
    if (sortedA[i] !== sortedB[i]) return false;
  }
  return true;
}

// ======================================================
// 2. Reusable UI Components
// ======================================================

/**
 * Encapsulates the ProductFilterCard and its props for cleaner usage.
 * @param {object} props - Props to pass to ProductFilterCard.
 */
function FilterControls(props) {
  return <ProductFilterCard {...props} />;
}

/**
 * Mobile-specific header component including filter and sort buttons.
 * @param {object} props - Component props.
 * @param {function} props.toggleDrawer - Function to toggle the filter drawer.
 * @param {string} props.sortOption - Current sort option.
 * @param {function} props.handleSortChange - Handler for sort option change.
 * @param {number} props.displayedProductCount - Number of currently displayed products.
 * @param {string} props.displayFilterText - Text describing current filters.
 */
function MobileProductHeader({ toggleDrawer, sortOption, handleSortChange, displayedProductCount, displayFilterText }) {
  return (
    <>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Box sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          width: '100%', gap: 1, flexWrap: 'wrap'
        }}>
          {/* Filter Button */}
          <IconButton onClick={toggleDrawer(true)} sx={{
            flexGrow: 1, flexBasis: '45%', border: '1px solid', borderColor: 'grey.400',
            borderRadius: 1, p: '8px 12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.5
          }}>
            <FilterListIcon /><Paragraph>Filter</Paragraph>
          </IconButton>

          {/* Mobile Sort Control */}
          <FormControl variant="outlined" size="small" sx={{
            flexGrow: 1, flexBasis: '45%', minWidth: 'auto',
            '& .MuiOutlinedInput-root': { borderRadius: 1, px: '8px', py: '2px', display: 'flex', alignItems: 'center', gap: 0.5 },
            '& .MuiInputLabel-root': { transform: 'translate(40px, 9px) scale(0.75)', '&.MuiInputLabel-shrink': { transform: 'translate(14px, -9px) scale(0.75)', }, },
            '& .MuiSelect-select': { paddingLeft: '0 !important', paddingRight: '24px !important', display: 'flex', alignItems: 'center', },
          }}>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              displayEmpty
              startAdornment={<SortIcon sx={{ mr: 0.5 }} />}
            >
              <MenuItem value="latest">Latest</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      {/* Total results text and filtered text */}
      <Box px={4} py={3}>
        <Typography variant="body2" sx={{ whiteSpace: 'nowrap', flexShrink: 0, mr: 1 }}>
          Total {displayedProductCount} results {displayFilterText}
        </Typography>
      </Box>
    </>
  );
}

/**
 * Side Drawer component for mobile filter controls.
 * @param {object} props - Component props.
 * @param {boolean} props.open - Whether the drawer is open.
 * @param {function} props.onClose - Handler to close the drawer.
 * @param {function} props.onResetFilters - Handler to reset all filters.
 * @param {object} props.filterControlProps - Props object for FilterControls component.
 */
function ProductFilterDrawer({ open, onClose, onResetFilters, filterControlProps }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 330, display: 'flex', flexDirection: 'column', height: '100%' }} role="presentation">
        {/* Drawer Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #e0e0e0', background: '#fff', flexShrink: 0, }}>
          <Typography variant="h6">Filter</Typography>
          <Box>
            <IconButton onClick={onResetFilters} size="small" aria-label="Reset Filters"><ReplayIcon /></IconButton>
            <IconButton onClick={onClose} size="small" aria-label="Close Drawer"><CloseIcon /></IconButton>
          </Box>
        </Box>
        {/* Scrollable content area for Product Filter Card */}
        <Box sx={{ overflowY: 'auto', flexGrow: 1, p: 5 }}>
          <FilterControls {...filterControlProps} />
        </Box>
      </Box>
    </Drawer>
  );
}

// ======================================================
// 3. Custom Hooks
// ======================================================

/**
 * Custom hook to fetch product data and initialize filter states.
 * @param {string} slug - The slug for product filtering (if any).
 * @param {URLSearchParams} searchParams - Current URL search parameters.
 * @param {object} filterState - The current filter state.
 * @param {function} setFilterState - Setter for the filter state.
 * @param {React.MutableRefObject<boolean>} isInitialLoadRef - Ref to track initial load.
 * @returns {{
 * loading: boolean,
 * error: string | null,
 * }} Loading state and error.
 */
function useProductDataAndFilters(slug, searchParams, filterState, setFilterState, isInitialLoadRef) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setFilterState(prevState => {
          const newState = {
            ...prevState,
            allProducts: data.products,
            allBrands: data.brands,
            priceLimits: [data.priceRange.min, data.priceRange.max],
            priceRange: [data.priceRange.min, data.priceRange.max],
            category: data.category,
            allGenders: data.genders.map(g => g.toLowerCase()),
            allAvailabilities: data.availabilities,
            allColors: data.colors,
          };

          // ONLY on initial component load, synchronize selected filters from URL
          // This prevents re-initializing from URL after user interacts with filters or router.replace()
          if (isInitialLoadRef.current) {
            const currentGenderQuery = searchParams.getAll("gender").map(g => g.toLowerCase());
            const validGenders = data.genders.map(g => g.toLowerCase());
            const filteredQueryGenders = currentGenderQuery.filter(g => validGenders.includes(g));
            newState.selectedGenders = filteredQueryGenders;

            const currentCategoryQuery = searchParams.getAll("category").map(c => c.toLowerCase());
            const initialCheckedCategoryIds = [];
            const initialCheckedCategoryNames = new Set(currentCategoryQuery);

            if (currentCategoryQuery.length > 0 && newState.category) {
              newState.category.forEach(cat => {
                cat.subCategory?.forEach(sub => {
                  if (sub.subcategoryItem && initialCheckedCategoryNames.has(sub.subcategoryItem.name.toLowerCase())) {
                    initialCheckedCategoryIds.push(sub.subcategoryItem.id);
                  }
                });
              });
            }
            if (!arraysEqual(initialCheckedCategoryIds, prevState.checkedCategoryIds)) {
              newState.checkedCategoryIds = initialCheckedCategoryIds;
            }
            isInitialLoadRef.current = false; // Mark initial load as done
          }
          return newState;
        });
      })
      .catch(err => {
        console.error("Failed to fetch product data:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [slug]); // Depend only on slug for re-fetch, searchParams handled by isInitialLoadRef

  return { loading, error };
}


/**
 * Custom hook to apply filters and sorting to products.
 * @param {object} filterState - The current state of all filters.
 * @param {string} sortOption - The current sorting option.
 * @param {Array<string>} categoryQuery - Category names from URL query.
 * @returns {Array<object>} The filtered and sorted list of products.
 */
function useFilteredAndSortedProducts(filterState, sortOption, categoryQuery) {
  return useMemo(() => {
    let list = [...filterState.allProducts]; // Start with a fresh copy to avoid mutating original

    // Apply category filter
    if (filterState.checkedCategoryIds.length > 0) {
      const subIds = new Set(filterState.checkedCategoryIds);
      list = list.filter(p => p.subcategoryItem && subIds.has(p.subcategoryItem.id));
    } else if (categoryQuery.length > 0 && filterState.checkedCategoryIds.length === 0) {
      // If categories are in URL but none match, show empty list
      list = [];
    }

    // Apply brand filter
    if (filterState.selectedBrands.length) {
      const brandIds = new Set(filterState.selectedBrands.map(b => b.id));
      list = list.filter(p => p.company && brandIds.has(p.company.id));
    }

    // Apply gender filter
    if (filterState.selectedGenders.length) {
      const genderSet = new Set(filterState.selectedGenders);
      list = list.filter(p => p.gender && genderSet.has(p.gender));
    }

    // Apply price range filter
    list = list.filter(
      p => p.price >= filterState.priceRange[0] && p.price <= filterState.priceRange[1]
    );

    // Apply availability filter
    if (filterState.selectedAvailabilities.length) {
      if (!Array.isArray(filterState.selectedAvailabilities)) {
        console.warn("filterState.selectedAvailabilities is not an array:", filterState.selectedAvailabilities);
        list = [];
        return list;
      }
      const availSet = new Set(filterState.selectedAvailabilities);
      list = list.filter(p => Array.isArray(p.availability) ? p.availability.some(a => availSet.has(a)) : availSet.has(p.availability));
    }

    // Apply color filter
    if (filterState.selectedColors.length) {
      if (!Array.isArray(filterState.selectedColors)) {
        console.warn("filterState.selectedColors is not an array:", filterState.selectedColors);
        list = [];
        return list;
      }
      const colorCodes = new Set(filterState.selectedColors.map(c => c.code.toLowerCase()));
      list = list.filter(p =>
        p.colors?.some(c => colorCodes.has(c.code?.toLowerCase()))
      );
    }

    // Apply sorting
    if (sortOption === "latest") {
      list.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } else if (sortOption === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [
    filterState.allProducts, filterState.selectedBrands, filterState.checkedCategoryIds,
    filterState.selectedGenders, filterState.priceRange, filterState.selectedAvailabilities,
    filterState.selectedColors, categoryQuery, sortOption,
  ]);
}

// ======================================================
// 4. Main ProductSearchPageView Component
// ======================================================

export default function ProductSearchPageView({ slug }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [sortOption, setSortOption] = useState("latest"); // Default sort option

  // Consolidated filter state
  const [filterState, setFilterState] = useState({
    allGenders: [],
    selectedGenders: [],
    allProducts: [],
    allBrands: [],
    selectedBrands: [],
    priceRange: [0, 300],
    priceLimits: [0, 300],
    category: [],
    checkedCategoryIds: [],
    allAvailabilities: [],
    selectedAvailabilities: [],
    allColors: [],
    selectedColors: [],
  });

  // Ref to manage initial data load and URL parameter synchronization
  const isInitialLoadRef = useRef(true);

  // Custom hook to handle data fetching and initial filter state setup
  const { loading, error } = useProductDataAndFilters(slug, searchParams, filterState, setFilterState, isInitialLoadRef);


  // Memoized query parameters from URL for display purposes only
  const genderQuery = useMemo(
    () => searchParams.getAll("gender").map(g => g.toLowerCase()),
    [searchParams]
  );
  const categoryQuery = useMemo(
    () => searchParams.getAll("category").map(c => c.toLowerCase()),
    [searchParams]
  );

  // Custom hook to apply filters and sorting
  const displayedProducts = useFilteredAndSortedProducts(filterState, sortOption, categoryQuery);

  /**
   * Constructs the target URL query string based on the current filterState.
   * This ensures all filter parameters are considered.
   * @returns {string} The canonical URL query string.
   */
  const constructTargetUrlQueryString = useCallback(() => {
    const params = new URLSearchParams();

    // Add gender filters
    filterState.selectedGenders.forEach(g => params.append("gender", g));

    // Add category filters (map IDs back to names)
    const categoryNameMap = new Map();
    // Ensure filterState.category is an array before iterating
    if (Array.isArray(filterState.category)) {
      filterState.category.forEach(cat => {
          cat.subCategory?.forEach(sub => {
              if (sub.subcategoryItem) {
                  categoryNameMap.set(sub.subcategoryItem.id, sub.subcategoryItem.name.toLowerCase());
              }
          });
      });
    }
    filterState.checkedCategoryIds.forEach(id => {
        const name = categoryNameMap.get(id);
        if (name) params.append("category", name);
    });

    // Add brand filters
    filterState.selectedBrands.forEach(b => params.append("brand", b.id)); // Assuming brands have an 'id'

    // Add availability filters
    filterState.selectedAvailabilities.forEach(a => params.append("availability", a));

    // Add color filters (assuming color objects have a 'code' property)
    filterState.selectedColors.forEach(c => params.append("color", c.code.toLowerCase()));

    // Preserve any existing parameters from the current URL that are not managed by these filters
    const currentUrlParams = new URLSearchParams(searchParams.toString());
    Array.from(currentUrlParams.keys()).forEach(key => {
      if (!['gender', 'category', 'brand', 'availability', 'color', 'price_min', 'price_max'].includes(key)) {
          currentUrlParams.getAll(key).forEach(val => params.append(key, val));
      }
    });

    return params.toString(); // URLSearchParams.toString() automatically sorts parameters
  }, [
      filterState.selectedGenders,
      filterState.checkedCategoryIds,
      filterState.category, // dependency added for categoryNameMap to update
      filterState.selectedBrands,
      filterState.selectedAvailabilities,
      filterState.selectedColors,
      filterState.priceRange,
      searchParams // Keep searchParams here for preserving other existing params
  ]);


  // Consolidated useEffect for URL synchronization
  useEffect(() => {
    // Only attempt to sync if initial data load is complete (i.e., not an initial load)
    // and if the current filterState is available.
    // This `useEffect` fires AFTER local state updates are committed.
    if (!isInitialLoadRef.current) { // Only sync URL after initial load
      const currentUrlQueryString = searchParams.toString();
      const desiredUrlQueryString = constructTargetUrlQueryString();

      // Only update URL if the desired state is different from the current URL state
      if (desiredUrlQueryString !== currentUrlQueryString) {
        router.replace(`${window.location.pathname}?${desiredUrlQueryString}`, undefined, { shallow: true });
      }
    }
  }, [
      constructTargetUrlQueryString,
      searchParams,
      router,
      isInitialLoadRef // Dependency to react to initial load status
  ]);

  /**
   * Generic handler for filter changes (gender/category/availability/colors).
   * This function ONLY updates the local `filterState`. URL updates are handled by the dedicated `useEffect`.
   * @param {'gender' | 'category' | 'availability' | 'colors'} filterType - The type of filter being changed.
   * @param {string | object} value - The value of the filter item (e.g., gender string, category ID, availability string, color object).
   * @param {boolean} isChecked - Whether the item is being checked or unchecked.
   */
  const handleFilterChange = useCallback((filterType, value, isChecked) => {
    setFilterState(prevState => {
      let updatedArray;
      let stateKey;
      let currentArray;

      switch (filterType) {
        case 'gender':
          stateKey = 'selectedGenders';
          currentArray = prevState.selectedGenders;
          updatedArray = isChecked
            ? (currentArray.includes(value) ? currentArray : [...currentArray, value])
            : currentArray.filter(g => g !== value);
          break;
        case 'category':
          stateKey = 'checkedCategoryIds';
          currentArray = prevState.checkedCategoryIds;
          updatedArray = isChecked
            ? (currentArray.includes(value) ? currentArray : [...currentArray, value])
            : currentArray.filter(id => id !== value);
          break;
        case 'availability':
          stateKey = 'selectedAvailabilities';
          currentArray = prevState.selectedAvailabilities;
          updatedArray = isChecked
            ? (currentArray.includes(value) ? currentArray : [...currentArray, value])
            : currentArray.filter(a => a !== value);
          break;
        case 'colors':
          stateKey = 'selectedColors';
          currentArray = prevState.selectedColors;
          const colorCode = value.code?.toLowerCase(); // Assuming value is { name, code }
          updatedArray = isChecked
            ? (currentArray.some(c => c.code?.toLowerCase() === colorCode) ? currentArray : [...currentArray, value])
            : currentArray.filter(c => c.code?.toLowerCase() !== colorCode);
          break;
        default:
          return prevState; // No change if filterType is unknown
      }

      // Only return new state if it's actually different to prevent unnecessary re-renders
      return arraysEqual(updatedArray, currentArray) ? prevState : { ...prevState, [stateKey]: updatedArray };
    });
  }, []);

  const handleSortChange = useCallback((event) => {
    setSortOption(event.target.value);
  }, []);

  if (error) {
    return (
      <Container className="mt-2 mb-3">
        <H5>Error: {error}</H5>
      </Container>
    );
  }

  // Generate display names for filters
  const categoryDisplayName = genderQuery.length > 0 && categoryQuery.length > 0
    ? `'${categoryQuery.map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(', ')}'`
    : '';

  const genderDisplayName = genderQuery.length > 0
    ? `'${genderQuery.map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(', ')}'`
    : '';

  // Construct the display text dynamically
  const displayFilterText = useMemo(() => {
    const parts = [];
    if (genderDisplayName && !categoryDisplayName) { // Only gender when no category filter
      parts.push(genderDisplayName);
    } else if (categoryDisplayName && !genderDisplayName) { // Only category when no gender filter
        parts.push(categoryDisplayName);
    } else if (genderDisplayName && categoryDisplayName) { // Both gender and category filters
        parts.push(genderDisplayName);
        parts.push(categoryDisplayName);
    }
    return parts.length > 0 ? `for ${parts.join(' and ')}` : '';
  }, [genderDisplayName, categoryDisplayName]);


  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(open);
  };

  /**
   * Resets all filters to their initial state.
   * URL updates are handled by the `useEffect` listening to `filterState` changes.
   */
  const handleResetAllFilters = useCallback(() => {
    setFilterState(prevState => ({
      ...prevState,
      selectedBrands: [],
      selectedGenders: [],
      priceRange: prevState.priceLimits,
      checkedCategoryIds: [],
      selectedAvailabilities: [],
      selectedColors: [],
    }));
    setSortOption("latest");
    // The URL will be updated by the `useEffect` for URL synchronization after state update.
  }, [setFilterState]);


  // Props object for FilterControls component, derived from consolidated filterState
  const filterControlProps = {
    allBrands: filterState.allBrands,
    selectedBrands: filterState.selectedBrands,
    setSelectedBrands: (brands) => setFilterState(p => ({ ...p, selectedBrands: brands })),
    priceRange: filterState.priceRange,
    setPriceRange: (range) => setFilterState(p => ({ ...p, priceRange: range })),
    priceLimits: filterState.priceLimits,
    category: filterState.category,
    checkedCategoryIds: filterState.checkedCategoryIds,
    onCategoryFilterChange: handleFilterChange.bind(null, 'category'),
    allGenders: filterState.allGenders,
    selectedGenders: filterState.selectedGenders,
    onGenderFilterChange: handleFilterChange.bind(null, 'gender'),
    allAvailabilities: filterState.allAvailabilities,
    selectedAvailabilities: filterState.selectedAvailabilities,
    onAvailabilityFilterChange: handleFilterChange.bind(null, 'availability'),
    allColors: filterState.allColors,
    selectedColors: filterState.selectedColors,
    onColorFilterChange: handleFilterChange.bind(null, 'colors'),
    onClearAllFilters: handleResetAllFilters, // ADDED THIS LINE
  };

  return (
    <Box sx={{ py: 5, background: "#FFF" }} >
      <Container>
        <Grid container spacing={3}>

          {/* Mobile-only Filter and Sort Header */}
          {isMobile && (
            <MobileProductHeader
              toggleDrawer={toggleDrawer}
              sortOption={sortOption}
              handleSortChange={handleSortChange}
              displayedProductCount={displayedProducts.length}
              displayFilterText={displayFilterText}
            />
          )}

          {/* Left Filter Card - Hidden on mobile, visible on desktop */}
          <Grid item md={2.5} sx={{ display: { md: "block", xs: "none" } }}>
            <FilterControls {...filterControlProps} />
          </Grid>

          {/* Side Drawer for mobile filter */}
          <ProductFilterDrawer
            open={openDrawer}
            onClose={toggleDrawer(false)}
            onResetFilters={handleResetAllFilters}
            filterControlProps={filterControlProps}
          />

          {/* Right Product List */}
          <Grid item md={9.5} xs={12}>
            {/* Top Sort Card - Only visible on desktop. */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <TopSortCard
                products={displayedProducts}
                slug={genderQuery[0]}
                totalProducts={displayedProducts.length}
                categoryDisplayName={categoryDisplayName}
                genderDisplayName={genderDisplayName}
              />
            </Box>

            {/* Products Grid View */}
            <ProductsGridView
              products={displayedProducts}
              loading={loading}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
