import { ResetPasswordPageView } from "../../../pages-sections/sessions/page-view";
export const metadata = {
  title: "Reset Password",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};
export default function ResetPassword() {
  return <ResetPasswordPageView />;
}