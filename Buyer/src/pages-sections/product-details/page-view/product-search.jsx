"use client";

// ==============================================
// Product Search Page
// ==============================================

import { useSearchParams } from "next/navigation";
import { H5, Paragraph } from "@/components/Typography";
import { useCallback, useState, useEffect } from "react";
import { Apps, ViewList, FilterList } from "@mui/icons-material";
import { Grid, MenuItem, TextField, Container, IconButton, useMediaQuery, CircularProgress, Box } from "@mui/material";

import FlexBox from "@/components/flex-box/flex-box";
import Sidenav from "@/components/side-nav/side-nav";
import ProductFilterCard from "../product-filter-card"; // GLOBAL CUSTOM COMPONENTS
import ProductsGridView from "@/components/products-view/products-grid-view";
import { FlexBetween } from "@/components/flex-box";

// ==============================================

const SORT_OPTIONS = [
  { label: "Relevance", value: "Relevance" },
  { label: "Date", value: "Date" },
  { label: "Price Low to High", value: "Price Low to High" },
  { label: "Price High to Low", value: "Price High to Low" },
];

export default function ProductSearchPageView({ slug }) {
  const searchParams = useSearchParams();
  // Extract query parameters
  const subcategoryItem = searchParams.get("subcategoryItem");
  const term = searchParams.get("term");

  console.log('subcategoryItem', subcategoryItem);
  console.log('term', term);
  console.log('slug', slug);

  const [view, setView] = useState("grid");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [allBrands, setAllBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300]); // selected value
  const [priceLimits, setPriceLimits] = useState([0, 300]); // actual allowed min/max


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products?brands=${selectedBrands.map(b => b.id).join(",")}&category=${slug}`);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data.products);
        setAllBrands(data.brands);
        setPriceLimits([data.priceRange.min, data.priceRange.max]);
        setPriceRange([data.priceRange.min, data.priceRange.max]);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug, selectedBrands]);


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
                Total {products.length} results
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
              products={products}
              loading={loading}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>

  );
}
