"use client";

// ==============================================
// Product Search Page
// ==============================================

import { H5 } from "@/components/Typography";
import { useSearchParams } from "next/navigation";
import { Grid, Container, Box } from "@mui/material";
import { useState, useEffect, useMemo } from "react";

import ProductFilterCard from "../product-filter-card"; // GLOBAL CUSTOM COMPONENTS
import ProductsGridView from "../products-grid-view";
import TopSortCard from "../top-sort-card";

// ==============================================

export default function ProductSearchPageView({ slug }) {

  const searchParams = useSearchParams();
  const rawSearchParams = useSearchParams();

  const genderQueryValues = useMemo(() => {
    return rawSearchParams.getAll("gender").map(g => g.toLowerCase());
  }, [rawSearchParams]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [allGenders, setAllGenders] = useState([]);
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

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
      .then(res => res.json())
      .then(data => {
        const validGenders = data.genders.map(g => g.toLowerCase());
        const queryGenders = genderQueryValues;
        const filteredQueryGenders = queryGenders.filter(g => validGenders.includes(g));

        setAllProducts(data.products);
        setDisplayedProducts(data.products);
        setAllBrands(data.brands);
        setPriceLimits([data.priceRange.min, data.priceRange.max]);
        setPriceRange([data.priceRange.min, data.priceRange.max]);
        setCategory(data.category);
        setAllGenders(data.genders.map(g => g.toLowerCase()));
        setSelectedGenders(filteredQueryGenders);
        setAllAvailabilities(data.availabilities);
        setAllColors(data.colors);

        // 🔄 Remove invalid gender from URL
        if (queryGenders.length !== filteredQueryGenders.length) {
          const params = new URLSearchParams(window.location.search);
          queryGenders.forEach(g => {
            if (!validGenders.includes(g)) {
              params.delete("gender", g); // removes specific gender values
            }
          });

          const newUrl = `${window.location.pathname}?${params.toString()}`;
          window.history.replaceState({}, "", newUrl); // replaces URL without reloading
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug, genderQueryValues]);

  // Recompute displayedProducts whenever any filter changes:
  useEffect(() => {
    let list = allProducts;

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
    selectedColors
  ]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Remove all existing gender params
    params.delete("gender");

    // Add only currently selected genders to the URL
    selectedGenders.forEach(g => params.append("gender", g));

    // Update the URL without reloading the page
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [selectedGenders]);


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
              slug={slug}
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
