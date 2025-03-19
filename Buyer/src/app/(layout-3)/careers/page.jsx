// ==============================================================
// Careers Page
// ==============================================================

import CareersPageView from "@/pages-sections/careers/page-view";

export const metadata = {
  title: "Careers",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function Careers() {
  return <CareersPageView />;
}