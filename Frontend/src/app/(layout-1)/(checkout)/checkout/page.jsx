import { CheckoutPageView } from "pages-sections/checkout/page-view";
export const metadata = {
  title: "Checkout - Bazaar Next.js E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function Checkout() {
  return <CheckoutPageView />;
}