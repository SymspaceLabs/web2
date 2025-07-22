import TermsPageView from "@/pages-sections/terms/page-view";
export const metadata = {
  title: "Terms  & Conditions",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function Terms() {
  return <TermsPageView />;
}