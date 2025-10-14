// =======================================================
// Section 4 Shop Men
// =======================================================

import { motion } from "framer-motion";
import { styles } from "../page-view/styles";
import { H1 } from "@/components/Typography";
import { FlexBox } from "@/components/flex-box"; // Styled FlexBox component
import { Box, Container, Button, Grid } from '@mui/material';
import { ProductCard4 } from "@/components/custom-cards/product-cards";
import Link from "next/link";

export default function Section4() {
  return (
    <Box sx={{ px: {xs:2} }}>
      <Container sx={{ borderRadius:{xs:'30px', sm:'50px'}, py: 2, background: '#353535' }}>
        {/* Section heading */}
        <H1 fontSize={{xs:20, sm:30}} py={3} color='#FFF' textAlign='center'>
          Shop Men
        </H1>

        {/* Grid layout for blog cards */}
        <Grid container spacing={{xs:1, sm:2, md:3}}>
          {categoryCards.map((item,index) => (
            <Grid item lg={4} md={4} xs={4} key={index}>
              {/* Motion wrapper for fade-in animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <ProductCard4 item={item} textColor='#FFF' />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Call-to-action button */}
        <FlexBox justifyContent="end" sx={{ mt: 5 }}>
          <Button sx={styles.buttonLight} LinkComponent={Link} href="/products/search/all">
            Shop By Category
          </Button>
        </FlexBox>
      </Container>
    </Box>
  );
}

// Sample blog data for demonstration purposes
const categoryCards = [
  {
    id: "f54ee5db-ff89-4d86-ade8-86d949db7bg1",
    title: "Shirts",
    image: "/assets/images/products/Men/shirt.png",
    slug:'shirts',
  },
  {
    id: "f54ee5db-ff89-4d86-ade8-86d949db7bg2",
    title: "Bottoms",
    image: "/assets/images/products/Men/pants.png",
    slug:'bottoms',
  },
  {
    id: "f54ee5db-ff89-4d86-ade8-86d949db7bg3",
    title: "Accessories",
    image: "/assets/images/products/Men/watch.png",
    slug:'accessories',
  },
];
