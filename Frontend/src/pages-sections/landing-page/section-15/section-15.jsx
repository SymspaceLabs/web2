"use client";

import { useState } from "react";
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    padding: '10px'
  };

  return (
    <Box sx={{ width: "100%", background: "#1F1F1F", py: 25 }}>
      <Container sx={{ position: "relative" }}>
        <Typography fontFamily='Elemental End' textTransform='lowercase' color="#fff" fontSize={50} mb={4}>
          FAQs
        </Typography>

        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            sx={{
              ...accordionStyles,
              "&:first-of-type": { borderRadius: "15px !important" },
              "&:last-of-type": { borderRadius: "15px !important" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
              sx={{
                borderBottom: "none !important", // Remove default border-bottom
              }}
            >
              <Typography color="#fff" fontFamily='Elemental End' textTransform='lowercase' fontSize={18}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: "#fff" }}>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}


      </Container>
    </Box>
  );
}
