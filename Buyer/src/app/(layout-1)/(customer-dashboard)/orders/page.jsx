// ===============================================
// Orders Page
// ===============================================

import { OrdersPageView } from "@/pages-sections/customer-dashboard/orders/page-view";

export const metadata = {
  title: "Orders Page",
  description: `Symspace is an E-commerce website.`,
  authors: [{ name: "SYMSPACE LABS", url: "https://www.symspacelabs.com" }],
  keywords: ["e-commerce", "e-commerce"],
};

export default function Orders() {
  return <OrdersPageView />;
}
