import { CartPageView } from "pages-sections/cart/page-view";
export const metadata = {
  title: "Cart - Bazaar Next.js E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function Cart() {
  return <CartPageView />;
}