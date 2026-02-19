import { Metadata } from "next";
import { notFound } from "next/navigation";
import AddressDetailsPageView from "@/pages-section/address-details";

export const metadata: Metadata = {
  title: "Edit Address",
  description: "Symspace is an E-commerce website.",
  authors: [
    {
      name: "SYMSPACE LABS",
      url: "https://www.symspacelabs.com",
    },
  ],
  keywords: ["e-commerce"],
};

interface AddressPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Address({ params }: AddressPageProps) {
  const { id } = await params;

  try {
    return <AddressDetailsPageView addressId={id} />;
  } catch (error) {
    notFound();
  }
}