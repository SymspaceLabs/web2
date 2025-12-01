import { ShopSettingsPageView } from "../../../../pages-sections/vendor-dashboard/shop-settings/page-view";
export const metadata = {
  title: "Shop Settings",
  description: `Symspace is an Ecommerce Website`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};
export default function ShopSettings() {
  return <ShopSettingsPageView />;
}