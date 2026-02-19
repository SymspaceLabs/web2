'use client'

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useState, useEffect, ReactNode, useRef, JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// =============================================================
// Types
// =============================================================

interface CardData {
  number: string;
  description: ReactNode;
}

interface CustomCard1Props {
  number: string;
  description: ReactNode;
}

// =============================================================
// Main Component
// =============================================================

export default function Section12(): JSX.Element {
  // Array of statistics for the first set of cards
  const cardsData: CardData[] = [
    { number: '90', description: (<>90%+ of Americans use/<br/>would use AR for e-commerce</>), },
    { number: '94', description: (<>94% conversion rate for products <br/> purchased through AR/VR ads</>) },
    { number: '98', description: (<>98% of Americans who used AR<br/>while shopping found it helpful</>) },
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className="py-4 sm:py-20 relative z-[2]">
      <div className="container mx-auto pr-0 px-4 sm:px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Map over the cardsData array and render CustomCard1 for each entry */}
            {cardsData.slice(0, 3).map((card, index) => (
              <div key={index}>
                <motion.div variants={fadeInVariants}>
                  <CustomCard1 number={card.number} description={card.description} />
                </motion.div>
              </div>
            ))}
            
            <motion.div variants={fadeInVariants} className="w-full col-span-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-0">
                <div>
                  <CustomCard2 />
                </div>
                <div className="hidden sm:block">
                  <motion.div variants={fadeInVariants}>
                    <CustomCard3 />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================
// CustomCard1 Component
// =============================================================

export const CustomCard1 = ({ number, description }: CustomCard1Props): JSX.Element => {
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const targetNumber = parseInt(number);
    const duration = 2000;
    const increment = Math.ceil(targetNumber / (duration / 50));
    const interval = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        clearInterval(interval);
        start = targetNumber;
      }
      setCurrentNumber(start);
    }, 50);

    return () => clearInterval(interval);
  }, [inView, number]);

  return (
    <div 
      ref={ref} 
      className="bg-white mb-0 sm:mb-4 px-2 rounded-[30px] sm:rounded-[50px] group"
    >
      <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center h-full gap-0 sm:gap-[50px] px-2 sm:px-6 pt-6 sm:pt-20 pb-6">
        <h1 className="text-black text-[40px] sm:text-[90px] font-elemental lowercase">
          {currentNumber}%
        </h1>
        <p className="text-[#353535] text-[10px] sm:text-xl text-left sm:text-center max-w-[120px] sm:max-w-full px-2 font-helvetica">
          {description}
        </p>
        {/* Button with fade-in effect */}
        <div className="flex">
          <Link href="/global-impact">
            <Button
              className="font-elemental fadeInBtn opacity-100 sm:opacity-0 transform-none sm:translate-y-5 transition-none sm:transition-all sm:duration-300 sm:ease-in-out group-hover:opacity-100 group-hover:translate-y-0 py-1 sm:py-4 px-2 sm:px-6 rounded-[50px] border-2 border-black text-black text-[8px] sm:text-xs mb-0 sm:mb-10 bg-transparent hover:bg-gradient-to-r hover:from-[#666666] hover:to-[#000000] hover:text-white hover:border-white"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// =============================================================
// CustomCard2 Component
// =============================================================

export const CustomCard2 = (): JSX.Element => {
  return (
    <div
      className="flex flex-col rounded-[20px] sm:rounded-[50px] h-full bg-white group"
    >
      <CardContent
        className="flex flex-col justify-center items-center gap-6 sm:gap-8 py-8 sm:py-16 px-4 sm:px-20"
      >
        <h1 className="font-elemental text-4xl sm:text-5xl md:text-5xl lowercase text-black">
          AR Visuals
        </h1>
        <p
          className="font-helvetica text-[#353535] text-sm sm:text-xl font-medium text-justify leading-7"
        >
          We create unique AR experiences for brands helping them bring any idea into reality.
          Augment animated visuals on top of products, displays, or billboards for an immersive marketing medium.
          Conversion rates for AR advertising have been reported to be as high as 25%, which is more than 10 times higher than traditional ads.
        </p>
        <div className="flex">
          <Link href="/contact-us">
            <Button
              className="font-elemental fadeInBtn opacity-100 sm:opacity-0 transform-none sm:translate-y-5 transition-none sm:transition-all sm:duration-300 sm:ease-in-out group-hover:opacity-100 group-hover:translate-y-0 py-1 sm:py-4 px-2 sm:px-6 rounded-[50px] border-2 border-black text-black text-[8px] sm:text-xs bg-transparent hover:bg-gradient-to-r hover:from-[#666666] hover:to-[#000000] hover:text-white hover:border-white"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </CardContent>
    </div>
  );
};

// =============================================================
// CustomCard3 Component
// =============================================================

export const CustomCard3 = (): JSX.Element => {
  return (
    <div className="relative w-full h-[350px] sm:h-[580px] rounded-[50px] overflow-hidden">
      <video
        width={292}
        height={195}
        className="object-cover w-full h-full rounded-[50px]"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster='https://placehold.co/1280x720/cccccc/cccccc'
      >
        <source src='/videos/landing-page/ar-visuals.webm' type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};