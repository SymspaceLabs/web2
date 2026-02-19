// ========================================
// Section 2 | Email Banner
// ========================================

import EmailBanner from "@/components/email-banner";
import { motion } from "framer-motion";

export default function Section2() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
        viewport={{ once: true }}
        className="w-full overflow-hidden"
      >
        <div className="container mx-auto px-4 py-0 sm:py-10">
          <EmailBanner title="join the simulation" />
        </div>
      </motion.div>
    </div>
  );
}