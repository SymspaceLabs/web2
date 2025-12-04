"use client";

// =======================================================================
// Section 5 | Marketplace | Best Sellers - NOW USING NEW CAROUSEL METHOD
// ========================================================================

import Link from "next/link";
// import { StyledGrid } from "./styles"; // Assuming you have a StyledGrid in your styles/ folder
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { styles } from "../page-view/styles"; // Assuming the path is correct
import { H1, Paragraph } from "@/components/Typography";
import { Carousel } from "@/components/carousel";
import { ProductCard1 } from "@/components/custom-cards/product-cards"; // Your product card component
import { FlexRowCenter } from "@/components/flex-box";
import { LazyImage } from "@/components/lazy-image"; // Re-added if ProductCard1 uses LazyImage
import { Box, Container, Button, Grid, useMediaQuery } from "@mui/material";

export default function Section5() {
  const isMobile = useMediaQuery('(max-width:600px)');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
      const data = await response.json();
      setProducts(data.products || []); // Ensure data.products is an array
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Responsive settings adapted for product cards (e.g., 4 slides on large desktop)
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

  if (loading) {
    return (
      <Container sx={{ py:{xs:3, sm:5}, px:2.5 }}>
        <FlexRowCenter mt={10} mb={{xs:3, sm:5}}>
            <Paragraph>Loading products...</Paragraph>
        </FlexRowCenter>
      </Container>
    );
  }

  // Helper component for the individual product wrapper style within the carousel/scroll box
  const ProductWrapper = ({ children }) => (
    <Box 
      sx={{ 
        p: { xs: 0.5, sm: 1.5 },
        // For mobile scroll box to work correctly
        width: isMobile ? 'calc(50% - 8px)' : 'auto', // e.g., show 2 items on mobile
        flex: "0 0 auto", 
        scrollSnapAlign: "start",
      }}
    >
      {children}
    </Box>
  );

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

          {isMobile ? (
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
                <ProductWrapper key={index}>
                    <ProductCard1 product={product} />
                </ProductWrapper>
              ))}
            </Box>
          ) : (
            /* Desktop/Tablet: Carousel */
            <Carousel
              arrows
              dots={false}
              spaceBetween={1}
              slidesToShow={4}
              responsive={productCarouselResponsive}
              sx={{ position: "relative", zIndex: 1 }}
            >
              {products.map((product, index) => (
                <ProductWrapper key={index}>
                    <ProductCard1 product={product} />
                </ProductWrapper>
              ))}
            </Carousel>
          )}

        </Box>
      </motion.div>
    </Container>
  );
}