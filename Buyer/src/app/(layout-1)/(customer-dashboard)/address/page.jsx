// =================================================
// Address Page 
// =================================================

import { AddressPageView } from "@/pages-sections/customer-dashboard/address/page-view";

// =================================================

export const metadata = {
  title: "Address",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};
export default async function Address() {
  return <AddressPageView />;
}