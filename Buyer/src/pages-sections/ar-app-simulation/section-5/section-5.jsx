"use client";

// ===========================================================
// Section 5 | trusted by users globally | Marquee
// ===========================================================

import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { keyframes, styled } from "@mui/system";
import { TESTIMONIALS } from "@/data/testimonial";
import { H1, Paragraph } from "@/components/Typography";
import TestimonialCard from "@/components/custom-cards/TestimonialCard";

// ===========================================================

const marqueeAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
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
  display: "inline-flex",
  animation: `${marqueeAnimation} 100s linear infinite`,
  gap: "20px",
  width: "max-content",
  "&:hover": {
    animationPlayState: "paused",
  },
});

export default function Section5() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.location.hash === "#user_testimonials") {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
        background: "#fff",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "1200px", p: 2 }}>
        <Paragraph fontSize="16px" color="#434167">
          What everyone is saying
        </Paragraph>
        <H1 sx={{ wordSpacing:'5px' }} pb="25px" fontSize={{ xs: 28, sm: 40 }}>
          trusted by users globally
        </H1>
      </Box>

      <MarqueeContainer>
        <MarqueeWrapper>
          {TESTIMONIALS.concat(TESTIMONIALS).map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </MarqueeWrapper>
      </MarqueeContainer>
    </Box>
  );
}
