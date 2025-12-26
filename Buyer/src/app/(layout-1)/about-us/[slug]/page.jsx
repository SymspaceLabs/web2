// ==============================================================
// Career Details Page
// ==============================================================

import CareerDetailsPageView from "@/pages-sections/career-details/page-view";

export const metadata = {
  title: "Careers",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default async function Careers({params}) {
  const { slug } = await params;
  
  return (
    <CareerDetailsPageView jobId={slug} />
  )
}