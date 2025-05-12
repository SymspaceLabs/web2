"use client";

// ======================================================
// Cart Page Sections
// ======================================================

import { Grid } from "@mui/material";

import PaymentForm from "../payment-form";
import PaymentSummary from "../payment-summary";

export default function PaymentPageView() {

  return(
    <Grid container flexWrap="wrap-reverse" spacing={3}>
      <Grid item lg={8} md={8} xs={12}>
        <PaymentForm />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <PaymentSummary />
      </Grid>
    </Grid>
  );
}