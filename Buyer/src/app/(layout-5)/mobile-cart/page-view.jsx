// src/app/cart/page.js (or src/pages/cart.js)
"use client";
import { MiniCart } from "@/components/mini-cart";
import { Box } from "@mui/material";
// import DashboardHeader from "@/components/dashboard-header"; // Assuming you have this
import ShoppingBag from "@mui/icons-material/ShoppingBag"; // Icon for header
// import DashboardHeader from "@/pages-sections/customer-dashboard/dashboard-header";

export default function MobileCartPage() {
  return (
    <Box>
      <MiniCart isStandalonePage={true} />
    </Box>
  );
}