"use client";

// =============================================================
// Payment Form Component
// =============================================================

import Image from "next/image";
import { CreditCard as CreditCardIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

interface PaymentFormProps {
  values: CardDetails;
  errors: FieldErrors;
  touched: TouchedFields;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  cardBrand: CardBrand;
}

// =============================================================

const DefaultCardIcon = () => (
  <CreditCardIcon className="h-5 w-5 text-gray-400" />
);

// =============================================================

export default function PaymentForm({
  values = { card_no: "", name: "", exp: "", cvc: "" },
  errors = {},
  touched = {},
  handleChange,
  handleBlur,
  cardBrand,
}: PaymentFormProps) {
  // Get card icon
  const getCardIcon = (brand: CardBrand) => {
    const iconMap: Record<string, { src: string; alt: string }> = {
      visa: { src: "/assets/images/credit-cards/visa.svg", alt: "Visa" },
      mastercard: {
        src: "/assets/images/credit-cards/mastercard.svg",
        alt: "Mastercard",
      },
      amex: { src: "/assets/images/credit-cards/amex.svg", alt: "American Express" },
      discover: { src: "/assets/images/credit-cards/discover.svg", alt: "Discover" },
      diners: { src: "/assets/images/credit-cards/diners.svg", alt: "Diners Club" },
      jcb: { src: "/assets/images/credit-cards/jcb.svg", alt: "JCB" },
    };

    return brand ? iconMap[brand] : null;
  };

  const cardIconData = getCardIcon(cardBrand);

  // Determine dynamic maxLength for card number input
  let cardInputMaxLength = 19; // 16 digits + 3 spaces
  if (cardBrand === "amex") cardInputMaxLength = 17; // 15 digits + 2 spaces
  else if (cardBrand === "diners" || cardBrand === "jcb")
    cardInputMaxLength = 22; // 19 digits + 4 spaces

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Card Number */}
      <div className="md:col-span-2">
        <Label htmlFor="card_no" className="text-gray-700 mb-1.5">
          Card Number
        </Label>
        <div className="relative">
          <Input
            id="card_no"
            name="card_no"
            type="tel"
            maxLength={cardInputMaxLength}
            placeholder="1234 5678 9012 3456"
            value={values.card_no}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              touched.card_no && errors.card_no ? "border-red-500 pr-10" : "pr-10"
            }
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {cardIconData ? (
              <Image
                src={cardIconData.src}
                alt={cardIconData.alt}
                width={24}
                height={24}
                className="object-contain"
              />
            ) : (
              <DefaultCardIcon />
            )}
          </div>
        </div>
        {touched.card_no && errors.card_no && (
          <p className="text-xs text-red-500 mt-1">{errors.card_no}</p>
        )}
      </div>

      {/* Name on Card */}
      <div className="md:col-span-2">
        <Label htmlFor="name" className="text-gray-700 mb-1.5">
          Name on Card
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.name && errors.name ? "border-red-500" : ""}
        />
        {touched.name && errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      {/* Expiration Date */}
      <div>
        <Label htmlFor="exp" className="text-gray-700 mb-1.5">
          Exp. Date (MM/YY)
        </Label>
        <Input
          id="exp"
          name="exp"
          type="tel"
          maxLength={5}
          placeholder="MM/YY"
          value={values.exp}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.exp && errors.exp ? "border-red-500" : ""}
        />
        {touched.exp && errors.exp && (
          <p className="text-xs text-red-500 mt-1">{errors.exp}</p>
        )}
      </div>

      {/* CVC */}
      <div>
        <Label htmlFor="cvc" className="text-gray-700 mb-1.5">
          CVC
        </Label>
        <Input
          id="cvc"
          name="cvc"
          type="tel"
          maxLength={3}
          placeholder="123"
          value={values.cvc}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.cvc && errors.cvc ? "border-red-500" : ""}
        />
        {touched.cvc && errors.cvc && (
          <p className="text-xs text-red-500 mt-1">{errors.cvc}</p>
        )}
      </div>
    </div>
  );
}