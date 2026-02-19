"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react"; // Import ReactNode
import { Button } from "@/components/ui/button";

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
  }
};

export default function Section2() {
  return (
    <div className="relative z-[2] py-2 sm:py-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
        viewport={{ once: true }}
        className="h-full"
      >
        <div className="flex flex-col items-center py-2 sm:py-5 px-5 gap-2 sm:gap-4">
          {/* Header */}
          <h1 className="text-white text-[20px] sm:text-[40px] max-w-[1000px] text-center font-elemental" style={{ wordSpacing: '10px' }}>
            bring empty spaces to life
          </h1>

          {/* Subheader */}
          <p className="text-white text-xs sm:text-xl text-center max-w-[1000px] leading-[1.5] sm:leading-[2]">
            Imagine, Customize, and Furnish with Augmented Reality.
          </p>

          {/* Button */}
          <Link href={`${process.env.NEXT_PUBLIC_SELLER_URL}/register`} passHref>
            <Button className="font-elemental lowercase h-full flex-1 sm:flex-none sm:min-w-[250px] text-white rounded-[50px] border-2 border-white py-2 sm:py-2 px-5 text-[10px] sm:text-base transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
              start staging now
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

// Example usage of other styles as separate components:

// Text Bubble Container
interface TextBubbleContainerProps {
  children: ReactNode;
}

export function TextBubbleContainer({ children }: TextBubbleContainerProps) {
  return (
    <div className="py-3 flex flex-wrap w-full justify-between sm:justify-center gap-2 sm:gap-3">
      {children}
    </div>
  );
}

// Text Bubble
interface TextBubbleProps {
  children: ReactNode;
}

export function TextBubble({ children }: TextBubbleProps) {
  return (
    <div 
      className="text-center flex items-center justify-center max-w-[180px] sm:max-w-[250px] md:max-w-[500px] min-w-[100px] min-h-[40px] py-1 sm:py-2 px-2 sm:px-3 mb-0 sm:mb-2 bg-white/35 rounded-[80px] transition-colors hover:bg-[rgba(3,102,254,0.6)]"
      style={customStyles.textBubbleBoxShadow}
    >
      {children}
    </div>
  );
}

// Glass Card
interface GlassCardProps {
  children: ReactNode;
}

export function GlassCard({ children }: GlassCardProps) {
  return (
    <div 
      className="rounded-[50px] backdrop-blur-[10.0285px] p-5 sm:p-10 w-full sm:w-1/2"
      style={{
        ...customStyles.glassCardGradient,
        ...customStyles.textBubbleBoxShadow,
        filter: 'drop-shadow(0px 5px 50px rgba(0, 0, 0, 0.25))',
      }}
    >
      {children}
    </div>
  );
}

// Transparent Button
interface ButtonTransparentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ButtonTransparent({ children, ...props }: ButtonTransparentProps) {
  return (
    <button 
      className="rounded-[30px] text-[11px] text-white px-2 border border-white/20 backdrop-blur-[10px] hover:border-white transition-all"
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
      {...props}
    >
      {children}
    </button>
  );
}