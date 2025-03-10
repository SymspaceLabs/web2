import { PaymentDetailsPageView } from "../../../../../pages-sections/customer-dashboard/payment-methods/page-view";
export const metadata = {
  title: "Payment Details  E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function PaymentMethodDetails() {
  return <PaymentDetailsPageView />;
}