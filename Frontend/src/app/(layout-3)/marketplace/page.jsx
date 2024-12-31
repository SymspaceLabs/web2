import MarketplacePageView from "@/pages-sections/markeplace/page-view";
export const metadata = {
  title: "Marketplace",
  description: `Symspace is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function Marketplace() {
  return <MarketplacePageView />;
}