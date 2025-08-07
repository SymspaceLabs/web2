// ===================================================
// Order Confirmation
// ===================================================

import { OrderConfirmationPageView } from "pages-sections/order-confirmation";

export const metadata = {
  title: "Order Confirmation",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default async function OrderConfirmation({params}) {
  const { id } = await params;

  return (
    <OrderConfirmationPageView orderId={id} />
  );
}