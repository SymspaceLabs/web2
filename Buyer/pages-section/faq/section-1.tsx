"use client";

import { useState } from "react";
import { FAQS } from "@/data/faqs";
import { ChevronDown } from "lucide-react";
import { H1 } from "@/components/Typography";
import { motion, AnimatePresence } from "framer-motion";

export default function Section1() {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange = (index: number) => {
    setExpanded(expanded === index ? false : index);
  };

  return (
    <div className="w-full py-4 sm:py-10 pt-[100px] sm:pt-[100px] md:pt-[200px] z-[2]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full overflow-hidden"
      >
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="flex flex-col py-2 sm:py-8 gap-3">
            <H1 className="text-[20px] sm:text-[50px] text-white">FAQs</H1>
            <hr className="border-white/20" />
          </div>

          {/* Accordion Items */}
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-4"
            >
              <div
                className="rounded-[15px] overflow-hidden"
                style={{
                  background: "linear-gradient(117.54deg, rgba(255,255,255,0.5) -19.85%, rgba(235,235,235,0.37) 4.2%, rgba(224,224,224,0.29) 13.88%, rgba(212,212,212,0.21) 27.98%, rgba(207,207,207,0.18) 37.8%, rgba(202,202,202,0.14) 44.38%, rgba(200,200,200,0.13) 50.54%, rgba(196,196,196,0.1) 60.21%)",
                  boxShadow: "0px 1px 24px -1px rgba(0,0,0,0.18)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {/* Question / Summary */}
                <button
                  type="button"
                  onClick={() => handleChange(index)}
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left cursor-pointer"
                >
                  <span className="text-[10px] sm:text-[18px] text-white font-elemental lowercase pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`text-white flex-shrink-0 w-5 h-5 transition-transform duration-300 ${
                      expanded === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer / Details */}
                <AnimatePresence initial={false}>
                  {expanded === index && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                        <p className="text-white text-sm sm:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}

        </div>
      </motion.div>
    </div>
  );
}