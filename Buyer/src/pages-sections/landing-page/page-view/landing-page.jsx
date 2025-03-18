"use client";

// =======================================================
// Landing Page Pages Section
// =======================================================

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
import Section9 from "../section-9";
import Section10 from "../section-10";
import Section11 from "../section-11";
import Section12 from "../section-12";
import Section13 from "../section-13";
import Section14 from "../section-14";
import Section15 from "../section-15";
import Section16 from "../section-16";


export default function LandingPageView() {
  return (
    <Box sx={{ position:'relative', overflow:'hidden' }}>
      
      {/* Hero Section Left */}
      <BlobBox top={-30} left="15%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top={-30} left={0} /> {/* BLUE */}

      {/* Hero Section Right */}
      <BlobBox top={150} right={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top={0} right={0} />{/* BLUE */}

      {/* Video Section 1 */}
      <BlobBox top="10%" left="15%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="10%" left="10%" />{/* BLUE */}

      {/* Video Section 2 */}
      <BlobBox top="10%" right="15%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="10%" right="10%" />{/* BLUE */}

      {/* Future of Retail Section */}
      <BlobBox top="17%" right="10%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="15%" right="5%" />{/* BLUE */}

      {/* Convenient & Comfortable */}
      <BlobBox top="23%" right="0%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="25%" right="5%" />{/* BLUE */}

      {/* 3D Repository  */}
      <BlobBox top="36%" left="-12%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="38%" left="-12%" />{/* BLUE */}

      {/* BENTO BOX */}
      <BlobBox top="43%" right="-10%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="45%" right={0} />{/* BLUE */}

      {/* 3D Model */}
      <BlobBox top="55%" left="-10%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="55%" left={0} />{/* BLUE */}

      {/* OUR FOCUS */}
      <BlobBox top="63%" right={0} background="#FFF"  displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="65%" right={0} />{/* BLUE */}

      {/* GRADIENT CIRCLES 9 */}
      <BlobBox top="80%" left="-10%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="80%" left={0} />{/* BLUE */}

      <Box sx={{ background:'#1F1F1F', zIndex:2 }}>
        <Section1 />   {/* Hero section */}
        <Section2 />   {/* Video section */}
        <Section3 />   {/* Future of Retail */}
        <Section4 />   {/* Carousal section */}
        <Section5 />   {/* Convenient & Comfortable */}
        <Section6 />   {/* Application */}
        <Section7 />   {/* 3D Repository */}
        <Section8 />   {/* Bento Box section */}
        <Section9 />   {/* 3D Simulation */}
        <Section10 />  {/* 3D Model */}
        <Section11 />  {/* Our Focus */}
        <Section12 />  {/* Statistics */}
        <Section13 />  {/* Products */}
        <Section14 />  {/* FAQs */}
        <Section15 />  {/* Testimonial */}
        <Section16 />  {/* Banner */}
      </Box>
    </Box>
  )
}


