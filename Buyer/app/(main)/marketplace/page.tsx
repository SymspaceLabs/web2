// ======================================================================
// Marketplace Page
// app/marketplace/page.tsx
// ======================================================================

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Symspace is an E-commerce website.",
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

import Section1 from "./section-1";
import Section2 from "./section-2";
import Section3 from "./section-3";
import Section4 from "./section-4";
import Section5 from "./section-5";
import Section6 from "./section-6";
import Section7 from "./section-7";
import Section8 from "./section-8";
import type { Metadata } from "next";

export default function MarketplacePageView() {
  return (
    <div className="bg-white">
        <Section1 /> {/* GRID CARD SECTION */}
        <Section2 /> {/* SLIDER */}
        <Section3 /> {/* SHOP WOMEN */}
        <Section4 /> {/* SHOP MEN */}
        <Section5 /> {/* BEST SELLER PRODUCTS */}
        <Section6 /> {/* BANNER */}
        <Section7 /> {/* CATALOGUE */}
        <Section8 /> {/* BENTO */}
    </div>
  );
}