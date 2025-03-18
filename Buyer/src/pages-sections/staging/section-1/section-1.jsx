"use client";

import { FlexRowCenter } from "@/components/flex-box";
import { LazyImage } from "@/components/lazy-image";
import { Box, useMediaQuery} from "@mui/material";
import { motion } from "framer-motion";

export default function Section1() {

  const isMobile = useMediaQuery('(max-width:1200px)');


  return (
    <>
      {
        isMobile ? 
        <Box p={2} zIndex={1}>
          <motion.div
            initial={{ opacity: 0, y: 50 }} // Start from below with opacity 0
            animate={{ opacity: 1, y: 0 }} // Fade in while moving up
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <LazyImage
              src="/assets/images/staging/hero.png"
              width={500}
              height={500}
              alt="Hero"
            />
          </motion.div>
        </Box>
        :      
        <FlexRowCenter sx={{ width:'100%', position: "relative", minHeight: "80vh", maxWidth:'1200px', py:10, px:10 }}>
          <Box sx={{ position: "relative", height: { xs: 350, sm: 500, md: 800 }, width:'100%' }}>
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
                padding: { xs: 2, sm: 3, md: 4 },
              }}
            />

            {/* Animated Images with Responsive Positions */}
            {[
              { src: "hero-2.png", delay: 0, top: "30%", right: "41%", zIndex: 3 }, //  WALL FRAME       
              { src: "hero-3.png", delay: 0.5, top: "65%", left: "25%", zIndex: 2 }, //  RUG      
              { src: "hero-4.png", delay: 1, top: "65%", right: "33%", zIndex: 3 }, 
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

              <motion.img
                src="/assets/images/staging/hero-5.png"
                alt="sofa"
                initial={{ opacity: 0, x: 0 }} // Start from left
                animate={{ opacity: 1, x: -50 }}   // Fade in and move to position
                transition={{ duration: 1.5, ease: "easeOut", delay:1.5 }}
                
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "-10%",
                  width: "auto",
                  height: "auto",
                  maxWidth: { xs: "40%", sm: "100%", md: "100%" },
                  maxHeight: { xs: "40%", sm: "100%", md: "100%" },
                  zIndex: 2,
                  padding: "8px",
                }}
              />

            {[
              { src: "hero-6.png", delay: 1.5, top: "50%", left: "-10%", zIndex: 3 },
              { src: "hero-7.png", delay: 2, top: "60%", left: "15%", zIndex: 2 },
              { src: "hero-8.png", delay: 2.5, top: "55%", left: "30%", zIndex: 1 },
            ].map(({ src, delay, top, left, right, width, height, zIndex }) => (
              <motion.img
                key={src}
                src={`/assets/images/staging/${src}`}
                alt={src}
                initial={{ opacity: 0, x: -50 }} // Start from left
                animate={{ opacity: 1, x: 0 }}   // Fade in and move to position
                transition={{ duration: 2, ease: "easeOut", delay }}
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
        </FlexRowCenter>

      }
    </>
  );
}
