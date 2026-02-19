"use client"

// ==========================================================
// Section 8 - Email Banner - About Us
// ==========================================================

import { motion } from "framer-motion";
import ContactUsBanner from "@/components/contact-us-banner";

export default function Section8() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
        viewport={{ once: true }}
        className="w-full overflow-hidden"
      >
        <div className="py-0 sm:py-10 px-4">
          <ContactUsBanner
            title="Get In Touch"
            subtitle="Let us help you learn more."
          />
        </div>
      </motion.div>
    </div>
  );
}