"use client";

import { Fragment, useState, useEffect } from "react";
import { Card, Button } from "@mui/material";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

import PaymentForm from "../payment-form";
import DashboardHeader from "../../dashboard-header";
import CreditCard from "@mui/icons-material/CreditCard";
import { useAuth } from "@/contexts/AuthContext";

export default function PaymentDetailsPageView() {

  const router = useRouter(); // Initialize useRouter hook
  const { showSnackbar } = useSnackbar();
  const { user } = useAuth();
  
  // State for form values
  const [cardDetails, setCardDetails] = useState({
    card_no: "", // This will store the MASKED value for display
    name: "",
    exp: "", // Format: MM/YY
    cvc: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State to track if fields have been touched (for displaying errors on blur)
  const [touched, setTouched] = useState({});

  // State to disable the button during submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to track if the component has mounted on the client
  const [mounted, setMounted] = useState(false);

  // State to store the detected card brand
  const [cardBrand, setCardBrand] = useState(null); // e.g., 'visa', 'mastercard', 'amex', null

  // Use useEffect to set mounted to true after the component mounts on the client
  useEffect(() => {
    setMounted(true);
  }, []); // Empty dependency array ensures this runs only once after initial render

  // --- Card Brand Detection Logic ---
  const getCardBrand = (cardNumber) => {
    const cleanNum = cardNumber.replace(/\D/g, ''); // Get digits only

    if (!cleanNum) return null;

    // Visa (13 or 16 digits, starts with 4)
    if (/^4/.test(cleanNum)) {
      return 'visa';
    }
    // Mastercard (16 digits, starts with 51-55 or 2221-2720)
    if (/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/.test(cleanNum)) {
      return 'mastercard';
    }
    // American Express (15 digits, starts with 34 or 37)
    if (/^3[47]/.test(cleanNum)) {
      return 'amex';
    }
    // Discover (16 digits, starts with 6011, 65, 644-649)
    if (/^(6011|65|64[4-9])/.test(cleanNum)) {
      return 'discover';
    }
    // Diners Club (14, 16, or 19 digits, starts with 300-305, 36, 38, 39)
    if (/^3(?:0[0-5]|[689])/.test(cleanNum)) {
      return 'diners';
    }
    // JCB (16 or 19 digits, starts with 3528-3589)
    if (/^(352[8-9]|35[3-8][0-9])/.test(cleanNum)) {
      return 'jcb';
    }

    return null; // Unknown card type
  };


  // --- Validation Logic ---

  // Simple Luhn algorithm implementation (for basic card number validation)
  const luhnCheck = (num) => {

    const cleanNum = num.replace(/\D/g, '');

    if (cleanNum.length === 0) {
        return false;
    }

    let arr = (cleanNum + '')
      .split('')
      .reverse()
      .map(x => parseInt(x));

    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      let digit = arr[i];
      if (i % 2 === 1) { // Double every second digit (0-indexed, so 1st, 3rd, etc. from right)
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  // Central validation function for all fields
  const validate = (values) => {
    const newErrors = {};

    // Card Number validation
    const unmaskedCardNo = values.card_no.replace(/\D/g, ''); // Remove all non-digits for validation
    const currentCardBrand = getCardBrand(unmaskedCardNo); // Determine brand for validation

    if (!unmaskedCardNo) {
      newErrors.card_no = "Card number is required";
    } else {
      let expectedLength = 16; // Default for Visa/Mastercard/Discover etc.
      let isValidLength = false;

      // Adjust expected length based on brand
      if (currentCardBrand === 'amex') {
        expectedLength = 15;
        isValidLength = unmaskedCardNo.length === expectedLength;
      } else if (currentCardBrand === 'diners') {
        // Diners Club can be 14, 16, or 19 digits
        isValidLength = unmaskedCardNo.length === 14 || unmaskedCardNo.length === 16 || unmaskedCardNo.length === 19;
        if (!isValidLength) {
            newErrors.card_no = "Diners Club must be 14, 16, or 19 digits";
        }
      } else if (currentCardBrand === 'jcb') {
        // JCB can be 16 or 19 digits
        isValidLength = unmaskedCardNo.length === 16 || unmaskedCardNo.length === 19;
        if (!isValidLength) {
            newErrors.card_no = "JCB must be 16 or 19 digits";
        }
      }
      else { // For Visa, Mastercard, Discover, etc.
        isValidLength = unmaskedCardNo.length === expectedLength;
      }

      if (currentCardBrand && !isValidLength && !newErrors.card_no) { // Only set generic length error if not already set by specific brand
        newErrors.card_no = `Card number must be ${expectedLength} digits`;
      } else if (!currentCardBrand && unmaskedCardNo.length < 13) { // If brand unknown, but too short for any known card
          newErrors.card_no = "Card number too short";
      }


      // Only perform Luhn check if length is valid and it's a known brand that uses Luhn
      // Most major cards (Visa, MC, Amex, Discover) use Luhn. Diners, JCB also generally do.
      if (!newErrors.card_no && !luhnCheck(unmaskedCardNo)) {
        newErrors.card_no = "Invalid card number";
      }
    }


    // Name validation
    if (!values.name) {
      newErrors.name = "Name on card is required";
    }

    // Expiration Date validation (MM/YY)
    const unmaskedExp = values.exp.replace(/\D/g, '');

    if (!unmaskedExp) {
      newErrors.exp = "Expiration date is required";
    } else if (!/^(0[1-9]|1[0-2])([0-9]{2})$/.test(unmaskedExp)) {
      newErrors.exp = "Invalid format (MM/YY)";
    } else {
      const month = parseInt(unmaskedExp.substring(0, 2), 10);
      const year = parseInt(unmaskedExp.substring(2, 4), 10);

      const currentYearFull = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      const fullYear = (year < 70 ? 2000 + year : 1900 + year);

      if (fullYear < currentYearFull || (fullYear === currentYearFull && month < currentMonth)) {
        newErrors.exp = "Expiration date is in the past";
      }
    }

    // CVC validation - ALIGNED WITH BACKEND DTO (3 DIGITS)
    const unmaskedCvc = values.cvc.replace(/\D/g, '');
    if (!unmaskedCvc) {
      newErrors.cvc = "CVC is required";
    } else if (!/^\d{3}$/.test(unmaskedCvc)) { // Changed to exactly 3 digits
      newErrors.cvc = "CVC must be 3 digits";
    }

    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "card_no") {
      let digitsOnly = value.replace(/\D/g, '');

      // Determine max digits based on brand for input limiting
      const brandForInput = getCardBrand(digitsOnly);
      let maxDigits = 16; // Default for Visa, MC, Discover
      if (brandForInput === 'amex') {
        maxDigits = 15;
      } else if (brandForInput === 'diners' || brandForInput === 'jcb') {
        maxDigits = 19; // Allow up to 19 for Diners Club/JCB for input purposes
      }

      digitsOnly = digitsOnly.substring(0, maxDigits);

      newValue = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');

      setCardBrand(getCardBrand(digitsOnly)); // Update card brand state
    } else if (name === "exp") {
      let digitsOnly = value.replace(/\D/g, '');
      digitsOnly = digitsOnly.substring(0, 4);

      if (digitsOnly.length > 2) {
        newValue = digitsOnly.substring(0, 2) + '/' + digitsOnly.substring(2, 4);
      } else {
        newValue = digitsOnly;
      }
    } else if (name === "cvc") {
      let digitsOnly = value.replace(/\D/g, '');
      newValue = digitsOnly.substring(0, 3); // Limit to 3 digits
    }


    setCardDetails((prevDetails) => {
      const updatedDetails = {
        ...prevDetails,
        [name]: newValue,
      };
      return updatedDetails;
    });

    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle input blurring (when a field loses focus)
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
    const fieldErrors = validate(cardDetails);
    if (fieldErrors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: fieldErrors[name],
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };


  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentErrors = validate(cardDetails);
    setErrors(currentErrors);

    setTouched({
      card_no: true,
      name: true,
      exp: true,
      cvc: true,
    });

    if (Object.keys(currentErrors).length > 0) {
      showSnackbar("Please fix the errors in the form before submitting.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSend = {
        cardNumber: cardDetails.card_no.replace(/\D/g, ''), // Matches backend DTO 'cardNumber'
        cardHolderName: cardDetails.name, // Matches backend DTO 'cardHolderName'
        expirationMonth: cardDetails.exp.substring(0, 2), // Matches backend DTO 'expirationMonth'
        expirationYear: cardDetails.exp.substring(3, 5),   // Matches backend DTO 'expirationYear'
        cvc: cardDetails.cvc.replace(/\D/g, ''), // Matches backend DTO 'cvc'
        userId: user.id,
      };

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
      console.log(`Sending data to: ${backendUrl}/credit-cards`, dataToSend);

      const response = await fetch(`${backendUrl}/credit-cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${yourAuthToken}`, // Add authorization if needed
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save card details.");
      }

      const result = await response.json();

      showSnackbar("Card details saved successfully!", "success");

      // Clear the form and reset states after successful submission
      setCardDetails({ card_no: "", name: "", exp: "", cvc: "" });
      setErrors({});
      setTouched({});
      setCardBrand(null);

      router.push('/payment-methods'); // Redirect to the list of all cards

    } catch (error) {
      console.error("Error saving card details:", error.message);
      showSnackbar(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fragment>
      <DashboardHeader
        title="Add New"
        Icon={CreditCard}
        href="/payment-methods"
        buttonText="Back Payment Methods"
      />

      <Card sx={{ p: 3 }}>
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
            <div>Loading form...</div>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </Fragment>
  );
}
