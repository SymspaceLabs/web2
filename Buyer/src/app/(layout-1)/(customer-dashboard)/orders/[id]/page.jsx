// =================================================
// Order Details Page
// =================================================

import { OrderDetailsPageView } from "@/pages-sections/customer-dashboard/orders/page-view"; // API FUNCTIONS

// =================================================

export const metadata = {
  title: "Order Details E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default async function OrderDetails({ params }) {
  // Explicitly extract the 'id' from params
  const { id } = params;

  return (
    <OrderDetailsPageView orderId={id} /> // Use the extracted 'id'
  );
}