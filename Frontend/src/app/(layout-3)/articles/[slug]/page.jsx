"use client"

import GadgetTwoPageView from "../../../../pages-sections/articles/page-view";
// export const metadata = {
//   title: "Article",
//   description: `Symspace is an E-commerce website.`,
//   authors: [{
//     name: "UI-LIB",
//     url: "https://ui-lib.com"
//   }],
//   keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
// };

import { useParams } from 'next/navigation'

export default function GadgetShopTwo() {
  const params = useParams();
  console.log(params.slug);
  return <GadgetTwoPageView slug={params.slug} />;
}