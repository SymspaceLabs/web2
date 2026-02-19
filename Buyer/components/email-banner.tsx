"use client";

// ===============================================
// Email Banner - Next.js + Tailwind + TypeScript
// ===============================================

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ===============================================

interface EmailBannerProps {
  title: string;
}

export default function EmailBanner({ title }: EmailBannerProps) {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBetaAccessClick = () => {
    setShowInput(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async () => {
    setError("");
    if (!isValidEmail(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/potential-users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email.trim() }),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
        setTimeout(() => {
          setIsSubmitted(false);
          setShowInput(false);
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to submit email.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
      viewport={{ once: true }}
      className="w-full overflow-hidden"
    >
      <div className="min-h-[300px] sm:min-h-[400px] rounded-[50px] overflow-hidden relative max-[375px]:min-h-[260px] w-full">
        {/* Background Image - Absolute positioned to fill container */}
        <div className="absolute inset-0">
          <Image
            src="/images/landing/gradient-banner.png"
            alt="offer"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1300px) 80vw, 1300px"
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        
        {/* Content overlay */}
        <div className="absolute top-[40%] left-[10%] -translate-y-[40%] sm:top-[50%] sm:left-0 sm:right-0 sm:px-8 sm:-translate-y-1/2 max-[375px]:px-8 z-10 md:px-24">
          <h1 className="mt-6 mb-2 leading-tight text-xl sm:text-4xl max-[375px]:text-2xl max-[375px]:mt-0 text-black font-elemental lowercase">
            {title}
          </h1>

          <p className="mb-0 sm:mb-6 leading-tight text-sm sm:text-lg text-black font-helvetica">
            Get updates on new partnered brands, products, and technology.
          </p>

          {!showInput && (
            <Button
              onClick={handleBetaAccessClick}
              className="flex items-center gap-4 text-white rounded-[50px] py-6 px-8 mt-8 bg-gradient-to-br from-[#18C8FF] to-[#933FFE] hover:opacity-90 h-auto"
            >
              <span className="text-xs font-elemental lowercase">Beta Access</span>
              <div className="w-[35px] flex flex-col items-center justify-center">
                <Image
                  alt="sparkler"
                  width={25}
                  height={25}
                  src="/images/sparkler-white.webp"
                />
              </div>
            </Button>
          )}

          {showInput && (
            <>
              <div className="flex flex-col items-center mt-8 w-full max-w-[400px] relative animate-fadeIn">
                <div className="relative w-full">
                  <Input
                    type="email"
                    placeholder={
                      isSubmitted ? "Successfully subscribed!" : "Enter your email"
                    }
                    value={email}
                    onChange={handleEmailChange}
                    className="font-helvetica w-full bg-gradient-to-r from-[#474747] to-[#1D1D1D] rounded-[50px] pr-[70px] text-white py-5 px-8 border-none placeholder:text-gray-400"
                  />
                  <Button
                    onClick={handleEmailSubmit}
                    className={`font-elemental absolute right-[10px] top-1/2 -translate-y-1/2 ${
                      isSubmitted
                        ? "bg-white text-black hover:bg-gray-100"
                        : "bg-gradient-to-r from-[#666666] to-[#1D1D1D] text-white hover:from-[#888888] hover:to-[#2D2D2D]"
                    } border border-white rounded-[50px] px-3 py-1.5 h-auto`}
                  >
                    {isSubmitted ? "✔️" : "Submit"}
                  </Button>
                </div>
              </div>
              {error && (
                <p className="py-2 px-6 text-red-500 text-sm">{error}</p>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </motion.div>
  );
}