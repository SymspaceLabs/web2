// ==================================================================
// Payment Details PAGE VIEW COMPONENT
// ==================================================================

import PaymentDetailsPageView from "@/pages-section/payment-details";
import { Metadata } from "next";

// ==================================================================

export const metadata: Metadata = {
  title: "Payment Details",
  description: "Symspace is an E-commerce website.",
  authors: [
    {
      name: "SYMSPACE LABS",
      url: "https://www.symspacelabs.com",
    },
  ],
  keywords: ["e-commerce"],
};

export default async function PaymentMethodDetails() {
  return <PaymentDetailsPageView />;
}