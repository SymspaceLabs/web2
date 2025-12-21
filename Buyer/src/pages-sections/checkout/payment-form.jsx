// ================================================
// Payment Form (Updated for Braintree & Google Pay)
// ================================================

import { useState, useEffect, useRef } from "react";
import Script from 'next/script';
import { H1 } from "@/components/Typography";
import { FlexBox } from "@/components/flex-box";
// Removed CreditCardForm as Braintree Drop-in will handle it
import { Card, Button, Box, Typography, CircularProgress } from '@mui/material'; // Import CircularProgress for loading
import { useSnackbar } from "@/contexts/SnackbarContext";

// Braintree Drop-in imports
import DropIn from 'braintree-web-drop-in-react';

// ================================================

export default function PaymentForm({
    paymentMethod,
    setPaymentMethod,
    orderTotal = 100.00, // Ensure this prop is being passed from parent
    orderCurrency = "USD", // Ensure this prop is being passed from parent
    onPaymentSuccess, // New prop to handle successful payments
    onPaymentError // New prop to handle payment errors
}) {
    // --- Existing states for other payment methods (if still needed, though Braintree Drop-in might supersede) ---
    // const [cardNo, setCardNo] = useState("");
    // const [expiryMonth, setExpiryMonth] = useState("");
    // const [expiryYear, setExpiryYear] = useState("");
    // const [cvv, setCvv] = useState(null);
    // const [cardHolderName, setCardHolderName] = useState("");

    // --- Google Pay states ---
    const [googlePayClient, setGooglePayClient] = useState(null);
    const [isGooglePayReady, setIsGooglePayReady] = useState(false);

    // --- Braintree states ---
    const [braintreeClientToken, setBraintreeClientToken] = useState(null);
    const [braintreeInstance, setBraintreeInstance] = useState(null); // To store the Braintree Drop-in instance
    const [braintreeLoading, setBraintreeLoading] = useState(false); // Loading state for Braintree Drop-in
    const braintreeDropInRef = useRef(null); // Ref to access the DropIn instance if needed later

    const { showSnackbar } = useSnackbar();

    // --- Effect to fetch Braintree Client Token ---
    // This runs when the component mounts or when paymentMethod changes to 'card'
    useEffect(() => {
        if (paymentMethod === "card" && !braintreeClientToken && !braintreeLoading) {
            setBraintreeLoading(true);
            const fetchClientToken = async () => {
                try {
                    const response = await fetch('/api/braintree/client-token'); // Your NestJS endpoint
                    const data = await response.json();
                    if (response.ok) {
                        setBraintreeClientToken(data.clientToken);
                    } else {
                        throw new Error(data.message || "Failed to fetch Braintree client token.");
                    }
                } catch (error) {
                    console.error("Error fetching Braintree client token:", error);
                    showSnackbar("Failed to initialize card payment. Please try again.", "error");
                } finally {
                    setBraintreeLoading(false);
                }
            };
            fetchClientToken();
        }
    }, [paymentMethod, braintreeClientToken, braintreeLoading, showSnackbar]);


    // --- Google Pay Script Loading & Initialization ---
    const loadGooglePayScript = () => {
        if (window.google && window.google.payments && window.google.payments.api) {
            const paymentsClient = new window.google.payments.api.PaymentsClient({
                environment: 'TEST', // IMPORTANT: Use 'PRODUCTION' for live environment
            });
            setGooglePayClient(paymentsClient);

            paymentsClient.isReadyToPay({
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                    {
                        type: 'CARD',
                        parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                                // IMPORTANT: Replace 'example' with your actual payment gateway (e.g., 'braintree', 'stripe', 'adyen')
                                // If using Braintree with Google Pay, this would be 'braintree'
                                gateway: 'braintree',
                                // IMPORTANT: This is the Braintree Merchant ID for the *Google Pay* integration in Braintree.
                                // It might be your primary merchant ID or a specific one for Google Pay.
                                gatewayMerchantId: 'YOUR_BRAINTREE_GATEWAY_MERCHANT_ID', // Replace with your Braintree's Google Pay merchant ID
                            },
                        },
                    },
                ],
            })
                .then(function (response) {
                    if (response.result) {
                        setIsGooglePayReady(true);
                        // showSnackbar("Google Pay is available!", "success"); // Removed to avoid too many snackbars on load
                    } else {
                        setIsGooglePayReady(false);
                        // showSnackbar("Google Pay is not available on this device/browser.", "warning"); // Removed
                    }
                })
                .catch(function (err) {
                    setIsGooglePayReady(false);
                    console.error("Error checking Google Pay readiness:", err);
                    // showSnackbar("Error initializing Google Pay. Please try again later.", "error"); // Removed
                });
        } else {
            console.warn("Google Pay API not found on window.google.payments.api. Script might not have loaded or is blocked.");
        }
    };

    // --- Google Pay Button Click Handler ---
    const onGooglePayButtonClicked = () => {
        if (!googlePayClient) {
            console.error("Google Pay client not initialized. Cannot proceed with payment.");
            showSnackbar("Google Pay is not ready. Please refresh the page.", "error");
            return;
        }

        const paymentDataRequest = {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
                {
                    type: 'CARD',
                    parameters: {
                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                        allowedCardNetworks: ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'],
                    },
                    tokenizationSpecification: {
                        type: 'PAYMENT_GATEWAY',
                        parameters: {
                            gateway: 'braintree', // IMPORTANT: Match the gateway you configured in Braintree
                            gatewayMerchantId: 'YOUR_BRAINTREE_GATEWAY_MERCHANT_ID',
                        },
                    },
                },
            ],
            transactionInfo: {
                totalPriceStatus: 'FINAL',
                totalPrice: orderTotal.toFixed(2),
                currencyCode: orderCurrency,
                countryCode: 'US', // IMPORTANT: Replace with your actual country code (e.g., 'MY' for Malaysia)
            },
            merchantInfo: {
                merchantId: 'YOUR_GOOGLE_PAY_MERCHANT_ID', // Your Google Pay Merchant ID from Google Pay & Wallet Console
                merchantName: 'Your E-commerce Store',
            },
            callbackIntents: ['PAYMENT_AUTHORIZATION'],
        };

        googlePayClient.loadPaymentData(paymentDataRequest)
            .then(function (paymentData) {
                // Send paymentData.paymentMethodData.token to your backend for processing
                processGooglePayPayment(paymentData);
            })
            .catch(function (err) {
                console.error("Error loading payment data (user might have cancelled):", err);
                if (err.statusCode === 'CANCELED') {
                    showSnackbar("Google Pay payment cancelled.", "info");
                } else {
                    showSnackbar("Google Pay payment failed. Please try again.", "error");
                }
            });
    };

    // --- Simulate sending Google Pay data to backend ---
    const processGooglePayPayment = async (paymentData) => {
        try {
            // This is a placeholder. You would make an actual API call to your NestJS backend.
            // Example endpoint: /api/braintree/process-google-pay (if you set up a specific endpoint for it)
            const response = await fetch('/api/braintree/checkout', { // Re-using Braintree checkout endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paymentMethodNonce: paymentData.paymentMethodData.tokenizationData.token, // Google Pay token as Braintree nonce
                    amount: orderTotal,
                    currency: orderCurrency,
                    deviceData: paymentData.paymentMethodData.tokenizationData.androidPayCards.deviceData, // If needed for fraud
                    // You might need to add specific fields for Google Pay processing on your Braintree backend
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                showSnackbar("Google Pay payment successful!", "success");
                if (onPaymentSuccess) onPaymentSuccess(result); // Call parent handler
            } else {
                console.error("Payment processing failed on backend:", result);
                showSnackbar(`Google Pay payment failed: ${result.message || 'Unknown error'}`, "error");
                if (onPaymentError) onPaymentError(result.message || 'Unknown error'); // Call parent handler
            }
        } catch (error) {
            console.error("Error sending payment to backend:", error);
            showSnackbar("An error occurred while processing your payment.", "error");
            if (onPaymentError) onPaymentError(error.message); // Call parent handler
        }
    };


    // --- Braintree Payment Processing ---
    const handleBraintreePayment = async () => {
        if (!braintreeInstance) {
            showSnackbar("Payment method not initialized. Please try again.", "error");
            return;
        }

        setBraintreeLoading(true); // Start loading animation on the button
        try {
            // Request payment method from the Drop-in UI
            const { nonce } = await braintreeInstance.requestPaymentMethod();

            // Send nonce to your NestJS backend for server-side transaction
            const response = await fetch('/api/braintree/checkout', { // Your NestJS endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethodNonce: nonce,
                    amount: orderTotal, // Send as number, NestJS backend will format to fixed(2)
                    currency: orderCurrency,
                    // Add any other relevant order details for your backend (e.g., customerId, orderId)
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                showSnackbar("Payment successful!", "success");
                if (onPaymentSuccess) onPaymentSuccess(result.transaction); // Call parent handler
            } else {
                console.error("Braintree transaction failed:", result.message || result.errors);
                showSnackbar(`Payment failed: ${result.message || 'Unknown error'}`, "error");
                if (onPaymentError) onPaymentError(result.message || 'Unknown error'); // Call parent handler
            }
        } catch (error) {
            console.error("Error processing Braintree payment:", error);
            showSnackbar(`Payment error: ${error.message}`, "error");
            if (onPaymentError) onPaymentError(error.message);
        } finally {
            setBraintreeLoading(false); // Stop loading animation
        }
    };

    return (
        <Card sx={styles.wrapper}>
            {/* Load Google Pay script */}
            <Script
                src="https://pay.google.com/gp/p/js/pay.js"
                onLoad={loadGooglePayScript} // Call our loader function when script loads
                strategy="lazyOnload" // Load script after page hydration
            />

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
            <FlexBox gap={2} mb={3} justifyContent="space-between" flexWrap="wrap">
                {/* PayPal Button (existing) */}
                <Button
                    onClick={() => setPaymentMethod("paypal")}
                    sx={styles.paymentMethodButton(paymentMethod === "paypal")}
                >
                    <img
                        src="assets/images/paypal.svg"
                        style={{
                            width: 25,
                            height: "auto"
                        }}
                        alt="PayPal"
                    />
                    <H1
                        fontSize={12}
                        fontWeight={500}
                        textAlign="center"
                    >
                        PayPal
                    </H1>
                </Button>

                {/* Google Pay Button */}
                {isGooglePayReady && ( // Only show button if Google Pay is ready
                    <Button
                        onClick={() => {
                            setPaymentMethod("google"); // Set the payment method state
                            onGooglePayButtonClicked(); // Trigger Google Pay flow
                        }}
                        sx={styles.paymentMethodButton(paymentMethod === "google")}
                    >
                        <img
                            src="assets/images/payment-methods/GooglePay.svg"
                            style={{
                                width: 70,
                                height: "auto"
                            }}
                            alt="Google Pay"
                        />
                        <H1
                            fontSize={12}
                            fontWeight={500}
                            textAlign="center"
                        >
                            Google Pay
                        </H1>
                    </Button>
                )}

                {/* Credit Card Button (now powered by Braintree Drop-in) */}
                <Button
                    onClick={() => setPaymentMethod("card")}
                    sx={styles.paymentMethodButton(paymentMethod === "card")}
                >
                    <img
                        src="assets/images/payment-methods/Card.svg"
                        style={{
                            width: 40,
                            height: "auto"
                        }}
                        alt="Credit Card"
                    />
                    <H1
                        fontSize={12}
                        fontWeight={500}
                        textAlign="center"
                    >
                        Credit Card
                    </H1>
                </Button>
            </FlexBox>

            {/* Braintree Drop-in UI for Credit Card */}
            {paymentMethod === "card" && (
                <Box mt={3}>
                    {braintreeLoading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                            <CircularProgress />
                            <Typography sx={{ ml: 2 }}>Loading payment form...</Typography>
                        </Box>
                    ) : braintreeClientToken ? (
                        <>
                            <DropIn
                                options={{
                                    authorization: braintreeClientToken,
                                    // Braintree automatically includes card payments when client token is generated
                                    // You can explicitly configure other payment options here if you want them within the Drop-in
                                    // Example for PayPal within Drop-in (requires specific PayPal configuration in Braintree Control Panel):
                                    // paypal: {
                                    //     flow: 'vault', // 'checkout' or 'vault'
                                    //     amount: orderTotal.toFixed(2),
                                    //     currency: orderCurrency,
                                    //     billingAgreementDescription: 'Your product description',
                                    // },
                                    // Example for Google Pay within Braintree Drop-in (alternative to direct Google Pay integration above):
                                    // googlePay: {
                                    //     googlePayVersion: 2,
                                    //     merchantId: 'YOUR_GOOGLE_PAY_MERCHANT_ID', // Your Google Pay Merchant ID
                                    //     countryCode: 'US',
                                    //     currencyCode: orderCurrency,
                                    //     // This tokenizationSpecification must be correctly configured in Braintree's control panel
                                    //     // and match what Braintree expects for Google Pay.
                                    //     tokenizationSpecification: {
                                    //         type: 'PAYMENT_GATEWAY',
                                    //         parameters: {
                                    //             gateway: 'braintree',
                                    //             gatewayMerchantId: 'YOUR_BRAINTREE_GATEWAY_MERCHANT_ID',
                                    //         },
                                    //     },
                                    // },
                                }}
                                onInstance={(instance) => setBraintreeInstance(instance)}
                                ref={braintreeDropInRef}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleBraintreePayment}
                                disabled={!braintreeInstance || braintreeLoading}
                                sx={{ mt: 2, borderRadius: '25px' }}
                            >
                                {braintreeLoading ? <CircularProgress size={24} color="inherit" /> : `Pay ${orderTotal.toFixed(2)} ${orderCurrency}`}
                            </Button>
                        </>
                    ) : (
                        // Show error if client token couldn't be fetched
                        <Typography color="error">Error loading payment form. Please try again.</Typography>
                    )}
                </Box>
            )}

            {/*
                The `CreditCardForm` component is no longer needed here as Braintree's Drop-in
                provides its own secure UI for collecting card details.
                You can remove or comment out this block:
            */}
            {/*
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
            */}

        </Card>
    );
}

const styles = {
    wrapper: {
        p: 3,
        pb: 5,
        borderRadius: "25px",
        backdropFilter: 'blur(10.0285px)',
        boxShadow: 'inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)',
        background: 'rgba(255, 255, 255, 0.35)',
    },
    btn: {
        borderRadius: '25px',
    },
    paymentMethodButton: (isSelected) => ({
        border: isSelected ? '2px solid #007bff' : '2px solid transparent',
        borderRadius: '16px',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        gap:1.5,
        width: 'calc(25% - 12px)',
        boxSizing: 'border-box',
        minWidth: '90px',
        backgroundColor: 'white',
        textTransform: 'none',
        '&:hover': {
            border: '2px solid #007bff',
        },
        '@media (max-width:600px)': {
            width: 'calc(50% - 8px)',
            marginBottom: '16px',
        },
    }),
};