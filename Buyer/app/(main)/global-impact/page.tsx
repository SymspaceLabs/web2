"use client"

import Section1 from "./section-1";
import Section2 from "./section-2";
import Section3 from "./section-3";
import Section4 from "./section-4";
import Section5 from "./section-5";
import Section6 from "./section-6";
import { BlobBox } from "@/components/blobBox";

export default function GlobalImpactPageView() {
  return (
    <div className="relative overflow-hidden bg-[#1F1F1F] flex justify-center">
      
      {/* GRADIENT CIRCLES */}
      <BlobBox />

      {/* CONTENT */}
      <div className="z-10">
        <Section1 />  {/* HERO  */}
        <Section2 />  {/* 3 GLASS CARDS */}
        <Section3 />  {/* BENEFITS */}
        <Section4 /> 
        <Section5 />  {/* COMPANIES */}
        <Section6 />  {/* BANNER */}
      </div>
    </div>
  );
}