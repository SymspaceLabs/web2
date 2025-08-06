// ==========================================================
// Checkout Page
// ==========================================================

import { MultiStepCheckout } from "@/pages-sections/checkout/page-view";

export const metadata = {
  title: "Checkout",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function Cart() {
  return <MultiStepCheckout />;
}