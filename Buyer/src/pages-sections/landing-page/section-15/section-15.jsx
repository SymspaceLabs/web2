"use client";

// =========================================================================
// Section 13 Component - Displays a testimonial section with a heading, description, 
// ==========================================================================

import { motion } from "framer-motion";
import { styles } from "../page-view/styles";
import MarqueeeSlider from "./MarqueeeSlider";
import { Box, Typography } from "@mui/material";
import { TESTIMONIALS } from "@/data/testimonial";

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
        <Box sx={{ width: "100%", maxWidth: "1600px", p: 2 }}>
          <Typography fontSize="16px" sx={{ color: "#434167" }}>
            What everyone is saying
          </Typography>
          <Typography sx={{ ...styles.elementalEndFont, fontSize:{xs:20,sm:40}, pb: "25px" }} >
            trusted by users globally
          </Typography>
        </Box>
        <MarqueeeSlider testimonials={TESTIMONIALS} />
      </Box>
    </motion.div>
  );
}



