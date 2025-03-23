import TermsPageView from "@/pages-sections/terms/page-view";
export const metadata = {
  title: "Terms  & Conditions",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function Terms() {
  return <TermsPageView />;
}