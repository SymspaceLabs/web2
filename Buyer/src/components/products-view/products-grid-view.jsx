// ========================================================

import { Fragment } from "react";
import { Span } from "@/components/Typography";
import { Grid, Pagination } from "@mui/material";
import { FlexBetween } from "@/components/flex-box";
import { ProductCard3 } from "../custom-cards/product-cards";

// ========================================================
export default function ProductsGridView({
  products
}) {
  return (
    <Fragment>
      <Grid container spacing={1}>
        {products.map(item => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard3
              product={item}
              company={item.company.entityName}
            />
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