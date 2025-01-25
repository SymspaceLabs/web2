"use client";

import { keyframes, styled } from "@mui/system";
import { Box } from "@mui/material";

const marqueeAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const MarqueeContainer = styled(Box)({
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "relative",
  width: "100%",
});

const MarqueeWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  display: "inline-flex",
  animation: `${marqueeAnimation} 100s linear infinite`,
  gap: theme.spacing(6), // Default gap
  width: "100vw",
  "&:hover": {
    animationPlayState: "paused",
  },
  [theme.breakpoints.down("sm")]: {
    animationDuration: "150s", // Slower animation on small screens
    gap: theme.spacing(4), // Smaller gap on mobile
  },
}));

const CompanyLogo = styled("img")(({ theme }) => ({
  height: "50px", // Default height
  margin: theme.spacing(0, 2), // Default margin
  objectFit: "contain",
  [theme.breakpoints.down("sm")]: {
    height: "40px", // Smaller logo on mobile
    margin: theme.spacing(0, 1), // Smaller margin on mobile
  },
}));

const MarqueeeSlider = ({ companies }) => {
  return (
    <MarqueeContainer>
      <MarqueeWrapper>
        {companies.concat(companies).map((logo, index) => (
          <CompanyLogo key={index} src={logo} alt="Company Logo" />
        ))}
      </MarqueeWrapper>
    </MarqueeContainer>
  );
};

export default MarqueeeSlider;
