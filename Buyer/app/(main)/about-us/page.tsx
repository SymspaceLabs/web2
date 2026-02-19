"use client";

// ===========================================================================
// About Us Page Sections
// ===========================================================================

import { useEffect } from "react";
import Section1 from "./section-1";
import Section2 from "./section-2";
import Section3 from "./section-3";
import Section4 from "./section-4";
import Section5 from "./section-5";
import Section6 from "./section-6";
import Section7 from "./section-7";
import Section8 from "./section-8";

// BlobBox component converted to Tailwind
interface BlobBoxProps {
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
  background: string;
  widthHeight?: string;
  displayNoneMobile?: boolean;
}

const BlobBox = ({ 
  top, 
  right, 
  left, 
  bottom, 
  background, 
  widthHeight = '500px',
  displayNoneMobile = false 
}: BlobBoxProps) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    top,
    right,
    left,
    bottom,
    width: widthHeight,
    height: widthHeight,
    background,
    filter: 'blur(200px)',
    borderRadius: '50%',
    pointerEvents: 'none',
  };

  return (
    <div 
      style={style}
      className={displayNoneMobile ? 'hidden md:block' : ''}
    />
  );
};

// ===========================================================================

export default function AboutUsPageView() {
  
  {/* This code helps for scroll to a particular section */}
  useEffect(() => {
    const hash = window.location.hash;
    
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#1F1F1F] flex justify-center">
      
      {/* GRADIENT CIRCLES */}
      {/* Blob 1: Hero Section Left */}
      <BlobBox top="-5%" right="35%" background="#0366FE" widthHeight='750px' displayNoneMobile={true} />

      {/* Blob 2: Our Mission Left */}
      <BlobBox top="15%" right="0" background="#FFF" displayNoneMobile={true} />
      <BlobBox top="15%" right="5%" background="#0366FE" displayNoneMobile={true} />
      
      {/* Blob 3: Industry Leaders Left */}
      <BlobBox top="25%" left="0" background="#FFF" displayNoneMobile={true} />
      <BlobBox top="25%" left="5%" background="#0366FE" displayNoneMobile={true} />

      {/* Blob 4: Core Values Left */}
      <BlobBox top="43%" left="50%" background="#FFF" displayNoneMobile={true} />
      <BlobBox top="40%" left="50%" background="#0366FE" displayNoneMobile={true} />

      {/* Blob 5: Leadership Left */}
      <BlobBox top="50%" left="-15%" background="#0366FE" widthHeight='750px' displayNoneMobile={true} />

      {/* Blob 6: Open Roles Left */}
      <BlobBox top="70%" right="20%" background="#FFF" displayNoneMobile={true} />
      <BlobBox top="70%" right="30%" background="#0366FE" displayNoneMobile={true} />
      
      {/* CONTENT */}
      <div className="z-10 w-full">
        <Section1 />  {/* HERO  */}
        <Section2 />  {/* OUR MISSION */}
        <Section3 />  {/* INDUSTRY LEADERS */}
        <Section4 />  {/* CORE VALUES */}
        <Section5 />  {/* TEAM */}
        <Section6 />  {/* OPEN ROLES */}
        <Section7 />  {/* PRESS RELEASES */}
        <Section8 />  {/* GET IN TOUCH */}
      </div>
    </div>
  );
}