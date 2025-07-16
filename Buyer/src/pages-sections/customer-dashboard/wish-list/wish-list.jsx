"use client";

// ==================================================================
// Wish List | Favourites Page
// ==================================================================

import { Fragment } from "react";
import { Grid, Box } from "@mui/material";
import { useFavorites } from "@/contexts/FavoritesContext";

import Pagination from "../pagination";
import DashboardHeader from "../dashboard-header"; 
import Favorite from "@mui/icons-material/Favorite"; // LOCAL CUSTOM HOOK
import MiniCartItem from "@/components/favourites/components/cart-item";
import { FlexCol } from "@/components/flex-box";

// ==================================================================

export default function WishListPageView(props) {
  const { state: favState } = useFavorites();
  
  return (
    <Fragment>
      {/* TOP HEADER AREA */}
      <DashboardHeader title="My Favourites" Icon={Favorite} />

      {/* PRODUCT LIST AREA */}
      <FlexCol>
        {favState.favorites.map(item => (
          <Box sx={styles.card}>
            <MiniCartItem
              item={item}
              key={item.id}
              mode='dark'
            />
          </Box>

        ))}
      </FlexCol>

      {/* PAGINATION AREA */}
      {/* <Pagination page={currentPage} count={Math.ceil(totalProducts / 6)} onChange={(_, page) => handleChangePage(page)} /> */}
    </Fragment>
  );
}

const styles = {
  card: {
    background: '#FFF'
  }
}