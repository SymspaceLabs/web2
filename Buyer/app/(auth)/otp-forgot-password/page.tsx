import { Suspense } from "react";
import OtpForgotPasswordPage from ".";

export default function OtpForgotPassword() {
  return (
    <Suspense fallback={null}>
      <OtpForgotPasswordPage />
    </Suspense>
  );
}