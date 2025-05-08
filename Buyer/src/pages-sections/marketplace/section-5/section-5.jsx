"use client";

// =======================================================================
// Section 5 | Marketplace
// ========================================================================

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { styles } from "../page-view/styles";
import { Box, Container, Grid } from "@mui/material";
import { FlexRowCenter } from "@/components/flex-box";
import { H1, Paragraph } from "@/components/Typography";
import { ProductCard1 } from "@/components/custom-cards/product-cards";

// ========================================================================

export default function Section5() {

  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
        const data = await response.json();
        setproducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchproducts();
  }, []);

  return (
    <Container sx={{ py:{xs:3, sm:5}, px:2.5 }}>
      {/* Header */}
      <FlexRowCenter mt={10} mb={{xs:3, sm:5}}>
        <div>
          <H1 sx={styles.sectionHeader}>
            Best Seller products
          </H1>
          <Paragraph sx={styles.sectionSubHeader}>
            Augmented Reality features available in the Symspace app
          </Paragraph>
        </div>
      </FlexRowCenter>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Box sx={styles.bestSellerBg}>
          {/* Decorative overlay for gradient effect */}
          <Box sx={styles.glassBg} />

          {/* Grid container to display product cards */}
          <Grid container spacing={{xs:1, sm:3}} sx={{ position: "relative", zIndex: 1 }}>
            {products.map((product, index) => (
              <Grid item lg={3} md={4} sm={6} xs={6} key={index}>
                  <ProductCard1 product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
}
