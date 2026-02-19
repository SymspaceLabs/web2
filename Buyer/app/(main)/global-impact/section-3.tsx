"use client";

import { useState } from 'react';

interface Benefit {
  title: string;
  header: string;
  content: string;
  bullet: string;
}

export default function Section3() {
  const [activeBenefit, setActiveBenefit] = useState<Benefit>(benefits[0]);

  const handleBenefitChange = (benefit: Benefit) => {
    setActiveBenefit(benefit); 
  };

  return (
    <div className="py-5 sm:py-20">
      <div className="container mx-auto px-4 relative flex flex-col items-center">
        <h1 className="text-xl sm:text-[40px] text-center mb-4 text-white font-elemental">
          breaking barriers
        </h1>
        <p className="font-helvetica mb-8 text-white text-xs sm:text-sm md:text-base max-w-[360px] sm:max-w-[1000px] text-center leading-5">
          We are a more inclusive platform revolutionizing the way many people shop. Our technology assists everyone regardless of their age, gender, or disability. We believe technology should work for everyone, not just some, that's why we're perfecting a whole new approach. Where innovation meets accessibility—so no one is left behind.
        </p>

        <div className="flex flex-col w-full">
          {/* First Row of Benefits */}
          <div className="flex justify-center gap-2 sm:gap-3 w-full flex-col sm:flex-row">
            {benefits.slice(0, 3).map((benefit, index) => (
              <div 
                key={index} 
                className="w-full p-4 cursor-pointer hover:bg-[rgba(3,102,254,0.6)] bg-white/35 shadow-[inset_0px_3px_6px_rgba(255,255,255,0.4),inset_0px_-3px_9px_rgba(255,255,255,0.5),inset_0px_-1.5px_20px_rgba(255,255,255,0.24),inset_0px_20px_20px_rgba(255,255,255,0.24),inset_0px_1px_20.5px_rgba(255,255,255,0.8)] rounded-[80px] transition-colors duration-200"
                onMouseEnter={() => handleBenefitChange(benefit)}
              >
                <h1 className="text-white text-xs font-elemental">
                  {benefit.title}
                </h1>
              </div>
            ))}
          </div>

          {/* Second Row of Benefits */}
          <div className="flex justify-center gap-2 sm:gap-3 w-full flex-col sm:flex-row pt-3">
            {benefits.slice(3, 6).map((benefit, index) => (
              <div 
                key={index} 
                className="w-full p-4 cursor-pointer hover:bg-[rgba(3,102,254,0.6)] bg-white/35 shadow-[inset_0px_3px_6px_rgba(255,255,255,0.4),inset_0px_-3px_9px_rgba(255,255,255,0.5),inset_0px_-1.5px_20px_rgba(255,255,255,0.24),inset_0px_20px_20px_rgba(255,255,255,0.24),inset_0px_1px_20.5px_rgba(255,255,255,0.8)] rounded-[80px] transition-colors duration-200"
                onMouseEnter={() => handleBenefitChange(benefit)}
              >
                <h1 className="text-white text-xs font-elemental">
                  {benefit.title}
                </h1>
              </div>
            ))}
          </div>
        </div>

        {/* Active Benefit Card */}
        <div className="drop-shadow-[0px_5px_50px_rgba(0,0,0,0.25)] rounded-[50px] relative w-full shadow-[inset_0px_3px_6px_rgba(255,255,255,0.4),inset_0px_-3px_9px_rgba(255,255,255,0.5),inset_0px_-1.5px_20px_rgba(255,255,255,0.24),inset_0px_20px_20px_rgba(255,255,255,0.24),inset_0px_1px_20.5px_rgba(255,255,255,0.8)] backdrop-blur-[10px] bg-white/35 p-5 sm:p-10 flex flex-col gap-2.5 mt-5 w-full sm:w-3/4">
          <h1 className="text-white text-xl sm:text-[28px] font-elemental">
            {activeBenefit.header}
          </h1>
          <p className="text-white text-xs sm:text-lg font-helvetica">
            {activeBenefit.content}
          </p>
          <p className="text-white text-xs sm:text-lg font-helvetica">
            •&nbsp;&nbsp;{activeBenefit.bullet}
          </p>
        </div>

      </div>
    </div>
  );
}

const benefits: Benefit[] = [
  { 
    title: 'personalized ar shopping experience',
    header: 'try before You buy',
    content: "Shopping online should feel as real and personal as shopping in-store. Symspace transforms e-commerce with AI-powered AR, allowing users to try before they buy—whether it's clothing, furniture, or home decor—by placing products directly into their environment. Our platform also provides sizing recommendations by cross referencing personal measurements, product details, and customer reviews",
    bullet: '81% of consumers prefer brands that offer personalized shopping experiences'
  },
  { 
    title: 'real-time ar product Sizing',
    header: 'No More guessing, No More returns',
    content: 'Size matters—especially in online shopping. Our real-time AR product sizing eliminates uncertainty by allowing customers to see exact product dimensions in their homes before making a purchase, leading to fewer returns and greater confidence',
    bullet: 'Online returns cost retailers $305 billion annually, with sizing issues as the leading cause'
  },
  { 
    title: 'advanced ar functionality',
    header: 'Next-Level ar: Smarter, faster, More accessible',
    content: "Symspace is setting the standard for AR shopping with true-to-size 3D products, environment scanning, and AI-powered recommendations. Our accessibility-first approach makes online shopping more inclusive, intuitive, and futuristic",
    bullet: '85% of people with disabilities use the internet, yet most accessibility tools lack Augmented Reality'
  },
  { 
    title: 'rewards program incentives',
    header: 'earn rewards for Shopping in ar',
    content: "Symspace turns shopping into a rewarding experience with an engaging rewards system. Users earn points for trying AR products, making purchases, and sharing experiences, which can be leveraged for discounts towards their total orders. Creating a loyalty-driven ecosystem that benefits both brands and consumers",
    bullet: '68% of online shoppers say rewards programs influence their purchasing decisions'
  },
  { 
    title: 'accessibility awareness',
    header: 'ar-Commerce accessible for everyone',
    content: "Underserved communities deserve better shopping experiences. Symspace prioritizes accessibility by ensuring that seniors, persons with disabilities, veterans, and expectant mothers can shop with confidence—no barriers, no limitations",
    bullet: 'The global disability community controls $490 billion in disposable income, yet only a minority of websites and marketplaces prioritize accessibility'
  },
  { 
    title: 'community support + engagement',
    header: 'Community-driven ar Marketplace',
    content: "Symspace isn't just a platform—it's a movement for inclusive digital shopping. We partner with organizations advocating for disabilities, aging populations, and maternal health, ensuring our technology serves those who need it most",
    bullet: 'Information Technology & Innovation Foundation highlighted that AR/VR technologies can serve as assistive tools, making physical environments more accessible for individuals with disabilities'
  },
];