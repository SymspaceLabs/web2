import LandingPageView from "pages-sections/landing-page/page-view";

export const metadata = {
  title: "Symspacelabs",
  description: 'Symspace is an E-commerce website.',
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function LandingPage() {
  return <LandingPageView />;
}