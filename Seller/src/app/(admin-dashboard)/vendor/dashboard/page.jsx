// ========================================================
// Seller Dashboard Page
// ========================================================

import { DashboardPageView } from "@/pages-sections/vendor-dashboard/dashboard/page-view";

// ========================================================

export const metadata = {
  title: "Seller Dashboard",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function VendorDashboard() {
  return <DashboardPageView />;
}