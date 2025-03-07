"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button, Typography, CircularProgress } from "@mui/material";
import { FlexBox } from "@/components/flex-box";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { OtpForm } from "@/components/forms";
import { useAuth } from '@/contexts/AuthContext';

const OtpPageView = () => {
  const { showSnackbar } = useSnackbar();
  const { handleAuthResponse } = useAuth(); // Context for handling authentication state.
  
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

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
        throw new Error(data.message || "OTP verification failed.")
      } else {
        showSnackbar(data.message, "success");
        handleAuthResponse(data.user, data.accessToken);
        
        // Redirect based on user role
        if (data.user.role === 'seller') {
          router.push('/vendor/dashboard');
        } else {
          router.push('/marketplace');
        }
      }
    } catch (error) {
      showSnackbar(error.message, "error");
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

      <Button
        onClick={() => handleVerifyOtp(otp)}
        disabled={loading}
        sx={{ mt: 2, background: "#000", color: "#fff", borderRadius: "12px", px: 3, py: 1 }}
      >
        {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Verify OTP"}
      </Button>
    </FlexBox>
  );
};

export default OtpPageView;
