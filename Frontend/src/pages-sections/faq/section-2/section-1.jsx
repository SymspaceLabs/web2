"use client";

import { motion } from "framer-motion";
import { Box } from "@mui/material";
import Banner from "@/components/Banner";

export default function Section2() {
  return (
    <Box sx={{ width: "100%", py: { xs:2, sm:10 }, zIndex:2 }}>
      <motion.div
        component={Box} // Makes motion.div behave like a Box
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ width: "100%", overflow: "hidden" }} // Ensures content stays within bounds
      >
        <Banner
          title="get in touch"
          description="Learn more about our vision to help those who need it most."
          btnText="contact us"
          btnUrl="/contact-us"
        />
      </motion.div>
    </Box>
  );
}
