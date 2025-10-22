import { RefundRequestPageView } from "../../../../pages-sections/vendor-dashboard/refund-request/page-view"; // API FUNCTIONS

export const metadata = {
  title: "Refund Request",
  description: `Symspace is an Ecommerce Website`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};
export default async function RefundRequest() {
  return <RefundRequestPageView requests={[]} />;
}