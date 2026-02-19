"use client";

import React, { useState, useEffect } from 'react';

interface Benefit {
  title: string;
  header: string;
  content: string;
  video: string;
}

export default function Section4() {
  const [activeBenefit, setActiveBenefit] = useState<Benefit>(benefits[0]);

  const handleBenefitChange = (benefit: Benefit) => {
    setActiveBenefit(benefit);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && document.querySelector(hash)) {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div id="features" className="py-2 sm:py-5">
      <div className="container mx-auto px-4 relative flex flex-col items-center">
        <h1 className="text-xl sm:text-[40px] text-center mb-4 text-white font-elemental lowercase">
          Environmental Impact
        </h1>
        <p className="font-helvetica text-white text-xs sm:text-sm md:text-base max-w-[360px] sm:max-w-[1000px] text-center leading-5 sm:leading-[35px]">
          Symspace is revolutionizing e-commerce and real estate by integrating AR-powered solutions that significantly reduce waste and carbon footprints across industries. By leveraging our platform for Virtual Try-On, Digital Staging, AI-powered 3D Modeling, and 3D Product Advertisements—Symspace helps retailers, real estate professionals, and brands minimize unnecessary production, shipping, and inventory costs while maximizing efficiency.
        </p>

        <div className="py-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left: Benefits List */}
            <div className="md:col-span-5">
              <div className="flex flex-col items-center gap-[25px]">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    onMouseEnter={() => handleBenefitChange(benefit)} 
                    className="w-full p-4 cursor-pointer hover:bg-[rgba(3,102,254,0.6)] bg-white/35 shadow-[inset_0px_3px_6px_rgba(255,255,255,0.4),inset_0px_-3px_9px_rgba(255,255,255,0.5),inset_0px_-1.5px_20px_rgba(255,255,255,0.24),inset_0px_20px_20px_rgba(255,255,255,0.24),inset_0px_1px_20.5px_rgba(255,255,255,0.8)] rounded-[80px] transition-colors duration-200"
                  >
                    <h1 className="text-white text-center font-elemental">
                      {benefit.title}
                    </h1>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Video Content */}
            <div className="md:col-span-7">
              <div className="relative z-[2] rounded-[15px] bg-black flex items-center justify-center sm:w-[650px] sm:h-[365px] overflow-hidden">
                <video
                  width="100%"
                  height="100%"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={activeBenefit.video}
                  className="relative z-[2] object-contain bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const benefits: Benefit[] = [
  { 
    title: 'virtual try-on',
    header: '3d products with visible details',
    content: 'Bring products to life with near-precise, true-to-size 3D models that capture every detail. This advanced feature ensures users can view items in their exact dimensions and brands can gauge products before mass producing. From furniture perfectly fitting into a space to clothing that aligns with measurements. We eliminate ambiguity and improve confidence in purchases, making every decision more informed and confident.',
    video: '/videos/global-impact/visual-try-on.mp4'
  },
  { 
    title: 'digital staging',
    header: 'Immersive experience',
    content: 'Explore products as if they were in your room with high-resolution 3D models. Every texture, color, dimension, and intricate feature is rendered with stunning accuracy, allowing users to rotate, zoom, and inspect items from every angle. This immersive visualization makes online shopping and staging feel as real as browsing in-store.',
    video: '/videos/global-impact/digital-staging.mp4'
  },
  { 
    title: '3d product modeling',
    header: 'Interactive digital trial room',
    content: "Take product interaction to the next level with advanced AR capabilities. From spatial mapping that places products seamlessly in real-world environments to dynamic lighting that adapts to your space, users can rotate, resize, and interact with items in ways that feel tangible and intuitive. This is more than AR; it's a hands-on experience.",
    video: '/videos/global-impact/3d-product-modeling.mp4'
  },
  { 
    title: '3d product ads',
    header: 'Try before You buy, anytime, anywhere',
    content: "Take product interaction to the next level with advanced AR capabilities. From spatial mapping that places products seamlessly in real-world environments to dynamic lighting that adapts to your space, users can rotate, resize, and interact with items in ways that feel tangible and intuitive. This is more than just technology; it's a realistic shopping experience.",
    video: '/videos/global-impact/3d-product-ads.mp4'
  }
];