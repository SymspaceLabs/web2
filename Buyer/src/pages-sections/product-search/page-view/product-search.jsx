"use client";

import { useState, useMemo, useCallback } from "react";
import { Grid, Container, Box, useMediaQuery } from "@mui/material";
import { useSearchParams } from "next/navigation";

import { useProductData } from "@/hooks/useProductData";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";

import TopSortCard from "../top-sort-card";
import ProductsGridView from "../products-grid-view";
import ProductFilterCard from "../product-filter-card";
import ProductFilterDrawer from "../product-filter-drawer";
import MobileProductHeader from "../mobile-product-header";
import PaginationControls from "@/components/pagination-controls";

const PAGE_SIZE = 12; // Products per page

export default function ProductSearchPageView() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [sortOption, setSortOption] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  
  const searchParams = useSearchParams();

  // Step 1: Fetch ALL products from server
  const {
    products,
    allBrands,
    priceLimits,
    category,
    allGenders,
    allAvailabilities,
    allColors,
    loading,
    error
  } = useProductData(searchParams.toString());

  // Step 2: Manage client-side filters
  const {
    filters,
    toggleBrand,
    setPriceRange,
    toggleColor,
    toggleAvailability,
    toggleCategory,
    resetFilters,
  } = useProductFilters(
    { priceLimits, allBrands, allColors },
    searchParams
  );

  // Step 3: Apply client-side filtering, sorting, AND pagination
  const { products: displayedProducts, pagination } = useFilteredProducts(
    products || [],
    filters || {},
    sortOption,
    currentPage,
    PAGE_SIZE
  );

  // Reset to page 1 when filters or sorting change
  const handleFilterChange = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Wrapper functions that reset page
  const handleBrandToggle = useCallback((brand) => {
    handleFilterChange();
    toggleBrand(brand);
  }, [toggleBrand, handleFilterChange]);

  const handleColorToggle = useCallback((color) => {
    handleFilterChange();
    toggleColor(color);
  }, [toggleColor, handleFilterChange]);

  const handleAvailabilityToggle = useCallback((avail) => {
    handleFilterChange();
    toggleAvailability(avail);
  }, [toggleAvailability, handleFilterChange]);

  const handleCategoryToggle = useCallback((cat) => {
    handleFilterChange();
    toggleCategory(cat);
  }, [toggleCategory, handleFilterChange]);

  const handlePriceChange = useCallback((range) => {
    handleFilterChange();
    setPriceRange(range);
  }, [setPriceRange, handleFilterChange]);

  const handleResetFilters = useCallback(() => {
    setCurrentPage(1);
    resetFilters();
  }, [resetFilters]);

  const handleSortChange = useCallback((e) => {
    setCurrentPage(1);
    setSortOption(e.target.value);
  }, []);

  // Display names for header
  const displayInfo = useMemo(() => {
    const gender = searchParams.get('gender');
    const cat = searchParams.get('category') || searchParams.get('subcategory');
    
    const parts = [];
    if (gender) parts.push(gender.charAt(0).toUpperCase() + gender.slice(1));
    if (cat) parts.push(cat.charAt(0).toUpperCase() + cat.slice(1));
    
    return {
      gender: gender || '',
      category: cat || '',
      text: parts.length > 0 ? `for ${parts.join(' and ')}` : ''
    };
  }, [searchParams]);

  // Filter controls props - matching your OLD component's expected props
  const filterProps = useMemo(() => ({
    // Pass the full products array for CategoryAccordion
    products: products || [],
    
    // Data arrays
    allBrands: allBrands || [],
    allColors: allColors || [],
    allAvailabilities: allAvailabilities || [],
    allGenders: allGenders || [],
    category: category || [],
    priceLimits: priceLimits || [0, 300],
    
    // Current selections (matching OLD prop names)
    selectedBrands: filters?.brands || [],
    selectedColors: filters?.colors || [],
    selectedAvailabilities: filters?.availability || [],
    checkedCategoryIds: filters?.categories?.map(c => String(c.id)) || [],
    selectedGenders: [], // Not filtering by gender client-side
    priceRange: filters?.priceRange || priceLimits || [0, 300],
    
    // Handlers (matching OLD prop names)
    setSelectedBrands: (brands) => {
      handleFilterChange();
      // Convert array of brands to toggle last one
      if (brands.length > (filters?.brands?.length || 0)) {
        const newBrand = brands[brands.length - 1];
        toggleBrand(newBrand);
      } else {
        // Find removed brand
        const removedBrand = (filters?.brands || []).find(
          b => !brands.some(nb => nb.id === b.id)
        );
        if (removedBrand) toggleBrand(removedBrand);
      }
    },
    
    setPriceRange: handlePriceChange,
    
    onCategoryFilterChange: (categoryId, isChecked) => {
      handleFilterChange();
      // Find the category object
      const findCategory = (cats, id) => {
        for (const cat of cats) {
          if (String(cat.id) === String(categoryId)) return cat;
          if (cat.child) {
            const found = findCategory(cat.child, id);
            if (found) return found;
          }
        }
        return null;
      };
      const cat = findCategory(category || [], categoryId);
      if (cat) toggleCategory(cat);
    },
    
    onGenderFilterChange: () => {
      // Gender is handled by URL, not client-side
    },
    
    onColorFilterChange: (color, isChecked) => {
      handleColorToggle(color);
    },
    
    onAvailabilityFilterChange: (avail, isChecked) => {
      handleAvailabilityToggle(avail);
    },
    
    onClearAllFilters: handleResetFilters,
  }), [
    products,
    allBrands,
    allColors,
    allAvailabilities,
    allGenders,
    category,
    priceLimits,
    filters,
    handleBrandToggle,
    handleColorToggle,
    handleAvailabilityToggle,
    handleCategoryToggle,
    handlePriceChange,
    handleResetFilters,
    toggleBrand,
    toggleCategory,
  ]);

  if (error) {
    return (
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <p>Error loading products: {error}</p>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 5, background: "#FFF", pt: { xs: '100px', sm: '100px', md: '200px' } }}>
      <Container>
        <Grid container spacing={3}>
          {/* Mobile header */}
          {isMobile && (
            <MobileProductHeader
              toggleDrawer={() => setOpenDrawer(!openDrawer)}
              sortOption={sortOption}
              handleSortChange={handleSortChange}
              displayedProductCount={pagination?.totalProducts || 0}
              displayFilterText={displayInfo.text}
            />
          )}

          {/* Desktop filters */}
          <Grid item md={2.5} sx={{ display: { md: "block", xs: "none" } }}>
            <ProductFilterCard {...filterProps} />
          </Grid>

          {/* Mobile filter drawer */}
          <ProductFilterDrawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            onResetFilters={handleResetFilters}
            filterControlProps={filterProps}
          />

          {/* Product grid */}
          <Grid item md={9.5} xs={12}>
            {/* Desktop sort */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <TopSortCard
                totalProducts={pagination?.totalProducts || 0}
                categoryDisplayName={displayInfo.category}
                genderDisplayName={displayInfo.gender}
                sortOption={sortOption}
                onSortChange={handleSortChange}
              />
            </Box>

            {/* Products */}
            <ProductsGridView
              products={displayedProducts || []}
              loading={loading}
            />

            {/* Pagination - only show if more than one page */}
            {pagination && pagination.totalPages > 1 && (
              <PaginationControls
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalProducts={pagination.totalProducts}
                pageSize={PAGE_SIZE}
                onPageChange={setCurrentPage}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}