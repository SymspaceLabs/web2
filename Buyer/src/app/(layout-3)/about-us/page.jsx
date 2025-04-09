import AboutUsPageView from "@/pages-sections/about-us/page-view";

// ==============================================================
// About Us Page
// ==============================================================

export const metadata = {
  title: "About Us",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function AboutUs() {
  return <AboutUsPageView />
}