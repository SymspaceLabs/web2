"use client";

// =======================================================
// OTP Page View
// =======================================================

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Typography, CircularProgress } from "@mui/material";
import { FlexBox, FlexColCenter } from "@/components/flex-box";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { OtpForm } from "@/components/custom-forms";
import { useAuth } from '@/contexts/AuthContext';
import { SymSubmitButton } from "@/components/custom-buttons";

const OtpPageView = () => {
  const { showSnackbar } = useSnackbar();
  const { handleAuthResponse } = useAuth();

  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [cooldown, setCooldown] = useState(0); // Cooldown in seconds

  useEffect(() => {
    if (!email) {
      showSnackbar("Email not found. Please check your verification link.", "error");
      router.push("/register");
    }
  }, [email, showSnackbar, router]);

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

  const handleVerifyOtp = async (otp) => {
    if (otp.length !== 6) {
      showSnackbar("Invalid OTP. Please enter a 6-digit code.", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed.");
      } else {
        showSnackbar(data.message, "success");
        handleAuthResponse(data.user, data.accessToken);

        // Redirect based on user role
        if (data.user.role === 'seller') {
          router.push(`${process.env.NEXT_PUBLIC_SELLER_URL}`);
        } else {
          router.push(`${process.env.NEXT_PUBLIC_BUYER_URL}/marketplace`);
        }
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

      <FlexColCenter paddingTop={2} gap={2}>
        <Typography color="#FFF">
          Didn’t receive the Code?
        </Typography>
        <SymSubmitButton
          isValid={!(cooldown > 0) && !loading}
          disabled={cooldown > 0 || loading}
          onClick={handleResendCode}
          loading={loading}
          sx={{ fontSize:12 }}
        >
          {loading ? 
            <CircularProgress size={24} sx={{ color: "#fff" }} />
            : 
            cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Code"}
        </SymSubmitButton>
      </FlexColCenter>

    </FlexBox>
  );
};

export default OtpPageView;
