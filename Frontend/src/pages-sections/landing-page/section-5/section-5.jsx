/**
 * Section5 Component
 *
 * This component represents the "Augmented Reality Marketplaces" section, showcasing trending products in a carousel format.
 *
 * Features:
 * - Displays a title and description introducing the concept of AR marketplaces.
 * - Provides a carousel of products, allowing users to explore various categories.
 * - Includes navigation buttons for scrolling through the carousel.
 * - Uses responsive design for seamless experience across devices.
 *
 * Usage:
 * - This component can be integrated into an e-commerce landing page to highlight trending products.
 * - Products data can be dynamically fetched and passed as props to the `Content` component.
 */

import Content from "./content";

export default async function Section5() {
  return <Content products={items} />;
}

// Static product list as placeholder data.
const items = [
  { id: 1, title: "Shirts", thumbnail: "/assets/images/icons/shirt.svg", slug: "shirts" },
  { id: 2, title: "Hoodies", thumbnail: "/assets/images/icons/hoodie.svg", slug: "hoodie" },
  { id: 3, title: "Pants", thumbnail: "/assets/images/icons/pants.svg", slug: "pants" },
  { id: 4, title: "Furniture", thumbnail: "/assets/images/icons/furniture.svg", slug: "furniture" },
  { id: 5, title: "Shoes", thumbnail: "/assets/images/icons/shoe.svg", slug: "shoe" },
  { id: 6, title: "Dresses", thumbnail: "/assets/images/icons/dress-2.svg", slug: "dress" },
  { id: 7, title: "Earrings", thumbnail: "/assets/images/icons/earring.svg", slug: "earring" },
  { id: 8, title: "Accessories", thumbnail: "/assets/images/icons/accessory.svg", slug: "accessory" },
  { id: 9, title: "Bags", thumbnail: "/assets/images/icons/bag-2.svg", slug: "bag" },
  { id: 10, title: "Hats", thumbnail: "/assets/images/icons/hat.svg", slug: "hat" },
  { id: 11, title: "Watches", thumbnail: "/assets/images/icons/watch-2.svg", slug: "watch" },
  { id: 12, title: "Eyewear", thumbnail: "/assets/images/icons/eyewear.svg", slug: "eyewear" },
  { id: 13, title: "TVs", thumbnail: "/assets/images/icons/tv.svg", slug: "tv" },
];
