import { OrdersPageView } from "../../../../pages-sections/customer-dashboard/orders/page-view"; // API FUNCTIONS

import api from "../../../../utils/__api__/orders";
export const metadata = {
  title: "Orders - Bazaar Next.js E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function Orders() {
  const orders = await api.getOrders();
  return <OrdersPageView orders={orders} />;
}