import SupportTicketsPageView from "@/pages-section/support-tickets";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Measurements",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function Address() {
  return <SupportTicketsPageView tickets={[]} />;
}