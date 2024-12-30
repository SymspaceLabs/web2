import FurnitureOnePageView from "../../../../pages-sections/company/page-view";
export const metadata = {
  title: "Furniture Shop - Bazaar Next.js E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function FurnitureShop({params}) {
  const { slug } = await params;
  return <FurnitureOnePageView slug={slug} />;
}