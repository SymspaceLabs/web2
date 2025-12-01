// ==============================================================
// Orders List Page
// ==============================================================

import { OrdersPageView } from "@/pages-sections/vendor-dashboard/orders/page-view";

// ==============================================================

export const metadata = {
  title: "Products",
  description: `Symspace is an Ecommerce Website`,
  authors: [{
    name: "SYMSPACE",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

// ==============================================================

export default async function Products() {
  return <OrdersPageView />
}