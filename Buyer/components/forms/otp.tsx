"use client";
// =========================================
// OtpForm Component
// =========================================

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface OtpFormProps {
  onVerifyOtp: (otp: string) => void;
}

export const OtpForm: React.FC<OtpFormProps> = ({ onVerifyOtp }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus(); // Auto-focus the first input box on mount
  }, []);

  useEffect(() => {
    if (otp.join("").length === 6) {
      onVerifyOtp(otp.join(""));
    }
  }, [otp, onVerifyOtp]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData("text").trim();
    if (!/^[0-9]{6}$/.test(pastedData)) return;

    setOtp(pastedData.split(""));
    inputRefs.current[5]?.focus();
  };

  return (
    <div className="flex gap-1 sm:gap-2 justify-center">
      {otp.map((digit, index) => (
        <Input
          key={index}
          value={digit}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          maxLength={1}
          className="w-[37px] h-[37px] sm:w-[50px] sm:h-[50px] text-center text-base sm:text-lg bg-black text-white border-white/20 rounded-md focus:border-[#3084ff] focus:ring-[#3084ff]"
        />
      ))}
    </div>
  );
};