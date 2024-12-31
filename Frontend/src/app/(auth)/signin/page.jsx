import { LoginPageView } from "../../../pages-sections/sessions/page-view";
export const metadata = {
  title: "Signin",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function Login() {
  return <LoginPageView />;
}