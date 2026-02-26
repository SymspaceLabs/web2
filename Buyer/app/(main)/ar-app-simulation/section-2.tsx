"use client";

// ===========================================================
// Section 2 | AR App Simulation - Tailwind Version
// ===========================================================

import Image from "next/image";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { useEffect, useState } from "react";

// ===========================================================

export default function Section2() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if screen is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 750);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <ParallaxProvider>
      <div>
        <div className="container mx-auto px-4 flex flex-col items-center w-full py-[50px]">
          <h1 className="font-elemental text-[#4E4E4E] text-[28px] sm:text-[40px] text-center">
            revolutionizing shopping
          </h1>
          <p className="text-base py-[25px] text-[#434167] text-center max-w-4xl">
            Transform how you shop and sell with immersive 3D experiences and
            cutting-edge AR technology, bringing
            <br className="hidden sm:block" /> products to life like never before. Seamless, interactive,
            and built for the next generation of shopping
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center sm:mt-[150px] gap-1 max-w-[300px] sm:max-w-[900px] min-w-[300px] sm:min-w-[700px]">
            {isMobile ? (
              <>
                {/* Render images without parallax on mobile */}
                <Image
                  alt="mobile screen 1"
                  width={250}
                  height={162.5}
                  src="/images/ar-app-simulation/mobile-screen-1.png"
                  className="w-3/4 h-auto"
                />
                <Image
                  alt="mobile screen 2"
                  width={250}
                  height={162.5}
                  src="/images/ar-app-simulation/mobile-screen-2.png"
                  className="w-3/4 h-auto"
                />
                <Image
                  alt="mobile screen 3"
                  width={250}
                  height={162.5}
                  src="/images/ar-app-simulation/mobile-screen-3.png"
                  className="w-3/4 h-auto"
                />
              </>
            ) : (
              <>
                {/* Render images with parallax on larger screens */}
                <div className="w-[100px] sm:w-[225px] overflow-visible">
                  <Parallax translateY={[-10, 10]}>
                    <Image
                      alt="mobile screen 1"
                      width={250}
                      height={162.5}
                      src="/images/ar-app-simulation/mobile-screen-1.png"
                      className="w-full h-auto"
                    />
                  </Parallax>
                </div>
                <div className="w-[100px] sm:w-[225px] overflow-visible">
                  <Parallax translateY={[-15, 30]}>
                    <Image
                      alt="mobile screen 2"
                      width={250}
                      height={162.5}
                      src="/images/ar-app-simulation/mobile-screen-2.png"
                      className="w-full h-auto"
                    />
                  </Parallax>
                </div>
                <div className="w-[100px] sm:w-[225px] overflow-visible">
                  <Parallax translateY={[-10, 10]}>
                    <Image
                      alt="mobile screen 3"
                      width={250}
                      height={162.5}
                      src="/images/ar-app-simulation/mobile-screen-3.png"
                      className="w-full h-auto"
                    />
                  </Parallax>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
}