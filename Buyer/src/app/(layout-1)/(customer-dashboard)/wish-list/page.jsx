import { WishListPageView } from "pages-sections/customer-dashboard/wish-list"; // API FUNCTIONS

export const metadata = {
  title: "Wish List  E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function WishList() {
  return (
    <WishListPageView />
  )
}



