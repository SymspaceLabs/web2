// src/app/cart/page.js (or src/pages/cart.js)
"use client";
import { MiniCart } from "@/components/mini-cart";
import { Box } from "@mui/material";

export default function MobileCartPage() {
  return (
    <Box>
      <MiniCart isStandalonePage={true} />
    </Box>
  );
}