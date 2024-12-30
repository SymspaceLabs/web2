"use client";

import Content from "./content"; // API FUNCTIONS
import { useState, useEffect } from "react";

export default async function Section5() {
  const [products, setProducts] = useState(data);

  return <Content products={products} />;
}

export const data = [
  {
    id: "8b9f5a78-0dbb-4dd3-a718-aa7342b76901",
    slug: "t-shirt",
    brand:'WAVE WORLD',
    title: "Spaceman T-shirt",
    shop: {
      id: "584323a3-059a-4990-8498-aa4fac9f22a7",
      slug: "constant-shoppers",
      user: {
        id: "08959f95-8448-42a1-b71b-9903504aad9b",
        email: "Elmo_Shields20@yahoo.com",
        phone: "(779) 888-4964",
        avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/549.jpg",
        password: "n1yvwoxzoG7t_Lc",
        dateOfBirth: "1967-12-07T08:26:11.321Z",
        verified: true,
        name: {
          firstName: "Margot",
          lastName: "Batz"
        }
      },
      email: "Larry.Roberts13@yahoo.com",
      name: "Constant Shoppers",
      phone: "(613) 343-9004",
      address: "845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark",
      verified: false,
      coverPicture: "/assets/images/banners/banner-4.png",
      profilePicture: "/assets/images/faces/propic(3).png",
      socialLinks: {
        facebook: null,
        youtube: null,
        twitter: null,
        instagram: null
      }
    },
    price: 250,
    size: null,
    discount: 15,
    thumbnail: "/assets/images/furniture-products/t-shirt-3.png",
    images: ["/assets/images/furniture-products/t-shirt-3.png", "/assets/images/furniture-products/furniture-1.png"],
    categories: [],
    status: null,
    reviews: [],
    rating: 4,
    for: {
      demo: "furniture-2",
      type: "new-arrival"
    }
  }, {
    id: "8b9f5a78-0dbb-4dd3-a718-aa7342b76901",
    slug: "hand-bag",
    brand:'Xandevera',
    shop: {
      id: "584323a3-059a-4990-8498-aa4fac9f22a7",
      slug: "constant-shoppers",
      user: {
        id: "08959f95-8448-42a1-b71b-9903504aad9b",
        email: "Elmo_Shields20@yahoo.com",
        phone: "(779) 888-4964",
        avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/549.jpg",
        password: "n1yvwoxzoG7t_Lc",
        dateOfBirth: "1967-12-07T08:26:11.321Z",
        verified: true,
        name: {
          firstName: "Margot",
          lastName: "Batz"
        }
      },
      email: "Larry.Roberts13@yahoo.com",
      name: "Constant Shoppers",
      phone: "(613) 343-9004",
      address: "845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark",
      verified: false,
      coverPicture: "/assets/images/banners/banner-4.png",
      profilePicture: "/assets/images/faces/propic(3).png",
      socialLinks: {
        facebook: null,
        youtube: null,
        twitter: null,
        instagram: null
      }
    },
    title: "Hand Bag",
    price: 250,
    size: null,
    discount: 15,
    thumbnail: "/assets/images/furniture-products/xandevera-bag.png",
    images: ["/assets/images/furniture-products/xandevera-bag.png", "/assets/images/furniture-products/xandevera-bag.png"],
    categories: [],
    status: null,
    reviews: [],
    rating: 4,
    for: {
      demo: "furniture-2",
      type: "new-arrival"
    }
  }, {
  id: "8b9f5a78-0dbb-4dd3-a718-aa7342b76901",
  slug: "wood-tool",
  shop: {
    id: "584323a3-059a-4990-8498-aa4fac9f22a7",
    slug: "constant-shoppers",
    user: {
      id: "08959f95-8448-42a1-b71b-9903504aad9b",
      email: "Elmo_Shields20@yahoo.com",
      phone: "(779) 888-4964",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/549.jpg",
      password: "n1yvwoxzoG7t_Lc",
      dateOfBirth: "1967-12-07T08:26:11.321Z",
      verified: true,
      name: {
        firstName: "Margot",
        lastName: "Batz"
      }
    },
    email: "Larry.Roberts13@yahoo.com",
    name: "Constant Shoppers",
    phone: "(613) 343-9004",
    address: "845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark",
    verified: false,
    coverPicture: "/assets/images/banners/banner-4.png",
    profilePicture: "/assets/images/faces/propic(3).png",
    socialLinks: {
      facebook: null,
      youtube: null,
      twitter: null,
      instagram: null
    }
  },
  title: "Wood Tool",
  price: 250,
  size: null,
  discount: 15,
  brand:'Company A',
  thumbnail: "/assets/images/furniture-products/furniture-1.png",
  images: ["/assets/images/furniture-products/furniture-1.png", "/assets/images/furniture-products/furniture-1.png"],
  categories: [],
  status: null,
  reviews: [],
  rating: 4,
  for: {
    demo: "furniture-2",
    type: "new-arrival"
  }
  }, {
  id: "8b9f5a78-0dbb-4dd3-a718-aa7342b76902",
  slug: "brown-single",
  brand:'Company A',
  shop: {
    id: "584323a3-059a-4990-8498-aa4fac9f22a7",
    slug: "constant-shoppers",
    user: {
      id: "08959f95-8448-42a1-b71b-9903504aad9b",
      email: "Elmo_Shields20@yahoo.com",
      phone: "(779) 888-4964",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/549.jpg",
      password: "n1yvwoxzoG7t_Lc",
      dateOfBirth: "1967-12-07T08:26:11.321Z",
      verified: true,
      name: {
        firstName: "Margot",
        lastName: "Batz"
      }
    },
    email: "Larry.Roberts13@yahoo.com",
    name: "Constant Shoppers",
    phone: "(613) 343-9004",
    address: "845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark",
    verified: false,
    coverPicture: "/assets/images/banners/banner-4.png",
    profilePicture: "/assets/images/faces/propic(3).png",
    socialLinks: {
      facebook: null,
      youtube: null,
      twitter: null,
      instagram: null
    }
  },
  title: "Brown Single",
  price: 150,
  size: null,
  discount: 0,
  thumbnail: "/assets/images/furniture-products/furniture-2.png",
  images: ["/assets/images/furniture-products/furniture-2.png", "/assets/images/furniture-products/furniture-2.png"],
  categories: [],
  status: null,
  reviews: [],
  rating: 4,
  for: {
    demo: "furniture-2",
    type: "new-arrival"
  }
  },
];
