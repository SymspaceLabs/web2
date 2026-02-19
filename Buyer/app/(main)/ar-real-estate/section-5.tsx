"use client";

import { SetStateAction, useState } from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';

// Custom styles for complex effects that Tailwind doesn't support
const customStyles = {
  textBubbleBoxShadow: {
    boxShadow: `
      inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
      inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
      inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
      inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
      inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)
    `,
  },
};

const benefits = [
  { 
    title: 'place real furniture with ar',
    imgUrl: '/images/ar-real-estate/furnish-home-1.png',
  },
  { 
    title: 'view product dimensions in real-time',
    imgUrl: '/images/ar-real-estate/furnish-home-2.png',
  },
  { 
    title: 'seamless checkout & ordering',
    imgUrl: '/images/ar-real-estate/furnish-home-3.png',
  }
];

export default function Section5() {
  const [activeBenefit, setActiveBenefit] = useState(benefits[0]);
  
  const handleBenefitChange = (benefit: SetStateAction<{ title: string; imgUrl: string; }>) => {
    setActiveBenefit(benefit); 
  };

  return (
    <div className="container mx-auto py-2 sm:py-5 z-[1]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
        viewport={{ once: true }}
        className="h-full"
      >
        <div className="flex flex-col items-center py-2 sm:py-5 px-2 gap-4">
          {/* Header */}
          <h1 className="font-elemental text-white text-[20px] sm:text-[40px] max-w-[1000px] text-center" style={{ wordSpacing: '10px' }}>
            furnish Homes with augmented reality
          </h1>

          {/* Text Bubble Container */}
          <div className="py-3 flex flex-wrap w-full justify-between sm:justify-center gap-2 sm:gap-3">
            {benefits.slice(0, 3).map((benefit, index) => (
              <div 
                key={index}
                className="text-center flex items-center justify-center max-w-[180px] sm:max-w-[250px] md:max-w-[500px] min-w-[100px] min-h-[40px] py-1 sm:py-2 px-2 sm:px-3 mb-0 sm:mb-2 bg-white/35 rounded-[80px] transition-colors hover:bg-[rgba(3,102,254,0.6)] cursor-pointer"
                style={customStyles.textBubbleBoxShadow}
                onMouseEnter={() => handleBenefitChange(benefit)}
              >
                <h1 className="font-elemental text-[8px] sm:text-[14px] text-white">
                  {benefit.title}
                </h1>
              </div>
            ))}
          </div>

          {/* Card & Image */}
          <div className="w-[250px]">
            <Image
              src={activeBenefit.imgUrl}
              alt="AR Experience"
              width={500}
              height={500}
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}