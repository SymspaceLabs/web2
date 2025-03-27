"use client";

import { motion } from "framer-motion";
import { Box, Container } from "@mui/material";
import { FlexColCenter } from '@/components/flex-box';
import { GlassBanner } from "@/components/custom-banner";

export default function Section4() {
  return (
    <FlexColCenter sx={{ py:10, px:{xs:2, sm:0} }} width="100%">
      <Container>
        <motion.div
          component={Box} // Makes motion.div behave like a Box
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ width: "100%", overflow: "hidden" }} // Ensures content stays within bounds
        >
          <GlassBanner
            title="get in touch"
            subtitle="Learn more about our vision to help those who need it most."
            btnText="contact us"
            btnUrl="/contact-us"
          />
        </motion.div>
      </Container>
    </FlexColCenter>  
  );
}
