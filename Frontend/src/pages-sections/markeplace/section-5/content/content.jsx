"use client";

import Link from "next/link";
import { Box, Container, Typography, Grid } from "@mui/material";
import LazyImage from "../../../../components/LazyImage";
import FlexBox from "../../../../components/flex-box/flex-box";
import { FlexRowCenter } from "../../../../components/flex-box";
import { H2, Paragraph } from "../../../../components/Typography";
import { calculateDiscount } from "../../../../lib";

/**
 * Renders the Best Seller Products section showcasing a list of products.
 * Each product is displayed with its thumbnail, title, brand, and discounted price.
 * 
 * @param {Object[]} products - The list of product data.
 * @param {string} products[].id - Unique identifier for each product.
 * @param {string} products[].title - Title of the product.
 * @param {string} products[].brand - Brand name of the product.
 * @param {number} products[].price - Original price of the product.
 * @param {number} products[].discount - Discount percentage (if applicable).
 * @param {string} products[].thumbnail - URL of the product image.
 * @param {string} products[].slug - Slug for the product's detail page.
 * 
 * @returns JSX.Element
 */
export default function Content({ products }) {
  return (
    <Container>
      {/* Header section with title and description */}
      <FlexRowCenter mt={10} mb={5}>
        <div>
          <H2
            fontSize={{
              sm: 34,
              xs: 28,
            }}
            fontFamily="Elemental End"
            textTransform="lowercase"
          >
            Best Seller Products
          </H2>
          <Paragraph
            sx={{
              fontFamily: "Helvetica",
              textAlign: "center",
            }}
            color="grey.600"
            fontSize={{ sm: 16, xs: 14 }}
          >
            Augmented Reality features available in the Symspace app
          </Paragraph>
        </div>
      </FlexRowCenter>

      {/* Product showcase container */}
      <Box
        sx={{
          position: "relative",
          p: 5,
          borderRadius: "50px",
          background:
            "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",
          overflow: "hidden",
          boxShadow:
            "0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.5), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(50px)",
        }}
      >
        {/* Decorative overlay for gradient effect */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), rgba(255, 255, 255, 0.1)",
            borderRadius: "0px 0px 20px 20px",
            left: 0,
            top: 0,
            zIndex: 0,
          }}
        />

        {/* Grid container to display product cards */}
        <Grid
          container
          spacing={3}
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {products.map((product) => (
            <Grid item lg={3} md={4} sm={6} xs={12} key={product.id}>
              <Link href={`/products/${product.slug}`} passHref>
                <FlexBox
                  flexDirection="column"
                  bgcolor="rgba(255, 255, 255, 0.1)"
                  borderRadius={3}
                  mb={2}
                  sx={{
                    userSelect: "text",
                  }}
                >
                  {/* Product Image */}
                  <Box sx={{ maxHeight: 300, mt: -7, mb: 0 }}>
                    <LazyImage
                      alt={product.title}
                      width={380}
                      height={379}
                      src={product.thumbnail}
                    />
                  </Box>

                  {/* Product Details */}
                  <Box sx={{ px: 4, pb: 4 }}>
                    <Typography
                      sx={{
                        fontFamily: "Helvetica",
                        color: "#fff",
                        fontSize: "18px",
                        fontWeight: 500,
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Helvetica",
                        color: "#BDBDBD",
                        fontSize: "16px",
                        fontWeight: 500,
                      }}
                    >
                      {product.brand}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Helvetica",
                        color: "#fff",
                        fontSize: "20px",
                        fontWeight: 700,
                      }}
                    >
                      {calculateDiscount(product.price, product.discount)}
                    </Typography>
                  </Box>
                </FlexBox>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
