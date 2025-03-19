// =======================================================
// Section 4 Component
// =======================================================

import BlogCard from "../section-3/blog-card";
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { FlexBox } from "@/components/flex-box"; // Styled FlexBox component
import { motion } from "framer-motion"; // Import Framer Motion
import { styles } from '../page-view/styles';

export default function Section4() {
  return (
    <Box>
      <Container sx={{  borderRadius:'50px', py: 2, background: '#353535' }}>
        {/* Section heading */}
        <Typography
          sx={{
            textAlign: 'center',
            color: '#fff',
            py:3,
            ...styles.elementalEndFont,
            fontSize: 30,
          }}
        >
          Shop Men
        </Typography>

        {/* Grid layout for blog cards */}
        <Grid container spacing={3}>
          {blogs.map((blog,index) => (
            <Grid item lg={4} md={8} xs={12} key={blog.id}>
              {/* Motion wrapper for fade-in animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <BlogCard
                  date={blog.createdAt}
                  title={blog.title}
                  image={blog.image}
                  textColor='#FFF'
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Call-to-action button */}
        <FlexBox justifyContent="end" sx={{ mt: 5 }}>
          <Button sx={styles.buttonLight}>
            Shop By Category
          </Button>
        </FlexBox>
      </Container>
    </Box>
  );
}

// Sample blog data for demonstration purposes
const blogs = [
  {
    id: "f54ee5db-ff89-4d86-ade8-86d949db7bg1",
    title: "Shirts",
    description: "Detailed description about shirts.",
    image: "/assets/images/products/Men/shirt.png",
    createdAt: "2022-11-08T07:15:55.897Z",
  },
  {
    id: "f54ee5db-ff89-4d86-ade8-86d949db7bg2",
    title: "Bottoms",
    description: "Detailed description about bottoms.",
    image: "/assets/images/products/Men/pants.png",
    createdAt: "2022-11-08T07:15:55.897Z",
  },
  {
    id: "f54ee5db-ff89-4d86-ade8-86d949db7bg3",
    title: "Accessories",
    description: "Detailed description about accessories.",
    image: "/assets/images/products/Men/watch.png",
    createdAt: "2022-11-08T07:15:55.897Z",
  },
];
