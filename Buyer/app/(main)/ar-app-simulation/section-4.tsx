"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Section4() {
  return (
    <div className="py-5 bg-white">
      <div className="container mx-auto flex flex-col items-center w-full py-12 gap-10 md:gap-20">
        {/* IMAGE WITH TEXT BUBBLES 1 */}
        <div className="relative flex justify-center items-center mt-6 max-w-[600px] w-full">
          {/* IMAGE */}
          <Image
            alt="model"
            width={500}
            height={500}
            src="/images/ar-app-simulation/feature-1.png"
            className="w-[60%] h-auto"
          />

          {/* TEXT BUBBLES */}
          <TextBubble
            className="top-[10%] sm:top-[30px] -right-[90px] sm:-right-[100px] md:-right-[415px] -translate-x-1/2"
          >
            scan environment before augmenting
          </TextBubble>
          <TextBubble
            className="top-[30%] sm:top-[40%] left-[110px] sm:left-[50px] md:-left-[50px] -translate-x-1/2"
          >
            input preferences & measurements
          </TextBubble>
          <TextBubble
            className="top-[60%] sm:top-[70%] -right-[70px] sm:-right-[100px] md:-right-[315px] -translate-x-1/2 -translate-y-1/2"
          >
            explore products from home
          </TextBubble>
          <TextBubble
            className="bottom-[10%] sm:bottom-[5%] left-[100px] sm:left-[50px] md:-left-[10px] -translate-x-1/2"
          >
            shop conveniently with ar
          </TextBubble>
        </div>

        {/* TITLE & SUBTITLE */}
        <div>
          <h1 className="text-[28px] sm:text-[40px] text-center font-elemental mb-4">
            personalized experience
          </h1>
          <p className="text-base pb-6 text-[#434167] text-center font-['Helvetica']">
            We curate customized shopping experiences from product sizes, user
            preferences, and interests.
            <br />
            It's time for a seamless solution, especially for those unable to
            travel in-store or prefer not to.
          </p>
        </div>

        {/* TITLE & SUBTITLE 2 */}
        <div>
          <h1 className="text-[28px] sm:text-[40px] text-center font-elemental mb-4 [word-spacing:10px]">
            easily manage products
          </h1>
          <p className="text-base pb-6 text-[#434167] text-center font-['Helvetica']">
            Migrate your Entire Catalogue into a Centralized 3D Repository to market and gauge product
            <br /> 
            demand prior to manufacturing
          </p>
        </div>

        <Link href="/#3d-repository" passHref>
          <Button className="font-elemental box-border py-4 px-10 bg-gradient-to-b from-[#3084FF] to-[#1D4F99] rounded-[20px] text-white text-base hover:from-[#1D4F99] hover:to-[#3084FF] transition-all">
            learn more
          </Button>
        </Link>

        {/* IMAGE WITH TEXT BUBBLES 2 */}
        <div className="relative flex justify-center items-center mt-6 max-w-[1200px] w-full">
          {/* IMAGE */}
          <div className="w-full sm:w-[80%] md:w-[50%]">
            <Image
              alt="model"
              width={500}
              height={500}
              src="/images/ar-app-simulation/feature-2.png"
              className="w-full h-auto"
            />
          </div>

          {/* TEXT BUBBLES */}
          <TextBubble
            className="top-[10%] sm:top-[30px] left-[110px] sm:left-[150px] md:left-[140px] -translate-x-1/2"
          >
            gauge product demand through ar
          </TextBubble>
          <TextBubble
            className="top-1/2 -right-[60px] sm:-right-[100px] md:-right-[30px] -translate-x-1/2 -translate-y-1/2"
          >
            generate 3d products
          </TextBubble>
          <TextBubble
            className="bottom-[15%] left-[100px] sm:left-[130px] md:left-[150px] -translate-x-1/2"
          >
            manage inventory and traction
          </TextBubble>
        </div>
      </div>
    </div>
  );
}

interface TextBubbleProps {
  className?: string;
  children: React.ReactNode;
}

const TextBubble: React.FC<TextBubbleProps> = ({ className, children }) => {
  return (
    <h1
      className={`font-elemental absolute bg-white shadow-[0px_5px_50px_rgba(0,0,0,0.4)] p-2 sm:p-4 md:p-3 rounded-[50px] text-center text-[8px] sm:text-xs ${className}`}
    >
      {children}
    </h1>
  );
};