// =========================================================
// Favorites Sidebar | Favorites Drawer
// =========================================================

import { Box, Divider } from "@mui/material";
import { useFavorites } from "@/contexts/FavoritesContext";

import Scrollbar from "@/components/scrollbar"; // CUSTOM UTILS LIBRARY FUNCTION
import TopHeader from "./components/top-header";
import MiniCartItem from "./components/cart-item";
import EmptyCartView from "./components/empty-view";

// =========================================================
export default function MiniFavorite({ toggleSidenav }) {
  const { state: favState } = useFavorites();

  return (
    <Box width="100%" minWidth={380} sx={styles.glassBg}>
      {/* HEADING SECTION */}
      <TopHeader toggle={toggleSidenav} total={favState.favorites.length} />

      {/* DIVIDER */}
      <Divider />

      {/* CART ITEM LIST */}
      <Box height="calc(100vh - 74px)">
        {favState.favorites.length > 0 ? <Scrollbar>
            {favState.favorites.map(item => (
              <MiniCartItem
                item={item}
                key={item.id}
              />
            ))}
          </Scrollbar> : <EmptyCartView />}
      </Box>
    </Box>
  );
}

const styles = {
  glassBg : {
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(10.0285px)',
  }
}