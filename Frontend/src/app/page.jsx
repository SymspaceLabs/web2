import FurnitureTwoPageView from "../pages-sections/landing-page/page-view";
import ShopLayout3 from "../components/layouts/shop-layout-3";

export const metadata = {
  title: "Symspacelabs",
  description: `Symspacelabs is an E-commerce website. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function IndexPage() {
  return (
      <ShopLayout3>
        <FurnitureTwoPageView />
      </ShopLayout3>
  )
}