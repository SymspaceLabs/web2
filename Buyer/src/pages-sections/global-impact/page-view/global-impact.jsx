"use client"

// =================================================================
// Global Impact Page Sections
// =================================================================

import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";

import { Box } from "@mui/material";
import { BlobBox2 } from "./blobBox2";

export default function GlobalImpactPageView() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1F1F1F', display: 'flex', justifyContent: 'center' }}>
      
      {/* GRADIENT CIRCLES */}
      <BlobBox2 />

      {/* CONTENT */}
      <Box sx={{ zIndex:1 }}>
        <Section1 />  {/* HERO  */}
        <Section2 />  {/* 3 GLASS CARDS */}
        <Section3 />  {/* BENEFITS */}
        <Section4 /> 
        <Section5 />  {/* COMPANIES */}
        <Section6 />  {/* BANNER */}
      </Box>
    </Box>
  );
}










