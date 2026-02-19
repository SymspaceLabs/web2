"use client";

// =============================================================
// Payment Details Page View
// =============================================================

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";
import PaymentForm from "@/components/forms/payment";
import { Button } from "@/components/ui/button";
import { SymDashboardHeader } from "@/components/sym-dashboard-header";

// =============================================================

interface CardDetails {
  card_no: string;
  name: string;
  exp: string;
  cvc: string;
}

interface FieldErrors {
  [key: string]: string;
}

interface TouchedFields {
  [key: string]: boolean;
}

type CardBrand = "visa" | "mastercard" | "amex" | "discover" | "diners" | "jcb" | null;

// =============================================================

export default function PaymentDetailsPageView() {
  const router = useRouter();
  const { user } = useAuth();

  const [cardDetails, setCardDetails] = useState<CardDetails>({
    card_no: "",
    name: "",
    exp: "",
    cvc: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cardBrand, setCardBrand] = useState<CardBrand>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Card Brand Detection ---
  const getCardBrand = (cardNumber: string): CardBrand => {
    const cleanNum = cardNumber.replace(/\D/g, "");
    if (!cleanNum) return null;

    if (/^4/.test(cleanNum)) return "visa";
    if (/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/.test(cleanNum))
      return "mastercard";
    if (/^3[47]/.test(cleanNum)) return "amex";
    if (/^(6011|65|64[4-9])/.test(cleanNum)) return "discover";
    if (/^3(?:0[0-5]|[689])/.test(cleanNum)) return "diners";
    if (/^(352[8-9]|35[3-8][0-9])/.test(cleanNum)) return "jcb";

    return null;
  };

  // --- Luhn Algorithm ---
  const luhnCheck = (num: string): boolean => {
    const cleanNum = num.replace(/\D/g, "");
    if (cleanNum.length === 0) return false;

    const arr = cleanNum
      .split("")
      .reverse()
      .map((x) => parseInt(x));

    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      let digit = arr[i];
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  // --- Validation ---
  const validate = (values: CardDetails): FieldErrors => {
    const newErrors: FieldErrors = {};

    // Card Number
    const unmaskedCardNo = values.card_no.replace(/\D/g, "");
    const currentCardBrand = getCardBrand(unmaskedCardNo);

    if (!unmaskedCardNo) {
      newErrors.card_no = "Card number is required";
    } else {
      let expectedLength = 16;
      let isValidLength = false;

      if (currentCardBrand === "amex") {
        expectedLength = 15;
        isValidLength = unmaskedCardNo.length === expectedLength;
      } else if (currentCardBrand === "diners") {
        isValidLength =
          unmaskedCardNo.length === 14 ||
          unmaskedCardNo.length === 16 ||
          unmaskedCardNo.length === 19;
        if (!isValidLength) {
          newErrors.card_no = "Diners Club must be 14, 16, or 19 digits";
        }
      } else if (currentCardBrand === "jcb") {
        isValidLength =
          unmaskedCardNo.length === 16 || unmaskedCardNo.length === 19;
        if (!isValidLength) {
          newErrors.card_no = "JCB must be 16 or 19 digits";
        }
      } else {
        isValidLength = unmaskedCardNo.length === expectedLength;
      }

      if (currentCardBrand && !isValidLength && !newErrors.card_no) {
        newErrors.card_no = `Card number must be ${expectedLength} digits`;
      } else if (!currentCardBrand && unmaskedCardNo.length < 13) {
        newErrors.card_no = "Card number too short";
      }

      if (!newErrors.card_no && !luhnCheck(unmaskedCardNo)) {
        newErrors.card_no = "Invalid card number";
      }
    }

    // Name
    if (!values.name) {
      newErrors.name = "Name on card is required";
    }

    // Expiration Date
    const unmaskedExp = values.exp.replace(/\D/g, "");
    if (!unmaskedExp) {
      newErrors.exp = "Expiration date is required";
    } else if (!/^(0[1-9]|1[0-2])([0-9]{2})$/.test(unmaskedExp)) {
      newErrors.exp = "Invalid format (MM/YY)";
    } else {
      const month = parseInt(unmaskedExp.substring(0, 2), 10);
      const year = parseInt(unmaskedExp.substring(2, 4), 10);

      const currentYearFull = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const fullYear = year < 70 ? 2000 + year : 1900 + year;

      if (
        fullYear < currentYearFull ||
        (fullYear === currentYearFull && month < currentMonth)
      ) {
        newErrors.exp = "Expiration date is in the past";
      }
    }

    // CVC
    const unmaskedCvc = values.cvc.replace(/\D/g, "");
    if (!unmaskedCvc) {
      newErrors.cvc = "CVC is required";
    } else if (!/^\d{3}$/.test(unmaskedCvc)) {
      newErrors.cvc = "CVC must be 3 digits";
    }

    return newErrors;
  };

  // --- Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "card_no") {
      let digitsOnly = value.replace(/\D/g, "");
      const brandForInput = getCardBrand(digitsOnly);

      let maxDigits = 16;
      if (brandForInput === "amex") maxDigits = 15;
      else if (brandForInput === "diners" || brandForInput === "jcb")
        maxDigits = 19;

      digitsOnly = digitsOnly.substring(0, maxDigits);
      newValue = digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
      setCardBrand(getCardBrand(digitsOnly));
    } else if (name === "exp") {
      let digitsOnly = value.replace(/\D/g, "").substring(0, 4);
      newValue =
        digitsOnly.length > 2
          ? digitsOnly.substring(0, 2) + "/" + digitsOnly.substring(2, 4)
          : digitsOnly;
    } else if (name === "cvc") {
      newValue = value.replace(/\D/g, "").substring(0, 3);
    }

    setCardDetails((prev) => ({ ...prev, [name]: newValue }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const fieldErrors = validate(cardDetails);
    if (fieldErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const currentErrors = validate(cardDetails);
    setErrors(currentErrors);
    setTouched({ card_no: true, name: true, exp: true, cvc: true });

    if (Object.keys(currentErrors).length > 0) {
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSend = {
        cardNumber: cardDetails.card_no.replace(/\D/g, ""),
        cardHolderName: cardDetails.name,
        expirationMonth: cardDetails.exp.substring(0, 2),
        expirationYear: cardDetails.exp.substring(3, 5),
        cvc: cardDetails.cvc.replace(/\D/g, ""),
        userId: user?.id,
      };

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
      const response = await fetch(`${backendUrl}/credit-cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save card details.");
      }

      toast.success("Card details saved successfully!");
      setCardDetails({ card_no: "", name: "", exp: "", cvc: "" });
      setErrors({});
      setTouched({});
      setCardBrand(null);
      router.push("/payment-methods");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred.";
      console.error("Error saving card details:", message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="rounded-[15px] shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] backdrop-blur-[12px] overflow-hidden"
      style={{
        background:
          "linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)",
      }}
    >
      {/* Header */}
      <SymDashboardHeader
        title="Add New Card"
        Icon={CreditCard}
        buttonText="Back to Payment Methods"
        onClick={() => router.push("/payment-methods")}
      />

      {/* Form */}
      <div className="bg-white p-6 rounded-b-[15px]">
        <form onSubmit={handleSubmit}>
          {mounted ? (
            <PaymentForm
              values={cardDetails}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              cardBrand={cardBrand}
            />
          ) : (
            <p className="text-center text-gray-500 py-4">Loading form...</p>
          )}

          <Button
            type="submit"
            className="mt-6 w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}