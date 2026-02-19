import type { Metadata } from "next";
import PaymentMethodsPageView from "@/pages-section/payment-method";

export const metadata: Metadata = {
  title: "Payment Methods",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function Address() {
  return <PaymentMethodsPageView />;
}