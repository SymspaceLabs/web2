"use client";

// =========================================================================
// Section 13 Testimonial section
// ==========================================================================

import { motion } from "framer-motion";
import { styles } from "../page-view/styles";
import MarqueeeSlider from "./MarqueeeSlider";
import { Box, Container } from "@mui/material";
import { TESTIMONIALS } from "@/data/testimonial";
import { H1, Paragraph } from "@/components/Typography";

export default function Section13() {
  return (
    <motion.div
      component={Box} // Makes motion.div behave like a Box
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{ width: "100%", overflow: "hidden" }} // Ensures content stays within bounds
    >
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", py: 4, background: "#fff" }}>
        <Container sx={{ width: "100%", p: 2 }}>
          <Paragraph fontSize="16px" sx={{ color: "#434167" }}>
            What everyone is saying
          </Paragraph>
          <H1 sx={{ ...styles.sectionHeader, fontSize: { xs: 18, sm: 40 }, color:'#2b3445', pb: "25px" }} >
            trusted by users globally
          </H1>
        </Container>
        <MarqueeeSlider testimonials={TESTIMONIALS} />
      </Box>
    </motion.div>
  );
}



