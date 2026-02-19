"use client";

// ========================================
// Contact Us Banner
// ========================================
//
// Used in
//  1. About Us
//
// ========================================

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ContactUsBannerProps {
  title: string;
  subtitle: string;
}

export default function ContactUsBanner({ title, subtitle }: ContactUsBannerProps) {
  return (
    <div className="w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
        viewport={{ once: true }}
        className="w-full"
      >
        <div className="container mx-auto py-10">
          <div className="relative flex min-h-[300px] overflow-hidden rounded-[50px] max-[375px]:min-h-[260px]">
            <Image
              src="/images/banners/banner-55.png"
              alt="offer"
              fill
              sizes="100%"
              className="object-cover"
            />
            
            <div className="absolute left-[10%] top-[40%] -translate-y-[40%] max-sm:inset-x-0 max-sm:top-1/2 max-sm:-translate-y-1/2 max-sm:px-8">
              <h1 className="font-elemental mb-2 text-xl leading-tight sm:mt-3 sm:text-4xl max-[375px]:mt-0 max-[375px]:text-2xl">
                {title}
              </h1>

              <p className="font-helvetica mb-6 text-sm leading-tight sm:text-lg">
                {subtitle}
              </p>

              <Link href="/contact-us" passHref>
                <Button
                  className="font-elemental rounded-full border-2 border-white bg-black px-4 py-2 text-white shadow-[0px_4px_4px_3px_rgba(0,0,0,0.25)] hover:bg-gradient-to-r hover:from-[#3084FF] hover:to-[#1D4F99] sm:px-6 sm:py-4"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}