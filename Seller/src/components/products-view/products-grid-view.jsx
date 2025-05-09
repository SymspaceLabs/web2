import { Fragment } from "react";
import { Grid, Pagination } from "@mui/material";

import { Span } from "@/components/Typography";
import { FlexBetween } from "@/components/flex-box";
import { ProductCard3 } from "@/components/custom-cards/product-cards";

// ========================================================
export default function ProductsGridView({
  products
}) {
  return (
    <Fragment>
      <Grid container spacing={3}>
        {products.map(item => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard3
              products={products}
            />
            {/* <ProductCard1 
              id={item.id} 
              slug={item.slug} 
              name={item.name} 
              price={item.price} 
              rating={item.rating} 
              imgUrl={item.images[0].url} 
              discount={item.discount}
            /> */}
          </Grid>
        ))}
      </Grid>

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">Showing 1-9 of 1.3k Products</Span>
        <Pagination count={Math.ceil(products.length / 10)} variant="outlined" color="primary" />
      </FlexBetween>
    </Fragment>
  );
}