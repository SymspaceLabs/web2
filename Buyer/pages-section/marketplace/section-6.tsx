// ============================================================================
// Section 6 Banner
// ============================================================================

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Section6() {
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/potential-users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

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
    <div className="py-0 sm:py-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
          viewport={{ once: true }}
        >
          <div
            className="relative rounded-[30px] sm:rounded-[65px] py-6 sm:py-[4.5rem] px-6 sm:px-[4.5rem] bg-cover bg-no-repeat bg-top"
            style={{
              backgroundImage: "url(/images/marketplace/banner-bg.png)",
            }}
          >
            {/* Content area for text and call-to-action button */}
            <div className="flex flex-col gap-4 relative z-10 font-helvetica ">
              {/* Section headline */}
              <p className="font-bold text-[20px] sm:text-[48px] text-white leading-tight">
                Augment Products whenever.
                <br />
                From wherever.
              </p>

              {/* Section description */}
              <p className="text-[12px] sm:text-base text-white mb-4">
                Sign up today.
              </p>

              {/* Call-to-action button for beta access */}
              {!showInput && (
                <Button
                  onClick={handleBetaAccessClick}
                  className="flex items-center gap-4 text-white rounded-[50px] py-4 px-4 bg-gradient-to-br from-[#18C8FF] via-[#5B7BFF] to-[#933FFE] max-w-full sm:max-w-[250px] hover:opacity-90 transition-opacity"
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
                  <div
                    className="flex flex-col items-center mt-8 w-full max-w-[400px] relative animate-fadeIn"
                    style={{
                      animation: "fadeIn 0.5s ease-in-out",
                    }}
                  >
                    <div className="relative w-full">
                      <Input
                        type="email"
                        placeholder={
                          isSubmitted ? "Successfully subscribed!" : "Enter your email"
                        }
                        value={email}
                        onChange={handleEmailChange}
                        className={`font-helvetica w-full bg-gradient-to-r from-[#474747] to-[#1D1D1D] rounded-[50px] pr-[90px] text-white placeholder:text-gray-400 border-none focus-visible:ring-0 focus-visible:ring-offset-0 py-5 px-8 ${
                          error ? "border-red-500" : ""
                        }`}
                      />
                      <Button
                        onClick={handleEmailSubmit}
                        className={`font-elemental lowercase absolute right-[10px] top-1/2 -translate-y-1/2 rounded-[50px] px-6 py-2 border border-white transition-all ${
                          isSubmitted
                            ? "bg-white text-black hover:bg-gray-100"
                            : "bg-gradient-to-r from-[#666666] to-[#1D1D1D] text-white hover:from-[#888888] hover:to-[#2D2D2D]"
                        }`}
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

            {/* Image wrapper to display the promotional image */}
            <div className="hidden sm:flex absolute right-[10px] top-1/2 -translate-y-1/2 w-[70%] z-[1]">
              <Image
                src="/images/marketplace/banner-img.png"
                alt="Watch"
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add fadeIn animation */}
      <style jsx global>{`
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
    </div>
  );
}