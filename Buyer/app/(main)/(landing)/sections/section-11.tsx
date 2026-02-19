"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { JSX } from "react";

export default function Section11(): JSX.Element {
  return (
    <section className="relative z-[2]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
          viewport={{ once: true }}
          className="h-full"
        >
          <div className="flex flex-col gap-6 py-20 text-center items-center">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl w-full container text-center sm:text-left font-elemental lowercase">
              Our Focus
            </h1>
            
            <p className="container text-white text-xs sm:text-lg leading-relaxed sm:leading-loose text-justify font-helvetica">
              We empower individuals with Augmented Reality, while equipping brands with resources to showcase their products in unimaginable ways. Our goal is to revolutionize the end-to-end e-commerce process by creating 3D assets of retail products and enabling consumers to augment these products with enhanced AR functionalities. We offer a sustainable solution that delivers immersive, hyper-realistic, and seamless 3D models coupled with unparalleled AR experiences. Through cutting-edge technologies such as artificial intelligence and augmented reality, we are positioned to transform mere imagination into tangible simulations of reality.
            </p>
            
            <div className="w-full container flex justify-center sm:justify-start">
              <Link href="/about-us">
                <Button
                  variant="outline"
                  className="gap-1 text-white rounded-[50px] py-4 sm:py-6 px-6 sm:px-8 text-xs sm:text-base bg-transparent min-w-[200px] sm:min-w-[250px] border-2 border-white transition-all duration-300 ease-in-out hover:text-[#353535] hover:bg-white hover:border-white font-elemental lowercase"
                >
                  About Us
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}