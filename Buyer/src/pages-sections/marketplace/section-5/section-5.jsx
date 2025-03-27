"use client";

// =======================================================================
// Section 5
// ========================================================================

import Link from "next/link";
import { motion } from "framer-motion";
import { calculateDiscount } from "@/lib";
import { LazyImage } from "@/components/lazy-image";
import { H1, Paragraph } from "@/components/Typography";
import { FlexRowCenter, FlexBox, FlexCol } from "@/components/flex-box";
import { Box, Container, Grid } from "@mui/material";
import { PRODUCTS } from "@/data/products";
import { styles } from "../page-view/styles";

export default function Section5() {
  // Render the Content component, passing the product list as a prop
  return (
    <Container sx={{ py:{xs:3, sm:5}, px:2.5 }}>
      {/* Header */}
      <FlexRowCenter mt={10} mb={{xs:3, sm:5}}>
        <div>
          <H1 fontSize={{ xs: 20, sm: 34 }}>
            Best Seller Products
          </H1>
          <Paragraph textAlign={{xs:"left", sm:"center"}} color="grey.600" fontSize={{ xs: 14, sm: 16 }}>
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
            {PRODUCTS.map((product, index) => (
              <Grid item lg={3} md={4} sm={6} xs={6} key={index}>
                  <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Container>
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
        <Box sx={{ maxHeight: 300, mt:{ sm:-7 }, mb: 0 }}>
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
          <Paragraph color="#BDBDBD" fontSize={{xs:'12px', sm:"16px"}}>
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
