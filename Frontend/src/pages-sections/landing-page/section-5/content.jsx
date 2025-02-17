"use client";

/**
 * Content Component
 * 
 * Displays the main content of the section, including the carousel of products.
 * 
 * Props:
 * - products (Array): List of product objects to display in the carousel.
 */

import Link from "next/link"; // Used for navigation.
import Container from "@mui/material/Container"; // Material-UI layout component.
import IconButton from "@mui/material/IconButton"; // Material-UI button with icon support.
import { FlexBox } from "../../../components/flex-box"; // Custom utility for flexible layouts.
import LazyImage from "../../../components/LazyImage"; // Custom lazy-loading image component.
import { H6 } from "../../../components/Typography"; // Custom typography component.
import ArrowBack from "@mui/icons-material/ArrowBack"; // Material-UI back arrow icon.
import ArrowForward from "@mui/icons-material/ArrowForward"; // Material-UI forward arrow icon.
import useCarousel from "./useCarousel"; // Custom hook for carousel functionality.
import { Carousel } from "../../../components/carousel"; // Custom carousel component.
import { FlexBetween } from "../../../components/flex-box"; // Custom layout utility.
import { Typography } from "@mui/material";
import { motion } from "framer-motion"; // Import Framer Motion

// Fade-in animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// ==============================================================

export default function Content({ products }) {
  // Extract carousel-related functionality from the custom hook.
  const { carouselRef, responsive, handleNext, handlePrev } = useCarousel();

  return (
    <Container sx={{ py: 10 }}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        {/* Header with title, description, and carousel navigation buttons */}
        <FlexBetween mt={10} mb={5}>
          <Typography sx={{ fontFamily: "Elemental End", textTransform: "lowercase", fontSize: { xs: 20, sm: 24 } }}>
            Augmented Reality Marketplaces
          </Typography>

          {/* Navigation buttons for the carousel */}
          <div>
            <IconButton onClick={handlePrev}>
              <ArrowBack fontSize="small" />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                backgroundColor: "white",
                boxShadow: 2,
                ml: 0.5,
              }}
            >
              <ArrowForward fontSize="small" />
            </IconButton>
          </div>
        </FlexBetween>

        {/* Carousel displaying products */}
        <Carousel ref={carouselRef} slidesToShow={6} responsive={responsive} arrows={false}>
          {products.map((product) => (
            <motion.div key={product.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Link href={`/products/search/${product.slug}`}>
                {/* Product card */}
                <FlexBox
                  sx={{
                    py: 5,
                    bgcolor: "#353535",
                    borderRadius: 3,
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "calc(100% - 74px)",
                  }}
                >
                  {/* Product image */}
                  <LazyImage
                    alt={product.title}
                    width={10}
                    height={10}
                    sx={{ width: "40px", height: "40px" }}
                    src={product.thumbnail}
                  />
                  {/* Product title */}
                  <H6
                    sx={{
                      fontFamily: "Elemental End",
                      textTransform: "lowercase",
                      color: "#fff",
                    }}
                  >
                    {product.title}
                  </H6>
                </FlexBox>
              </Link>
            </motion.div>
          ))}
        </Carousel>
      </motion.div>
    </Container>
  );
}
