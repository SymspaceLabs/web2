import { PaymentMethodsPageView } from "@/pages-sections/customer-dashboard/payment-methods/page-view";

export const metadata = {
  title: "Payment Methods",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "next.js", "react"]
};

export default async function PaymentMethods() {
  return <PaymentMethodsPageView />;
}