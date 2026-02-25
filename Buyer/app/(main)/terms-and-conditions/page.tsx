import TermsPageView from "@/pages-section/terms-and-conditions";

export const metadata = {
  title: "Terms & Conditions",
  description: "Symspace is an E-commerce website.",
  authors: [{ name: "SYMSPACE LABS", url: "https://www.symspacelabs.com" }],
  keywords: ["e-commerce"],
};

export default function Terms() {
  return <TermsPageView />;
}