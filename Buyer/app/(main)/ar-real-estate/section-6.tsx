'use client';

import { motion } from "framer-motion";
import { AR_REAL_ESTATE_PLANS } from "@/data/pricing";
import PricingTable from "@/components/pricing-table";

export default function Section6() {
  return (
    <div className="w-full z-[1]">
      <div className="container mx-auto py-2 sm:py-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
          viewport={{ once: true }}
          className="h-full"
        >
          <div className="flex flex-col items-center py-2 sm:py-5 px-2 gap-4">
            {/* Header */}
            <h1 className="font-elemental text-white text-[20px] sm:text-[40px] max-w-[1000px] text-center" style={{ wordSpacing: '10px' }}>
              Stage faster. Lease Smarter.
            </h1>

            {/* Subheader */}
            <p className="text-white text-xs sm:text-xl text-center max-w-[1000px] leading-[1.5] sm:leading-[2]">
              Reduce staging costs by up to 80% and increase rental value by 20% with AR-powered staging.
            </p>

            {/* Pricing Table */}
            <PricingTable 
              plans={AR_REAL_ESTATE_PLANS}
              title="flexible pricing for every property"
              theme="dark"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}