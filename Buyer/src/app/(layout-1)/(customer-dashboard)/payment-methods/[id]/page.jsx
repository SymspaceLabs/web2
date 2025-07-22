// ==================================================================
// Payment Details PAGE VIEW COMPONENT
// ==================================================================

import { PaymentDetailsPageView } from "@/pages-sections/customer-dashboard/payment-methods/page-view";

// ==================================================================

export const metadata = {
  title: "Payment Details",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default async function PaymentMethodDetails() {
  return <PaymentDetailsPageView />;
}