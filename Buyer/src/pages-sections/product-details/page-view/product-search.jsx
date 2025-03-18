"use client";

import { useCallback, useState, useEffect } from "react";
import { Card, Grid, MenuItem, TextField, Container, IconButton, useMediaQuery, CircularProgress } from "@mui/material";
import { Apps, ViewList, FilterList } from "@mui/icons-material";

import ProductFilterCard from "../product-filter-card"; // GLOBAL CUSTOM COMPONENTS
import FlexBox from "@/components/flex-box/flex-box";
import Sidenav from "@/components/side-nav/side-nav";
import { H5, Paragraph } from "@/components/Typography";
import ProductsGridView from "@/components/products-view/products-grid-view";
import ProductsListView from "@/components/products-view/products-list-view";
import { useSearchParams } from "next/navigation";

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
        // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products?category=${slug}`);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
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
    <Container className="mt-2 mb-3">
      <Card
        elevation={1}
        sx={{
          mb: "55px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          p: { sm: "1rem 1.25rem", md: "0.5rem 1.25rem", xs: "1.25rem 1.25rem 0.25rem" },
        }}
      >
        <div>
          <H5>Searching for “{term}”</H5>
          <Paragraph color="grey.600">{products.length} results found</Paragraph>
        </div>

        <FlexBox alignItems="center" columnGap={4} flexWrap="wrap" my="0.5rem">
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

          <FlexBox alignItems="center" my="0.25rem">
            <Paragraph color="grey.600" mr={1}>
              View:
            </Paragraph>

            <IconButton onClick={toggleView("grid")}>
              <Apps color={view === "grid" ? "primary" : "inherit"} fontSize="small" />
            </IconButton>

            <IconButton onClick={toggleView("list")}>
              <ViewList color={view === "list" ? "primary" : "inherit"} fontSize="small" />
            </IconButton>

            {downMd && (
              <Sidenav
                handler={(close) => (
                  <IconButton onClick={close}>
                    <FilterList fontSize="small" />
                  </IconButton>
                )}
              >
                <ProductFilterCard />
              </Sidenav>
            )}
          </FlexBox>
        </FlexBox>
      </Card>

      <Grid container spacing={3}>
        <Grid
          item
          md={3}
          sx={{
            display: {
              md: "block",
              xs: "none",
            },
          }}
        >
          <ProductFilterCard />
        </Grid>

        <Grid item md={9} xs={12}>
          {view === "grid" ? (
            <ProductsGridView products={products} />
          ) : (
            <ProductsListView products={products} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
