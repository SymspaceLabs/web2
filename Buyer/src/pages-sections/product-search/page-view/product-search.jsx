"use client";

// ======================================================
// Product Search Page
// ======================================================

import { H5 } from "@/components/Typography";
import { useSearchParams, useRouter } from "next/navigation";
import { Grid, Container, Box } from "@mui/material";
import { useState, useEffect, useMemo, useCallback } from "react";

import ProductFilterCard from "../product-filter-card"; // GLOBAL CUSTOM COMPONENTS
import ProductsGridView from "../products-grid-view";
import TopSortCard from "../top-sort-card";

// ======================================================

export default function ProductSearchPageView({ slug }) {

  const searchParams  = useSearchParams();
  const router = useRouter(); // Initialize useRouter


  // Extract gender and category query values from the URL
  const genderQuery = useMemo(
    () => searchParams.getAll("gender").map(g => g.toLowerCase()),
    [searchParams]
  );
  const categoryQuery = useMemo(
    () => searchParams.getAll("category").map(c => c.toLowerCase()),
    [searchParams]
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allGenders, setAllGenders] = useState([]);
  // selectedGenders will be initialized based on URL in the useEffect
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [priceLimits, setPriceLimits] = useState([0, 300]);
  const [category, setCategory] = useState([]);
  const [checkedCategoryIds, setCheckedCategoryIds] = useState([]);
  const [allAvailabilities, setAllAvailabilities] = useState([]);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
      .then(res => res.json())
      .then(data => {
        const validGenders = data.genders.map(g => g.toLowerCase());
        const queryGenders = genderQuery;
        const filteredQueryGenders = queryGenders.filter(g => validGenders.includes(g));
        const queryCategories = categoryQuery;

        setAllProducts(data.products);
        setDisplayedProducts(data.products);
        setAllBrands(data.brands);
        setPriceLimits([data.priceRange.min, data.priceRange.max]);
        setPriceRange([data.priceRange.min, data.priceRange.max]);
        setCategory(data.category);
        setAllGenders(data.genders.map(g => g.toLowerCase()));
        // CRITICAL: Set selectedGenders here based on the URL on initial load
        setSelectedGenders(filteredQueryGenders);
        setAllAvailabilities(data.availabilities);
        setAllColors(data.colors);
        setSelectedCategories(queryCategories);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug, genderQuery, categoryQuery]);

  // Callback function to handle gender filter changes and update the URL
  const handleGenderFilterChange = useCallback((genderValue, isChecked) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    let newSelectedGenders = [...selectedGenders];

    if (isChecked) {
      // Add gender if not already present
      if (!newSelectedGenders.includes(genderValue)) {
        newSelectedGenders.push(genderValue);
      }
    } else {
      // Remove gender
      newSelectedGenders = newSelectedGenders.filter(g => g !== genderValue);
    }

    // Update the local state FIRST to ensure filters apply immediately
    setSelectedGenders(newSelectedGenders);

    // Update URL parameters
    currentParams.delete("gender"); // Remove all existing gender params
    newSelectedGenders.forEach(g => currentParams.append("gender", g)); // Add updated ones

    // Update the URL using Next.js router.replace for a non-history-stack-adding navigation
    router.replace(`${window.location.pathname}?${currentParams.toString()}`);
  }, [selectedGenders, searchParams, router]); // Dependencies for useCallback

  // Recompute displayedProducts whenever any filter changes:
  useEffect(() => {
    let list = allProducts;

    // ✅ Category filter (match against category name or slug, depending on your data shape)
    if (categoryQuery.length > 0) {
      list = list.filter(p => {
        const subcategoryName = p.subcategoryItem?.subcategory?.name?.toLowerCase();
        return categoryQuery.includes(subcategoryName);
      });
    }

    // Brand filter
    if (selectedBrands.length) {
      const brandIds = new Set(selectedBrands.map(b => b.id));
      list = list.filter(p => brandIds.has(p.company.id));
    }

    // Category filter
    if (checkedCategoryIds.length) {
      const subIds = new Set(checkedCategoryIds);
      list = list.filter(p => subIds.has(p.subcategoryItem.id));
    }

    // Gender filter
    if (selectedGenders.length) {
      const genderSet = new Set(selectedGenders);
      list = list.filter(p => p.gender && genderSet.has(p.gender));
    }

    // Price range filter
    list = list.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Availability filter
    if (selectedAvailabilities.length) {
      const availSet = new Set(selectedAvailabilities);
      list = list.filter(p => availSet.has(p.availability));
    }

    // Color filter
    if (selectedColors.length) {
      const colorCodes = new Set(selectedColors.map(c => c.code.toLowerCase()));
      list = list.filter(p =>
        p.colors?.some(c => colorCodes.has(c.code?.toLowerCase()))
      );
    }

    setDisplayedProducts(list);
  }, [
    allProducts,
    selectedBrands,
    checkedCategoryIds,
    selectedGenders,
    priceRange,
    selectedAvailabilities,
    selectedColors,
    categoryQuery
  ]);

  // useEffect(() => {
  //   const currentParams = new URLSearchParams(window.location.search);
  //   const currentGenders = currentParams.getAll("gender").map(g => g.toLowerCase());

  //   const areEqual =
  //     currentGenders.length === selectedGenders.length &&
  //     selectedGenders.every(g => currentGenders.includes(g));

  //   if (!areEqual) {
  //     currentParams.delete("gender");
  //     selectedGenders.forEach(g => currentParams.append("gender", g));
  //     const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
  //     window.history.replaceState({}, "", newUrl);
  //   }
  // }, [selectedGenders]);


  if (error) {
    return (
      <Container className="mt-2 mb-3">
        <H5>Error: {error}</H5>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 5, background:"#FFF" }} >
      <Container>
        <Grid container spacing={3}>
          
          {/* Left Filter Card */}
          <Grid item md={2.5} sx={{ display: { md: "block", xs: "none" } }}>
            <ProductFilterCard
              allBrands={allBrands}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              priceLimits={priceLimits}
              setPriceLimits={setPriceLimits}
              category={category}
              setCheckedCategoryIds={setCheckedCategoryIds}
              allGenders={allGenders}
              selectedGenders={selectedGenders}
              setSelectedGenders={setSelectedGenders}
              onGenderFilterChange={handleGenderFilterChange} // Pass the new handler
              allAvailabilities={allAvailabilities}
              selectedAvailabilities={selectedAvailabilities}
              setSelectedAvailabilities={setSelectedAvailabilities}
              allColors={allColors}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
            />
          </Grid>

          {/* Right Product List */}
          <Grid item md={9.5} xs={12}>
            {/* Top Sort Card */}
            <TopSortCard
              products={displayedProducts}
              slug={genderQuery[0]}
            />
            
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
