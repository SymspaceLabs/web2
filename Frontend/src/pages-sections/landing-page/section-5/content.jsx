"use client";

import Link from "next/link";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton"; // MUI ICON COMPONENTS
import { FlexBox } from "../../../components/flex-box"; // CUSTOM UTILS LIBRARY FUNCTIONS
import LazyImage from "../../../components/LazyImage";
import { H6 } from "../../../components/Typography";

import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward"; // LOCAL CUSTOM HOOK

import useCarousel from "./useCarousel"; // GLOBAL CUSTOM COMPONENTS

import { Carousel } from "../../../components/carousel";
import { FlexBetween } from "../../../components/flex-box";
import { H3, Paragraph } from "../../../components/Typography";

// ==============================================================
export default function Content({
  products
}) {
  const {
    carouselRef,
    responsive,
    handleNext,
    handlePrev
  } = useCarousel();
  return <Container sx={{ py:10 }}>
      <FlexBetween mt={10} mb={5}>
        <div>
          <H3 fontSize={{ fontFamily: 'Helvetica', sm: 30, xs: 27 }}>
            Augmented Reality Marketplaces
          </H3>
          <Paragraph color="grey.600" fontSize={{
          sm: 16,
          xs: 14
        }}>
            There are many variations passages
          </Paragraph>
        </div>

        <div>
          <IconButton onClick={handlePrev}>
            <ArrowBack fontSize="small" />
          </IconButton>

          <IconButton onClick={handleNext} sx={{
          backgroundColor: "white",
          boxShadow: 2,
          ml: 0.5
        }}>
            <ArrowForward fontSize="small" />
          </IconButton>
        </div>
      </FlexBetween>

      <Carousel ref={carouselRef} slidesToShow={6} responsive={responsive} arrows={false}>
        {products.map(product =>
          <Link href={`/products/search/${product.slug}`} key={product.id}>
            <FlexBox sx={{ py:5 }} bgcolor="#353535" borderRadius={3} alignItems="center" flexDirection="column" justifyContent="center" height="calc(100% - 74px)">
              <LazyImage alt={product.title} width={10} height={10} sx={{ width:'40px', height:'40px'}} src={product.thumbnail} />
              <H6 sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color:'#fff' }}>{product.title}</H6>
            </FlexBox>
          </Link>
        )}
      </Carousel>
    </Container>;
}