"use client";

import { useState, useEffect } from "react";
import { OtpForm } from "../../../components/custom-forms/auth";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import { Typography } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { FlexBox } from "../../../components/flex-box";

const OtpForgotPasswordPageView = () => {
  const { showSnackbar } = useSnackbar();

  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [cooldown, setCooldown] = useState(0); // Cooldown in seconds

  useEffect(() => {
    if (!email) {
      showSnackbar("Email not found. Please check your verification link.", "error");
      router.push("/register");
    }
  }, [email, showSnackbar, router]);

  useEffect(() => {
    if (otp.length === 6) handleVerifyOtp(otp);
  }, [otp]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleVerifyOtp = async (otp) => {
    if (otp.length !== 6) {
      showSnackbar("Invalid OTP. Please enter a 6-digit code.", "error");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-forgot-password-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed.");
      } else {
        showSnackbar(data.message, "success");
        router.push(`/reset-password?email=${email}&otp=${otp}`);
      }
    } catch (error) {
      showSnackbar(error.message, "error");
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
        showSnackbar(data.message, "error");
      } else {
        showSnackbar(data.message, "success");
        setCooldown(60); // Start cooldown (60 seconds)
      }
    } catch (error) {
      console.error("Error during forgot password request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlexBox flexDirection="column" sx={{ width: "100%", gap: 2, py: 2, alignItems: "center" }}>
      <Typography sx={{ textAlign: "center", color: "#fff", fontSize: { xs: 14, sm: 16 } }}>
        Enter the 6-digit OTP sent to your email
      </Typography>

      <OtpForm onVerifyOtp={setOtp} />

    </FlexBox>
  );
};

export default OtpForgotPasswordPageView;
