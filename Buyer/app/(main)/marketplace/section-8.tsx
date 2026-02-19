// ===================================================================
// Section 8 | Bento Box | Marketplace
// ===================================================================

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Section8() {
  return (
    <div className="container mx-auto py-0 sm:py-10">
      {/* Grid container for the entire section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left-side grid for AR and application integration panels */}
        <div className="space-y-6">
          {/* First panel - Advanced AR Advertisements */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="flex flex-col gap-4 p-6 sm:p-8 rounded-[30px] sm:rounded-[50px] bg-[#353535] max-h-full sm:max-h-[290px] shadow-[inset_-5px_-5px_20px_1px_rgba(255,255,255,0.1),inset_5px_5px_20px_1px_rgba(255,255,255,0.1)]">
              {/* Title */}
              <h2 className="font-helvetica text-[25px] sm:text-[35px] leading-tight text-white font-bold">
                Advanced AR Advertisements
              </h2>

              {/* Description */}
              <p className="font-helvetica text-white text-sm sm:text-lg mb-2">
                Equip viewers with immersive AR visuals on top of products or
                physical posters.
              </p>

              <div className="flex justify-end">
                <Button
                  asChild
                  className="font-elemental lowercase bg-white/90 text-black hover:bg-white border border-white/50 shadow-lg backdrop-blur-sm rounded-full px-8 py-2"
                >
                  <Link href="/contact-us">Contact Us</Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Second panel - Application Integration */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="font-helvetica flex flex-col gap-4 p-6 sm:p-8 rounded-[30px] sm:rounded-[50px] bg-[#BDBDBD] max-h-full sm:max-h-[290px] shadow-[inset_-5px_-5px_20px_1px_rgba(255,255,255,0.25),inset_5px_5px_20px_1px_rgba(255,255,255,0.25)]">
              {/* Title */}
              <h2 className="text-[25px] sm:text-[35px] leading-tight text-white font-bold">
                Application Integration
              </h2>

              {/* Description */}
              <p className="font-helvetica text-white text-sm sm:text-lg mb-2">
                An immersive way to shop conveniently and confidently with AR
                functionality enhancing every step of the user experience.
              </p>

              {/* Button */}
              <div className="flex justify-end">
                <Button
                  asChild
                  className="font-elemental lowercase bg-white/90 text-black hover:bg-white border border-white/50 shadow-lg backdrop-blur-sm rounded-full px-8 py-2"
                >
                  <Link href="/contact-us">Contact Us</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right-side grid for AI-powered 3D products panel */}
        <div className="my-4 sm:my-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="flex flex-col gap-4 p-6 sm:p-8 rounded-[30px] sm:rounded-[50px] bg-[#E0F0FD] shadow-[inset_-5px_-5px_20px_1px_rgba(255,255,255,0.4),inset_5px_5px_20px_1px_rgba(255,255,255,0.4)] h-full">
              {/* Title */}
              <h2 className="font-helvetica text-[25px] sm:text-[35px] leading-tight text-black font-bold">
                Generate 3D Products through Artificial Intelligence
              </h2>

              {/* Description */}
              <p className="font-helvetica text-[#909090] text-sm sm:text-lg mb-2">
                Allow consumers to augment 3D products from the comfort of their
                home to revolutionize the way they engage with products.
              </p>

              {/* Button */}
              <div className="flex justify-end w-full">
                <Button
                  asChild
                  className="font-elemental lowercase bg-gradient-to-br from-[#18C8FF] via-[#5B7BFF] to-[#933FFE] text-white hover:opacity-90 rounded-full px-8 py-2 shadow-lg"
                >
                  <Link
                    href={`${process.env.NEXT_PUBLIC_SELLER_URL}/register`}
                    target="_blank"
                  >
                    Partner With Us
                  </Link>
                </Button>
              </div>

              {/* Image */}
              <div className="flex justify-center w-[250px] mx-auto">
                <Image
                  width={500}
                  height={500}
                  src="/images/marketplace/card-robot.png"
                  alt="Robot"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}