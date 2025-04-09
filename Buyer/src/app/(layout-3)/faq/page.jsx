import FaqPageView from "@/pages-sections/faq/page-view";

export const metadata = {
  title: "FAQs",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function Faq() {
  return <FaqPageView />;
}