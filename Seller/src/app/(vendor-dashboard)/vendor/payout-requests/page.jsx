import { VendorPayoutRequestsPageView } from "../../../../pages-sections/vendor-dashboard/v-payout-request/page-view"; // API FUNCTIONS

export const metadata = {
  title: "Payout Requests",
  description: `Symspace is an Ecommerce Website`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};
export default async function PayoutRequests() {
  return <VendorPayoutRequestsPageView payoutRequests={[]} />;
}