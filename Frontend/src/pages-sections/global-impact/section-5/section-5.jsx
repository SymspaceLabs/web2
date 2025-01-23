"use client";

import { Box, Container, Typography } from "@mui/material";
import { keyframes, styled } from "@mui/system";

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

// Styled components for the container holding the logos
const MovingContainer = styled(Box)({
  display: "flex",
  overflow: "hidden", // Ensures that overflowing logos are hidden
  width: "100%",
  position: "relative",
  marginTop: "20px",
});

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

export default function Section5() {
  return (
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
        <MovingContainer>
          <ScrollWrapper>
            {/* Duplicate the logo array to ensure smooth looping */}
            {companies.concat(companies).map((logo, index) => (
              <CompanyLogo key={index} src={logo} alt="Company Logo" />
            ))}
          </ScrollWrapper>
        </MovingContainer>
      </Container>
    </Box>
  );
}
