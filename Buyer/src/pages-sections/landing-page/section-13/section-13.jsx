"use client";

// =============================================================
// Section 13 Component
// =============================================================

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchProducts } from "@/services/productService";
import { ProductCard1 } from "@/components/custom-cards/product-cards";
import { Box, Grid, Container, Tabs, Tab, CircularProgress } from "@mui/material";

// =============================================================

export default function Section12() {
  const [activeTab, setActiveTab] = useState("newArrival");
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 1, title: "New Arrivals", slug: "newArrival" },
    { id: 2, title: "Best Seller", slug: "bestSeller" },
    { id: 3, title: "Trending", slug: "trending" },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      const { products, error } = await fetchProducts();
      if (error) console.error("Error fetching products:", error);
      setProducts(products);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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

          {/* Product List Container */}
          <Box sx={{ pt: 3, pb: 2 }}>
            <Grid container spacing={3} justifyContent="flex-start" >
              {
                loading && <CircularProgress />
              }
              {products.map((product, index) => (
                <Grid key={index} item xs={6} sm={4} md={3} lg={3} sx={{ display: "flex" }}>
                  <ProductCard1 product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}