
// =======================================
// Product Search Page
// src/components/product-search.js
// =======================================

"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Grid, Container, Box, useMediaQuery } from "@mui/material";

import { useSearchParams } from "next/navigation";
import { useProductData } from "@/hooks/useProductData";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useFilteredAndSortedProducts } from "@/hooks/useFilteredAndSortedProducts";

import TopSortCard from "../top-sort-card";
import ProductsGridView from "../products-grid-view";
import ProductFilterCard from "../product-filter-card";
import ProductFilterDrawer from "../product-filter-drawer";
import MobileProductHeader from "../mobile-product-header";

// ======================================================
// 1. Reusable UI Components
// ======================================================

function FilterControls(props) {
    return <ProductFilterCard {...props} />;
}

// ======================================================
// 2. Main ProductSearchPageView Component
// ======================================================

export default function ProductSearchPageView() {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const [openDrawer, setOpenDrawer] = useState(false);
    const [sortOption, setSortOption] = useState("latest");
    const searchParams = useSearchParams();
    const paramsString = searchParams.toString();

    const handleSortChange = useCallback((event) => {
        setSortOption(event.target.value);
    }, []);

    // Step 1:Fetches products from API
    const {
        allProducts,
        allBrands,
        priceLimits,
        category,
        allGenders,
        allAvailabilities,
        allColors,
        loading
    } = useProductData(paramsString); 


    // Step 2: Manages filter state & applies some filters
    const {
        filterState,
        setFilterState,
        handleFilterChange,
        handleColorChange,
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
        searchParams
    );

    // Step 3: Applies all filters again + sorting
    // Filter products based on filterState and sort them
    const displayedProducts = useFilteredAndSortedProducts(filterState, sortOption);

    // --- Memoized Display Names (no change) ---
    const genderQuery = useMemo(
        () => searchParams.get('gender')?.split(',').filter(Boolean).map(g => g.toLowerCase()) || [],
        [searchParams]
    );

    const subcategoryItemQuery = useMemo(
        () => searchParams.get('subcategoryItem') || searchParams.get('subcategory') || searchParams.get('category'),
        [searchParams]
    );

    const genderDisplayName = useMemo(
        () => genderQuery.length > 0
            ? `${genderQuery.map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(', ')}`
            : '',
        [genderQuery]
    );

    const categoryDisplayName = useMemo(() => {
        if (typeof subcategoryItemQuery === 'string' && subcategoryItemQuery) {
            return `${subcategoryItemQuery.charAt(0).toUpperCase() + subcategoryItemQuery.slice(1)}`;
        }
        return '';
    }, [subcategoryItemQuery]);

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
    // ------------------------------------------

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(open);
    };
       
    // Memoize the props passed to the FilterControls
    const filterControlProps = useMemo(() => ({
        products: allProducts, // Pass products for CategoryAccordion
        allBrands: filterState.allBrands,
        selectedBrands: filterState.selectedBrands,
        // Brand filter updates local state
        setSelectedBrands: (brands) => setFilterState(p => ({ ...p, selectedBrands: brands })), 
        priceRange: filterState.priceRange,
        // Price filter updates local state only
        setPriceRange: (range) => {
            setFilterState(p => ({ ...p, priceRange: range }));
        },
        priceLimits: filterState.priceLimits,
        category: filterState.category,
        checkedCategoryIds: filterState.checkedCategoryIds, 
        // Category filter updates local state only
        onCategoryFilterChange: (categoryId, isChecked) => {
            setFilterState(prevState => {
                const currentIds = prevState.checkedCategoryIds || [];
                const idAsString = String(categoryId);
                let updatedIds;
                
                if (isChecked) {
                    updatedIds = [...new Set([...currentIds, idAsString])];
                } else {
                    updatedIds = currentIds.filter(id => id !== idAsString);
                }
                return { ...prevState, checkedCategoryIds: updatedIds };
            });
        },

        allGenders: filterState.allGenders,
        selectedGenders: filterState.selectedGenders, // <-- Use local state
        // Gender filter updates local state only
        onGenderFilterChange: (gender, isChecked) => {
             setFilterState(prevState => {
                const currentGenders = prevState.selectedGenders || [];
                let updatedGenders;
                
                if (isChecked) {
                    updatedGenders = [...new Set([...currentGenders, gender])];
                } else {
                    updatedGenders = currentGenders.filter(g => g !== gender);
                }
                return { ...prevState, selectedGenders: updatedGenders };
            });
        },

        allAvailabilities: filterState.allAvailabilities,
        selectedAvailabilities: filterState.selectedAvailabilities,

        allColors: filterState.allColors,
        selectedColors: filterState.selectedColors,
        // Colors filter updates the URL
        onColorFilterChange: (color, isChecked) => {
            // Call the dedicated local state handler from the hook
            handleColorChange(color, isChecked);
        }, 
         // ⭐ THE MISSING HANDLER IS ADDED HERE
        onAvailabilityFilterChange: (availability, isChecked) => {
            setFilterState(prevState => {
                const currentAvailabilities = prevState.selectedAvailabilities || [];
                let updatedAvailabilities;
                
                if (isChecked) {
                    updatedAvailabilities = [...new Set([...currentAvailabilities, availability])];
                } else {
                    updatedAvailabilities = currentAvailabilities.filter(a => a !== availability);
                }
                return { ...prevState, selectedAvailabilities: updatedAvailabilities };
            });
        },
        onClearAllFilters: handleResetAllFilters,
    }), [filterState, handleResetAllFilters, allProducts, handleFilterChange, setFilterState]);

    useEffect(() => {
        console.log('🔍 DEBUG INFO:', {
            urlParams: paramsString,
            totalProducts: allProducts.length,
            filteredProducts: displayedProducts.length,
            filterState: {
            // checkedCategoryIds,
            selectedBrands: filterState.selectedBrands,
            priceRange: filterState.priceRange,
            },
            sampleProduct: allProducts[0],
        });
    }, [allProducts, displayedProducts, filterState, paramsString]);

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
                                categoryDisplayName={categoryDisplayName} 
                                genderDisplayName={genderDisplayName}
                                sortOption={sortOption} 
                                onSortChange={handleSortChange}
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