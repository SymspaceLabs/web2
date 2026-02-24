import FaqPageView from "@/pages-section/faq";

export const metadata = {
  title: "FAQs",
  description: `Symspace is an E-commerce website.`,
  authors: [{ name: "SYMSPACE LABS", url: "https://www.symspacelabs.com" }],
  keywords: ["e-commerce"]
};

export default function Faq() {
  return <FaqPageView />;
}