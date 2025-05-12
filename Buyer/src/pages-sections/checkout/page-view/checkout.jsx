"use client";

// ======================================================
// Cart Page Sections
// ======================================================

import { Grid } from "@mui/material";
import { CheckoutForm } from "../checkout-form";

import VoucherForm from "@/pages-sections/cart/voucher-form";

// ======================================================

export default function CheckoutPageView() {
  return (
    <Grid container flexWrap="wrap-reverse" spacing={3}>
      <Grid item lg={8} md={8} xs={12}>
        <CheckoutForm />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <VoucherForm />
      </Grid>
    </Grid>
  );
}