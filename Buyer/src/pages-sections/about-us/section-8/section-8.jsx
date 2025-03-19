"use client"

// ==========================================================
// Section 8 - Email Banner - About Us
// ==========================================================

import { motion } from "framer-motion";
import { Box, Container} from "@mui/material";
import { ContactUsBanner } from "@/components/custom-banner";

export default function Section8() {
  return (
    <Box>
      <motion.div
        component={Box}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ width: "100%", overflow: "hidden" }}
      >
        <Container sx={{ py: {xs:0, sm:10} }}>
          <ContactUsBanner
            title="Get In Touch"
            subtitle="Let us help you learn more."
          />
        </Container>
      </motion.div>
    </Box>
  );
}
