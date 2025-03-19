"use client"

import { motion } from "framer-motion";
import { Box, Container} from "@mui/material";
import { EmailBanner } from "@/components/custom-banner";

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
        <Container sx={{ py: {xs:0, sm:10} }}>
          <EmailBanner
            title="stay up to date"
          />
        </Container>
      </motion.div>
    </Box>
  );
}
