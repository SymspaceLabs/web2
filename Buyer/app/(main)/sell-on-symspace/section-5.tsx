"use client";

// =======================================================
// Section 5 Component - Tailwind Version
// =======================================================

import { AR_FOR_BUSINESS_PLANS } from "@/data/pricing";
import PricingTable from "@/components/pricing-table";

export default function Section5() {
  return (
    <div className="py-8" id="pricing">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between items-center pb-2 sm:pb-10">
          {/* Main Header */}
          <div className="text-center">
            <h1 className="font-elemental text-[20px] sm:text-[28px]" style={{ wordSpacing: '5px' }}>
              revolutionize shopping. <br /> simplify and save.
            </h1>
            <p className="font-helvetica text-[#18181B] text-[14px] sm:text-base py-2">
              Choose the perfect plan for your business needs
            </p>
          </div>
        </div>
        <PricingTable plans={AR_FOR_BUSINESS_PLANS} />
      </div>
    </div>
  );
}