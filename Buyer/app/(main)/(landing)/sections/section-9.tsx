"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { JSX } from 'react';

export default function Section9(): JSX.Element {
  return (
    <section className="relative bg-[#EDEDED] py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-10 text-center items-center">
            {/* Section Title */}
            <h1 className="text-[#191F28] text-4xl sm:text-5xl md:text-6xl font-elemental lowercase">
              3d simulation
            </h1>

            {/* Description of the platform */}
            <p className="text-[#909090] text-xs sm:text-lg text-justify max-w-[1350px] font-semibold sm:font-medium leading-relaxed sm:leading-loose line-clamp-7 sm:line-clamp-none font-helvetica">
              Symspace's Generative AI 3D modeling software serves as a tool for brands to gauge traction before all the spending. Create realistic 3D models of your products, then share animated product videos with your community. Within Real Estate, partners are using our platform and iOS application to virtually showcase furniture. We have streamlined our platform to simplify the process for any sized brand looking to launch a new product, improve sales on an existing product, or stage products in unfurnished homes. Our partner portal provides analytics on sales, AR usage, and product interactions. Brands can engage their communities through AR without incurring any manufacturing or inventory costs. Augmented Reality has proven to effectively reduce returns by giving consumers more confidence in their purchases. Customize any 3D product through text, images, object scans, and videos. Save time and resources, while focusing on what matters most- product demand through unique consumer interactions.
            </p>

            {/* Call-to-action button */}
            {/* ADDED: flex justify-center to center the Link/Button */}
            <div className="w-full flex justify-center">
              <Link href="/sell-on-symspace#benefits">
                <Button
                  className="flex items-center justify-center gap-3 
                    bg-gradient-to-br from-[#18C8FF] to-[#933FFE] 
                    text-white rounded-[50px] px-6 py-7 min-w-[250px]
                    transition-all duration-300 
                    hover:shadow-md border-2 border-white hover:cursor-pointer"
                >
                  <span className="text-[10px] sm:text-[16px] font-elemental">
                    Get Started
                  </span>

                  {/* Icon inside the button */}
                  <div className="w-[25px] sm:w-[35px] flex flex-col items-center justify-center">
                    <Image
                      alt="sparkler icon"
                      width={100}
                      height={100}
                      src="/images/sparkler-white.webp"
                      className="transition-all duration-300 ease-in-out group-hover:content-[url('/assets/images/sparkler-white.webp')]"
                    />
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}