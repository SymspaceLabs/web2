"use client";

import Link from 'next/link';
import { SetStateAction, useState } from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
  glassCardGradient: {
    background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
  },
};

const benefits = [
  { 
    title: 'personalize material and style',
    imgUrl: '/images/ar-real-estate/customize-1.png',
    content: 'Upload & edit 2D or 3D floor plans to generate immersive 3D layouts.',
    bullet: ' No floor plan? No problem. Start by selecting one of our templates or even  draw your floor plan with the specified measurements you want.'
  },
  { 
    title: 'floor plans',
    imgUrl: '/images/ar-real-estate/customize-2.png',
    content: 'Render or import 3D models of properties and begin customizing the style such as flooring, walls, material, paint, countertops, and furniture.',
    bullet: 'Drag and Drop 3D products  anywhere to customize homes with  true-to-size products representing the property in real-life.'
  },
  { 
    title: '3d renders & Virtual tours',
    imgUrl: '/images/ar-real-estate/customize-3.png',
    content: 'Render high-quality videos/images of your customized home and offer virtual walkthroughs for potential buyers/tenants.',
    bullet: 'National Association of Realtors (NAR) found virtual staging reduces staging costs by up to 80% and increases rental value by 20% with AR-powered staging'
  },
];

export default function Section3() {
  const [activeBenefit, setActiveBenefit] = useState(benefits[0]);
  
  const handleBenefitChange = (benefit: SetStateAction<{ title: string; imgUrl: string; content: string; bullet: string; }>) => {
    setActiveBenefit(benefit); 
  };

  return (
    <div className="container mx-auto py-2 sm:py-5 z-[2]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
        viewport={{ once: true }}
        className="h-full"
      >
        <div className="flex flex-col items-center py-2 sm:py-5 px-3 gap-2 sm:gap-4">
          {/* Header */}
          <h1 className="font-elemental text-white text-[20px] sm:text-[40px] max-w-[1000px] text-center" style={{ wordSpacing: '10px' }}>
            customize, configure & tour spaces in real-time
          </h1>

          {/* Subheader */}
          <p className="text-white text-xs sm:text-xl text-center max-w-[1000px] leading-[1.5] sm:leading-[2]">
            Transform blueprints into interactive AR environments. Adjust materials, layout, and visual aesthetics in real-time.
          </p>

          {/* Text Bubble Container */}
          <div className="py-3 flex flex-wrap w-full justify-between sm:justify-center gap-2 sm:gap-3">
            {benefits.map((benefit, index) => (
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

          {/* Card & Image Side-by-Side */}
          <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-3">
            {/* Left Side Card */}
            <div 
              className="flex flex-col items-center rounded-[50px] backdrop-blur-[10.0285px] p-5 sm:p-10 w-full sm:w-1/2 gap-[25px]"
              style={{
                ...customStyles.glassCardGradient,
                ...customStyles.textBubbleBoxShadow,
                filter: 'drop-shadow(0px 5px 50px rgba(0, 0, 0, 0.25))',
              }}
            >
              <p className="text-white text-xs sm:text-lg">
                {activeBenefit.content}
              </p>
              <p className="text-white text-xs sm:text-lg">
                {activeBenefit.bullet}
              </p>
              <div className="flex flex-row items-center justify-center">
                <Link href='/'>
                  <Button 
                    className="font-elemental lowercase rounded-[30px] text-[11px] text-white px-4 py-3 border border-white/20 backdrop-blur-[10px] hover:border-white transition-all"
                    style={{
                      background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
                      boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(94.44deg, #666666 29%, #000000 100%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)';
                    }}
                  >
                    Explore Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side Image */}
            <div className="flex flex-col items-center">
              <Image
                src={activeBenefit.imgUrl}
                alt="AR Experience"
                width={500}
                height={500}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}