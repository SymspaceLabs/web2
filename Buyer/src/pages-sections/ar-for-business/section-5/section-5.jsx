"use client";

// =======================================================
// Section 5 Component
// ======================================================

import { motion } from "framer-motion";
import { styles } from '../page-view/styles';
import { AR_FOR_BUSINESS_PLANS } from "@/data/pricing";
import { Box, Container, Typography } from "@mui/material";
import PricingTable from "@/components/pricing-table/pricingTable";
import { FlexCol } from "@/components/flex-box";

export default function Section5() {

  return (
    <Box sx={{ py: 8 }} id="pricing">
      <Container>
        <FlexCol sx={{ justifyContent: "space-between", alignItems: "center", pb: {xs:2,sm:10},}}>
          {/* Main Header */}
          <Box sx={{ textAlign: "center" }}>
              <Typography
                  sx={{
                    ...styles.elementalEndFont,
                    fontSize: { sm: 20, xs: 28 },
                    wordSpacing: '5px'
                  }}
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
        </FlexCol>
        <PricingTable plans={AR_FOR_BUSINESS_PLANS} />

      </Container>
    </Box>
  );
}
