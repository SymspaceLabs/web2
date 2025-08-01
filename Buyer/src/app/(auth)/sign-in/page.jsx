import { LoginPageView } from "@/pages-sections/sessions/page-view";

export const metadata = {
  title: "Sign In",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function Login() {
  return <LoginPageView />;
}