"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { BlobBox2 } from "./blobBox2";

import Section1 from "../section-1";
import Section2 from "../section-2";

export default function ContactUsPageView() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1F1F1F', display: 'flex', justifyContent: 'center' }}>
      
      {/* GRADIENT CIRCLES */}
      <BlobBox2 />

      {/* CONTENT */}
      <Box sx={{ zIndex:1, width:'100%'  }}>
        {/* FORM  */}
        <Section1 
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
        />

        {/* BANNER */}
        {
          !isSubmitted && <Section2 />
        }
        
      </Box>
    </Box>
  );
}










