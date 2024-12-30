import { TicketsPageView } from "pages-sections/customer-dashboard/support-tickets/page-view"; // API FUNCTIONS

import api from "utils/__api__/ticket";
export const metadata = {
  title: "Support Tickets - Bazaar Next.js E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function SupportTickets() {
  const tickets = await api.getTicketList();
  return <TicketsPageView tickets={tickets} />;
}