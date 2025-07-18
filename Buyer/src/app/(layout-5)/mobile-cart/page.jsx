// ================================================
// Mobile Categories
// ================================================
import MobileCartPage from "./page-view";

export const metadata = {
  title: "Mobile Cart",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function MobileCategories() {
  return (
    <MobileCartPage />
  );
}