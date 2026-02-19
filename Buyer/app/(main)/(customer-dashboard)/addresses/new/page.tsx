import { Metadata } from "next";
import { notFound } from "next/navigation";
import AddressDetailsPageView from "@/pages-section/address-details";

export const metadata: Metadata = {
  title: "Add Address",
  description: "Symspace is an E-commerce website.",
  authors: [
    {
      name: "SYMSPACE LABS",
      url: "https://www.symspacelabs.com",
    },
  ],
  keywords: ["e-commerce"],
};

export default async function Address() {
  try {
    return <AddressDetailsPageView />;
  } catch (error) {
    notFound();
  }
}