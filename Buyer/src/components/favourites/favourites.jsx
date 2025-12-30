// =========================================================
// Favorites Sidebar | Favorites Drawer - FIXED VERSION
// =========================================================

import { Box, Divider } from "@mui/material";
import { useFavorites } from "@/contexts/FavoritesContext";

import Scrollbar from "@/components/scrollbar";
import TopHeader from "./components/top-header";
import MiniCartItem from "./components/cart-item";
import EmptyCartView from "./components/empty-view";

// =========================================================
export default function MiniFavorite({ toggleSidenav }) {
  // ✅ FIXED: Use the correct context structure
  const { state, getFavoriteProducts } = useFavorites();
  const favoriteProducts = getFavoriteProducts();

  return (
    <Box width="100%" minWidth={380} sx={styles.glassBg}>
      {/* HEADING SECTION - ✅ FIXED: Use favoriteIds.length */}
      <TopHeader toggle={toggleSidenav} total={state.favoriteIds.length} />

      {/* DIVIDER */}
      <Divider />

      {/* FAVORITES LIST - ✅ FIXED: Use favoriteProducts */}
      <Box height="calc(100vh - 74px)">
        {favoriteProducts.length > 0 ? (
          <Scrollbar>
            {favoriteProducts.map(item => (
              <MiniCartItem
                item={item}
                key={item.id}
              />
            ))}
          </Scrollbar>
        ) : (
          <EmptyCartView />
        )}
      </Box>
    </Box>
  );
}

const styles = {
  glassBg: {
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(10.0285px)',
  }
};