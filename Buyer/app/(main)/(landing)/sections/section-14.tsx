"use client";

import Link from "next/link";
import { JSX, useState } from "react";
import { FAQS } from "@/data/faqs";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// =============================================================
// Types
// =============================================================

interface FAQ {
  question: string;
  answer: string;
}

// =============================================================
// Main Component
// =============================================================

export default function Section14(): JSX.Element {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleChange = (value: string): void => {
    // If clicking the same item that's already open, close it
    // If clicking a different item, open that one
    setExpanded(expanded === value ? null : value);
  };

  return (
    <section className="w-full py-4 sm:py-20 bg-[#1F1F1F]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
        viewport={{ once: true }}
        className="w-full overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 sm:py-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-elemental lowercase text-white">
              FAQs
            </h1>
            <Link href="/faq" target="_blank">
              <h1
                className="font-elemental lowercase text-white/50 no-underline text-[10px] sm:text-base hover:text-white hover:underline transition-all"
              >
                More FAQS
              </h1>
            </Link>
          </div>

          <Accordion
            type="single"
            collapsible
            value={expanded || undefined}
            onValueChange={handleChange}
            className="space-y-4"
          >
            {FAQS.slice(0, 3).map((faq: FAQ, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-2 border-white rounded-[15px] mb-4 overflow-hidden px-2 sm:px-4 py-1 sm:py-2 backdrop-blur-xl shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] cursor-pointer"
                  style={{
                    background: "linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)",
                    backgroundClip: "padding-box"
                  }}
                >
                  <AccordionTrigger className="border-none hover:no-underline text-left cursor-pointer">
                    <h2 className="text-[10px] sm:text-lg text-white font-elemental">
                      {faq.question}
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-white text-sm sm:text-base leading-relaxed font-helvetica">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </motion.div>
    </section>
  );
}