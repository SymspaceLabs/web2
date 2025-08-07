"use client";
// ============================================
//
//  Layout For Profile Page
//  Used in:
//  1. wish-list page
//  2. address and address-details page
//  3. orders and order-details page
//  4. payment-methods and payment-method-details page
//  5. profile and edit profile page
//  6. support-tickets page
//
// ============================================

import { Grid, Container } from "@mui/material";
import Navigation from "./navigation";
import { MainContainer } from "./styles";
// ============================================

export default function CustomerDashboardLayout({
  children
}) {
  return (
    <Container className="mt-2 mb-2" sx={{ paddingTop: {xs:'100px', sm:'100px', md:'150px'} }}>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12} sx={{ display: {xs: "none", sm: "none", md: "block"} }}>
          <MainContainer>
            <Navigation />
          </MainContainer>
        </Grid>

        <Grid item md={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}