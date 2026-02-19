"use client";

import Link from 'next/link';
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

export default function Section4() {
  return (
    <div className="container mx-auto py-2 sm:py-5 z-[1]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
        viewport={{ once: true }}
        className="h-full"
      >
        {/* Card & Image Side-by-Side */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-center w-full gap-4 py-2 sm:py-5 px-2">
          {/* Left Side Image */}
          <div className="flex flex-col items-center">
            <Image
              src='/images/ar-real-estate/customize-5.png'
              alt="AR Experience"
              width={500}
              height={500}
              loading="lazy"
            />
          </div>

          {/* Right Side Card */}
          <div 
            className="flex flex-col items-center rounded-[50px] backdrop-blur-[10.0285px] p-5 sm:p-10 w-full sm:w-1/2 gap-[25px]"
            style={{
              ...customStyles.glassCardGradient,
              ...customStyles.textBubbleBoxShadow,
              filter: 'drop-shadow(0px 5px 50px rgba(0, 0, 0, 0.25))',
            }}
          >
            <h1 className="font-elemental text-white text-xs sm:text-2xl">
              Make every Space Your Own with SYMSPACE
            </h1>
            <p className="text-white text-xs sm:text-lg">
              Customize finishes, layouts, and styles with real-time visualization tools. Adjust style, materials, textures, lighting, and switch between 2D and immersive 3D views to share virtual experiences with others.
            </p>
            <div className="flex flex-row items-center justify-center">
              <Link href='/'>
                <Button 
                  className="font-elemental lowercase rounded-[30px] text-[11px] text-white px-4 py-2 border border-white/20 backdrop-blur-[10px] hover:border-white transition-all"
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
                  Join the Waitlist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}