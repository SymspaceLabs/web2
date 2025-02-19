"use client";

import React, { useRef } from "react";
import { Box, Grid, Container, keyframes } from "@mui/material";
import { Card1, Card2, Card3 } from "./cards";
import { motion, useInView } from "framer-motion";
import { FlexBox } from "@/components/flex-box";

export default function Section7() {
  const blob = keyframes`
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  `;

  // Refs for animation triggers
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const isInView1 = useInView(ref1, { triggerOnce: true, threshold: 0.2 });
  const isInView2 = useInView(ref2, { triggerOnce: true, threshold: 0.2 });
  const isInView3 = useInView(ref3, { triggerOnce: true, threshold: 0.2 });
  const isInView4 = useInView(ref4, { triggerOnce: true, threshold: 0.2 });

    // Framer Motion fade-in animation
    const fadeIn = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

  return (
    <Grid sx={{ background: "#1F1F1F", pt: 10, pb: 20, height: "100%", position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: "80%",
          left: "10%",
          width: { xs: "300px", sm: "400px", md: "500px" },
          height: { xs: "300px", sm: "400px", md: "500px" },
          background: "#FFF",
          borderRadius: "50%",
          zIndex: 1,
          opacity: 0.3,
          filter: "blur(80px)",
          animation: `${blob} 7s infinite`,
        }}
      />
      <Container sx={{ height: "100%" }}>
        <Grid container alignItems="stretch" spacing={2} sx={{ height: "100%" }}>
          {/* Left column */}
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", gap: "10px" }}>
              {/* Card 1 */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ width: "100%" }}>
                <Card1 />
              </motion.div>

              {/* Card 2 - Website & App Integration */}
              <FlexBox sx={{ width: "100%", flexDirection: { xs: "column", lg: "row" }, gap: 2, justifyContent: "space-between", alignItems: "stretch", mt: { xs: 2, md: 0 }}}>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ flex: 1 }}>
                  <Card2 imageUrl="/assets/images/card/cursor.png" headerText="Website Integration" subHeaderText="Enhance your customers experience" bg="#D5D5D5" />
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ flex: 1 }}>
                  <Card2 imageUrl="/assets/images/card/mobile.png" headerText="Application Integration" subHeaderText="An immersive way to shop conveniently" bg="#353535" textColor="#fff" />
                </motion.div>
              </FlexBox>

            </Box>
          </Grid>

          {/* Right column */}
          <Grid item xs={12} sm={12} md={6}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%", bgcolor: "#D5D5D5", borderRadius: "50px", justifyContent: "center" }}>
              <Card3 />
            </Box>
          </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
