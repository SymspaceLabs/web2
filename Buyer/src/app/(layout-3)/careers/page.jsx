// ==============================================================
// Careers Page
// ==============================================================

import CareersPageView from "@/pages-sections/careers/page-view";

export const metadata = {
  title: "Careers",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function Careers() {
  return <CareersPageView />;
}