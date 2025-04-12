// =========================================================
// Cart Drawer
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

// =========================================================
export default function MiniCart({ toggleSidenav }) {
  const { push } = useRouter();
  const { state, dispatch } = useCart();
  const cartList = state.cart;

  const handleCartAmountChange = (amount, product) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, qty: amount }
    });
  };

  const getTotalPrice = () => {
    return cartList.reduce((acc, item) => acc + item.price * item.qty, 0);
  };

  const handleNavigate = path => () => {
    toggleSidenav();
    push(path);
  };

  return (
    <Box width="100%" minWidth={380} sx={glassBg}>
      
      {/* HEADING SECTION */}
      <TopHeader toggle={toggleSidenav} total={cartList.reduce((acc, item) => acc + item.qty, 0)} />

      {/* DIVIDER */}
      <Divider />

      {/* CART ITEM LIST */}
      <Box height={`calc(100vh - ${cartList.length ? "207px" : "75px"})`}>
        {cartList.length > 0 ? <Scrollbar>
            {cartList.map(item => <MiniCartItem item={item} key={item.id} handleCartAmountChange={handleCartAmountChange} />)}
          </Scrollbar> : <EmptyCartView />}
      </Box>

      {/* CART BOTTOM ACTION BUTTONS (Always fixed at the bottom) */}
      {cartList.length > 0 && (
        <Box sx={{ position: "sticky", bottom: 0, zIndex: 10 }}>
          <BottomActions total={currency(getTotalPrice())} handleNavigate={handleNavigate} />
        </Box>
      )}
    
    </Box>
  );
}

const glassBg = {
  background: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(10.0285px)',
}