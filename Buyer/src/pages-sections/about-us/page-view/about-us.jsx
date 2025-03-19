"use client";

// ===========================================================================
// About Us Page Sections
// ===========================================================================


import { useEffect } from "react";
import { Box } from "@mui/material";
import { BlobBox } from "@/components/BlobBox";

import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";
import Section7 from "../section-7";
import Section8 from "../section-8";
// ===========================================================================

export default function AboutUsPageView() {
  
  {/* This code helps for scroll to a particular section */}
  useEffect(() => {
    const hash = window.location.hash; // Check if the URL has a hash (e.g., #benefits)
    
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
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1F1F1F', display: 'flex', justifyContent: 'center' }}>
      
      {/* GRADIENT CIRCLES */}
      {/* Blob 1: Hero Section Left */}
      <BlobBox top="-5%" right="35%" background="#0366FE" widthHeight='750px' displayNoneMobile={true} /> {/* BLUE */}

      {/* Blob 2: Our Mission Left */}
      <BlobBox top="15%" right={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="15%" right="5%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}
      
      {/* Blob 3: Industry Leaders Left */}
      <BlobBox top="25%" left={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="25%" left="5%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}

      {/* Blob 4: Core Values Left */}
      <BlobBox top="43%" left="50%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="40%" left="50%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}

      {/* Blob 4: Leadership Left */}
      <BlobBox top="50%" left="-15%" background="#0366FE" widthHeight='750px' displayNoneMobile={true} /> {/* WHITE */}

      {/* Blob 5: Open Roles Left */}
      <BlobBox top="70%" right="20%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="70%" right="30%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}
      

      {/* CONTENT */}
      <Box sx={{ zIndex:1, width:'100%' }}>
        <Section1 />  {/* HERO  */}
        <Section2 />  {/* OUR MISSION */}
        <Section3 />  {/* OPEN ROLES */}
        <Section4 />  {/* CORE VALUES */}
        <Section5 />  {/* TEAM */}
        <Section6 />  {/* OPEN ROLES */}
        <Section7 />  {/* PRESS RELEASES */}
        <Section8 />  {/* GET IN TOUCH */}
      </Box>
    </Box>
  );
}










