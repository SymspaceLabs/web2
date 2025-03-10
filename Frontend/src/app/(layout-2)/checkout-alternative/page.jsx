import { CheckoutAlternativePageView } from "pages-sections/checkout/page-view";
export const metadata = {
  title: "Checkout Alternative  E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function CheckoutAlternative() {
  return <CheckoutAlternativePageView />;
}