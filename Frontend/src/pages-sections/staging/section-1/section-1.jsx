"use client";

import { Box } from "@mui/material";
import { motion } from "framer-motion";
import LazyImage from "@/components/LazyImage";

export default function Section1() {

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "80vh",
        px: { xs: 2, sm: 4, md: 6 }, // Padding around the entire section
      }}
    >
      {/* Container for images */}
      <Box
        sx={{
          position: "relative",
          width: { xs: 350, sm: 500, md: 800 }, // Adjust width for different screen sizes
          height: { xs: 350, sm: 500, md: 800 },
          padding: { xs: 2, sm: 3, md: 4 }, // Add padding inside the container
        }}
      >
        {/* Background (Static) Image */}
        <LazyImage
          src="/assets/images/staging/hero-1.png"
          height={800}
          width={800}
          alt="Hero Background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            width: "100%",
            height: "100%",
            padding: { xs: 2, sm: 3, md: 4 }, // Ensure background image also follows padding
          }}
        />

        {/* Animated Images with Responsive Positions */}
        {[
          { src: "hero-2.png", delay: 0, top: "48%", left: "20%", width: "60%", height: "30%", zIndex: 2 },
          { src: "hero-3.png", delay: 0.5, top: "38%", right: "5%", width: "38%", height: "38%", zIndex: 3 },
          { src: "hero-4.png", delay: 1, top: "48%", right: "33%", width: "30%", height: "30%", zIndex: 3 },
          { src: "hero-5.png", delay: 1.5, top: "25%", right: "41%", width: "18%", height: "18%", zIndex: 3 },
          { src: "hero-6.png", delay: 2, top: "35%", left: "10%", width: "40%", height: "40%", zIndex: 3 },
          { src: "hero-7.png", delay: 2.5, top: "35%", left: "25%", width: "25%", height: "25%", zIndex: 2 },
          { src: "hero-8.png", delay: 3, top: "40%", left: "35%", width: "15%", height: "15%", zIndex: 1 },
        ].map(({ src, delay, top, left, right, width, height, zIndex }) => (
          <motion.img
            key={src}
            src={`/assets/images/staging/${src}`}
            alt={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay }}
            style={{
              position: "absolute",
              top,
              left,
              right,
              width: "auto",
              height: "auto",
              maxWidth: { xs: "40%", sm: width, md: width },
              maxHeight: { xs: "40%", sm: height, md: height },
              zIndex,
              padding: "8px", // Add padding around each animated image
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
