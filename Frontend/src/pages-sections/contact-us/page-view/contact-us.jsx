"use client";

import { Box } from "@mui/material";
import Section1 from "../section-1";
import Section2 from "../section-2";
import { BlobBox2 } from "./blobBox2";
import { BlobBox } from "./blobBox";
import { useState } from "react";

export default async function ContactUsPageView() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1F1F1F', display: 'flex', justifyContent: 'center' }}>
      
      {/* GRADIENT CIRCLES */}
      <BlobBox2 />
      {/* <BlobBox top='35%' left={250} />
      <BlobBox top='45%' right={100} />
      <BlobBox top='55%' left={100} color="#933FFE"/>
      <BlobBox top='65%' right={-150} /> */}

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










