import { OtpForgotPasswordPageView } from "@/pages-sections/sessions/page-view";

export const metadata = {
  title: "OTP",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function OtpForgotPassword() {
  return <OtpForgotPasswordPageView />;
}