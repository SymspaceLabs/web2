import { OrderConfirmationPageView } from "pages-sections/order-confirmation";
export const metadata = {
  title: "Order Confirmation - Bazaar Next.js E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function OrderConfirmation() {
  return <OrderConfirmationPageView />;
}