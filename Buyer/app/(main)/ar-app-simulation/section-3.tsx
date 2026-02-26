"use client";

// ===========================================================
// Section 3 - Tailwind Version
// ===========================================================

import Image from "next/image";
import { useState, useEffect } from "react";

interface Benefit {
  title: string;
  header: string;
  content: string;
  image: string;
}

const benefits: Benefit[] = [
  {
    title: "real-time true to size augmentation",
    header: "3d products with visible details",
    content:
      "Bring products to life with near-precise, true-to-size 3D models that capture every detail. This advanced feature ensures users can view items in their exact dimensions and brands can gauge products before mass producing. From furniture perfectly fitting into a space to clothing that aligns with measurements. We eliminate ambiguity and improve confidence in purchases, making every decision more informed and confident.",
    image: "/images/ar-app-simulation/benefit-1.png",
  },
  {
    title: "realistic 3d product visualization",
    header: "Immersive experience",
    content:
      "Explore products as if they were in your room with high-resolution 3D models. Every texture, color, dimension, and intricate feature is rendered with stunning accuracy, allowing users to rotate, zoom, and inspect items from every angle. This immersive visualization makes online shopping and staging feel as real as browsing in-store.",
    image: "/images/ar-app-simulation/benefit-2.png",
  },
  {
    title: "advanced ar functionality",
    header: "Interactive digital trial room",
    content:
      "Take product interaction to the next level with advanced AR capabilities. From spatial mapping that places products seamlessly in real-world environments to dynamic lighting that adapts to your space, users can rotate, resize, and interact with items in ways that feel tangible and intuitive. This is more than AR; it's a hands-on experience.",
    image: "/images/ar-app-simulation/benefit-3.png",
  },
  {
    title: "virtual try-on technology",
    header: "Try before You buy, anytime, anywhere",
    content:
      "Take product interaction to the next level with advanced AR capabilities. From spatial mapping that places products seamlessly in real-world environments to dynamic lighting that adapts to your space, users can rotate, resize, and interact with items in ways that feel tangible and intuitive. This is more than just technology; it's a realistic shopping experience.",
    image: "/images/ar-app-simulation/benefit-4.png",
  },
  {
    title: "personalized ar shopping experience",
    header: "Your Shopping Journey, Tailored to You",
    content:
      "Experience a new level of personalization with AI-powered AR. From custom size recommendations based on body scans and inputs to curated product suggestions tailored to your preferences.  Every aspect of the journey is designed to feel unique. We cross reference size charts to the augmented products in order to provide near-precise sizing recommendations. ",
    image: "/images/ar-app-simulation/benefit-5.png",
  },
];

export default function Section3() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeBenefit, setActiveBenefit] = useState(benefits[0]);
  const [fade, setFade] = useState(true);

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle hash navigation
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && document.querySelector(hash)) {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleBenefitChange = (benefit: Benefit) => {
    setFade(false);
    setTimeout(() => {
      setActiveBenefit(benefit);
      setFade(true);
    }, 300);
  };

  return (
    <div id="features" className="py-2 sm:py-20">
      <div className="container mx-auto px-4 relative flex flex-col items-center">
        <h1 className="text-[20px] sm:text-[40px] text-center mb-4 font-elemental">
          an app that redefines <br /> ar shopping
        </h1>

        <div
          className="rounded-[50px] relative max-w-[1200px] w-full backdrop-blur-[10.0285px] bg-white/35"
          style={{
            filter: "drop-shadow(0px 5px 50px rgba(0, 0, 0, 0.25))",
            boxShadow: `
              inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
              inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
              inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)
            `,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left: List of benefits */}
            <div className="md:col-span-5">
              <ul className="p-[25px]">
                {benefits.map((benefit, index) => (
                  <li
                    key={index}
                    onMouseEnter={() => handleBenefitChange(benefit)}
                    className="py-4 cursor-pointer rounded-[30px] mb-2 shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] backdrop-blur-[10px] hover:bg-gradient-to-br hover:from-white/80 hover:via-[#ebebeb]/60 hover:to-[#c4c4c4]/20 transition-all"
                    style={{
                      background:
                        "linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)",
                    }}
                  >
                    <h2 className="font-elemental text-base sm:text-[14px] px-4">
                      {benefit.title}
                    </h2>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Content */}
            <div className="md:col-span-7">
              <div className="pr-2 sm:pr-10 pl-2 sm:pl-0 pt-0 sm:pt-5 pb-10 sm:pb-0 flex flex-col justify-center gap-[5px] min-h-[200px]">
                <h2 className="font-elemental text-xl sm:text-2xl">
                  {activeBenefit.header}
                </h2>
                <p className="text-[12px] sm:text-[18px]">
                  {activeBenefit.content}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Circle */}
        <div
          className={`absolute bottom-[-100px] sm:bottom-[-150px] right-1/2 md:right-[10%] w-[150px] sm:w-[280px] h-[150px] sm:h-[280px] rounded-full overflow-hidden backdrop-blur-[5px] z-10 transition-opacity duration-100 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          style={{
            boxShadow:
              "12.8px 57.6px 83.2px rgba(3, 102, 254, 0.1), inset 0px 1.6px 3.2px rgba(0, 0, 0, 0.04), inset -1.6px -6.4px 6.4px rgba(0, 0, 0, 0.06), inset 1.6px 6.4px 6.4px #FFFFFF",
          }}
        >
          <div className="w-full h-full p-5 box-border flex items-center justify-center">
            <Image
              src={activeBenefit.image}
              alt={activeBenefit.title}
              width={isMobile ? 100 : 200}
              height={isMobile ? 100 : 200}
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}