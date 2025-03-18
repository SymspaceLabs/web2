"use client";

import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { FAQS } from "@/data/faqs";
import { motion } from "framer-motion";
import { FlexBox } from "@/components/flex-box";
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

export default function Section15() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    { question: "What is Symspace, and how does it work?", answer: "We accept Visa, MasterCard, PayPal, and Apple Pay." },
    { question: "How can Symspace help my brand reduce returns and increase sales?", answer: "Shipping typically takes 5-7 business days, depending on your location." },
    { question: "How accurate is AR sizing for furniture and apparel?", answer: "Yes, we ship to most countries worldwide. Shipping fees may vary." },
  ];

  const accordionStyles = {
    background: "linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)",
    boxShadow: "0px 1px 24px -1px rgba(0, 0, 0, 0.18)",
    backdropFilter: "blur(12px)",
    borderRadius: "15px",
    color: "#fff",
    marginBottom: "15px",
    padding: {xs:"5px", sm:"10px"},
    position: "relative",
    border: "2px solid linear-gradient(94.91deg, #FFFFFF 0%, #AEAEAE 100%)", // Base transparent border
    borderRadius: "15px",
    backgroundClip: "padding-box", // Ensures inner content is not affected
    "&:first-of-type": { borderRadius: "15px !important" },
    "&:last-of-type": { borderRadius: "15px !important" }
  };

  return (
    <Box sx={{ width: "100%", py: { xs:2, sm:10 }, background: "#1F1F1F" }}>
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
            <Typography sx={{ fontSize:{xs:20, sm:50} }} fontFamily="'Elemental End', sans-serif" textTransform="lowercase" color="#fff"  >
              FAQs
            </Typography>
            <Link href="/faq" target="blank" >
              <Typography
                sx={{ 
                  color: 'rgba(255,255,255,0.5)', 
                  fontFamily: "'Elemental End', sans-serif", 
                  textTransform: 'lowercase', 
                  textDecoration: 'none', 
                  fontSize:{xs:10},
                  '&:hover': { 
                    color: '#FFF',
                    textDecoration: 'underline',
                  } 
                }}
              >
                More FAQS
              </Typography>
            </Link>
          </FlexBox>


          {FAQS.slice(0,3).map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <Box sx={{ marginBottom: expanded === index ? "15px" : "0px",  overflow: "hidden" }}> {/* Ensures spacing remains consistent */}
                <Accordion
                  expanded={expanded === index}
                  onChange={handleChange(index)}
                  sx={accordionStyles}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />} sx={{ borderBottom: "none" }}>
                    <Typography color="#fff" fontFamily="'Elemental End', sans-serif" textTransform="lowercase" sx={{fontSize:{xs:10, sm:18}}} >
                      {faq.question}
                    </Typography>
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
