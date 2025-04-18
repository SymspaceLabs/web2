import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import { useState } from "react";
  import { H1 } from "../Typography";
  
  const SymAccordion = ({ title, children, defaultExpanded = false }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);
  
    return (
      <Accordion
        expanded={expanded}
        onChange={(_, isExpanded) => setExpanded(isExpanded)}
        sx={{
          backgroundColor: "transparent",
          color: "#FFF",
          borderRadius: 2,
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          sx={{ px: 0 }}
          expandIcon={<ExpandMoreIcon sx={{ color: "#FFF" }} />}
        >
          <H1 fontSize={{sm:'18px'}}>
            {title}
          </H1>
        </AccordionSummary>
  
        <AccordionDetails sx={{ px: 0 }}>
          {/* Divider shown only when expanded */}
          <Divider sx={{ borderColor: "#FFF", mb: 2 }} />
          {children}
        </AccordionDetails>
      </Accordion>
    );
  };
  
  export default SymAccordion;
  