// ========================================================
// Product Grids View
// ========================================================

import { Fragment } from "react";
import { FlexRowCenter } from "@/components/flex-box";
import { Grid, Pagination, CircularProgress } from "@mui/material";
import { ProductCard3 } from "@/components/custom-cards/product-cards";

// ========================================================

export default function ProductsGridView({
  products,
  loading
}) {
  return (
    <Fragment>
      {/* {
        loading && <CircularProgress />
      } */}
      <Grid container spacing={1}>
        {products.map(item => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard3
              product={item}
              company={item.company}
            />
          </Grid>
        ))}
      </Grid>

      <FlexRowCenter flexWrap="wrap" mt={4}>
        <Pagination count={Math.ceil(products.length / 10)} variant="outlined" color="primary" />
      </FlexRowCenter>
    </Fragment>
  );
}