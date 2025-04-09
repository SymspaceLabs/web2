// ==============================================================
// Company Page
// ==============================================================

import { CompanyPageView } from "@/pages-sections/company/page-view";

export const metadata = {
  title: "Company Page",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function CompanyPage({params}) {
  return <CompanyPageView slug={params.slug} />;
}