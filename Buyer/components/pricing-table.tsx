"use client";

// ==========================================
// Pricing Table Components - Tailwind Version
// ==========================================

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

// ==========================================
// Types
// ==========================================

interface Plan {
  title: string;
  subTitle: string;
  price: string;
  basis: string;
  credit: number;
  features: string[];
  isPopular?: boolean;
}

interface PlanCardProps {
  plan: Plan;
  theme?: "light" | "dark";
}

interface PlanToggleProps {
  onChange: (value: "monthly" | "yearly") => void;
  value: "monthly" | "yearly";
  title?: string;
  subtitle?: string;
  theme?: "light" | "dark";
}

interface PricingTableProps {
  plans: (billingCycle: "monthly" | "yearly") => Plan[];
  title?: string;
  theme?: "light" | "dark";
}

// ==========================================
// PlanCard Component
// ==========================================

function PlanCard({ plan, theme = "light" }: PlanCardProps) {
  const isDark = theme === "dark";

  return (
    <div className="relative font-helvetica">
      {/* Popular Badge */}
      {plan.isPopular && (
        <div className="z-[3] flex gap-1 items-center justify-center bg-[#2563EB] text-white p-[10px] text-center font-bold text-base absolute top-0 -mt-5 w-full rounded-t-[25px]">
          Most Popular
          <div>
            <Image
              src="/images/sparkler-white.webp"
              width={20}
              height={20}
              alt="sparkles"
            />
          </div>
        </div>
      )}

      <div
        className={`min-h-[500px] sm:min-h-[650px] flex flex-col justify-between flex-grow w-full h-full ${
          plan.isPopular ? "border-[3px] border-[#2563EB]" : "border border-white"
        } rounded-[25px] backdrop-blur-[10.0285px] bg-white/35`}
        style={{
          filter: "drop-shadow(0px 5px 50px rgba(0, 0, 0, 0.25))",
          boxShadow:
            "inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)",
        }}
      >
        <div className="relative px-4 pb-4 pt-8">
          <h1 className={`font-elemental lowercase text-xl ${isDark ? "text-white" : "text-black"}`}>
            {plan.title}
          </h1>
          <p className={`text-sm ${isDark ? "text-white" : "text-black"}`}>
            {plan.subTitle}
          </p>
          <p
            className={`font-helvetica lowercase text-[32px] pt-3 font-bold ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {plan.price}
            <span className="text-[18px]">/{plan.basis}</span>
          </p>

          <div className="min-h-[20px]">
            {plan.credit > 0 ? (
              <p className={isDark ? "text-white" : "text-black"}>
                {plan.title !== "Starter"
                  ? `+ $${plan.credit} Each Additional Credit`
                  : "\u00A0"}
              </p>
            ) : null}
          </div>

          <Link href="/register" passHref>
            <Button className="font-elemental w-full mt-4 bg-[#2563EB] text-white rounded-[50px] py-4 border-2 border-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:bg-gradient-to-r hover:from-[#666666] hover:to-[#000000] transition-all">
              Get Started
            </Button>
          </Link>

          <p className={`font-bold text-base mt-4 ${isDark ? "text-white" : "text-black"}`}>
            Includes:
          </p>

          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center mt-2 gap-1.5">
              <Check
                className={`${isDark ? "text-white" : "text-[#2563EB]"} w-6 h-6 mr-1`}
              />
              <p className={`text-base ${isDark ? "text-white" : "text-black"}`}>
                {feature}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// PlanToggle Component
// ==========================================

function PlanToggle({
  onChange,
  value,
  title,
  subtitle,
  theme = "light",
}: PlanToggleProps) {
  const [selected, setSelected] = useState<"monthly" | "yearly">(value);
  const isDark = theme === "dark";

  const handleToggle = (val: "monthly" | "yearly") => {
    setSelected(val);
    onChange(val);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 font-helvetica">
      {/* LEFT */}
      <h1
        className="font-elemental text-white text-[12px] sm:text-[18px] text-center sm:text-left"
      >
        {title}
      </h1>

      {/* RIGHT */}
      <div className="flex flex-col-reverse sm:flex-row justify-center sm:justify-end items-center gap-2">
        {/* Subtitle */}
        <p
          className={`text-center mt-[10px] sm:mt-0  ${
            isDark ? "text-white" : "text-[#2563EB]"
          }`}
        >
          {subtitle}
        </p>

        {/* Toggle button */}
        <div className="relative flex items-center bg-[#27272A] rounded-[50px] p-1 w-[200px]">
          {/* Highlight */}
          <div
            className="absolute h-[calc(100%-8px)] w-[calc(50%-4px)] bg-[#2563EB] rounded-[50px] transition-all duration-300 ease-in-out"
            style={{
              left: selected === "yearly" ? "4px" : "calc(50% + 0px)",
            }}
          />

          {/* Yearly */}
          <div
            className={`relative z-[1] flex-1 text-center py-2 px-4 cursor-pointer rounded-[50px] transition-colors ${
              selected === "yearly" ? "text-white" : "text-[#A1A1AA]"
            }`}
            onClick={() => handleToggle("yearly")}
          >
            Yearly
          </div>

          {/* Monthly */}
          <div
            className={`relative z-[1] flex-1 text-center py-2 px-4 cursor-pointer rounded-[50px] transition-colors ${
              selected === "monthly" ? "text-white" : "text-[#A1A1AA]"
            }`}
            onClick={() => handleToggle("monthly")}
          >
            Monthly
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// PricingTable Component
// ==========================================

export default function PricingTable({
  plans,
  title,
  theme = "light",
}: PricingTableProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const handleBillingCycleChange = (cycle: "monthly" | "yearly") => {
    setBillingCycle(cycle);
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-[75px]">
      {/* TOGGLE */}
      <PlanToggle
        title={title}
        subtitle="Save on the yearly plans!"
        onChange={handleBillingCycleChange}
        value={billingCycle}
        theme={theme}
      />

      {/* TABLE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 items-stretch">
        {plans(billingCycle).map((plan) => (
          <PlanCard key={plan.title} plan={plan} theme={theme} />
        ))}
      </div>
    </div>
  );
}

export { PlanCard, PlanToggle };