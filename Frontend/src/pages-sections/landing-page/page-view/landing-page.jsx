"use client";

/**
 * LandingPageView Component
 *
 * This component serves as the main layout for the landing page of the application.
 * It incorporates multiple sections imported from local custom section components.
 *
 * 
 * Structure:
 * - Hero Section: Highlights the main feature or attraction.
 * - Application Section: Introduces the core application.
 * - Carousel Section: Displays a rotating showcase.
 * 
*/

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
import { Box } from "@mui/material";
import { styles } from "./styles";

export default function LandingPageView() {
  return (
    <Box sx={{ position:'relative', overflow:'hidden' }}>
      {/* GRADIENT CIRCLES */}
      <Box sx={styles.blob1} /> {/* BLUE */}
      <Box sx={styles.blob2} /> {/* WHITE */}
      <Box sx={styles.blob3} /> {/* BLUE */}
      <Box sx={styles.blob4} /> {/* WHITE */}

      <BlobBox top='55%' left={100} background="#933FFE"/>

      <Box sx={{ background:'#1F1F1F' }}>
        <Section1 />   {/* Hero section */}
        <Section2 />   {/* Video section */}
        <Section3 />   {/* Future of Retail */}
        <Section4 />   {/* Carousal section */}
        <Section5 />   {/* Convenient & Comfortable */}
        <Section6 />   {/* Application */}
        <Section7 />   {/* Realistic 3D Products */}
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


const BlobBox = ({top=null, right=null, bottom=null, left=null, background="#0366FE"}) => {
  return(
    <Box
      sx={{
        position: 'absolute',
        top,
        right,
        bottom,
        left,
        width: '50vw',
        height: '50vw',
        maxWidth: '500px',
        maxHeight: '500px',
        borderRadius: '50%',
        filter: 'blur(150px)',
        opacity: 0.5,
        background,
      }}
    />
  )
}
