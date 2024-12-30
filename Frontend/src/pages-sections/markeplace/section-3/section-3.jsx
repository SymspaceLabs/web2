import { Box, Container, Typography, Button, Grid } from '@mui/material';

import { H2 } from "../../../components/Typography"; // Local custom Typography component
import FlexBox from "../../../components/flex-box/flex-box"; // Styled FlexBox component
import BlogCard from "./blog-card"; // Blog card component

/**
 * Section3 Component
 * 
 * Displays a section with a header, a grid of product cards, 
 * and a call-to-action button. The section is themed with 
 * a light blue background and utilizes Material-UI for styling.
 * 
 * @returns {JSX.Element} - Rendered Section3 component
 */
export default async function Section3() {
  return (
    <Box sx={{ py: 10, background: '#E0F0FD' }}>
      <Container>
        {/* Header text for the section */}
        <H2
          sx={{
            textAlign: 'center',
            color: '#000',
            pt: 8,
            pb: 3,
            fontFamily: 'Elemental End',
            textTransform: 'lowercase',
            fontSize: { xs: 30, sm: 30, md: 30, lg: 30, xl: 30 },
          }}
        >
          Shop Women
        </H2>

        {/* Grid to display product cards */}
        <Grid container spacing={3}>
          {products.map((item) => (
            <Grid item lg={4} md={8} xs={12} key={item.id}>
              <BlogCard
                date={item.createdAt}
                title={item.title}
                image={item.image}
              />
            </Grid>
          ))}
        </Grid>

        {/* Call-to-action button aligned to the right */}
        <FlexBox justifyContent="end" sx={{ mt: 5 }}>
          <Button
            sx={{
              background: '#fff',
              color: '#000',
              fontFamily: 'Elemental End',
              textTransform: 'lowercase',
              mt: 2,
              borderRadius: '50px',
              px: 5,
              py: 2,
              fontSize: 12,
            }}
          >
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
    description: "Elegant and fashionable dresses for every occasion.",
    image: "/assets/images/products/Women/dress.png",
    createdAt: "2022-11-08T07:15:55.897Z",
  },
  {
    id: "f54ee5db-ff89-4d86-ade8-86d949db7bg2",
    title: "Tops",
    description: "Stylish tops to complement any outfit.",
    image: "/assets/images/products/Women/top.png",
    createdAt: "2022-11-08T07:15:55.897Z",
  },
  {
    id: "f54ee5db-ff89-4d86-ade8-86d949db7bg3",
    title: "Bottoms",
    description: "Comfortable and chic bottoms for everyday wear.",
    image: "/assets/images/products/Women/bottom.png",
    createdAt: "2022-11-08T07:15:55.897Z",
  },
];
