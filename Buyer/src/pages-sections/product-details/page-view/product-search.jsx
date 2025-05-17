"use client";

// ==============================================
// Product Search Page
// ==============================================

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { H5, Paragraph } from "@/components/Typography";
import { FlexBetween, FlexBox } from "@/components/flex-box";
import { Grid, MenuItem, TextField, Container, Box } from "@mui/material";

import ProductFilterCard from "../product-filter-card"; // GLOBAL CUSTOM COMPONENTS
import ProductsGridView from "@/components/products-view/products-grid-view";

// ==============================================

const SORT_OPTIONS = [
  { label: "Relevance", value: "Relevance" },
  { label: "Date", value: "Date" },
  { label: "Price Low to High", value: "Price Low to High" },
  { label: "Price High to Low", value: "Price High to Low" },
];

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

    setDisplayedProducts(list);
  }, [
    allProducts,
    selectedBrands,
    checkedCategoryIds,
    selectedGenders,     // ← depend on gender selections
    priceRange
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

            />
          </Grid>

          {/* Right Product List */}
          <Grid item md={9.5} xs={12}>
            {/* Top Sort Card */}
            <FlexBetween
              mb="10px"
              py={{ sm: "1rem", md: "0.5rem", xs: "1.25rem 0.25rem" }}
              flexWrap="wrap"
              alignItems="center"
              gap={1}
            >
              <Paragraph color="grey.600">
                Total {displayedProducts.length} results
              </Paragraph>

              <FlexBox alignItems="center" gap={2}>
                <Paragraph color="grey.600" whiteSpace="pre">
                  Sort by:
                </Paragraph>
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  placeholder="Sort by"
                  defaultValue={SORT_OPTIONS[0].value}
                  sx={{ minWidth: "150px", width: "auto" }}
                >
                  {SORT_OPTIONS.map((item) => (
                    <MenuItem value={item.value} key={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FlexBox>
              
            </FlexBetween>
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
