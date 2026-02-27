import MarketplacePageView from "@/pages-section/marketplace";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Symspace is an E-commerce website.",
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function Marketplace() {
  return <MarketplacePageView />;
}