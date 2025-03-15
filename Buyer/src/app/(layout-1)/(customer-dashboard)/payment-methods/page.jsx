import { PaymentMethodsPageView } from "../../../../pages-sections/customer-dashboard/payment-methods/page-view";
export const metadata = {
  title: "Payment Methods  E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function PaymentMethods() {
  return <PaymentMethodsPageView />;
}