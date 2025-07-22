import MarketplacePageView from "@/pages-sections/marketplace/page-view";
export const metadata = {
  title: "Marketplace",
  description: "Symspace is an E-commerce website.",
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function Marketplace() {
  return <MarketplacePageView />;
}