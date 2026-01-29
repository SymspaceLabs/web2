// =============================================================
// AR Real Estate Page
// =============================================================

import ArRealEstatePageView from "@/pages-sections/ar-real-estate/page-view";

// =============================================================

export const metadata = {
  title: "AR Real Estate",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function ArRealEstate() {
  return <ArRealEstatePageView />;
}