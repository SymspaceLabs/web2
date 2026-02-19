"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';


// ===================================================
// Section 1 Component
// ===================================================
export default function Section1(){
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1200);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

if (isMobile) {
    return (
      <div className="p-4 pt-[100px] sm:pt-[100px] md:pt-[175px] z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] as const }}
        >
          <Image
            src="/images/ar-real-estate/hero.png"
            width={500}
            height={500}
            alt="Hero"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full relative min-h-[80vh] max-w-[1200px] py-10 px-10 pt-[100px] sm:pt-[100px] md:pt-[200px]">
      <div className="relative h-[350px] sm:h-[500px] md:h-[800px] w-full">
        {/* Background Image */}
        <Image
          src="/images/ar-real-estate/hero-1.png"
          height={800}
          width={800}
          alt="Hero Background"
          className="absolute top-0 left-0 z-[1] w-full h-full p-2 sm:p-3 md:p-4"
        />

        {/* Animated Images */}
        {[
          { src: "hero-2.png", delay: 0, top: "30%", right: "41%", zIndex: 3 },
          { src: "hero-3.png", delay: 0.5, top: "65%", left: "25%", zIndex: 2 },
          { src: "hero-4.png", delay: 1, top: "65%", right: "33%", zIndex: 3 },
        ].map(({ src, delay, top, left, right, zIndex }) => (
          <motion.img
            key={src}
            src={`/images/ar-real-estate/${src}`}
            alt={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay }}
            className="absolute w-auto h-auto max-w-[40%] sm:max-w-full md:max-w-full max-h-[40%] sm:max-h-full md:max-h-full p-2"
            style={{ top, left, right, zIndex }}
          />
        ))}

        {/* Sofa Animation */}
        <motion.img
          src="/images/ar-real-estate/hero-5.png"
          alt="sofa"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: -50 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 1.5 }}
          className="absolute top-[50%] right-[-10%] w-auto h-auto max-w-[40%] sm:max-w-full md:max-w-full max-h-[40%] sm:max-h-full md:max-h-full z-[2] p-2"
        />

        {/* Left-sliding Images */}
        {[
          { src: "hero-6.png", delay: 1.5, top: "50%", left: "-10%", zIndex: 3 },
          { src: "hero-7.png", delay: 2, top: "60%", left: "15%", zIndex: 2 },
          { src: "hero-8.png", delay: 2.5, top: "55%", left: "30%", zIndex: 1 },
        ].map(({ src, delay, top, left, zIndex }) => (
          <motion.img
            key={src}
            src={`/images/ar-real-estate/${src}`}
            alt={src}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay }}
            className="absolute w-auto h-auto max-w-[40%] sm:max-w-full md:max-w-full max-h-[40%] sm:max-h-full md:max-h-full p-2"
            style={{ top, left, zIndex }}
          />
        ))}
      </div>
    </div>
  );
};