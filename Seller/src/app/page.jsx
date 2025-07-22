import { DashboardPageView } from "../pages-sections/vendor-dashboard/dashboard/page-view";
import VendorDashboardLayout from "../components/layouts/vendor-dashboard";

export const metadata = {
  title: "Seller Dashboard",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://ui-lib.com"
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