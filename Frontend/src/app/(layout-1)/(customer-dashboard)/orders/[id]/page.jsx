import { notFound } from "next/navigation";
import { OrderDetailsPageView } from "../../../../../pages-sections/customer-dashboard/orders/page-view"; // API FUNCTIONS

import api from "../../../../../utils/__api__/orders";
export const metadata = {
  title: "Order Details - Bazaar Next.js E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function OrderDetails({
  params
}) {
  try {
    const order = await api.getOrder(String(params.id));
    return <OrderDetailsPageView order={order} />;
  } catch (error) {
    notFound();
  }
}