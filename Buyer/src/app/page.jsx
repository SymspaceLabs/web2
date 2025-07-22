// ==============================================================
// Index Page
// ==============================================================
import ShopLayout1 from "@/components/layouts/shop-layout-1";
import LandingPageView from "@/pages-sections/landing-page/page-view";
// ==============================================================

export const metadata = {
  title: "SYMSPACE",
  description: `Symspacelabs is an E-commerce website. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

// ==============================================================

export default function IndexPage() {
  return (
      <ShopLayout1>
        <LandingPageView />
      </ShopLayout1>
  )
}