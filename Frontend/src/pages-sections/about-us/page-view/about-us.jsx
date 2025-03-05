"use client";

import { useEffect } from "react";
import { Box } from "@mui/material";
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";
import Section7 from "../section-7";
import Section8 from "../section-8";

import { BlobBox2 } from "./blobBox2";
import { BlobBox } from "./blobBox";

export default async function AboutUsPageView() {
  
  {/* This code helps for scroll to section */}
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
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1F1F1F', display: 'flex', justifyContent: 'center' }}>
      
      {/* GRADIENT CIRCLES */}
      <BlobBox2 />
      {/* <BlobBox top='35%' left={250} />
      <BlobBox top='45%' right={100} />
      <BlobBox top='55%' left={100} color="#933FFE"/>
      <BlobBox top='65%' right={-150} /> */}

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










