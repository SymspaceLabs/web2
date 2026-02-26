// src/components/product-search/product-search-page-view.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useState, useMemo, useCallback } from 'react';
import { useProductData } from '@/hooks/useProductData';
import { useProductFilters } from '@/hooks/useProductFilters';
import { useFilteredAndSortedProducts } from '@/hooks/useFilteredAndSortedProducts';

import TopSortCard from './top-sort-card';
import ProductsGridView from './products-grid-view';
import ProductFilterCard from './product-filter-card';
import MobileProductHeader from './mobile-product-header';
import ProductFilterDrawer from './product-filter-drawer';

type SortOption = 'latest' | 'relevance' | 'price-asc' | 'price-desc';

export default function ProductSearchPageView() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('latest');
  const searchParams = useSearchParams();
  const paramsString = searchParams.toString();

  // Step 1: Fetch products from API
  const {
    allProducts,
    allBrands,
    priceLimits,
    category,
    allGenders,
    allAvailabilities,
    allColors,
    loading,
    error,
  } = useProductData(paramsString);

  // Step 2: Manage filter state
  const {
    filterState,
    setFilterState,
    handleFilterChange,
    handleColorChange,
    handleResetAllFilters,
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

  // Step 3: Apply filters and sorting
  const displayedProducts = useFilteredAndSortedProducts(filterState, sortOption);

  // Display names for breadcrumb/header
  const genderQuery = useMemo(
    () =>
      searchParams
        .get('gender')
        ?.split(',')
        .filter(Boolean)
        .map((g) => g.toLowerCase()) || [],
    [searchParams]
  );

  const subcategoryItemQuery = useMemo(
    () =>
      searchParams.get('subcategoryItem') ||
      searchParams.get('subcategory') ||
      searchParams.get('category'),
    [searchParams]
  );

  const genderDisplayName = useMemo(
    () =>
      genderQuery.length > 0
        ? genderQuery.map((name) => name.charAt(0).toUpperCase() + name.slice(1)).join(', ')
        : '',
    [genderQuery]
  );

  const categoryDisplayName = useMemo(() => {
    if (typeof subcategoryItemQuery === 'string' && subcategoryItemQuery) {
      return subcategoryItemQuery.charAt(0).toUpperCase() + subcategoryItemQuery.slice(1);
    }
    return '';
  }, [subcategoryItemQuery]);

  const displayFilterText = useMemo(() => {
    const parts = [];
    if (genderDisplayName) parts.push(genderDisplayName);
    if (categoryDisplayName) parts.push(categoryDisplayName);
    return parts.length > 0 ? `for ${parts.join(' and ')}` : '';
  }, [genderDisplayName, categoryDisplayName]);

  // Handlers
  const handleSortChange = useCallback((value: string) => {
    setSortOption(value  as SortOption);
  }, []);

  const toggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  // Memoize filter control props
  const filterControlProps = useMemo(
    () => ({
      products: allProducts,
      allBrands: filterState.allBrands,
      selectedBrands: filterState.selectedBrands,
      setSelectedBrands: (brands: any[]) =>
        setFilterState((p) => ({ ...p, selectedBrands: brands })),
      priceRange: filterState.priceRange,
      setPriceRange: (range: [number, number]) =>
        setFilterState((p) => ({ ...p, priceRange: range })),
      priceLimits: filterState.priceLimits,
      category: filterState.category,
      checkedCategoryIds: filterState.checkedCategoryIds,
      onCategoryFilterChange: (categoryId: string, isChecked: boolean) => {
        setFilterState((prevState) => {
          const currentIds = prevState.checkedCategoryIds || [];
          const updatedIds = isChecked
            ? [...new Set([...currentIds, categoryId])]
            : currentIds.filter((id) => id !== categoryId);
          return { ...prevState, checkedCategoryIds: updatedIds };
        });
      },
      allGenders: filterState.allGenders,
      selectedGenders: filterState.selectedGenders,
      onGenderFilterChange: (gender: string, isChecked: boolean) => {
        setFilterState((prevState) => {
          const currentGenders = prevState.selectedGenders || [];
          const updatedGenders = isChecked
            ? [...new Set([...currentGenders, gender])]
            : currentGenders.filter((g) => g !== gender);
          return { ...prevState, selectedGenders: updatedGenders };
        });
      },
      allAvailabilities: filterState.allAvailabilities,
      selectedAvailabilities: filterState.selectedAvailabilities,
      onAvailabilityFilterChange: (availability: string, isChecked: boolean) => {
        setFilterState((prevState) => {
          const currentAvailabilities = prevState.selectedAvailabilities || [];
          const updatedAvailabilities = isChecked
            ? [...new Set([...currentAvailabilities, availability])]
            : currentAvailabilities.filter((a) => a !== availability);
          return { ...prevState, selectedAvailabilities: updatedAvailabilities };
        });
      },
      allColors: filterState.allColors,
      selectedColors: filterState.selectedColors,
      onColorFilterChange: handleColorChange,
      onClearAllFilters: handleResetAllFilters,
    }),
    [filterState, handleResetAllFilters, allProducts, handleColorChange, setFilterState]
  );

  // Error state
  if (error) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Failed to load products</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background py-8 md:py-12 pt-24 md:pt-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Mobile Header - Filter & Sort */}
          {isMobile && (
            <div className="md:hidden col-span-full">
              <MobileProductHeader
                onFilterClick={toggleDrawer}
                sortOption={sortOption}
                onSortChange={handleSortChange}
                displayedProductCount={displayedProducts.length}
                displayFilterText={displayFilterText}
              />
            </div>
          )}

          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block md:col-span-3">
            <div className="sticky top-24">
              <ProductFilterCard {...filterControlProps} />
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          <ProductFilterDrawer
            open={openDrawer}
            onClose={handleCloseDrawer}
            onResetFilters={handleResetAllFilters}
            filterControlProps={filterControlProps}
          />

          {/* Main Product Area */}
          <main className="md:col-span-9 col-span-full">
            {/* Desktop Sort Header */}
            {!isMobile && (
              <div className="mb-6">
                <TopSortCard
                  totalProducts={displayedProducts.length}
                  categoryDisplayName={categoryDisplayName}
                  genderDisplayName={genderDisplayName}
                  sortOption={sortOption}
                  onSortChange={handleSortChange}
                />
              </div>
            )}

            {/* Products Grid */}
            <ProductsGridView products={displayedProducts} loading={loading} />
          </main>
        </div>
      </div>
    </div>
  );
}