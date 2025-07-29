import AboutUsPageView from "@/pages-sections/about-us/page-view";

// ==============================================================
// About Us Page
// ==============================================================

export const metadata = {
  title: "About Us",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function AboutUs() {
  return <AboutUsPageView />
}