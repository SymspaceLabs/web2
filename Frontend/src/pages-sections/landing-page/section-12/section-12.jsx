"use client";


/**
 * Section12 Component
 * 
 * This component is responsible for displaying a section of products categorized into three tabs:
 * "New Arrival", "Best Seller", and "Featured Products". It fetches the product data from an API
 * and renders them with images, titles, categories, and discounted prices. The section also includes
 * floating background blobs for design aesthetics.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Grid, Container, Tabs, Tab, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FlexBox } from "../../../components/flex-box";
import LazyImage from "../../../components/LazyImage";
import { calculateDiscount, currency } from "../../../lib";

export default function Section12() {
  const theme = useTheme();  // Get theme settings from Material UI
  const [activeTab, setActiveTab] = useState("newArrival"); // State to track the active tab
  const [products, setProducts] = useState([]); // State to hold the products data

  // Categories for the tabs
  const categories = [
    { id: 1, title: "New Arrival", slug: "newArrival" },
    { id: 2, title: "Best Seller", slug: "bestSeller" },
    { id: 3, title: "Featured Products", slug: "featured" },
  ];

  /**
   * Fetches product data from the API and sets the products state.
   * This function is called when the component mounts (useEffect).
   */
  const getAllProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, // API URL from environment variables
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data); // Set fetched data into products state
      }
    } catch (error) {
      console.error("Error fetching products:", error); // Handle any errors
    }
  };

  /**
   * Handles tab change, updating the active tab state.
   * @param {object} event - The event object.
   * @param {string} newValue - The new active tab value.
   */
  const handleChange = (event, newValue) => {
    setActiveTab(newValue); // Update active tab
  };

  // Styles for floating background blobs
  const blob1 = {
    position: 'absolute',
    top: 250,
    left: -50,
    width: { xs: '300px', sm: '400px', md: '500px' },
    height: { xs: '300px', sm: '400px', md: '500px' },
    background: '#FFFFFF',
    borderRadius: '50%',
    zIndex: 1,
    opacity: 0.2,
    filter: 'blur(120px)',
  };

  const blob2 = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: { xs: '300px', sm: '400px', md: '500px' },
    height: { xs: '300px', sm: '400px', md: '500px' },
    background: '#FFFFFF',
    borderRadius: '50%',
    zIndex: 1,
    opacity: 0.2,
    filter: 'blur(120px)',
    [theme.breakpoints.down('sm')]: {
      display: 'none', // Hide blob2 on small screens
    },
  };

  // Fetch product data when the component mounts
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Box sx={{width: "100%", background: "#1F1F1F", py:25 }}>
      {/* Floating blob backgrounds */}
      <Container sx={{ position: "relative", }}>
        <Box sx={{ zIndex: 2, position: 'relative', }} py={4} textAlign="center">
          <Box mb={4} overflow="hidden">
            <Tabs
              textColor="inherit"
              indicatorColor="primary"
              value={activeTab}
              onChange={handleChange} // Triggered when a tab is selected
              key={activeTab} // Ensure the component re-renders when the tab changes
            >
              {/* Render tab buttons dynamically based on categories */}
              {categories.map((item) => (
                <Tab
                  key={item.slug}
                  label={item.title}
                  value={item.slug}
                  sx={{ textTransform: "none", color: "#fff" }}
                />
              ))}
            </Tabs>
          </Box>
        </Box>

        {/* Grid to display products */}
        <Grid sx={{ zIndex: 2, position: 'relative', }} container spacing={3}>
          {products.map((product) => (
            <Grid item lg={3} md={4} sm={6} xs={12} key={product.id}>
              <Link href={`/products/${product.slug}`}>
                <FlexBox
                  flexDirection="column"
                  bgcolor="rgba(255, 255, 255, 0.1)"
                  borderRadius={3}
                  mb={2}
                  sx={{
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.15)", // Hover effect for product card
                    },
                  }}
                >
                  <LazyImage
                    alt="product images"
                    width={380}
                    height={379}
                    src={product.images?.[0]?.url || "/placeholder.png"} // Fallback to placeholder if image is missing
                  />
                  <Box sx={{ px: 4, pb: 4 }}>
                    <Typography
                      sx={{
                        fontFamily: "Helvetica",
                        color: "#fff",
                        fontSize: "17px",
                        fontWeight: 600,
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Helvetica",
                        color: "#BDBDBD",
                        fontSize: "17px",
                        fontWeight: 500,
                      }}
                    >
                      {product.category}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Helvetica",
                        color: "#fff",
                        fontSize: "17px",
                        fontWeight: 700,
                      }}
                    >
                      {currency(calculateDiscount(product.price, 0))} {/* Show discounted price */}
                    </Typography>
                  </Box>
                </FlexBox>
              </Link>
            </Grid>
          ))}
        </Grid>

        {/* Floating blobs for design */}
        <Box sx={blob1} />
        <Box sx={blob2} />
      </Container>
    </Box>
  );
}
