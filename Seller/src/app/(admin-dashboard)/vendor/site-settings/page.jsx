import { SiteSettingsPageView } from "../../../../pages-sections/vendor-dashboard/site-settings/page-view";
export const metadata = {
  title: "Site Settings",
  description: `Symspace is an Ecommerce Website`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};
export default function SiteSettings() {
  return <SiteSettingsPageView />;
}