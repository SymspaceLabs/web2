import { VendorEarningHistoryPageView } from "../../../../pages-sections/vendor-dashboard/v-earning-history/page-view"; // API FUNCTIONS

export const metadata = {
  title: "Earning History",
  description: `Symspace is an Ecommerce Website`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};
export default async function EarningHistory() {
  return <VendorEarningHistoryPageView earnings={[]} />;
}