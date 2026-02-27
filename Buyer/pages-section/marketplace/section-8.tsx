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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left column */}
        <div className="space-y-6">
          {/* First panel - Advanced AR Advertisements */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="flex flex-col gap-6 p-8 sm:p-12 rounded-[30px] sm:rounded-[50px] bg-[#353535] overflow-hidden shadow-[inset_-5px_-5px_20px_1px_rgba(255,255,255,0.1),inset_5px_5px_20px_1px_rgba(255,255,255,0.1)]">
              <h2 className="font-helvetica text-[25px] sm:text-[35px] leading-tight text-white font-bold">
                Advanced AR Advertisements
              </h2>
              <p className="font-helvetica text-white text-sm sm:text-lg">
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
            <div className="font-helvetica flex flex-col gap-6 p-8 sm:p-12 rounded-[30px] sm:rounded-[50px] bg-[#BDBDBD] overflow-hidden shadow-[inset_-5px_-5px_20px_1px_rgba(255,255,255,0.25),inset_5px_5px_20px_1px_rgba(255,255,255,0.25)]">
              <h2 className="text-[25px] sm:text-[35px] leading-tight text-white font-bold">
                Application Integration
              </h2>
              <p className="font-helvetica text-white text-sm sm:text-lg">
                An immersive way to shop conveniently and confidently with AR
                functionality enhancing every step of the user experience.
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
        </div>

        {/* Right column — max-h crops the robot image */}
        <div className="my-4 sm:my-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            {/* overflow-hidden + max-h-[600px] mirrors MUI bentoBoxCard */}
            <div className="relative flex flex-col gap-4 p-6 sm:p-8 rounded-[30px] sm:rounded-[50px] bg-[#E0F0FD] shadow-[inset_-5px_-5px_20px_1px_rgba(255,255,255,0.4),inset_5px_5px_20px_1px_rgba(255,255,255,0.4)] h-full max-h-[600px] overflow-hidden">
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

              {/* Image — overflow-hidden on parent clips the bottom */}
              <div className="flex justify-start w-[250px] pl-4">
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