"use client";

// =======================================================
// Landing Page Pages Section
// =======================================================

import { useEffect, Suspense, lazy } from "react"; // Import lazy and Suspense
import { Box, CircularProgress } from "@mui/material"; // Added CircularProgress for a loading fallback
import { BlobBox } from "@/components/BlobBox";

// Lazy load all your sections
// This tells React to only load these components when they are first rendered.
const Section1 = lazy(() => import("../section-1"));
const Section2 = lazy(() => import("../section-2"));
const Section3 = lazy(() => import("../section-3"));
const Section4 = lazy(() => import("../section-4"));
const Section5 = lazy(() => import("../section-5"));
const Section6 = lazy(() => import("../section-6"));
const Section7 = lazy(() => import("../section-7"));
const Section8 = lazy(() => import("../section-8"));
const Section9 = lazy(() => import("../section-9"));
const Section10 = lazy(() => import("../section-10"));
const Section11 = lazy(() => import("../section-11"));
const Section12 = lazy(() => import("../section-12"));
const Section13 = lazy(() => import("../section-13"));
const Section14 = lazy(() => import("../section-14"));
const Section15 = lazy(() => import("../section-15"));
const Section16 = lazy(() => import("../section-16"));


export default function LandingPageView() {

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);


  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>

      {/* BlobBox elements are likely small and don't need lazy loading */}
      {/* Hero Section Left */}
      <BlobBox top={-30} left="15%" background="#FFF" displayNoneMobile={true} /> {/*  WHITE */}
      <BlobBox top={-30} left={0} /> {/* BLUE */}

      {/* Hero Section Right */}
      <BlobBox top={150} right={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top={0} right={0} /> {/* BLUE */}

      {/* Video Section 1 */}
      <BlobBox top="10%" left="15%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="10%" left="10%" /> {/* BLUE */}

      {/* Video Section 2 */}
      <BlobBox top="10%" right="15%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="10%" right="10%" />{/* BLUE */}

      {/* Future of Retail Section */}
      <BlobBox top="17%" right="10%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="15%" right="5%" displayNoneMobile={true} /> {/* BLUE */}

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
      <BlobBox top="63%" right={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="65%" right={0} />{/* BLUE */}

      {/* GRADIENT CIRCLES 9 */}
      <BlobBox top="80%" left="-10%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="80%" left={0} />{/* BLUE */}

      <Box sx={{ background: '#1F1F1F', zIndex: 2 }}>
        {/* Wrap all lazily loaded components with Suspense.
            The fallback will show while the component's code is being loaded.
            You might want a more sophisticated loader or skeleton for a better UX.
        */}
        <Suspense fallback={
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px', // Give it some height so it's not collapsed
            color: 'white' // Ensure the spinner is visible on your dark background
          }}>
            <CircularProgress color="inherit" />
          </Box>
        }>
          <Section1 /> 
          <Section2 /> 
          <Section3 /> 
          <Section4 /> 
          <Section5 /> 
          <Section6 /> 
          <Section7 /> 
          <Section8 /> 
          <Section9 /> 
          <Section10 /> 
          <Section11 /> 
          <Section12 /> 
          <Section13 /> 
          <Section14 /> 
          <Section15 /> 
          <Section16 /> 
        </Suspense>
      </Box>
    </Box>
  )
}