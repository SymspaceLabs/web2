import { PaymentPageView } from "pages-sections/payment/page-view";
export const metadata = {
  title: "Payment  E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function Payment() {
  return <PaymentPageView />;
}