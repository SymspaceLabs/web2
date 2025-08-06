import LandingPageView from "pages-sections/landing-page/page-view";

export const metadata = {
  title: "Symspacelabs",
  description: 'Symspace is an E-commerce website.',
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function LandingPage() {
  return <LandingPageView />;
}