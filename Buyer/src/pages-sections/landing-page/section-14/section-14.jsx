"use client";

import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react"; // Import useEffect
import { FAQS } from "@/data/faqs";
import { motion } from "framer-motion";
import { styles } from "../page-view/styles";
import { FlexBox } from "@/components/flex-box";
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { H1, Paragraph } from "@/components/Typography";

export default function Section14() {
  const [expanded, setExpanded] = useState(false);
  const [isClient, setIsClient] = useState(false); // State to track if component is mounted on client

  useEffect(() => {
    setIsClient(true); // Set to true once the component mounts on the client
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordionStyles = {
    background: "linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)",
    boxShadow: "0px 1px 24px -1px rgba(0, 0, 0, 0.18)",
    backdropFilter: "blur(12px)",
    borderRadius: "15px",
    color: "#fff",
    marginBottom: "15px",
    padding: {xs:"5px", sm:"10px"},
    position: "relative",
    // FIX: Changed invalid border gradient to a solid white border.
    // If a gradient border is truly desired, it requires a different CSS technique
    border: "2px solid #FFF",
    borderRadius: "15px",
    backgroundClip: "padding-box",
    "&:first-of-type": { borderRadius: "15px !important" },
    "&:last-of-type": { borderRadius: "15px !important" }
  };

  return (
    <Box sx={{ width: "100%", py: { xs:2, sm:10 }, background: "#1F1F1F" }}>
      {/* Conditionally render motion.div only on the client to prevent hydration errors */}
      {isClient ? (
        <motion.div
          component={Box} // Makes motion.div behave like a Box
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ width: "100%", overflow: "hidden" }} // Ensures content stays within bounds
        >
          <Container>
            <FlexBox justifyContent="space-between" alignItems="center" sx={{py:{xs:1, sm:4}}}>
              <H1 sx={styles.sectionHeader}>
                FAQs
              </H1>
              <Link href="/faq" target="blank" >
                <H1
                  sx={{
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    fontSize:{xs:10},
                    '&:hover': {
                      color: '#FFF',
                      textDecoration: 'underline',
                    }
                  }}
                >
                  More FAQS
                </H1>
              </Link>
            </FlexBox>

            {FAQS.slice(0,3).map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                <Box sx={{ marginBottom: expanded === index ? "15px" : "0px",  overflow: "hidden" }}>
                  <Accordion
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                    sx={accordionStyles}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />} sx={{ borderBottom: "none" }}>
                      <H1 sx={{ fontSize:{xs:10, sm:18}, color: "#FFF" }} >
                        {faq.question}
                      </H1>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Paragraph sx={{ color: "#fff" }}>
                        {faq.answer}
                      </Paragraph>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </motion.div>
            ))}
          </Container>
        </motion.div>
      ) : (
        // Render a static version of the content on the server
        <Container>
          <FlexBox justifyContent="space-between" alignItems="center" sx={{py:{xs:1, sm:4}}}>
            <H1 sx={styles.sectionHeader}>
              FAQs
            </H1>
            <Link href="/faq" target="blank" >
              <H1
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  fontSize:{xs:10},
                  '&:hover': {
                    color: '#FFF',
                    textDecoration: 'underline',
                  }
                }}
              >
                More FAQS
              </H1>
            </Link>
          </FlexBox>

          {FAQS.slice(0,3).map((faq, index) => (
            // Render Accordions without motion.div wrapper for SSR
            <Box key={index} sx={{ marginBottom: expanded === index ? "15px" : "0px",  overflow: "hidden" }}>
              <Accordion
                expanded={expanded === index}
                onChange={handleChange(index)}
                sx={accordionStyles}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />} sx={{ borderBottom: "none" }}>
                  <H1 sx={{ fontSize:{xs:10, sm:18}, color: "#FFF" }} >
                    {faq.question}
                  </H1>
                </AccordionSummary>
                <AccordionDetails>
                  <Paragraph sx={{ color: "#fff" }}>
                    {faq.answer}
                  </Paragraph>
                </AccordionDetails>
              </Accordion>
            </Box>
          ))}
        </Container>
      )}
    </Box>
  );
}
