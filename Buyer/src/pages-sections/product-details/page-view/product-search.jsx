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
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const toggleView = useCallback((v) => () => setView(v), []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products?category=${slug}`);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  if (loading) {
    return (
      <Container className="mt-2 mb-3">
        <CircularProgress />
      </Container>
    );
  }

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
        
        {/* Top Sort Card */}
        {/* <FlexBox
          mb="10px"
          py={{ sm: "1rem", md: "0.5rem", xs: "1.25rem 0.25rem" }}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="flex-end"
          gap={1}
        >
          <Paragraph color="grey.600" whiteSpace="pre">
            Sort by:
          </Paragraph>

          <TextField
            select
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Sort by"
            defaultValue={SORT_OPTIONS[0].value}
            sx={{ flex: "1 1 0", minWidth: "150px" }}
          >
            {SORT_OPTIONS.map((item) => (
              <MenuItem value={item.value} key={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </FlexBox> */}
        {/* <FlexBox
          mb="10px"
          py={{ sm: "1rem", md: "0.5rem", xs: "1.25rem 0.25rem" }}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="flex-end"
          columnGap={4}
        >
          <FlexBox alignItems="center" gap={1} flex="1 1 0">
            <Paragraph color="grey.600" whiteSpace="pre">
              Sort by:
            </Paragraph>

            <TextField
              select
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Sort by"
              defaultValue={SORT_OPTIONS[0].value}
              sx={{ flex: "1 1 0", minWidth: "150px" }}
            >
              {SORT_OPTIONS.map((item) => (
                <MenuItem value={item.value} key={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </FlexBox>
        </FlexBox> */}
        <FlexBox
          mb="10px"
          py={{ sm: "1rem", md: "0.5rem", xs: "1.25rem 0.25rem" }}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="flex-end"
          gap={1}
        >
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


        
        <Grid container spacing={3}>
          
          {/* Left Filter Card */}
          <Grid item md={3} sx={{ display: { md: "block", xs: "none" } }}>
            <ProductFilterCard />
          </Grid>

          {/* Right Product List */}
          <Grid item md={9} xs={12}>
            <ProductsGridView products={products} />
          </Grid>
        </Grid>
      </Container>
    </Box>

  );
}
