"use client";

import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import Favorite from "@mui/icons-material/Favorite"; // LOCAL CUSTOM HOOK

import useWishList from "./use-wish-list"; // GLOBAL CUSTOM COMPONENT

import { ProductCard3 } from "@/components/custom-cards/product-cards";

// Local CUSTOM COMPONENT
import Pagination from "../pagination";
import DashboardHeader from "../dashboard-header"; // ==================================================================

// ==================================================================
export default function WishListPageView(props) {
  const {
    totalProducts,
    products
  } = props;
  const {
    currentPage,
    handleChangePage
  } = useWishList();
  return (
    <Fragment>
      {/* TOP HEADER AREA */}
      <DashboardHeader title="My Wish List" Icon={Favorite} />

      {/* PRODUCT LIST AREA */}
      <Grid container spacing={3}>
        {products.map(item => <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard3
              products={products}
            />
          </Grid>)}
      </Grid>

      {/* PAGINATION AREA */}
      <Pagination page={currentPage} count={Math.ceil(totalProducts / 6)} onChange={(_, page) => handleChangePage(page)} />
    </Fragment>
  );
}