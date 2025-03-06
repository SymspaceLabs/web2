"use client";

import { motion } from "framer-motion";
import { FlexBox } from "@/components/flex-box";
import { keyframes, styled } from "@mui/system";
import { Box, Container, Typography } from "@mui/material";

/**
 * Section2 Component
 *
 * This component renders a section showcasing trusted partners' logos in a continuously scrolling animation.
 * - Includes a title and subtitle for context.
 * - Displays company logos in a scrolling horizontal layout.
 * - The logos are animated using keyframes for a smooth infinite scroll effect.
 * - Styled using Material-UI and custom keyframes animation.
 *
 * @returns {JSX.Element} Rendered section with scrolling company logos.
 */

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
const companies = [
  "/assets/images/companies/1.png",
  "/assets/images/companies/2.png",
  "/assets/images/companies/3.png",
  "/assets/images/companies/4.png",
  "/assets/images/companies/5.png",
  "/assets/images/companies/6.png",
];

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
              textAlign: "center",
              color: "#4E4E4E",
              pt: 8,
              pb: 1,
              fontFamily: "Elemental End",
              textTransform: "lowercase",
              fontSize: { xs: 30, sm: 30, md: 30, lg: 30, xl: 30 },
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
              fontSize: 12,
            }}
          >
            We work with the world's biggest organizations, brands, and marketplaces.
          </Typography>

          {/* Scrolling container for company logos */}
          <FlexBox sx={{ width: "100%", position: "relative", marginTop: "20px" }}>
            <ScrollWrapper>
              {/* Duplicate the logo array to ensure smooth looping */}
              {companies.concat(companies).map((logo, index) => (
                <CompanyLogo key={index} src={logo} alt="Company Logo" />
              ))}
            </ScrollWrapper>
          </FlexBox>
        </Container>
      </Box>
    </motion.div>
  );
}
