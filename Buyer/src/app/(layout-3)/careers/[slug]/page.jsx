import CareerDetailsPageView from "@/pages-sections/career-details/page-view";

export const metadata = {
  title: "Careers",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function Careers({params}) {
  return <CareerDetailsPageView jobId={params.slug} />
}