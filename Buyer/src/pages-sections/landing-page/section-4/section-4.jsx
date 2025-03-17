"use client";

// ============================================================
// Section4 Carousal section
// ============================================================

import Link from "next/link"; // Used for navigation.
import useCarousel from "./useCarousel"; // Custom hook for carousel functionality.
import ArrowForward from "@mui/icons-material/ArrowForward"; // Material-UI forward arrow icon.
import ArrowBack from "@mui/icons-material/ArrowBack"; // Material-UI back arrow icon.
import { motion } from "framer-motion"; // Import Framer Motion
import { FlexBox, FlexColCenter } from "@/components/flex-box"; // Custom utility for flexible layouts.
import { LazyImage } from '@/components/lazy-image';
import { H6 } from "@/components/Typography"; // Custom typography component.
import { Carousel } from "@/components/carousel"; // Custom carousel component.
import { FlexBetween } from "@/components/flex-box"; // Custom layout utility.
import { Typography, Container, IconButton, Box, useMediaQuery } from "@mui/material";

// ============================================================


// Fade-in animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};


export default function Section4() {
    // Extract carousel-related functionality from the custom hook.
    const { carouselRef, responsive, handleNext, handlePrev } = useCarousel();
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
      <Box sx={{ background:'#FFF'}}>
        <Container sx={{ py: { xs:3, md:10 } }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            {/* Header with title, description, and carousel navigation buttons */}
            <FlexBetween sx={{ py: { xs:2, sm:5 } }}>
              <Typography sx={{ fontFamily: "Elemental End", textTransform: "lowercase", fontSize: { xs: 20, sm: 24 }, textAlign: {xs:'center'} }}>
                Augmented Reality Marketplaces
              </Typography>
    
              {/* Navigation buttons for the carousel */}
              <Box sx={{ display: {xs:'none', sm:'block'}}}>
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
              </Box>
            </FlexBetween>

            {/* Horizontally Scrollable Cards */}
          <FlexBox
            sx={{
              display: {xs:'flex', sm:'none'},
              gap: 2,
              overflowX: "auto",
              scrollbarWidth: "none", // Hide scrollbar (Firefox)
              "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar (Chrome, Safari)
              scrollSnapType: "x mandatory",
              paddingBottom: 2, // Ensure spacing for scroll
            }}
          >
            {categories.map((item,index) => (
              <Link key={index} href={`/products/search/${item.slug}`} passHref>
                {/* Product card */}
                <FlexColCenter
                  sx={{
                    py: {xs:2, sm:5},
                    bgcolor: "#353535",
                    borderRadius: '15px',
                    alignItems: "center",
                    gap:1,
                    width: isMobile ? 85 : 160, // Set fixed width for scroll
                    flexShrink: 0, // Prevents items from shrinking
                    scrollSnapAlign: "start",
                  }}
                >
                  {/* Product image */}
                  <LazyImage
                    alt={item.title}
                    width={10}
                    height={10}
                    sx={{ width: {xs:'30px', sm:"40px"}, height: {xs:'30px', sm:"40px"} }}
                    src={item.thumbnail}
                  />
                  {/* Product title */}
                  <H6
                    sx={{
                      fontFamily: "Elemental End",
                      textTransform: "lowercase",
                      fontSize: { xs:8, sm:12 },
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    {item.title}
                  </H6>
                </FlexColCenter>
              </Link>
            ))}
          </FlexBox>
    
            {/* Carousel displaying products */}
            {!isMobile && (
              <Carousel ref={carouselRef} slidesToShow={isMobile? 3:6} responsive={responsive} arrows={false}>
                {categories.map((item) => (
                  <motion.div key={item.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                    <Link href={`/products/search/${item.slug}`}>
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
                        <LazyImage
                          alt={item.title}
                          width={10}
                          height={10}
                          sx={{ width: "40px", height: "40px" }}
                          src={item.thumbnail}
                        />
                        <H6
                          sx={{
                            fontFamily: "Elemental End",
                            textTransform: "lowercase",
                            color: "#fff",
                          }}
                        >
                          {item.title}
                        </H6>
                      </FlexBox>
                    </Link>
                  </motion.div>
                ))}
              </Carousel>
            )}

          </motion.div>
        </Container>
      </Box>

    );
}

// Static product list as placeholder data.
const categories = [
  { id: 1, title: "Shirts", thumbnail: "/assets/images/icons/shirt.svg", slug: "shirts" },
  { id: 2, title: "Hoodies", thumbnail: "/assets/images/icons/hoodie.svg", slug: "hoodie" },
  { id: 3, title: "Pants", thumbnail: "/assets/images/icons/pants.svg", slug: "pants" },
  { id: 4, title: "Furniture", thumbnail: "/assets/images/icons/furniture.svg", slug: "furniture" },
  { id: 5, title: "Shoes", thumbnail: "/assets/images/icons/shoe.svg", slug: "shoe" },
  { id: 6, title: "Dresses", thumbnail: "/assets/images/icons/dress-2.svg", slug: "dress" },
  { id: 7, title: "Earrings", thumbnail: "/assets/images/icons/earring.svg", slug: "earring" },
  { id: 8, title: "Accessories", thumbnail: "/assets/images/icons/accessory.svg", slug: "accessory" },
  { id: 9, title: "Bags", thumbnail: "/assets/images/icons/bag-2.svg", slug: "bag" },
  { id: 10, title: "Hats", thumbnail: "/assets/images/icons/hat.svg", slug: "hat" },
  { id: 11, title: "Watches", thumbnail: "/assets/images/icons/watch-2.svg", slug: "watch" },
  { id: 12, title: "Eyewear", thumbnail: "/assets/images/icons/eyewear.svg", slug: "eyewear" },
  { id: 13, title: "TVs", thumbnail: "/assets/images/icons/tv.svg", slug: "tv" },
];
