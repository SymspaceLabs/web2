"use client";

// ====================================================================
// Section 7 Product Sections
// ====================================================================

import Link from "next/link";
import { motion } from "framer-motion"; // Import Framer Motion
import { calculateDiscount } from "@/lib";
import { PRODUCTS } from "@/data/products";
import { styles } from "../page-view/styles";
import { FlexBox, FlexCol } from "@/components/flex-box";
import { LazyImage } from "@/components/lazy-image";
import { H1, Paragraph } from "@/components/Typography";
import { Grid, Box, Card, CardContent, Container, Button } from "@mui/material";

export default function Section7() {

  const cardData = [
    {
      btnText:'Shop More',
      cardHeader:'Selected for you'
    },
    {
      btnText:'Shop New Arrivals',
      cardHeader:'New Arrivals'
    },
    {
      btnText:'Shop Sale',
      cardHeader:'Today’s deals'
    }
  ]

  return (
    <Box sx={{ py: 5 }}>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {/* Render three identical cards */}
          {cardData.map((data, index) => (
            <Grid item xs={12} sm={4} key={index}>
              {/* Motion wrapper for fade-in animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Card
                  sx={{
                    background: "#BDBDBD",
                    px: {xs:1, sm:2},
                    boxShadow:
                      "inset -5px -5px 20px 1px rgba(255, 255, 255, 0.25), inset 5px 5px 20px 1px rgba(255, 255, 255, 0.25)",
                    borderRadius: {xs:'25px', sm:"50px"},
                  }}
                >
                  <CardContent>
                    {/* Section Title */}
                    <H1 textAlign="center" color="#FFF" fontSize={{xs:20, sm:24}} py={3}>
                      {data.cardHeader}
                    </H1>

                    {/* Products Grid */}
                    <Grid container spacing={{xs:1, sm:2}}>
                      {PRODUCTS.slice(0, 4).map((product,index) => (
                        <Grid item lg={6} md={6} sm={6} xs={6} key={index}>
                          <ProductCard product={product} />
                          {/* <Link href={`/products/${product.slug}`} passHref>
                            <FlexBox
                              flexDirection="column"
                              bgcolor="rgba(255, 255, 255, 0.1)"
                              borderRadius={3}
                              mb={2}
                              sx={{ userSelect: "text", textDecoration: "none" }}
                            >
                              <Box sx={{ maxHeight: 150, mt: -2, mb: "25px" }}>
                                <LazyImage
                                  alt={product.title}
                                  width={100}
                                  height={100}
                                  src={product.thumbnail}
                                />
                              </Box>
                              <Box sx={{ px: 4, pb: 1 }}>
                                <Paragraph color="#FFF" fontSize="18px">
                                  {product.title}
                                </Paragraph>
                                <Paragraph color="#FFF" fontSize="16px">
                                  {product.brand}
                                </Paragraph>
                                <Paragraph color="#FFF" fontSize="20px" fontWeight={700}>
                                  {calculateDiscount(product.price, product.discount)}
                                </Paragraph>
                              </Box>
                            </FlexBox>
                          </Link> */}
                        </Grid>
                      ))}
                    </Grid>

                    {/* Contact Button */}
                    <FlexBox justifyContent="center">
                      <Button sx={styles.buttonLight}>
                        {data.btnText}
                      </Button>
                    </FlexBox>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

const ProductCard = ({product}) => {

  return (
    <Link href={`/products/${product.slug}`} passHref>
      <FlexCol bgcolor="rgba(255, 255, 255, 0.1)"
        borderRadius={3}
        mb={2}
        sx={{
          userSelect: "text",
        }}
      >
        {/* Product Image */}
        <Box sx={{ maxHeight: 300, mb: 0 }}>
          <LazyImage
            alt={product.title}
            width={380}
            height={379}
            src={product.thumbnail}
          />
        </Box>

        {/* Product Details */}
        <Box sx={{ px: {xs:1.5, sm:4}, pb: 4 }}>
          <Paragraph color="#FFF" fontSize={{xs:'12px', sm:"18px"}}>
            {product.title}
          </Paragraph>
          <Paragraph color="#FFF" fontSize={{xs:'12px', sm:"16px"}}>
            {product.brand}
          </Paragraph>
          <Paragraph color="#FFF" fontSize={{xs:'12px', sm:"18px"}} fontWeight={700}>
            {calculateDiscount(product.price, product.discount)}
          </Paragraph>
        </Box>
      </FlexCol>
    </Link>
  )
}