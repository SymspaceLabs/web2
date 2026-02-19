"use client";

// ===================================================
// Custom Section - Tailwind Version
// ===================================================

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

// ===================================================

interface SymSectionProps {
  title: string;
  subTitle: string;
  btnText: string;
  btnUrl: string;
  children: ReactNode;
  invert?: boolean;
}

interface BlogCardProps {
  title: string;
  subTitle: string;
  btnText: string;
  btnUrl: string;
}

export default function SymSection({
  title,
  subTitle,
  btnText,
  btnUrl,
  children,
  invert = false,
}: SymSectionProps) {
  return (
    <div className="flex-grow py-8 z-[2]">
      {!invert ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="flex justify-end">
            <BlogCard
              title={title}
              subTitle={subTitle}
              btnText={btnText}
              btnUrl={btnUrl}
            />
          </div>
          <div className="z-[2]">
            <div className="text-center z-[2] relative">{children}</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="z-[2]">
            <div className="text-center z-[2] relative">{children}</div>
          </div>
          <div className="flex justify-start">
            <BlogCard
              title={title}
              subTitle={subTitle}
              btnText={btnText}
              btnUrl={btnUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const BlogCard = ({ title, subTitle, btnText, btnUrl }: BlogCardProps) => {
  return (
    <div
      className="rounded-[35px] sm:rounded-[50px] py-3 sm:py-8 px-3 sm:px-5 max-w-[500px] bg-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.5px] border border-white relative overflow-hidden"
      style={{
        WebkitBackdropFilter: "blur(6.5px)",
      }}
    >
      <div className="relative z-[1] flex flex-col gap-[10px] sm:gap-[25px]">
        <h1 className="font-elemental text-[16px] sm:text-[21px] text-[#2F2F2F]">
          {title}
        </h1>
        <p className="font-helvetica text-[12px] sm:text-base text-[#434167]">{subTitle}</p>
        <div className="flex justify-end">
          <Link href={btnUrl}>
            <Button
              className="font-elemental rounded-[30px] text-[11px] text-[#2F2F2F] px-4 shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] backdrop-blur-[10px] bg-gradient-to-br from-white/50 via-[#e0e0e0]/29 to-[#c4c4c4]/10 hover:opacity-90"
              style={{
                background:
                  "linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)",
              }}
            >
              {btnText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};