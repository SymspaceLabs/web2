"use client";

import { keyframes, styled } from "@mui/system";
import { Box } from "@mui/material";
import TestimonialCard from "@/components/cards/TestimonialCard";

const marqueeAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const MarqueeContainer = styled(Box)({
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "relative",
  width: "100%",
  background: "rgba(255, 255, 255, 0.1)",
});

const MarqueeWrapper = styled(Box)({
  paddingTop: "25px",
  paddingBottom: "25px",
  display: "flex",
  animation: `${marqueeAnimation} 100s linear infinite`,
  gap: "20px",
  width: "max-content",
  "&:hover": {
    animationPlayState: "paused",
  },
});

const MarqueeeSlider = ({ testimonials }) => {
  return (
    <MarqueeContainer>
      <MarqueeWrapper>
        {/* Duplicate testimonials to ensure smooth looping */}
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </MarqueeWrapper>
    </MarqueeContainer>
  );
};

export default MarqueeeSlider;
