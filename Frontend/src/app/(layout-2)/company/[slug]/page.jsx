import FurnitureOnePageView from "../../../../pages-sections/company/page-view";
export const metadata = {
  title: "Company Page",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function FurnitureShop({params}) {
  const { slug } = await params;
  return <FurnitureOnePageView slug={slug} />;
}