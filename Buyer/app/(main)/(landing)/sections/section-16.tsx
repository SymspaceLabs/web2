"use client";

// ========================================
// Section 16 | Email Banner | Landing Page
// ========================================

import { motion } from "framer-motion";
import EmailBanner from "@/components/email-banner";

// ========================================

export default function Section16() {
  return (
    <div className="bg-white py-10 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
        viewport={{ once: true }}
        className="w-full overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4">
          <EmailBanner title="stay up to date" />
        </div>
      </motion.div>
    </div>
  );
}