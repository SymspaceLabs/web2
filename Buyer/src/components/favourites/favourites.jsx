// =========================================================
// Cart Sidebar
// =========================================================

import { useRouter } from "next/navigation";
import { Box, Divider } from "@mui/material";
import { currency } from "@/lib"; // CUSTOM DATA MODEL

import useCart from "@/hooks/useCart"; // LOCAL CUSTOM COMPONENTS
import Scrollbar from "@/components/scrollbar"; // CUSTOM UTILS LIBRARY FUNCTION
import TopHeader from "./components/top-header";
import MiniCartItem from "./components/cart-item";
import EmptyCartView from "./components/empty-view";
import BottomActions from "./components/bottom-actions"; // GLOBAL CUSTOM COMPONENT
import { useFavorites } from "@/contexts/FavoritesContext";

// =========================================================
export default function MiniFavorite({ toggleSidenav }) {
  const { push } = useRouter();

  const { state: favState } = useFavorites();
  const { dispatch: cartDispatch } = useCart();


  const handleAddToCart = (product) => {
    cartDispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id: product.id,
        qty: 1,
        price: product.price,
        name: product.name,
        imgUrl: product.images[0].url,
        slug: product.slug,
        selectedColor: product.colors?.[0]?.code || "Default",
        selectedSize: product.sizes?.[0]?.size || "M",
        salePrice: product.salePrice,
      },
    });
  };

  const handleNavigate = path => () => {
    toggleSidenav();
    push(path);
  };

  return (
    <Box width="100%" minWidth={380} sx={glassBg}>
      
      {/* HEADING SECTION */}
      <TopHeader toggle={toggleSidenav} total={favState.favorites.length} />

      {/* DIVIDER */}
      <Divider />

      {/* CART ITEM LIST */}
      <Box height={`calc(100vh - ${favState.favorites.length ? "207px" : "75px"})`}>
        {favState.favorites.length > 0 ? <Scrollbar>
            {favState.favorites.map(item => <MiniCartItem item={item} key={item.id} />)}
          </Scrollbar> : <EmptyCartView />}
      </Box>

      {/* CART BOTTOM ACTION BUTTONS */}
      {/* {favState.favorites.length > 0 ? <BottomActions total={currency(getTotalPrice())} handleNavigate={handleNavigate} /> : null} */}
    </Box>
  );
}

const glassBg = {
  background: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(10.0285px)',
}