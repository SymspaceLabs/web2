// ===============================================================
// Section 3 | Career Details
// ===============================================================

import { motion } from "framer-motion";
import { Box, Container } from "@mui/material";
import { FlexColCenter } from '@/components/flex-box';
import { GlassBanner } from "@/components/custom-banner";

export default function Section3({toggleDialog}) {
  return (
    <FlexColCenter sx={{ pb:10, px:{xs:0, sm:0} }} width="100%">
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
            title="how to apply"
            subtitle="Attach your resume and cover letter detailing your relevant experience and why you are interested in joining SYMSPACE"
            btnText="Apply"
            onClick={toggleDialog}
          />
        </motion.div>
      </Container>
    </FlexColCenter>
  );
}