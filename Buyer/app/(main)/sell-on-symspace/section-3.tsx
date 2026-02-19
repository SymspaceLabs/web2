"use client";

// =======================================================
// Section 3 Component - Tailwind Version
// ======================================================

import { motion } from "framer-motion";

// =======================================================
// Stat Card Component
// =======================================================

import { useEffect, useState, useRef } from "react";

interface StatCardProps {
  title: number;
  subTitle: string;
}

function StatCard({ title, subTitle }: StatCardProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = parseInt(title.toString(), 10);
    const duration = 2000;
    const incrementTime = 10;
    const incrementValue = Math.ceil(end / (duration / incrementTime));

    const timer = setInterval(() => {
      start += incrementValue;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isVisible, title]);

  return (
    <div
      ref={cardRef}
      className="p-1 sm:p-5 flex flex-col items-center justify-center"
    >
      {/* Animated count */}
      <h1 className="font-elemental text-center text-[#2F2F2F] text-[30px] sm:text-[96px]">
        {count}%
      </h1>
      {/* Subtitle */}
      <p className="font-helvetica text-[12px] sm:text-base text-[#909090] text-center">
        {subTitle}
      </p>
    </div>
  );
}

// =======================================================
// Section 3 Main Component
// =======================================================

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const stats = [
  {
    id: "1",
    count: 94,
    subTitle:
      "Increase in conversion rate for products accompanied with AR / VR try-on experiences",
  },
  {
    id: "2",
    count: 56,
    subTitle: "Consumers are more confident in their purchases",
  },
  {
    id: "3",
    count: 40,
    subTitle:
      "Increase in customer experience and satisfaction has proven to minimize returns",
  },
];

export default function Section3() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInVariant}
    >
      <div className="py-10">
        <div className="container mx-auto px-4">
          {/* Title with fade-in effect */}
          <motion.div variants={fadeInVariant}>
            <h1 className="font-elemental text-[20px] sm:text-[32px] text-center text-black pt-0 sm:pt-8 pb-3">
              engage your customers
            </h1>
          </motion.div>

          {/* Stat Cards with staggered animation */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {stats.map((stat) => (
                <motion.div key={stat.id} variants={fadeInVariant}>
                  <StatCard title={stat.count} subTitle={stat.subTitle} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}