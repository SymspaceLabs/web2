// ===============================================
// Order
// ===============================================

import { OrdersPageView } from "@/pages-sections/customer-dashboard/orders/page-view";

export const metadata = {
  title: "Orders  E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{ name: "SYMSPACE LABS", url: "https://symspacelabs.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default function Orders() {
  return <OrdersPageView />;
}
