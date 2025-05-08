"use client";

// ========================================================
// Section 8 | 3D Repository
// ========================================================

import { motion } from "framer-motion";
import { Card1, Card2, Card3 } from "./cards";
import { FlexBox } from "@/components/flex-box";
import { Box, Grid, Container } from "@mui/material";

// ========================================================

export default function Section8() {
  // Framer Motion fade-in animation
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <Grid sx={{ pt: {xs:5, sm:10}, pb: {xs:10, md:20}, height: "100%", position: "relative" }}>
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
              <FlexBox
                sx={{
                  gap: 2,
                  width: "100%",
                  alignItems: "stretch",
                  justifyContent: "space-between",
                  flexWrap: { xs: "wrap", md: "nowrap" }, // Allow wrapping on small screens
                }}
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  style={{ flex: 1, minWidth: "45%" }} // Ensure minimum width for proper spacing
                >
                  <Card2
                    imageUrl="/assets/images/card/cursor.png"
                    headerText="Website Integration"
                    subHeaderText="Enhance your customers experience"
                    bg="#D5D5D5"
                  />
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  style={{ flex: 1, minWidth: "45%" }} // Ensure minimum width for proper spacing
                >
                  <Card2
                    imageUrl="/assets/images/card/mobile.png"
                    headerText="Application Integration"
                    subHeaderText="An immersive way to shop conveniently"
                    bg="#353535"
                    textColor="#FFF"
                  />
                </motion.div>
              </FlexBox>
            </Box>
          </Grid>

          {/* Right column */}
          <Grid item xs={12} sm={12} md={6} sx={{ height: "auto" }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              style={{ height: "100%" }} // Ensure it fills the available height
            >
              <Card3 />
            </motion.div>
          </Grid>

        </Grid>
      </Container>
    </Grid>
  );
}
