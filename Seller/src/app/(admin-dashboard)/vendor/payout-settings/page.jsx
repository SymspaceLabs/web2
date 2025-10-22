import { PayoutSettingsPageView } from "../../../../pages-sections/vendor-dashboard/payout-settings/page-view";
export const metadata = {
  title: "Payout Settings",
  description: `Symspace is an Ecommerce Website`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};
export default function PayoutSettings() {
  return <PayoutSettingsPageView />;
}