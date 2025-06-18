// ================================================
// Payment Form
// ================================================

import { useState } from "react"; // MUI
import { styled } from '@mui/system';
import { H1 } from "@/components/Typography";
import { FlexBox, FlexCol } from "@/components/flex-box";
import { CreditCardForm } from "@/components/custom-forms/checkout"; // Removed as PayPalCheckout handles this now
import { Card, IconButton, Button, Box, Typography } from '@mui/material';

import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // <-- back icon
// import PayPalCheckout from "@/components/PayPalCheckout"; // Removed as it's now rendered in MultiStepCheckout

// ================================================

// Styled component for the payment method buttons
// Added `shouldForwardProp` to prevent `isSelected` from being passed to the DOM element
const PaymentMethodButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isSelected' // Filter out 'isSelected' prop
})(({ theme, isSelected }) => ({
    // Conditional border for outline when selected
    border: isSelected ? '2px solid #007bff' : '1px solid #E0E0E0',
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
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly darker white on hover
    },
    // Responsive adjustments for smaller screens
    '@media (max-width:600px)': {
        width: 'calc(50% - 8px)', // 2 items per row on small screens (e.g., mobile)
        marginBottom: '16px', // Add some vertical spacing
    },
}));

// ================================================

export default function PaymentForm({
    handleBack,
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

            {/* BACK ICON and "Payment details" Header */}
            <FlexBox justifyContent="flex-start" alignItems="center" mb={1}>
                <IconButton onClick={handleBack} color="inherit">
                    <ArrowBackIcon />
                </IconButton>

                <H1 fontSize={20}>
                    Payment details
                </H1>
            </FlexBox>

            {/* Transaction Protection Message */}
            <Box mb={3}>
                <Typography fontSize={14} fontWeight={400} color="text.secondary">
                    Your transaction is protected by SSL encryption, ensuring your payment details remain private and secure.
                </Typography>
            </Box>

            {/* PAYMENT METHOD BUTTONS */}
            <FlexBox gap={2} mb={3} justifyContent="space-between" flexWrap="wrap"> {/* Added flexWrap for responsiveness */}
                {/* Card Button (now handled by PayPal Advanced Checkout) */}
                <PaymentMethodButton
                    onClick={() => setPaymentMethod("card")}
                    isSelected={paymentMethod === "card"}
                >
                    <Box component="img" src="assets/images/payment-methods/Card.svg" alt="Card Icon" sx={{ height: 24, mb: 0.5 }} />
                    <Typography fontSize={12} fontWeight={500} textAlign="center">Credit/Debit Card<br/>(PayPal Advanced)</Typography>
                </PaymentMethodButton>

                {/* PayPal Button */}
                <PaymentMethodButton
                    onClick={() => setPaymentMethod("paypal")}
                    isSelected={paymentMethod === "paypal"}
                >
                    <Box component="img" src="assets/images/payment-methods/Paypal.svg" alt="PayPal" sx={{ height: 24, mb: 0.5 }} />
                    <Typography fontSize={12} fontWeight={500} textAlign="center">PayPal</Typography>
                </PaymentMethodButton>

                {/* Apple Pay Button */}
                <PaymentMethodButton
                    onClick={() => setPaymentMethod("apple-pay")}
                    isSelected={paymentMethod === "apple-pay"}
                >
                    <Box component="img" src="assets/images/payment-methods/ApplePay.svg" alt="Apple Pay" sx={{ height: 24, mb: 0.5 }} />
                    <Typography fontSize={12} fontWeight={500} textAlign="center">Apple Pay</Typography>
                </PaymentMethodButton>

                {/* Google Pay Button */}
                <PaymentMethodButton
                    onClick={() => setPaymentMethod("google-pay")}
                    isSelected={paymentMethod === "google-pay"}
                >
                    <Box component="img" src="assets//images/payment-methods/GooglePay.svg" alt="Google Pay" sx={{ height: 24, mb: 0.5 }} />
                    <Typography fontSize={12} fontWeight={500} textAlign="center">Google Pay</Typography>
                </PaymentMethodButton>

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
}
