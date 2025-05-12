"use client";

// ======================================================
// Cart Page Sections
// ======================================================

import { Grid } from "@mui/material";
import { useCart } from "hooks/useCart";

import CartItem from "../cart-item";
import VoucherForm from "../voucher-form";

// ======================================================

export default function CartPageView() {
  const { state } = useCart();

  return (
    <Grid container spacing={3}>
      {/* CART PRODUCT LIST */}
      <Grid item md={8} xs={12}>
        {state.cart.map((product, index) => 
          <CartItem product={product} key={index} />
        )}
      </Grid>

      {/* Voucher FORM */}
      <Grid item md={4} xs={12}>
        <VoucherForm />
      </Grid>
    </Grid>
  );
}