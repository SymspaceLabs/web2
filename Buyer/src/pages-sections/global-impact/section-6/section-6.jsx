"use client"

// ==========================================================
// Section 6 | Global Impact
// ==========================================================

import { motion } from "framer-motion";
import { Box, Container} from "@mui/material";
import { EmailBanner } from "@/components/custom-banner";

export default function Section6() {
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
        <Container sx={{ py: 10 }}>
          <EmailBanner
            title="stay up to date"
          />
        </Container>
      </motion.div>
    </Box>
  );
}
