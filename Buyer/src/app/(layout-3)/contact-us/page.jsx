import ContactUsPageView from "@/pages-sections/contact-us/page-view";

export const metadata = {
  title: "Contact Us",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function GlobalImpact() {
  return <ContactUsPageView />;
}