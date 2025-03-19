import React from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { H1, H6, Paragraph } from "../../../components/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '../styles';

const SymAccordion = ({title,content}) => {
  return (
    <Box sx={{ mt: 2, boxSizing: 'border-box', borderRadius: "30px", background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)' }}>
      <Accordion sx={{ background: 'transparent', boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', // Add shadow to summary
            zIndex: 1, // Place summary above details
            position: 'relative',
            borderRadius: "30px",
            px: 2,
            py: 1, 
          }}
        >
          <H1 
            sx={{
              ...styles.elementalEndFont,
              fontSize: '24px',
              color: '#353535',
            }}
          >
            {title}
          </H1>
        </AccordionSummary>
        <AccordionDetails sx={{py:'25px', px:'25px'}}>
          {/* <H6
            sx={{
              fontFamily: 'Helvetica',
              fontWeight: 400,
              fontSize: '16px',
              color: '#000'
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              style={{ marginTop: "0.5rem" }}
            />
          </H6> */}
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            style={{ marginTop: "0.5rem", fontFamily: 'Helvetica', fontSize: '16px', color: '#000' }}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default SymAccordion