import { CartPageView } from "pages-sections/cart/page-view";
export const metadata = {
  title: "Cart  E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function Cart() {
  return <CartPageView />;
}