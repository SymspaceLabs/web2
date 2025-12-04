"use client";

// =============================================================
// Section 13 Component - NOW USING CAROUSEL
// =============================================================

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchProducts } from "@/services/productService";
import { ProductCard1 } from "@/components/custom-cards/product-cards";
import { Carousel } from "@/components/carousel"; // Imported Carousel
import { Box, Grid, Container, Tabs, Tab, CircularProgress, useMediaQuery } from "@mui/material"; // Imported useMediaQuery

// =============================================================

export default function Section13() { // Renamed function to match comment
  const [activeTab, setActiveTab] = useState("newArrival");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width:600px)'); // Check for mobile

  const categories = [
    { id: 1, title: "New Arrivals", slug: "newArrival" },
    { id: 2, title: "Best Seller", slug: "bestSeller" },
    { id: 3, title: "Trending", slug: "trending" },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      const { products, error } = await fetchProducts();
      if (error) console.error("Error fetching products:", error);
      // NOTE: In a real app, you would filter 'products' based on 'activeTab' here.
      setProducts(products || []); 
      setLoading(false);
    };

    loadProducts();
  }, []); // Dependency array intentionally empty to load all products once

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    // NOTE: In a real app, you might want to refetch or filter products here based on 'newValue'
  };

  // Responsive settings for product cards (e.g., 4 slides on large desktop)
  const productCarouselResponsive = [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
  ];

  // Helper component to wrap ProductCard1 with correct spacing/sizing
  const ProductWrapper = ({ product, isMobile }) => (
    <Box
      sx={{
        p: { xs: 0.5, sm: 1.5 },
        // For mobile scroll box to show 2 items
        width: isMobile ? 'calc(50% - 8px)' : 'auto', 
        flex: "0 0 auto", 
        scrollSnapAlign: "start",
      }}
    >
      <ProductCard1 product={product} />
    </Box>
  );

  return (
    <Box sx={{ width: "100%", py: { xs: 5, sm: 10 }, position:'relative', zIndex:2 }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ height: "100%" }}
        >
          <Box sx={{ zIndex: 2, py: { xs: 1, sm: 4 }, position: "relative" }} textAlign="center">
            <Box mb={4} overflow="hidden">
              <Tabs value={activeTab} onChange={handleChange}
                sx={{
                  "& .MuiTabs-indicator": { backgroundColor: "#FFF" },
                }}
              >
                {categories.map((item) => (
                  <Tab key={item.slug} label={item.title} value={item.slug}
                    sx={{
                      fontSize: { xs: 10, sm: 18 },
                      color: "#BDBDBD",
                      "&.Mui-selected": { color: "#FFFFFF" },
                    }}
                  />
                ))}
              </Tabs>
            </Box>
          </Box>

          {/* Product List Container - Replaced Grid with Carousel/Scrollable Box */}
          <Box sx={{ pt: 3, pb: 2 }}>
            {loading ? (
                <Box textAlign="center"><CircularProgress sx={{ color: "#FFF" }} /></Box>
            ) : isMobile ? (
              /* Mobile: Horizontal Scrollable Box */
              <Box
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  gap: 2,
                  py: 2,
                  scrollSnapType: "x mandatory",
                  scrollPaddingX: 2,
                  "&::-webkit-scrollbar": { display: "none" },
                  position: "relative", 
                  zIndex: 1,
                }}
              >
                {products.map((product, index) => (
                  <ProductWrapper key={index} product={product} isMobile={isMobile} />
                ))}
              </Box>
            ) : (
              /* Desktop/Tablet: Carousel */
              <Carousel
                arrows
                dots={false}
                spaceBetween={1}
                slidesToShow={4} // Default slides to show
                responsive={productCarouselResponsive}
                sx={{ position: "relative", zIndex: 1 }}
              >
                {products.map((product, index) => (
                  <ProductWrapper key={index} product={product} isMobile={isMobile} />
                ))}
              </Carousel>
            )}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}