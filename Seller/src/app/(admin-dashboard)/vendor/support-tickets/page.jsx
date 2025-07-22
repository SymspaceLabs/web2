import { SupportTicketsPageView } from "../../../../pages-sections/vendor-dashboard/support-tickets/page-view"; // API FUNCTIONS

export const metadata = {
  title: "Support Tickets - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce"]
};
export default async function SupportTickets() {

  return <SupportTicketsPageView tickets={[]} />;
}