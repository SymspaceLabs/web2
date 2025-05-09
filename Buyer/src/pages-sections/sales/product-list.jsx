// ==============================================================
//
// ==============================================================

import Grid from "@mui/material/Grid"; // GLOBAL CUSTOM COMPONENT
import { ProductCard3 } from "@/components/custom-cards/product-cards";

// ==============================================================
export default function ProductList({
  products,
  company={}
}) {
  return <Grid container spacing={3} minHeight={500}>
      {products.map(item => <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
          {/* <ProductCard1 id={item.id} slug={item.slug} title={item.title} price={item.price} rating={item.rating} imgUrl={item.thumbnail} discount={item.discount} /> */}
          <ProductCard3
            company={company}
            product={item}
          />
        </Grid>)}
    </Grid>;
}