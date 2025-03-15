import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/material"; // MUI Container for layout

import { H1, Paragraph } from "../../../components/Typography"; // Global typography components
import { ProductCard7 } from "../../../components/product-cards/product-card-7"; // Custom product card component

/**
 * Section4 Component
 * 
 * Renders a list of products in a grid layout with product cards.
 * Includes a "Load More" button for additional actions.
 * 
 * @returns {JSX.Element} A grid of product cards.
 */
export default function Section4({ products }) {
  console.log(products); // Debug log for verifying incoming data

  return (
    <Container className="mt-4 pb-4">
      {/* Title and description for the product section */}
      <H1>All Products</H1>
      <Paragraph color="grey.600" mb={4}>
        Tall blind but were, been folks not the expand
      </Paragraph>

      {/* Grid container for product cards */}
      <Grid container spacing={3}>
        {products?.map((item) => (
          <Grid key={item.id} item md={4} sm={6} xs={12}>
            <ProductCard7
              hideRating // Custom prop to hide the rating
              id={item?.id}
              slug={item?.slug}
              title={item?.name}
              price={item?.price}
              off={5} // Static discount value
              rating={4} // Static rating value
              status={null} // Placeholder for future status data
              imgUrl={item?.images[0]?.url} // First product image URL
              productColors={["#7D879C", "#4E97FD", "#33D067", "#BE7374"]} // Example color palette
            />
          </Grid>
        ))}
      </Grid>

      {/* "Load More" button at the bottom */}
      <Box mt={6} display="flex" justifyContent="center">
        <Button color="primary" variant="contained">
          Load More...
        </Button>
      </Box>
    </Container>
  );
}
