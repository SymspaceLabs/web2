import { DashboardPageView } from "../pages-sections/vendor-dashboard/dashboard/page-view";
import VendorDashboardLayout from "../components/layouts/vendor-dashboard";

export const metadata = {
  title: "Seller Dashboard",
  description: `Symspace is an Ecommerce Website`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};
export default function IndexPage() {
  return (
    <VendorDashboardLayout>
      <DashboardPageView />
    </VendorDashboardLayout>
  ) 
}