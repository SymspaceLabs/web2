import { RegisterPageView } from "../../../pages-sections/sessions/page-view";

export const metadata = {
  title: "Register",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function Register() {
  return <RegisterPageView />;
}