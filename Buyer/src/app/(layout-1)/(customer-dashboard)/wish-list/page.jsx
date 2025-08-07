import { WishListPageView } from "pages-sections/customer-dashboard/wish-list"; // API FUNCTIONS

export const metadata = {
  title: "Wish List",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default async function WishList() {
  return (
    <WishListPageView />
  )
}



