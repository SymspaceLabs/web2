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

function FilterControls(props) {
    return <ProductFilterCard {...props} />;
}

// ======================================================
// 2. Main ProductSearchPageView Component
// ======================================================

export default function ProductSearchPageView() {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const [openDrawer, setOpenDrawer] = useState(false);
    const [sortOption, setSortOption] = useState("latest"); // Default sort option
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const paramsString = searchParams.toString();

    const handleSortChange = useCallback((event) => {
        setSortOption(event.target.value);
    }, []);

    const {
        allProducts,
        allBrands,
        priceLimits,
        category,
        allGenders,
        allAvailabilities,
        allColors,
        loading,
        error
    } = useProductData(paramsString); 

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
        searchParams
    );

    const genderQuery = useMemo(
        () => searchParams.get('gender')?.split(',').filter(Boolean).map(g => g.toLowerCase()) || [],
        [searchParams]
    );

    const subcategoryItemQuery = useMemo(
        () => searchParams.get('subcategoryItem') || searchParams.get('subcategory') || searchParams.get('category'),
        [searchParams]
    );

    const displayedProducts = useFilteredAndSortedProducts(filterState, sortOption);

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

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(open);
    };
    
    const handleGenderFilterChange = useCallback(
        (gender, isChecked) => {
            const newParams = new URLSearchParams(searchParams.toString());
            const currentGenders = newParams.getAll('gender'); 
            
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

            newParams.delete('gender');
            updatedGenders.forEach(g => newParams.append('gender', g));
            
            router.push(`${pathname}?${newParams.toString()}`);
        },
        [searchParams, router, pathname]
    );
    
    const filterControlProps = useMemo(() => ({
        allBrands: filterState.allBrands,
        selectedBrands: filterState.selectedBrands,
        setSelectedBrands: (brands) => setFilterState(p => ({ ...p, selectedBrands: brands })), 
        priceRange: filterState.priceRange,
        setPriceRange: (range) => setFilterState(p => ({ ...p, priceRange: range })),
        priceLimits: filterState.priceLimits,
        category: filterState.category,
        
        // 🛠️ FIX: Use 'checkedCategoryIds' for consistency with filter hook and product data
        checkedCategoryIds: filterState.checkedCategoryIds, 

        /** Client-side category filter change handler, now manages category IDs. */
        onCategoryFilterChange: (categoryId, isChecked) => {
            setFilterState(prevState => {
                // Ensure to use the correct state field name: checkedCategoryIds
                const currentIds = prevState.checkedCategoryIds || [];
                const idAsString = String(categoryId); // Important for comparison consistency
                let updatedIds;
                
                if (isChecked) {
                    // Add ID if checked, ensuring uniqueness
                    updatedIds = [...new Set([...currentIds, idAsString])];
                } else {
                    // Remove ID if unchecked
                    updatedIds = currentIds.filter(id => id !== idAsString);
                }

                // Update the local state field: checkedCategoryIds
                return { ...prevState, checkedCategoryIds: updatedIds };
            });
        },

        allGenders: filterState.allGenders,
        selectedGenders: genderQuery,
        onGenderFilterChange: handleGenderFilterChange,

        allAvailabilities: filterState.allAvailabilities,
        selectedAvailabilities: filterState.selectedAvailabilities,
        // Availability filter still uses URL sync
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
        // Colors filter still uses URL sync
        onColorFilterChange: (color, isChecked) => {
            const newParams = new URLSearchParams(searchParams.toString());
            const currentColors = newParams.get('colors')?.split(',') || [];
            const colorCode = color.code; 
            
            let updatedColors;
            if (isChecked) {
                if (!currentColors.includes(colorCode)) {
                    updatedColors = [...currentColors, colorCode];
                } else {
                    updatedColors = currentColors;
                }
            } else {
                updatedColors = currentColors.filter(c => c !== colorCode);
            }
            
            newParams.delete('colors');
            updatedColors.forEach(c => newParams.append('colors', c));
            
            router.push(`${pathname}?${newParams.toString()}`);
        },
        onClearAllFilters: handleResetAllFilters,
    }), [filterState, genderQuery, handleGenderFilterChange, handleResetAllFilters, searchParams, router, pathname, setFilterState]);


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