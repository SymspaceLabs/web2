"use client"

import { motion } from "framer-motion";
import { EmailBanner } from "@/components";
import { Box, Container} from "@mui/material";

export default function Section16() {
  return (
    <Box sx={{background:'#FFF'}}>
      <motion.div
        component={Box}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ width: "100%", overflow: "hidden" }}
      >
        <Container sx={{ py: 10 }}>
          <EmailBanner />
        </Container>
      </motion.div>
    </Box>
  );
}
