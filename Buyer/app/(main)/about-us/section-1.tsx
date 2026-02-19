"use client"

// ===========================================================================
// Section 1 - About Us
// ===========================================================================

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Section1() {
  const items = [
    {
      content: 'improving conversion for businesses',
      url: '/sell-on-symspace'
    },
    {
      content: 'enhancing real estate experiences',
      url: '/ar-real-estate'
    },
    {
      content: 'prioritizing accessibility for all',
      url: '/global-impact'
    }
  ];

  return (
    <div className="w-full flex flex-col items-center py-9 pt-[100px] md:pt-[200px] px-4">
      <div className="flex flex-col w-full max-w-[1400px]">
        <h1 className="font-elemental text-[25px] sm:text-[45px] text-white pb-3 [word-spacing:10px]">
          simulating reality with technology that brings spaces to life
        </h1>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-0 sm:-mt-6">
          <div className="flex flex-col gap-2">
            {items.map((item, index) => (
              <GlassCard key={index} content={item.content} url={item.url} />
            ))}
          </div>
          
          <div className="w-[250px] sm:w-[500px]">
            <Image
              alt="furniture shop"
              width={500}
              height={500}
              src="/images/about-us/hero.png"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface GlassCardProps {
  content: string;
  url: string;
}

const GlassCard = ({ content, url }: GlassCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(url);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div
      className="font-elemental lowercase flex justify-between items-center gap-3 p-2 cursor-pointer rounded-[80px] 
                 bg-white/35 backdrop-blur-[10px]
                 shadow-[inset_0px_3px_6px_rgba(255,255,255,0.4),inset_0px_-3px_9px_rgba(255,255,255,0.5),inset_0px_-1.5px_20px_rgba(255,255,255,0.24),inset_0px_20px_20px_rgba(255,255,255,0.24),inset_0px_1px_20.5px_rgba(255,255,255,0.8)]
                 transition-all duration-200 ease-in-out p-4
                 hover:bg-[rgba(122,169,243,0.7)] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.25)]"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={handleKeyPress}
    >
      <h1 className="text-white text-[10px] sm:text-[14px]">
        {content}
      </h1>
      <ArrowRight className="w-4 h-4 text-white" />
    </div>
  );
}