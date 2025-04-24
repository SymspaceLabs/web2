"use client";

// =============================================================
// Section 13 Component
// =============================================================

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FlexBox, FlexCol } from "@/components/flex-box";
import { LazyImage } from "@/components/lazy-image";
import { calculateDiscount, currency } from "@/lib";
import { Paragraph } from "@/components/Typography";
import { Box, Grid, Container, Tabs, Tab } from "@mui/material";

// =============================================================

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
            <Grid
              container
              spacing={3}
              sx={{
                justifyContent: "flex-start",
              }}
            >

              {products.map((product,index) => (
                <Grid
                  item
                  key={index}
                  xs={6} sm={4} md={3} lg={3} // Defines the column span per breakpoint
                  sx={{
                    display: 'flex',
                  }}
                >
                  <Link href={`/products/${product.slug}`} style={{ width: '100%' }}>
                    <FlexCol
                      bgcolor="rgba(255, 255, 255, 0.1)"
                      borderRadius={3}
                      mb={2}
                      sx={{
                        width: '100%', // Ensure card fills its parent
                        transition: "background-color 0.3s ease",
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.15)" },
                      }}
                    >
                      <Box sx={{ width: "100%", maxWidth: { xs: "100%", sm: "100%" } }}>
                        <LazyImage
                          alt="product images"
                          width={355}
                          height={355}
                          src={product.images?.[0]?.url || "/placeholder.png"}
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                            width: "100%",
                            height: "auto",
                            aspectRatio: "1 / 1",
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                          }}
                        />

                      </Box>
                      
                
                      <Box sx={{ px: { xs: 1.5, sm: 4 }, pb: 4 }}>
                        <Paragraph sx={{ color: "#fff", fontSize: { xs: 10, sm: 18 }, fontWeight: 500 }}>
                          {product.name}
                        </Paragraph>
                        <Paragraph sx={{ textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontSize: { xs: 10, sm: 17 } }}>
                          {product.company.businessName}
                        </Paragraph>
                        <FlexBox gap={1}>
                          <Paragraph sx={{ color: "#fff", fontSize: { xs: 10, sm: 17 }, fontWeight: 500 }}>
                            {currency(calculateDiscount(product.price, 0))}
                          </Paragraph>
                          <Paragraph sx={{ color: "rgba(255,255,255,0.5)", fontSize: { xs: 10, sm: 17 }, fontWeight: 500, textDecoration: "line-through" }}>
                            {currency(calculateDiscount(product.salePrice, 0))}
                          </Paragraph>
                        </FlexBox>
                      </Box>
                    </FlexCol>
                  </Link>
                </Grid>
              
                // <Grid
                //   item
                //   key={index}
                //   lg={3} md={4} sm={6} xs={6} // xs: 2 cards per row
                //   sx={{
                //     flex: { xs: "0 0 auto", sm: "1 1 auto" }, 
                //     width: { xs: "35%", sm: "auto" }, 
                //     mr: { xs: 2, sm: 0 }, // Keep spacing for mobile scroll
                //     pl: { xs: "0px !important", sm: "12px !important" }, // Adds left padding for spacing on desktop
                //     pt: { xs: "0px !important", sm: "12px" }, // Adjust top padding for uniform spacing
                //   }}
                // >
                //   <Link href={`/products/${product.slug}`}>
                //     <FlexCol
                //       bgcolor="rgba(255, 255, 255, 0.1)"
                //       borderRadius={3}
                //       mb={2}
                //       sx={{
                //         width: '100%',
                //         transition: "background-color 0.3s ease",
                //         "&:hover": { bgcolor: "rgba(255, 255, 255, 0.15)" },
                //       }}
                //     >
                //       <LazyImage
                //         alt="product images"
                //         width={355}
                //         height={355}
                //         src={product.images?.[0]?.url || "/placeholder.png"}
                //         style={{
                //           objectFit: "cover",
                //           objectPosition: "center",
                //           maxHeight: "355px",
                //           width: "100%",
                //           height: "355px",
                //           borderTopLeftRadius: '12px',
                //           borderTopRightRadius: '12px',
                //         }}
                //       />

                //       <Box sx={{ px: { xs: 1.5, sm: 4 }, pb: 4 }}>
                //         <Paragraph sx={{ color: "#fff", fontSize: { xs: 10, sm: 18 }, fontWeight: 500 }}>
                //           {product.name}
                //         </Paragraph>
                //         <Paragraph sx={{ textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontSize: { xs: 10, sm: 17 } }}>
                //           {product.company.businessName}
                //         </Paragraph>
                //         <FlexBox gap={1}>
                //           <Paragraph sx={{ color: "#fff", fontSize: { xs: 10, sm: 17 }, fontWeight: 500 }}>
                //             {currency(calculateDiscount(product.price, 0))}
                //           </Paragraph>
                //           <Paragraph sx={{ color: "rgba(255,255,255,0.5)", fontSize: { xs: 10, sm: 17 }, fontWeight: 500, textDecoration: "line-through" }}>
                //             {currency(calculateDiscount(product.salePrice, 0))}
                //           </Paragraph>
                //         </FlexBox>
                //       </Box>
                //     </FlexCol>
                //   </Link>
                // </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
