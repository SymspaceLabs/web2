"use client";

// ======================================================================
// Section 1 | Marketplace
// ======================================================================

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// ======================================================================

export default function Section1() {
  return (
    <div className="container mx-auto py-5 sm:py-10 pt-[100px] md:pt-[200px] px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="flex flex-col h-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
            viewport={{ once: true }}
            className="h-full"
          >
            <div className="h-full bg-[#353535] text-white rounded-[40px] overflow-hidden flex flex-col">
              <div className="p-8 pb-0">
                <p className="font-helvetica text-base mb-2">
                  Enhance your everyday life
                </p>
                <h2 className="font-helvetica font-bold text-2xl md:text-[26px] leading-tight mb-4">
                  AR Shopping for
                  <br />
                  Homebound Convenience
                </h2>
                <Link href="/products">
                  <Button 
                    variant="ghost"
                    className="font-elemental lowercase rounded-[32px] px-6 py-2 bg-white/10 text-white text-xs hover:bg-gradient-to-r hover:from-white hover:to-[#AEAEAE] hover:text-black hover:shadow-md transition-all"
                  >
                    Shop By Category
                  </Button>
                </Link>
              </div>
              <Image
                alt="AR Shopping"
                src="/images/marketplace/card-1-bg.png"
                width={500}
                height={500}
                className="w-full h-auto block mt-auto"
              />
            </div>
          </motion.div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col h-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <div className="h-full bg-[#E0F0FD] rounded-[40px] overflow-hidden flex flex-col">
              {/* Background Image */}
              <Image
                alt="Augmented Reality"
                src="/images/marketplace/card-2-bg.png"
                width={500}
                height={500}
                className="w-full h-auto -mt-[70px]"
              />
              <div className="px-8 py-4">
                {/* Card Content */}
                <p className="font-helvetica text-base text-[#353535] mb-2">
                  Shop like never before
                </p>
                <h2 className="font-helvetica font-bold text-2xl md:text-[26px] leading-tight text-[#353535] mb-4">
                  Augment Realistic 3D
                  <br />
                  Products
                </h2>
                <Link href="/ar-app-simulation">
                  <Button 
                    variant="outline"
                    className="font-elemental lowercase rounded-[32px] px-6 py-2 bg-white text-black border-2 border-white text-xs hover:bg-gradient-to-r hover:from-[#666666] hover:to-black hover:text-white hover:shadow-md transition-all"
                  >
                    Download The App
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col h-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <div className="h-full bg-[#353535] text-white rounded-[40px] overflow-hidden flex flex-col">
              <div className="p-8 pb-0 xl:pb-12 lg:pb-10 md:pb-6">
                {/* Card Content */}
                <p className="font-helvetica text-base mb-2">
                  Pioneering AR Commerce
                </p>
                <h2 className="font-helvetica font-bold text-2xl md:text-[26px] leading-tight mb-4">
                  Positive Impacts of Mixed
                  <br /> Reality Commerce
                </h2>
                <Link href="/global-impact">
                  <Button 
                    variant="ghost"
                    className="font-elemental lowercase rounded-[32px] px-6 py-2 bg-white/10 text-white text-xs hover:bg-gradient-to-r hover:from-white hover:to-[#AEAEAE] hover:text-black hover:shadow-md transition-all"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
              {/* Background Image */}
              <Image
                src="/images/marketplace/card-3-bg.png"
                width={500}
                height={500}
                alt="AR Commerce"
                className="w-full h-auto block mt-auto"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}