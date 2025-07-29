// ==============================================================
// Company Page
// ==============================================================

import { CompanyPageView } from "@/pages-sections/company/page-view";

// ==============================================================

export const metadata = {
  title: 'Company Page',
  description: 'Symspace is an E-commerce website.',
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function CompanyPage({params}) {
  return <CompanyPageView slug={params.slug} />;
}