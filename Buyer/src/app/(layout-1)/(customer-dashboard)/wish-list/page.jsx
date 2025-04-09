import { WishListPageView } from "pages-sections/customer-dashboard/wish-list"; // API FUNCTIONS

// import { getWishListProducts } from "utils/__api__/wish-list";
export const metadata = {
  title: "Wish List  E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

const products = [
  {
  id: "d6a6333d-9ab1-45a1-9004-0cde081df41b",
  slug: "silver-high-neck-sweater",
  shop: {
    id: "01c8fedf-4d40-43d2-b62e-c4134d870036",
    slug: "scarlett-beauty",
    user: {
      id: "4af8dc65-c32f-4ae5-b95c-83e6ff2de216",
      email: "Jamey58@yahoo.com",
      phone: "(232) 669-5103 x109",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/358.jpg",
      password: "glSxS6fU4TsjMde",
      dateOfBirth: "1962-09-18T09:47:00.288Z",
      verified: true,
      name: {
        firstName: "Grover",
        lastName: "Haley"
      }
    },
    email: "Fatima12@hotmail.com",
    name: "Scarlett Beauty",
    phone: "(613) 343-9004",
    address: "845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark",
    verified: false,
    coverPicture: "/assets/images/banners/cycle.png",
    profilePicture: "/assets/images/faces/propic.png",
    socialLinks: {
      facebook: null,
      youtube: null,
      twitter: null,
      instagram: null
    }
  },
  title: "Silver High Neck Sweater",
  brand: null,
  price: 210,
  size: null,
  colors: [],
  discount: 0,
  thumbnail: "/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png",
  images: ["/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png", "/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"],
  categories: ["Men's Fashion"],
  status: null,
  reviews: [],
  rating: 5,
  for: {
    demo: "fashion-2",
    type: "best-selling-product"
  }
},];

export default async function WishList({
  searchParams
}) {
  // const {
  //   products,
  //   totalProducts
  // } = await getWishListProducts(searchParams.page);
  return <WishListPageView products={products} totalProducts={5} />;
}



