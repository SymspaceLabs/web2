"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { styles } from "../page-view/styles";
import { FlexBox } from "@/components/flex-box";
import { LazyImage } from '@/components/lazy-image';
import { calculateDiscount, currency } from "@/lib";
import { Box, Grid, Container, Tabs, Tab, Typography } from "@mui/material";

export default function Section12() {
  const [activeTab, setActiveTab] = useState("newArrival");
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 1, title: "New Arrivals", slug: "newArrival" },
    { id: 2, title: "Best Seller", slug: "bestSeller" },
    { id: 3, title: "Featured Products", slug: "featured" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
                      textTransform: "none",
                      ...styles.elementalEndFont,
                      fontWeight: 400,
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
          <Box sx={{ overflowX: { xs: "auto", sm: "visible" }, whiteSpace: "nowrap", pb: 2, pt: 3, pl: 3.5 }}>
            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                flexWrap: { xs: "nowrap", sm: "wrap" }, // Prevent wrapping on mobile, allow on desktop
                justifyContent: { xs: "flex-start", sm: "flex-start" }, // Align to left
              }}
            >
              {products.map((product,index) => (
                <Grid
                  item
                  key={index}
                  lg={3} md={4} sm={6} xs={12} // Max 4 per row on desktop
                  sx={{
                    flex: { xs: "0 0 auto", sm: "1 1 auto" }, 
                    width: { xs: "35%", sm: "auto" }, 
                    mr: { xs: 2, sm: 0 }, // Keep spacing for mobile scroll
                    pl: { xs: "0px !important", sm: "12px !important" }, // Adds left padding for spacing on desktop
                    pt: { xs: "0px !important", sm: "12px" }, // Adjust top padding for uniform spacing
                  }}
                >
                  <Link href={`/products/${product.slug}`}>
                    <FlexBox
                      flexDirection="column"
                      bgcolor="rgba(255, 255, 255, 0.1)"
                      borderRadius={3}
                      mb={2}
                      sx={{
                        transition: "background-color 0.3s ease",
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.15)" },
                      }}
                    >
                      <LazyImage
                        alt="product images"
                        width={380}
                        height={379}
                        src={product.images?.[0]?.url || "/placeholder.png"}
                      />
                      <Box sx={{ px: { xs: 1.5, sm: 4 }, pb: 4 }}>
                        <Typography sx={{ fontFamily: "Helvetica", color: "#fff", fontSize: { xs: 10, sm: 18 }, fontWeight: 500 }}>
                          {product.name}
                        </Typography>
                        <Typography sx={{ fontFamily: "Helvetica", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontSize: { xs: 10, sm: 17 }, fontWeight: 400 }}>
                          {product.company.businessName}
                        </Typography>
                        <FlexBox gap={1}>
                          <Typography sx={{ fontFamily: "Helvetica", color: "#fff", fontSize: { xs: 10, sm: 17 }, fontWeight: 500 }}>
                            {currency(calculateDiscount(product.price, 0))}
                          </Typography>
                          <Typography sx={{ fontFamily: "Helvetica", color: "rgba(255,255,255,0.5)", fontSize: { xs: 10, sm: 17 }, fontWeight: 500, textDecoration: "line-through" }}>
                            {currency(calculateDiscount(product.price, 0))}
                          </Typography>
                        </FlexBox>
                      </Box>
                    </FlexBox>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>


  );
}
