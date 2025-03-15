import ContactUsPageView from "@/pages-sections/contact-us/page-view";

export const metadata = {
  title: "Contact Us",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function GlobalImpact() {
  return <ContactUsPageView />;
}