
"use client"

import Section1 from "./section-1";
import Section2 from "./section-2";

export default function PressReleasePageView() {
  return (
    <div className="flex flex-row items-center justify-center relative overflow-hidden bg-[#1F1F1F]">
      {/* CONTENT */}
      <div className="z-[1] w-full">
        <Section1 />
        <Section2 />
      </div>
    </div>
  );
}