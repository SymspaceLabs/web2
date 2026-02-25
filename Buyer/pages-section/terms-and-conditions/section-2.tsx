"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Section2() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center py-12 sm:py-20 px-4 sm:px-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full overflow-hidden"
        >
          <GlassBanner
            title="get in touch"
            subtitle="Learn more about our vision to help those who need it most."
            btnText="contact us"
            onClick={() => router.push("/contact-us")}
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Inline GlassBanner (replaces MUI custom component) ──────
interface GlassBannerProps {
  title: string;
  subtitle: string;
  btnText: string;
  onClick: () => void;
}

function GlassBanner({ title, subtitle, btnText, onClick }: GlassBannerProps) {
  return (
    <div
      className="relative flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-10 sm:px-12
        border border-white/20 backdrop-blur-md bg-white/10 overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

      <div className="flex flex-col gap-2 z-10">
        <h2 className="text-2xl sm:text-4xl font-bold text-white capitalize tracking-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-white/70 max-w-md">{subtitle}</p>
      </div>

      <button
        onClick={onClick}
        className="z-10 shrink-0 px-8 py-3 rounded-full bg-white text-[#1F1F1F] font-semibold text-sm sm:text-base
          uppercase tracking-wider hover:bg-white/90 active:scale-95 transition-all duration-200"
      >
        {btnText}
      </button>
    </div>
  );
}