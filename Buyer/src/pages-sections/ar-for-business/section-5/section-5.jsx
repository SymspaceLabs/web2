"use client";

/**
 * Section5 Component
 *
 * This component renders a pricing section with toggleable billing cycles and multiple plans.
 * It includes an animated background, a header, and a grid layout for displaying plan details.
 *
 * Features:
 * - Users can toggle between "monthly" and "yearly" billing cycles.
 * - Each plan dynamically updates pricing based on the selected billing cycle.
 * 
 */

import { motion } from "framer-motion";
import { Box, Container, Typography } from "@mui/material";
import PricingTable from "@/components/pricing-table/pricingTable";
import { AR_FOR_BUSINESS_PLANS } from "@/data/pricing";

export default function Section5() {

  return (
    <Box sx={{ py: 8 }} id="pricing">
      <Container>
        <Box
          sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 10,
          }}
        >
          {/* Main Header */}
          <Box sx={{ textAlign: "center" }}>
              <Typography
                  fontSize={{ sm: 34, xs: 28 }}
                  sx={{ fontFamily: "'Elemental End', sans-serif", textTransform: "lowercase" }}
              >
                  revolutionize shopping. simplify and save.
              </Typography>
              <Typography
                  sx={{
                      fontFamily: "Helvetica",
                      color: "#18181B",
                      fontSize: { sm: 16, xs: 14 },
                      py: 2,
                  }}
              >
                  Choose the perfect plan for your business needs
              </Typography>
          </Box>            
        </Box>
        <PricingTable plans={AR_FOR_BUSINESS_PLANS} />

      </Container>
    </Box>
  );
}
