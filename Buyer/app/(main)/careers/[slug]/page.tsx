// ==============================================================
// Career Details Page
// ==============================================================

import CareerDetailsPageView from "@/pages-section/career-details";

export const metadata = {
  title: "Careers",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default async function Careers({params}:any) {
  const { slug } = await params;
  
  return (
    <CareerDetailsPageView jobId={slug} />
  )
}