"use client"

import { motion } from "framer-motion";
import { EmailBanner } from "@/components/custom-banner";
import { Box, Container} from "@mui/material";

export default function Section2() {
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
          <EmailBanner
            title="join the simulation"
          />
        </Container>
      </motion.div>
    </Box>
  );
}
