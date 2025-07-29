import { VerifyEmailPage } from "../../../pages-sections/sessions/page-view"; 
export const metadata = {
  title: "Verify Email",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};
export default function ResetPassword() {
  return <VerifyEmailPage />;
}