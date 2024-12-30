/**
 * Section5 Component
 *
 * This component represents the "Augmented Reality Marketplaces" section, showcasing trending products in a carousel format.
 *
 * Features:
 * - Displays a title and description introducing the concept of AR marketplaces.
 * - Provides a carousel of products, allowing users to explore various categories.
 * - Includes navigation buttons for scrolling through the carousel.
 * - Uses responsive design for seamless experience across devices.
 *
 * Usage:
 * - This component can be integrated into an e-commerce landing page to highlight trending products.
 * - Products data can be dynamically fetched and passed as props to the `Content` component.
 */

"use client"; // Indicates client-side rendering for this Next.js component.

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
import { H3, Paragraph } from "../../../components/Typography"; // Custom typography components.

export default async function Section5() {
  // Placeholder for fetching trending products dynamically in the future.
  // const products = await api.getTrendingProducts();
  return <Content products={items} />;
}

/**
 * Content Component
 * 
 * Displays the main content of the section, including the carousel of products.
 * 
 * Props:
 * - products (Array): List of product objects to display in the carousel.
 */
function Content({ products }) {
  // Extract carousel-related functionality from the custom hook.
  const { carouselRef, responsive, handleNext, handlePrev } = useCarousel();

  return (
    <Container sx={{ py: 10 }}>
      {/* Header with title, description, and carousel navigation buttons */}
      <FlexBetween mt={10} mb={5}>
        <div>
          {/* Section title */}
          <H3 fontSize={{ fontFamily: "Helvetica", sm: 30, xs: 27 }}>
            Augmented Reality Marketplaces
          </H3>

          {/* Section description */}
          <Paragraph color="grey.600" fontSize={{ sm: 16, xs: 14 }}>
            There are many variations passages
          </Paragraph>
        </div>

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
          <Link href={`/products/search/${product.slug}`} key={product.id}>
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
        ))}
      </Carousel>
    </Container>
  );
}

// Static product list as placeholder data.
const items = [
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
