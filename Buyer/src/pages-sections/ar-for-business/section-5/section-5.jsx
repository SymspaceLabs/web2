"use client";

// =======================================================
// Section 5 Component
// ======================================================

import { Box, Container } from "@mui/material";
import { FlexCol } from "@/components/flex-box";
import { AR_FOR_BUSINESS_PLANS } from "@/data/pricing";
import { H1, Paragraph } from "@/components/Typography";
import { PricingTable } from "@/components/pricing-table";

export default function Section5() {
  return (
    <Box sx={{ py: 8 }} id="pricing">
      <Container>
        <FlexCol sx={{ justifyContent: "space-between", alignItems: "center", pb: {xs:2,sm:10},}}>
          {/* Main Header */}
          <Box sx={{ textAlign: "center" }}>
              <H1 fontSize={{ sm: 20, xs: 28 }} wordSpacing='5px'>
                  revolutionize shopping. simplify and save.
              </H1>
              <Paragraph
                  sx={{
                      color: "#18181B",
                      fontSize: { sm: 16, xs: 14 },
                      py: 2,
                  }}
              >
                  Choose the perfect plan for your business needs
              </Paragraph>
          </Box>            
        </FlexCol>
        <PricingTable plans={AR_FOR_BUSINESS_PLANS} />
      </Container>
    </Box>
  );
}
