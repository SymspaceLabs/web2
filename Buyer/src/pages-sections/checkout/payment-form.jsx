// ================================================
// Payment Form
// ================================================

import { useState } from "react";
// Removed 'styled' as it's no longer needed for PaymentMethodButton
import { H1 } from "@/components/Typography";
import { FlexBox } from "@/components/flex-box"; // Assuming FlexBox is still used
import { CreditCardForm } from "@/components/custom-forms/checkout";
import { Card, Button, Box, Typography } from '@mui/material';

// ================================================

export default function PaymentForm({
    paymentMethod,
    setPaymentMethod,
}) {
    const [cardNo, setCardNo] = useState("");
    const [expiryMonth, setExpiryMonth] = useState("");
    const [expiryYear, setExpiryYear] = useState("");
    const [cvv, setCvv] = useState(null);
    const [cardHolderName, setCardHolderName] = useState("");

    return (
        <Card sx={styles.wrapper}>

            <H1 fontSize={20}>
                Payment details
            </H1>

            {/* Transaction Protection Message */}
            <Box mb={3}>
                <Typography fontSize={14} fontWeight={400} color="text.secondary">
                    Your transaction is protected by SSL encryption, ensuring your payment details remain private and secure.
                </Typography>
            </Box>

            {/* PAYMENT METHOD BUTTONS */}
            <FlexBox gap={2} mb={3} justifyContent="space-between" flexWrap="wrap"> {/* Added flexWrap for responsiveness */}
                {/* Card Button (now handled by PayPal Advanced Checkout) */}
                <Button
                    onClick={() => setPaymentMethod("card")}
                    sx={styles.paymentMethodButton(paymentMethod === "card")} // Apply styles from the styles object
                >
                    <Box component="img" src="assets/images/payment-methods/Card.svg" alt="Card Icon" sx={{ height: 24, mb: 0.5 }} />
                    <Typography fontSize={12} fontWeight={500} textAlign="center">Credit/Debit Card<br/>(PayPal Advanced)</Typography>
                </Button>

                {/* PayPal Button */}
                <Button
                    onClick={() => setPaymentMethod("paypal")}
                    sx={styles.paymentMethodButton(paymentMethod === "paypal")} // Apply styles from the styles object
                >
                    <Box component="img" src="assets/images/payment-methods/Paypal.svg" alt="PayPal" sx={{ height: 24, mb: 0.5 }} />
                    <Typography fontSize={12} fontWeight={500} textAlign="center">PayPal</Typography>
                </Button>

                {/* Apple Pay Button */}
                <Button
                    onClick={() => setPaymentMethod("apple-pay")}
                    sx={styles.paymentMethodButton(paymentMethod === "apple-pay")} // Apply styles from the styles object
                >
                    <Box component="img" src="assets/images/payment-methods/ApplePay.svg" alt="Apple Pay" sx={{ height: 24, mb: 0.5 }} />
                    <Typography fontSize={12} fontWeight={500} textAlign="center">Apple Pay</Typography>
                </Button>

                {/* Google Pay Button */}
                <Button
                    onClick={() => setPaymentMethod("google")}
                    sx={styles.paymentMethodButton(paymentMethod === "google")} // Apply styles from the styles object
                >
                    <Box component="img" src="assets//images/payment-methods/GooglePay.svg" alt="Google Pay" sx={{ height: 24, mb: 0.5 }} />
                    <Typography fontSize={12} fontWeight={500} textAlign="center">Google Pay</Typography>
                </Button>

            </FlexBox>

            {
                paymentMethod === "card" &&
                <CreditCardForm
                    cardNo={cardNo}
                    setCardNo={setCardNo}
                    expiryMonth={expiryMonth}
                    setExpiryMonth={setExpiryMonth}
                    expiryYear={expiryYear}
                    setExpiryYear={setExpiryYear}
                    cvv={cvv}
                    setCvv={setCvv}
                    cardHolderName={cardHolderName}
                    setCardHolderName={setCardHolderName}
                />
            }

        </Card>
    );
}

const styles = {
    wrapper : {
        p:3,
        pb:5,
        borderRadius: "25px",
        backdropFilter: 'blur(10.0285px)',
        boxShadow: 'inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)',
        background: 'rgba(255, 255, 255, 0.35)',
    },
    btn: {
        borderRadius: '25px',
    },
    // Styles for PaymentMethodButton, now a function that returns the style object
    paymentMethodButton: (isSelected) => ({ // Accepts isSelected as an argument
        border: isSelected ? '2px solid #007bff' : '2px solid transparent',
        borderRadius: '16px',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column', // Arrange content vertically
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1, // Allows buttons to grow and fill space
        // Explicitly set width to ensure equal distribution for 4 items with a 16px gap
        width: 'calc(25% - 12px)', // For 4 items and gap={2} (16px), 3 gaps = 48px total gap. (100% - 48px) / 4 = 25% - 12px
        boxSizing: 'border-box', // Include padding and border in the width calculation
        minWidth: '90px', // Adjusted minimum width to allow shrinking on very small screens, while maintaining proportion
        backgroundColor: 'white', // Set background to white for all payment methods
        textTransform:'none',
        '&:hover': {
            border: '2px solid #007bff',
        },
        // Responsive adjustments for smaller screens
        '@media (max-width:600px)': {
            width: 'calc(50% - 8px)', // 2 items per row on small screens (e.g., mobile)
            marginBottom: '16px', // Add some vertical spacing
        },
    }),
};
