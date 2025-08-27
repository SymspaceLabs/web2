"use client";

// =========================================================
// Cart Drawer
// =========================================================

import { currency } from "@/lib";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material"; // Import useMediaQuery and useTheme

import Scrollbar from "@/components/scrollbar"; // CUSTOM UTILS LIBRARY FUNCTION
import TopHeader from "./components/top-header";
import MiniCartItem from "./components/cart-item";
import EmptyCartView from "./components/empty-view";
import BottomActions from "./components/bottom-actions"; // GLOBAL CUSTOM COMPONENT

// =========================================================
// Add isStandalonePage prop with a default value of false
export default function MiniCart({ toggleSidenav, isStandalonePage = false }) {
  const { push } = useRouter();
  const { state, dispatch } = useCart();
  const cartList = state.cart;

  const theme = useTheme(); // Get the theme object
  // Check if the screen size is greater than or equal to 'md' (desktop view)
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Determine the mode for MiniCartItem based on isStandalonePage
  const itemMode = isStandalonePage ? 'dark' : 'light';

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
    // Only toggleSidenav if it's not a standalone page (i.e., it's a drawer)
    if (!isStandalonePage && toggleSidenav) {
      toggleSidenav();
    }
    push(path);
  };

  // Conditionally apply background style based on isStandalonePage
  const containerStyle = isStandalonePage
    ? styles.standaloneBg // Solid white background for standalone page
    : styles.glassBg; // Translucent background for drawer

  return (
    <Box
      width="100%"
      minWidth={isDesktop ? 380 : 'auto'} // Apply minWidth only on desktop
      sx={containerStyle} // Apply conditional style
    >

      {/* HEADING SECTION */}
      {/* Pass itemMode to TopHeader if it needs to adjust text color */}
      <TopHeader
        toggle={toggleSidenav}
        total={cartList.reduce((acc, item) => acc + item.qty, 0)}
        mode={itemMode}
      />

      {/* DIVIDER */}
      <Divider />

      {/* CART ITEM LIST */}
      <Box height="calc(100vh - 74px)">
        {cartList.length > 0 ? <Scrollbar>
            {/* Pass the determined itemMode to MiniCartItem */}
            {cartList.map((item,index) => <MiniCartItem item={item} key={index} handleCartAmountChange={handleCartAmountChange} mode={itemMode} />)}
          </Scrollbar> : <EmptyCartView />}
      </Box>

      {/* CART BOTTOM ACTION BUTTONS (Always fixed at the bottom) */}
      {cartList.length > 0 && (
        <Box sx={{ position: "sticky", bottom: 0, zIndex: 10 }}>
          {/* Pass itemMode to BottomActions if it needs to adjust text color */}
          <BottomActions total={currency(getTotalPrice())} handleNavigate={handleNavigate} mode={itemMode} />
        </Box>
      )}

    </Box>
  );
}

const styles = {
  glassBg : {
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(10.0285px)',
  },
  standaloneBg: {
    background: '#FFFFFF', // Solid white background for standalone page
  }
}
