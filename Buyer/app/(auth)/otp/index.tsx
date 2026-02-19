"use client";
// =========================================
// OTP Page
// app/(auth)/otp/page.tsx
// =========================================

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { OtpForm } from "@/components/forms/otp";
import { useAuth } from "@/contexts/AuthContext";
import { SymSubmitButton } from "@/components/buttons/sym-submit";
import { Loader2 } from "lucide-react";

export default function Otp() {
  const { handleAuthResponse } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [cooldown, setCooldown] = useState(0); // Cooldown in seconds

  useEffect(() => {
    if (!email) {
      toast.error("Email not found. Please check your verification link.");
      router.push("/register");
    }
  }, [email, router]);

  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOtp(otp);
    }
  }, [otp]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleVerifyOtp = async (otpCode: string) => {
    if (otpCode.length !== 6) {
      toast.error("Invalid OTP. Please enter a 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: otpCode }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed.");
      } else {
        toast.success(data.message || "Verification successful!");
        handleAuthResponse(data.user, data.accessToken);

        if (data.user.role === "seller") {
          window.location.href = `${process.env.NEXT_PUBLIC_SELLER_URL}`;
        } else {
          router.push("/marketplace");
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (cooldown > 0) return; // Prevent spamming

    const body = { email };
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/resend-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to resend code");
      } else {
        toast.success(data.message || "Code sent successfully!");
        setCooldown(60); // Start cooldown (60 seconds)
      }
    } catch (error) {
      console.error("Error during resend request:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-4 py-4 items-center">
      <p className="text-center text-white text-sm sm:text-base">
        Enter the 6-digit OTP sent to your email
      </p>

      <OtpForm onVerifyOtp={setOtp} />

      <div className="flex flex-col items-center pt-4 gap-4">
        <p className="text-white text-sm">Didn't receive the Code?</p>
        
        <SymSubmitButton
          isValid={!(cooldown > 0) && !loading}
          onClick={handleResendCode}
          loading={loading}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : cooldown > 0 ? (
            `Resend in ${cooldown}s`
          ) : (
            "Resend Code"
          )}
        </SymSubmitButton>
      </div>
    </div>
  );
}