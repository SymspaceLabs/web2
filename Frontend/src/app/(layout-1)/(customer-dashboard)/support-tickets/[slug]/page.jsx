import { notFound } from "next/navigation";
import { TicketDetailsPageView } from "pages-sections/customer-dashboard/support-tickets/page-view"; // API FUNCTIONS

import api from "utils/__api__/ticket";
export const metadata = {
  title: "Order Details - Bazaar Next.js E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function SupportTicketDetails({
  params
}) {
  try {
    const ticket = await api.getTicket(String(params.slug));
    return <TicketDetailsPageView ticket={ticket} />;
  } catch (error) {
    notFound();
  }
}