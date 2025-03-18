"use client"

// =======================================================
// Ar For Business Pages Section
// =======================================================


import { useEffect } from "react";
import { Box } from "@mui/material";
import { BlobBox } from "@/components/BlobBox";

import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";

export default function ArForBusinessPageView() {

  // This code helps for scroll to section
  useEffect(() => {
    // Check if the URL has a hash (e.g., #benefits)
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); // Add slight delay to ensure element is rendered
      }
    }
  }, []);


  return (
    <Box sx={{ position:'relative', overflow:'hidden', backgroundColor: '#fff' }}>
      {/* GRADIENT CIRCLES */}
      <BlobBox top='1%' right={-150} background="#0366FE" />
      <BlobBox top='0.5%' left={-250} background="rgba(147, 63, 254, 0.5)" />
      <BlobBox top='15%' right={-50} background="rgba(147, 63, 254, 0.5)" />
      <BlobBox top='15%' left={-200} background="#0366FE" />
      <BlobBox top='28%' left={650} background="#0366FE" width="20vw" />
      <BlobBox top='30%' left={300} width="20vw" background="rgba(147, 63, 254, 0.5)"/>
      <BlobBox top='40%' right={100} background="#0366FE" width="60vw" />
      <BlobBox top='60%' left={850} background="rgba(147, 63, 254, 0.5)"/>
      <BlobBox top='80%' left={30} background="#0366FE" width="80vw" />
      <BlobBox top='80%' right={-50} background="rgba(147, 63, 254, 0.5)" width="80vw"  />

      {/* CONTENT */}
      <Box sx={{position:'relative', zIndex:2}}>
        <Section1 /> {/* HERO */}
        <Section2 /> {/* COMPANY */}
        <Section3 /> {/* STATS */}
        <Section4 /> {/* BENEFITS */}
        <Section5 /> {/* PRICING */}
        <Section6 /> {/* BANNER */}
      </Box>
    </Box>
  );
}
