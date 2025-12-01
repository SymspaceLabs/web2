import { SupportTicketsPageView } from "../../../../pages-sections/vendor-dashboard/support-tickets/page-view"; // API FUNCTIONS

export const metadata = {
  title: "Support Tickets",
  description: `Symspace is an Ecommerce Website`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};
export default async function SupportTickets() {

  return <SupportTicketsPageView tickets={[]} />;
}