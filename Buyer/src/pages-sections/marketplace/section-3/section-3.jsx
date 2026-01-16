// ==========================================================
// Section 3 Shop Women
// ==========================================================

import { motion } from "framer-motion";
import { styles } from "../page-view/styles";
import { H1 } from "@/components/Typography";
import { FlexBox } from "@/components/flex-box";
import { Box, Container, Button, Grid } from "@mui/material";
import { ProductCard4 } from "@/components/custom-cards/product-cards";
import Link from "next/link";

// ==========================================================

export default function Section3() {
  return (
    <Box sx={{ py: {xs:2, sm:10}, px: {xs:2} }}>
      <Container sx={{ borderRadius:{xs:"30px", sm:"50px"}, py: 2, background: "#E0F0FD" }}>
        <H1 fontSize={{xs:20, sm:30}} py={3} color="#000" textAlign="center">
          Shop Women
        </H1>

        {/* Grid to display product cards */}
        <Grid container spacing={{xs:1, sm:2, md:3}}>
          {products.map((item, index) => (
            <Grid item lg={4} md={4} xs={4} key={index}>
              {/* Motion wrapper for fade-in animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <ProductCard4 item={item} />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Call-to-action button aligned to the right */}
        <FlexBox justifyContent="end" sx={{ mt: 5 }}>
          <Button sx={styles.buttonLight} LinkComponent={Link} href="/products">
            Shop By Category
          </Button>
        </FlexBox>
      </Container>
    </Box>
  );
}

/**
 * Dummy product data for rendering product cards.
 * Each product contains details such as title, image, and creation date.
 */
const products = [
  {
    id: "f54ee5db-ff89-4d86-ade8-86d949db7bg1",
    title: "Dresses",
    image: "/assets/images/products/Women/dress.png",
    slug: "dresses",
    url: "/products?subcategory=dresses"
  },
  {
    id: "f54ee5db-ff89-4d86-ade8-86d949db7bg2",
    title: "Tops",
    image: "/assets/images/products/Women/top.png",
    slug: "tops",
    url: "/products?subcategory=tops"
  },
  {
    id: "f54ee5db-ff89-4d86-ade8-86d949db7bg3",
    title: "Bottoms",
    image: "/assets/images/products/Women/bottom.png",
    slug: "bottoms",
    url: "/products?subcategory=bottoms"
  },
];
