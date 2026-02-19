import { Suspense } from "react";
import Otp from ".";

export default function OtpPage() {
  return (
    <Suspense fallback={null}>
      <Otp />
    </Suspense>
  );
}