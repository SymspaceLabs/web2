// ===============================================
// Orders Page
// ===============================================

import { Metadata } from "next";
import OrdersPageView from "@/pages-section/orders";

export const metadata: Metadata = {
  title: "Orders Page",
  description: "Symspace is an E-commerce website.",
  authors: [{ name: "SYMSPACE LABS", url: "https://www.symspacelabs.com" }],
  keywords: ["e-commerce", "e-commerce"],
};

export default function Orders() {
  return <OrdersPageView />;
}