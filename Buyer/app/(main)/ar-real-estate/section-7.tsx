"use client";

import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import GlassBanner from "@/components/glass-banner";

export default function Section7() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col items-center py-10 px-2 sm:px-0 w-full max-w-[1600px]">
      <div className="container mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
          viewport={{ once: true }}
          className="w-full overflow-hidden"
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