"use client";
// ==============================================================
//  Section 1 | FAQs
// ==============================================================

import { useState } from "react";
import { FAQS } from "@/data/faqs";
import { motion } from "framer-motion";
import { H1 } from "@/components/Typography";
import { styles } from "../page-view/styles";
import { FlexCol } from "@/components/flex-box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";

// ==============================================================

export default function Section1() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
        <Container>
          <FlexCol py={{xs:1,sm:4}} gap={3}>
            <H1 fontSize={{xs:20, sm:50}} color="#FFF">
              FAQs
            </H1>
            <Divider />
          </FlexCol>


          {FAQS.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <Box sx={{ marginBottom: expanded === index ? "15px" : "0px",  overflow: "hidden" }}> {/* Ensures spacing remains consistent */}
                <Accordion
                  expanded={expanded === index}
                  onChange={handleChange(index)}
                  sx={styles.accordion}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />} sx={{ borderBottom: "none" }}>
                    <H1 fontSize={{xs:10, sm:18}} color="#FFF">
                      {faq.question}
                    </H1>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" sx={{ color: "#fff" }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </motion.div>
          ))}
        </Container>
      </motion.div>
    </Box>
  );
}
