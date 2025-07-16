import { notFound } from "next/navigation";
import { AddressDetailsPageView } from "pages-sections/customer-dashboard/address/page-view"; // API FUNCTIONS

export const metadata = {
  title: "Edit Address",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default async function Address({ params }) {
  
  const { id } = await params;

  try {
    return <AddressDetailsPageView addressId={id} />;
  } catch (error) {
    notFound();
  }
}

const address = {
  id: "d27d0e28-c35e-4085-af1e-f9f1b1bd9c34",
  user: {
    id: "16c6edfe-3c30-47c0-ac12-118638865b0b",
    email: "Lonie52@gmail.com",
    phone: "980-937-8940",
    avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1089.jpg",
    password: "s55mt2Iqv5VGdFm",
    dateOfBirth: "1999-08-26T15:45:39.852Z",
    verified: true,
    name: {
      firstName: "Eleanora",
      lastName: "Donnelly"
    }
  },
  city: "New Zoietown",
  phone: "(213) 840-9416",
  street: "497 Erdman Passage",
  country: "Paraguay",
  title: "Office"
}