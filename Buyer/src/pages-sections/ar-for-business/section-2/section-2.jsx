"use client";

// =======================================================
// Section 2 Component
// ======================================================

import { motion } from "framer-motion";
import { PARTNERS } from "@/data/partners";
import { Box, Container } from "@mui/material";
import { FlexBox } from "@/components/flex-box";
import { keyframes, styled } from "@mui/system";
import { H1, Paragraph } from "@/components/Typography";

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

export default function Section2() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Start slightly below with opacity 0
      animate={{ opacity: 1, y: 0 }} // Move up and fade in
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
      viewport={{ once: true, amount: 0.2 }} // Ensures it animates when at least 20% is visible
    >
      <Box py={3}>
        {/* Container for the section */}
        <Container>
          {/* Title of the section */}
          <H1
            fontSize={{ xs:20, sm:32 }}
            textAlign= "center"
            color="#4E4E4E"
            pt={{ xs: 0, sm: 8 }}
            pb={ 1}
          >
            trusted by all our partners
          </H1>

          {/* Subtitle */}
          <Paragraph
            sx={{
              textAlign: "center",
              color: "#4E4E4E",
              pb: 3,
              fontSize: { xs:12, sm:16 },
            }}
          >
            We work with the world's biggest organizations, brands, and marketplaces.
          </Paragraph>

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
