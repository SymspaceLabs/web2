
// ============================================================
// Header Cart
// ============================================================

import { useCart } from "hooks/useCart";
import { Badge, IconButton} from "@mui/material";

import Link from "next/link";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";

// ============================================================

// GLOBAL CUSTOM HOOK
export default function HeaderCart() {
  const {
    state
  } = useCart();

  return (
    <Badge badgeContent={state.cart.length} color="primary">
      <IconButton LinkComponent={Link} href="/mini-cart">
        <ShoppingBagOutlined sx={{color: "grey.600"}} />
      </IconButton>
    </Badge>
  );
}