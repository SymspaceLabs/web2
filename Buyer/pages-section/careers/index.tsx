"use client";

// ==============================================================
// Careers Page
// ==============================================================

import Section1 from "./section-1";
import Section2 from "./section-2";
import Section3 from "./section-3";
import Section4 from "./section-4";
import { useEffect } from "react";
import { BlobBox } from "@/components/blobBox";

export default function CareersPage() {

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
    <div className="relative overflow-hidden bg-[#1F1F1F] flex justify-center">
      
      {/* GRADIENT CIRCLES */}
      {/* Blob 1: Hero Section Left */}
      <BlobBox top="0%" right="5%" background="#0366FE" /> {/* BLUE */}
      
      {/* Blob 2: Open Roles Left */}
      <BlobBox top="45%" left="0%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="45%" left="5%" background="#0366FE"  /> {/* BLUE */}

      {/* Blob 3: Open Roles Right */}
      <BlobBox top="60%" right="5%" background="#0366FE" /> {/* BLUE */}

      {/* Blob 4: Open Roles Middle */}
      <BlobBox top="75%" right="40%" background="#0366FE" /> {/* BLUE */}

      {/* Blob 5: Open Roles Left */}
      <BlobBox top="80%" left="0%" background="#0366FE" /> {/* BLUE */}


      {/* CONTENT */}
      <div className="z-10 w-full">
        <Section1 />  {/* HERO  */}
        <Section2 />  {/* CORE VALUES */}
        <Section3 />  {/* OPEN ROLES */}
        <Section4 />  {/* BANNER  */}
      </div>
    </div>
  );
}