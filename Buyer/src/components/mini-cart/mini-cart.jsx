// components/mini-cart.jsx

"use client";

import { currency } from "@/lib";
import { useEnrichedCart } from "@/hooks/useEnrichedCart";
import { useRouter } from "next/navigation";
import { Box, Divider, useMediaQuery, useTheme, CircularProgress } from "@mui/material";

import Scrollbar from "@/components/scrollbar";
import TopHeader from "./components/top-header";
import MiniCartItem from "./components/cart-item";
import EmptyCartView from "./components/empty-view";
import BottomActions from "./components/bottom-actions";

export default function MiniCart({ toggleSidenav, isStandalonePage = false }) {
  const { push } = useRouter();
  const { cart: enrichedCart, loading, summary, dispatch } = useEnrichedCart();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const itemMode = isStandalonePage ? 'dark' : 'light';

  // Handle quantity changes with new action types
  const handleCartAmountChange = (amount, item) => () => {
    if (amount === 0) {
      // Remove item
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: { variantId: item.variantId }
      });
    } else {
      // Update quantity
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { variantId: item.variantId, quantity: amount }
      });
    }
  };

  const handleNavigate = path => () => {
    if (!isStandalonePage && toggleSidenav) {
      toggleSidenav();
    }
    push(path);
  };

  const containerStyle = isStandalonePage
    ? styles.standaloneBg
    : styles.glassBg;

  return (
    <Box
      width="100%"
      minWidth={isDesktop ? 380 : 'auto'}
      sx={containerStyle}
    >
      <TopHeader
        toggle={toggleSidenav}
        total={summary.totalItems}
        mode={itemMode}
      />

      <Divider />

      <Box height="calc(100vh - 74px)">
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : enrichedCart.length > 0 ? (
          <Scrollbar>
            {enrichedCart.map((item) => (
              <MiniCartItem
                item={item}
                key={item.variantId}
                handleCartAmountChange={handleCartAmountChange}
                mode={itemMode}
              />
            ))}
          </Scrollbar>
        ) : (
          <EmptyCartView />
        )}
      </Box>

      {enrichedCart.length > 0 && !loading && (
        <Box sx={{ position: "sticky", bottom: 0, zIndex: 10 }}>
          <BottomActions
            total={currency(summary.subtotal)}
            handleNavigate={handleNavigate}
            mode={itemMode}
          />
        </Box>
      )}
    </Box>
  );
}

const styles = {
  glassBg: {
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(10.0285px)',
  },
  standaloneBg: {
    background: '#FFFFFF',
  }
}