"use client";

// =======================================================
// AR App Simulation Page View - Tailwind Version
// =======================================================

import Section1 from "./section-1";
import Section2 from "./section-2";
import Section3 from "./section-3";
import Section4 from "./section-4";
import Section5 from "./section-5";

// =======================================================
// BlobBox Component
// =======================================================

interface BlobBoxProps {
  top?: string | number | null;
  right?: string | number | null;
  bottom?: string | number | null;
  left?: string | number | null;
  color?: string;
}

const BlobBox = ({
  top = null,
  right = null,
  bottom = null,
  left = null,
  color = "#0366FE",
}: BlobBoxProps) => {
  const positionStyles: React.CSSProperties = {};
  
  if (top !== null) {
    positionStyles.top = typeof top === 'number' ? `${top}px` : top;
  }
  if (right !== null) {
    positionStyles.right = typeof right === 'number' ? `${right}px` : right;
  }
  if (bottom !== null) {
    positionStyles.bottom = typeof bottom === 'number' ? `${bottom}px` : bottom;
  }
  if (left !== null) {
    positionStyles.left = typeof left === 'number' ? `${left}px` : left;
  }

  return (
    <div
      className="absolute w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[150px] opacity-50"
      style={{
        ...positionStyles,
        backgroundColor: color,
      }}
    />
  );
};

// =======================================================
// Main Page Component
// =======================================================

export default function ArAppSimulationPage() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* GRADIENT CIRCLES */}
      <BlobBox top="1%" right={-150} />
      <BlobBox top="35%" left={250} />
      <BlobBox top="45%" right={100} />
      <BlobBox top="55%" left={100} color="#933FFE" />
      <BlobBox top="65%" right={-150} />

      {/* CONTENT */}
      <div>
        <Section1 /> {/* HERO */}
        <Section2 /> {/* 3 MOBILE SCREENS */}
        <Section3 /> {/* BENEFITS */}
        <Section4 /> {/* BANNER */}
        <Section5 /> {/* TESTIMONIAL MARQUEE */}
      </div>
    </div>
  );
}