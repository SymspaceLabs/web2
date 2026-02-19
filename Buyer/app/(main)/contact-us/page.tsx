"use client"

// ========================================
// Main Page View
// ========================================

import { useState } from "react";
import Section1 from "./section-1";
import Section2 from "./section-2";
import { BlobBox } from "@/components/blobBox";

export default function ContactUsPageView() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="relative overflow-hidden bg-[#1F1F1F] flex justify-center">
      {/* GRADIENT CIRCLES */}
      <BlobBox />

      {/* CONTENT */}
      <div className="z-10 w-full">
        {/* FORM */}
        <Section1 
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
        />

        {/* BANNER */}
        {!isSubmitted && <Section2 />}
      </div>
    </div>
  );
}