// src/components/ProductSearchPageView.js

"use client";

// ======================================================
// Product Search Page
// ======================================================

import { useState, useMemo, useCallback } from "react";
import { Grid, Container, Box, useMediaQuery } from "@mui/material";

// Import the isolated hooks and helper
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useProductData } from "@/hooks/useProductData";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useFilteredAndSortedProducts } from "@/hooks/useFilteredAndSortedProducts";

import ProductFilterCard from "../product-filter-card";
import ProductsGridView from "../products-grid-view";
import TopSortCard from "../top-sort-card";
import ProductFilterDrawer from "../product-filter-drawer";
import MobileProductHeader from "../mobile-product-header";

// ======================================================
// 1. Reusable UI Components
// ======================================================

/**
 * Encapsulates the ProductFilterCard and its props for cleaner usage.
 * @param {object} props - Props to pass to ProductFilterCard.
 */
function FilterControls(props) {
  return <ProductFilterCard {...props} />;
}

// ======================================================
// 2. Main ProductSearchPageView Component
// ======================================================

// ACCEPT searchParams as a prop
export default function ProductSearchPageView() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [sortOption, setSortOption] = useState("latest"); // Default sort option
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const paramsString = searchParams.toString();

  // Define the handleSortChange function
  const handleSortChange = useCallback((event) => {
    setSortOption(event.target.value);
  }, []);

  // Custom hook to handle data fetching
  const {
    allProducts,
    allBrands,
    priceLimits,
    category, // This is the 'allCategory' data structure
    allGenders,
    allAvailabilities,
    allColors,
    loading,
    error
  } = useProductData(paramsString); // PASS searchParams to the hook

  // Custom hook to manage filter state and URL sync
  const {
    filterState,
    setFilterState,
    handleFilterChange,
    handleResetAllFilters
  } = useProductFilters(
    {
      allProducts,
      allBrands,
      priceLimits,
      category,
      allGenders,
      allAvailabilities,
      allColors,
    },
    // Pass searchParams as an object to the hook
    searchParams
  );

  // Memoized query parameters from URL for display purposes only
  const genderQuery = useMemo(
    // Now searchParams is an object, not a hook result
    () => (Array.isArray(searchParams.gender) ? searchParams.gender : [searchParams.gender]).filter(Boolean).map(g => g.toLowerCase()),
    [searchParams]
  );

  // This memoized value now gets the single most specific category slug.
  const subcategoryItemQuery = useMemo(
    () => searchParams.subcategoryItem || searchParams.subcategory || searchParams.category,
    [searchParams]
  );

  // Custom hook to apply client-side filters and sorting.
  // We no longer pass categoryQuery or subcategoryItemQuery to this hook.
  const displayedProducts = useFilteredAndSortedProducts(filterState, sortOption);

  // Generate display names for filters
  const genderDisplayName = useMemo(
    () => genderQuery.length > 0
      ? `${genderQuery.map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(', ')}`
      : '',
    [genderQuery]
  );

  // Corrected categoryDisplayName: safely handles null/undefined values
  const categoryDisplayName = useMemo(() => {
    if (typeof subcategoryItemQuery === 'string' && subcategoryItemQuery) {
      return `${subcategoryItemQuery.charAt(0).toUpperCase() + subcategoryItemQuery.slice(1)}`;
    }
    return '';
  }, [subcategoryItemQuery]);

  // Construct the display text dynamically
  const displayFilterText = useMemo(() => {
    const parts = [];
    if (genderDisplayName) {
      parts.push(genderDisplayName);
    }
    if (categoryDisplayName) {
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
 
  // --- FIXED CODE BELOW ---

  // Custom multi-select filter change handler for gender
  const handleGenderFilterChange = useCallback(
    (gender, isChecked) => {
      const newParams = new URLSearchParams(searchParams.toString());
      const currentGenders = newParams.get('gender')?.split(',') || [];
      
      let updatedGenders;
      if (isChecked) {
        if (!currentGenders.includes(gender)) {
          updatedGenders = [...currentGenders, gender];
        } else {
          updatedGenders = currentGenders; 
        }
      } else {
        updatedGenders = currentGenders.filter(g => g !== gender);
      }

      if (updatedGenders.length > 0) {
        newParams.set('gender', updatedGenders.join(','));
      } else {
        newParams.delete('gender');
      }
      
      router.push(`${pathname}?${newParams.toString()}`);
    },
    [searchParams, router, pathname]
  );
 
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
    onCategoryFilterChange: (slug, isChecked) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (isChecked) {
        newParams.set('subcategoryItem', slug);
      } else {
        newParams.delete('subcategoryItem');
      }
      router.push(`${pathname}?${newParams.toString()}`);
    },
    allGenders: filterState.allGenders,
    // DERIVED from URL to ensure checkbox state is always correct
    selectedGenders: useMemo(() => {
      const genderParam = searchParams.get('gender');
      return genderParam ? genderParam.split(',') : [];
    }, [searchParams]),
    onGenderFilterChange: handleGenderFilterChange,
    allAvailabilities: filterState.allAvailabilities,
    selectedAvailabilities: filterState.selectedAvailabilities,
    onAvailabilityFilterChange: (avail, isChecked) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (isChecked) {
        newParams.set('availability', avail);
      } else {
        newParams.delete('availability');
      }
      router.push(`${pathname}?${newParams.toString()}`);
    },
    allColors: filterState.allColors,
    selectedColors: filterState.selectedColors,
    onColorFilterChange: (color, isChecked) => {
      const newParams = new URLSearchParams(searchParams.toString());
      const currentColors = newParams.get('colors')?.split(',') || [];
      
      let updatedColors;
      if (isChecked) {
        if (!currentColors.includes(color.code)) {
          updatedColors = [...currentColors, color.code];
        } else {
          updatedColors = currentColors;
        }
      } else {
        updatedColors = currentColors.filter(c => c !== color.code);
      }
      
      if (updatedColors.length > 0) {
        newParams.set('colors', updatedColors.join(','));
      } else {
        newParams.delete('colors');
      }
      
      router.push(`${pathname}?${newParams.toString()}`);
    },
    onClearAllFilters: handleResetAllFilters, // ADDED THIS LINE
  };

  return (
    <Box sx={{ py: 5, background: "#FFF", pt:{xs:'100px', sm:'100px', md:'200px'} }} >
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
                totalProducts={displayedProducts.length}
                categoryDisplayName={categoryDisplayName} // Pass the corrected categoryDisplayName
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