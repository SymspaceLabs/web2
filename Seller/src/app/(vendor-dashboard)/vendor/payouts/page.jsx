import { VendorPayoutsPageView } from "../../../../pages-sections/vendor-dashboard/v-payouts/page-view"; // API FUNCTIONS

export const metadata = {
  title: "Vendor Payouts",
  description: `Symspace is an Ecommerce Website`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};
export default async function VendorPayouts() {
  return <VendorPayoutsPageView payouts={[]} />;
}