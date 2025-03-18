"use client";

// =======================================================
// Section 2 Component
// ======================================================

import { motion } from "framer-motion";
import { PARTNERS } from "@/data/partners";
import { styles } from '../page-view/styles';
import { FlexBox } from "@/components/flex-box";
import { keyframes, styled } from "@mui/system";
import { Box, Container, Typography } from "@mui/material";

// Keyframes for the scrolling animation
const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); } /* Scroll half the total width */
`;

const ScrollWrapper = styled(Box)(({ theme }) => ({
  display: "flex", // Align logos in a row
  animation: `${scrollAnimation} 20s linear infinite`, // Smooth infinite scroll animation
  width: "200%", // Double the width for seamless looping
}));

const CompanyLogo = styled("img")({
  height: "50px", // Standard height for all logos
  margin: "0 20px", // Spacing between logos
});

// Array of company logo URLs

export default function Section2() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Start slightly below with opacity 0
      animate={{ opacity: 1, y: 0 }} // Move up and fade in
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
      viewport={{ once: true, amount: 0.2 }} // Ensures it animates when at least 20% is visible
    >
      <Box sx={{ py: 3 }}>
        {/* Container for the section */}
        <Container>
          {/* Title of the section */}
          <Typography
            sx={{
              ...styles.elementalEndFont,
              fontSize: { xs: 30, sm: 32 },
              textAlign: "center",
              color: "#4E4E4E",
              pt: 8,
              pb: 1,
            }}
          >
            trusted by all our partners
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              textAlign: "center",
              color: "#4E4E4E",
              pb: 3,
              fontFamily: "Helvetica",
              fontSize: 16,
            }}
          >
            We work with the world's biggest organizations, brands, and marketplaces.
          </Typography>

          {/* Scrolling container for company logos */}
          <FlexBox sx={{ width: "100%", position: "relative", marginTop: "20px" }}>
            <ScrollWrapper>
              {/* Duplicate the logo array to ensure smooth looping */}
              {PARTNERS.concat(PARTNERS).map((logo, index) => (
                <CompanyLogo key={index} src={logo} alt="Company Logo" />
              ))}
            </ScrollWrapper>
          </FlexBox>
        </Container>
      </Box>
    </motion.div>
  );
}
