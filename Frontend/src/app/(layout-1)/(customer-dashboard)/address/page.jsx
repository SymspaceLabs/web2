import { AddressPageView } from "../../../../pages-sections/customer-dashboard/address/page-view"; // API FUNCTIONS

import api from "../../../../utils/__api__/address";
export const metadata = {
  title: "Address - Bazaar Next.js E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function Address() {
  const addressList = await api.getAddressList();
  return <AddressPageView addressList={addressList} />;
}