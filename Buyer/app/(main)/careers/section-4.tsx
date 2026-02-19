"use client";

// ===============================================================
// Section 4 | Careers
// ===============================================================

import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import GlassBanner from "@/components/glass-banner";

export default function Section4() {
  const router = useRouter();
  
  return (
    <div className="w-full flex flex-col items-center pb-10 px-0">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
          viewport={{ once: true }}
          style={{ width: "100%", overflow: "hidden" }}
        >
          <GlassBanner
            title="get in touch"
            subtitle="Learn more about our vision to help those who need it most."
            btnText="contact us"
            onClick={() => router.push('/contact-us')}
          />
        </motion.div>
      </div>
    </div>
  );
}