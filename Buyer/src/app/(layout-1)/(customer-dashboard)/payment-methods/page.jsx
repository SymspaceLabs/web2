import { PaymentMethodsPageView } from "@/pages-sections/customer-dashboard/payment-methods/page-view";

export const metadata = {
  title: "Payment Methods",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default async function PaymentMethods() {
  return <PaymentMethodsPageView />;
}