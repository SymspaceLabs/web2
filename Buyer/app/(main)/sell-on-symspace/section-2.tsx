"use client";

// =======================================================
// Section 2 Component - Sell On Symspace
// ======================================================

import { motion } from "framer-motion";
import { PARTNERS } from "@/data/partners";

export default function Section2() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="py-3">
        <div className="container mx-auto px-4">
          {/* Title */}
          <h1 className="font-elemental text-[20px] sm:text-[32px] text-center text-[#4E4E4E] pt-0 sm:pt-8 pb-1">
            trusted by all our partners
          </h1>

          {/* Subtitle */}
          <p className="font-helvetica text-center text-[#4E4E4E] pb-3 text-[12px] sm:text-base">
            We work with the world's biggest organizations, brands, and marketplaces.
          </p>

          {/* Scrolling container */}
          <div className="w-full relative mt-5 overflow-hidden">
            <div className="flex animate-scroll w-[200%]">
              {/* Duplicate logos for seamless looping */}
              {PARTNERS.concat(PARTNERS).map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt="Company Logo"
                  className="h-[50px] mx-5"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        :global(.animate-scroll) {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </motion.div>
  );
}