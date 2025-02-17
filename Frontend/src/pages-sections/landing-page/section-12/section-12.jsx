"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Box, Grid, Container, Tabs, Tab, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FlexBox } from "../../../components/flex-box";
import LazyImage from "../../../components/LazyImage";
import { calculateDiscount, currency } from "../../../lib";
import { motion, useInView } from "framer-motion";

export default function Section12() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("newArrival");
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const categories = [
    { id: 1, title: "New Arrival", slug: "newArrival" },
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
      display: 'none',
    },
  };

  return (
    <Box sx={{ width: "100%", background: "#1F1F1F", py: 25 }}>
      <Container sx={{ position: "relative" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box sx={{ zIndex: 2, position: "relative" }} py={4} textAlign="center">
            <Box mb={4} overflow="hidden">
              <Tabs value={activeTab} onChange={handleChange}
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#FFF",
                  },
                }}
              >
                {categories.map((item) => (
                  <Tab key={item.slug} label={item.title} value={item.slug}
                    sx={{
                      textTransform: "none",
                      fontFamily: "Elemental End",
                      textTransform: "lowercase",
                      fontWeight: 400,
                      fontSize: 18,
                      color: "#BDBDBD",
                      "&.Mui-selected": {
                        color: "#FFFFFF",
                      },
                    }}
                  />
                ))}
              </Tabs>
            </Box>
          </Box>

          <Grid sx={{ zIndex: 2, position: "relative" }} container spacing={3}>
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
                        bgcolor: "rgba(255, 255, 255, 0.15)",
                      },
                    }}
                  >
                    <LazyImage
                      alt="product images"
                      width={380}
                      height={379}
                      src={product.images?.[0]?.url || "/placeholder.png"}
                    />
                    <Box sx={{ px: 4, pb: 4 }}>
                      <Typography
                        sx={{
                          fontFamily: "Helvetica",
                          color: "#fff",
                          fontSize: 18,
                          fontWeight: 500,
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Helvetica",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "17px",
                          fontWeight: 400,
                        }}
                      >
                        {product.company.businessName}
                      </Typography>

                      <FlexBox gap={1}>
                        <Typography sx={{ fontFamily: "Helvetica", color: "#fff", fontSize: "17px", fontWeight: 500 }}>
                          {currency(calculateDiscount(product.price, 0))}
                        </Typography>
                        <Typography sx={{ fontFamily: "Helvetica", color: "rgba(255,255,255,0.5)", fontSize: "17px", fontWeight: 500, textDecoration: "line-through" }}>
                          {currency(calculateDiscount(product.price, 0))}
                        </Typography>
                      </FlexBox>
                    </Box>
                  </FlexBox>
                </Link>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <Box sx={blob1} />
        <Box sx={blob2} />
      </Container>
    </Box>
  );
}
