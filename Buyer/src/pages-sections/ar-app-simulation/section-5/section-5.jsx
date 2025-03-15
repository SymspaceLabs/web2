"use client";

import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { keyframes, styled } from "@mui/system";
import { TESTIMONIALS } from "@/data/testimonial";
import TestimonialCard from "@/components/cards/TestimonialCard";

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
        <Typography fontSize="16px" fontFamily="Helvetica" sx={{ color: "#434167" }}>
          What everyone is saying
        </Typography>
        <Typography
          sx={{ pb: "25px" }}
          fontSize={{ xs: 28, sm: 40 }}
          fontFamily="Elemental End"
          textTransform="lowercase"
        >
          trusted&nbsp;&nbsp;by&nbsp;&nbsp;users&nbsp;&nbsp;globally
        </Typography>
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
