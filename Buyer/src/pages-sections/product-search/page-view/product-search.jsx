"use client";

// ==============================================
// Product Search Page
// ==============================================

import { useState, useEffect } from "react";
import { H5 } from "@/components/Typography";
import { useSearchParams } from "next/navigation";
import { Grid, Container, Box } from "@mui/material";

import ProductFilterCard from "../product-filter-card"; // GLOBAL CUSTOM COMPONENTS
import ProductsGridView from "../products-grid-view";
import TopSortCard from "../top-sort-card";

// ==============================================



export default function ProductSearchPageView({ slug }) {

  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [allGenders, setAllGenders] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300]); // selected value
  const [priceLimits, setPriceLimits] = useState([0, 300]); // actual allowed min/max
  const [category, setCategory] = useState([]);
  const [checkedCategoryIds, setCheckedCategoryIds] = useState([]);
  const [allAvailabilities, setAllAvailabilities] = useState([]);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState([]);

  // Fetch once on mount or slug change
  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setAllProducts(data.products);
        setDisplayedProducts(data.products);

        // also set filters metadata:
        setAllBrands(data.brands);
        setPriceLimits([data.priceRange.min, data.priceRange.max]);
        setPriceRange([data.priceRange.min, data.priceRange.max]);
        setCategory(data.category);
        setAllGenders(data.genders);           // ← seed gender options
        setSelectedGenders([]);                // ← reset on new fetch
        setAllAvailabilities(data.availabilities);


      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

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

    // Gender filter ← NEW
    if (selectedGenders.length) {
      const genderSet = new Set(selectedGenders);
      list = list.filter(p => p.gender && genderSet.has(p.gender));
    }

    // priceRange filter
    list = list.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedAvailabilities.length) {
      const availSet = new Set(selectedAvailabilities);
      list = list.filter(p => availSet.has(p.availability));
    }

    setDisplayedProducts(list);
  }, [
    allProducts,
    selectedBrands,
    checkedCategoryIds,
    selectedGenders,     // ← depend on gender selections
    priceRange,
    selectedAvailabilities
  ]);

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
              allAvailabilities={allAvailabilities} // NEW
              selectedAvailabilities={selectedAvailabilities}
              setSelectedAvailabilities={setSelectedAvailabilities}

            />
          </Grid>

          {/* Right Product List */}
          <Grid item md={9.5} xs={12}>
            {/* Top Sort Card */}
            <TopSortCard
              products={displayedProducts}
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
