"use client"

// ==========================================================
// Section 6 | Global Impact
// ==========================================================

import { motion } from "framer-motion";
import EmailBanner from "@/components/email-banner";

// ==========================================================

interface Section6Props {
  className?: string;
}

export default function Section6({ className }: Section6Props) {
  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
        viewport={{ once: true }}
        className="w-full overflow-hidden"
      >
        <div className="container mx-auto px-4 py-10">
          <EmailBanner title="stay up to date" />
        </div>
      </motion.div>
    </div>
  );
}