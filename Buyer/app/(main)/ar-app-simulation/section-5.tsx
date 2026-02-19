"use client";

import { motion } from 'framer-motion';
import { TESTIMONIALS } from '@/data/testimonial';
import TestimonialCard from '@/components/testimonial-card';
import { Testimonial } from '@/types/landing';

// MarqueeSlider Component
const MarqueeSlider: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
  return (
    <div className="relative w-full overflow-hidden bg-white/10">
      <div className="flex py-6 animate-marquee hover:[animation-play-state:paused] gap-5">
        {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard
                key={`${testimonial.id}-${index}`}
                testimonial={testimonial}
            />
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 100s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  );
};

// Main Section Component
export default function Section5() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
      viewport={{ once: true }}
      className="w-full overflow-hidden"
    >
      <div className="w-full flex flex-col items-center py-8 bg-white">
        <div className="w-full max-w-7xl px-4 py-2 mb-6">
          <p className="text-base text-[#434167] mb-2 font-helvetica">
            What everyone is saying
          </p>
          <h1 className="text-4xl sm:text-4xl text-[#2b3445] pb-6 font-elemental lowercase">
            trusted by users globally
          </h1>
        </div>
        <MarqueeSlider testimonials={TESTIMONIALS} />
      </div>
    </motion.div>
  );
}