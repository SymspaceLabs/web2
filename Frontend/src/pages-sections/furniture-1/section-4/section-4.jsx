import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENTS

import { H1, Paragraph } from "../../../components/Typography";
import { ProductCard7 } from "../../../components/product-cards/product-card-7"; // CUSTOM DATA MODEL

// ===================================================================
export default function Section4({products}) {
  console.log(products);

  return (
    <Container className="mt-4 pb-4">
      <H1>All Products</H1>
      <Paragraph color="grey.600" mb={4}>
        Tall blind but were, been folks not the expand
      </Paragraph>

      <Grid container spacing={3}>
        {products?.map(item => <Grid key={item.id} item md={4} sm={6} xs={12}>
            <ProductCard7
              hideRating 
              id={item?.id}
              slug={item?.slug}
              title={item?.name}
              price={item?.price}
              off={5}
              rating={4}
              status={null}
              imgUrl={item?.images[0].url}
              productColors={["#7D879C","#4E97FD","#33D067","#BE7374"]}
            />
          </Grid>
        )}
      </Grid>

      <Box mt={6} display="flex" justifyContent="center">
        <Button color="primary" variant="contained">
          Load More...
        </Button>
      </Box>
    </Container>
  );
}