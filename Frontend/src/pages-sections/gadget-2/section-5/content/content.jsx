"use client";

import Link from "next/link";
import { Box, Container, Typography, IconButton, Grid } from '@mui/material';

import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward"; // LOCAL CUSTOM HOOK

import useCarousel from "./useCarousel"; // GLOBAL CUSTOM COMPONENTS
import LazyImage from "../../../../components/LazyImage";
import FlexBox from "../../../../components/flex-box/flex-box";

// import { Carousel } from "../../../../components/carousel";
import { FlexBetween, FlexRowCenter } from "../../../../components/flex-box";
import { H2, Paragraph } from "../../../../components/Typography";
import { calculateDiscount, currency } from "../../../../lib"; // STYLED COMPONENTS
import zIndex from "@mui/material/styles/zIndex";

// ==============================================================
export default function Content({
  products
}) {
  // const {
  //   carouselRef,
  //   responsive,
  //   handleNext,
  //   handlePrev
  // } = useCarousel();
  return <Container sx={{}}>
      <FlexRowCenter mt={10} mb={5}>
        <div>
          <H2 fontSize={{ sm: 34, xs: 28,  fontFamily: 'Elemental End', textTransform: 'lowercase', }}>
            Best Seller Products
          </H2>
          <Paragraph sx={{ fontFamily: 'Helvetica', textAlign:'center'}} color="grey.600" fontSize={{ sm: 16, xs: 14 }}>
            Augmented Reality features available in the Symspace app
          </Paragraph>
        </div>

        {/* <div>
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
        </div> */}
      </FlexRowCenter>
      <Box sx={{ position: 'relative', p: 5, borderRadius: '50px', background: "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)", overflow: 'hidden', boxShadow: "0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.5), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)", backdropFilter: "blur(50px)",  }}>
        {/* Rectangle Background Layer */}
        <Box sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), rgba(255, 255, 255, 0.1)',
          borderRadius: '0px 0px 20px 20px',
          left: 0,
          top: 0,
          zIndex: 0
        }} />

        <Grid container spacing={3} sx={{ position: 'relative', zIndex: 99999999 }}>
          {products.map((product) => (
            <Grid item lg={3} md={4} sm={6} xs={12} key={product.id}>
              <Link href={`/products/${product.slug}`}>
                <FlexBox
                  flexDirection="column"
                  bgcolor="rgba(255, 255, 255, 0.1)"
                  borderRadius={3}
                  mb={2}
                  sx={{ userSelect: 'text' }}
                >
                  <Box sx={{ maxHeight: 300, mt: -7, mb: 0 }}>
                    <LazyImage
                      alt={product.title}
                      width={380}
                      height={379}
                      src={product.thumbnail}
                    />
                  </Box>

                  <Box sx={{ px: 4, pb: 4 }}>
                    <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "18px", fontWeight: 500 }}>
                      {product.title}
                    </Typography>
                    <Typography sx={{ fontFamily: 'Helvetica', color: "#BDBDBD", fontSize: "16px", fontWeight: 500 }}>
                      {product.brand}
                    </Typography>
                    <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "20px", fontWeight: 700 }}>
                      {calculateDiscount(product.price, product.discount)}
                    </Typography>
                  </Box>
                </FlexBox>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

        {/* <Carousel ref={carouselRef} slidesToShow={4} responsive={responsive} arrows={false}>
          {products.map(product => <Link key={product.id} href={`/products/${product.slug}`}>
              <ProductCard11 title={product.title} image={product.thumbnail} sale={product.discount ? true : false} />
            </Link>)}
        </Carousel> */}
    </Container>
;
}