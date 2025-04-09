import { OrderConfirmationPageView } from "pages-sections/order-confirmation";
export const metadata = {
  title: "Order Confirmation  E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function OrderConfirmation() {
  return <OrderConfirmationPageView />;
}