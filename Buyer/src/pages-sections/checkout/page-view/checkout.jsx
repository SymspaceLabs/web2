"use client";

// ======================================================
// Section 1: Module Imports
// ======================================================

import { useCart } from "hooks/useCart";
import { useState, useEffect, Fragment } from "react";
import { H1 } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { Grid, Box, Button } from "@mui/material";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useRouter, useSearchParams } from 'next/navigation';
import {
    handlePayPalPaymentSuccessInternal,
    initiatePayPalRestApiPayment,
    handleCreateOrderInternal
} from "@/services/paymentService";

import Stepper from "../stepper";
import CartItem from "../cart-item";
import PaymentForm from "../payment-form";
import CheckoutForm from "../checkout-form";
import PaymentSummary from "../payment-summary";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { fetchUserById } from "@/services/userService";

// ======================================================
// Section 2: Component Constants
// ======================================================

const STEPPER_LIST = [
    { title: "Cart", disabled: false },
    { title: "Details", disabled: false },
    { title: "Payment", disabled: false },
];

// ======================================================
// Section 3: MultiStepCheckout Component Definition
// ======================================================

export default function MultiStepCheckout() {

    // --- Subsection 3.1: Hook Initialization ---
    const router = useRouter();
    const searchParams = new URLSearchParams(useSearchParams().toString());

    const { state: cartState, dispatch } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { showSnackbar } = useSnackbar();

    // --- Subsection 3.2: State Management ---
    const [selectedStep, setSelectedStep] = useState(0);
    const [sameAsShipping, setSameAsShipping] = useState(true);
    const [userData, setUserData] = useState(null); // Stores fetched user profile and addresses
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [shipping, setShipping] = useState({
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "" || 'US',
        zip: ""
    });
    // Stores the billing address details.
    const [billing, setBilling] = useState({
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "" || 'US', // Will store the country value (e.g., "US")
        zip: ""
    });

    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("paypal");
    const [showShippingFormErrors, setShowShippingFormErrors] = useState(false);

    // New state to hold PayPal return parameters, persisting across renders
    const [paypalProcessed, setPaypalProcessed] = useState(false); // Flag to prevent multiple PayPal processing
    const [paypalReturnInfo, setPaypalReturnInfo] = useState({ status: null, orderId: null });

    // States to receive discount and promo code from PaymentSummary (for display and initial payload)
    const [discountAmount, setDiscountAmount] = useState(0);
    const [appliedPromoCodeId, setAppliedPromoCodeId] = useState(null);
    const [subtotal, setSubtotal] = useState(0); // New state for subtotal


    // Mock Financial Constants ---
    const MOCK_SHIPPING_COST = 4.99;
    const MOCK_TAX_TOTAL = 0.00;

    // Derived Values ---
    const calculateTotalAmount = () => {
        // This function now only calculates and returns the total amount.
        // It does NOT update state directly to avoid re-render loops.
        let itemsTotal = cartState.cart.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const qty = parseFloat(item.qty) || 0;
            return sum + (price * qty);
        }, 0);

        let finalItemsTotal = itemsTotal - (parseFloat(discountAmount) || 0);
        if (finalItemsTotal < 0) finalItemsTotal = 0;

        const totalWithShippingAndTax = finalItemsTotal + MOCK_SHIPPING_COST + MOCK_TAX_TOTAL;
        return Number(totalWithShippingAndTax).toFixed(2);
    };

    const checkoutAmount = calculateTotalAmount();

    // Effect to update subtotal state when cart items or discount changes
    useEffect(() => {
        const itemsTotal = cartState.cart.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const qty = parseFloat(item.qty) || 0;
            return sum + (price * qty);
        }, 0);
        setSubtotal(itemsTotal);
    }, [cartState.cart]); // Depend on cartState.cart

    // Fetch User Data (for authenticated users)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await fetchUserById(user.id);
                setUserData(data);
            } catch (err) {
                console.error("Failed to fetch user data:", err);
            }
        };
        if(isAuthenticated) {
            fetchUserData();
        }
    }, [user, isAuthenticated]);

    // Retrieve selected address ID after PayPal redirect
    useEffect(() => {
        const storedAddressId = localStorage.getItem("selectedAddressId");
        if (storedAddressId) {
            setSelectedAddressId(storedAddressId);
            localStorage.removeItem("selectedAddressId"); // Clean up
        }
    }, []);

    /**
     * Callback function for when a PayPal payment encounters an error or is cancelled.
     * @param {object | string} error - The error object or string message.
     */
    const handlePayPalPaymentError = (error) => {
        showSnackbar("Payment failed. Please try again or choose another method.", "error");
        setLoading(false);
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        if(isAuthenticated){
            localStorage.setItem("selectedAddressId", selectedAddressId);
        } else {
            // For guest users, this data is saved to localStorage before proceeding to payment
            // and then retrieved by handleGuestCheckout or handlePayPalPaymentSuccessInternal
            // No direct API call here.
        }
        setLoading(false);
    };

    /**
     * Handles navigating back to the previous step in the checkout process.
     */
    const handleBack = () => {
        if (selectedStep > 0) {
            setSelectedStep(prev => prev - 1);
            setShowShippingFormErrors(false);
        }
    };

    // Effect to capture PayPal return query parameters and process payment
    useEffect(() => {
        const paymentStatus = searchParams.get('paymentStatus');
        const paypalOrderId = searchParams.get('token');

        if (paymentStatus && !paypalProcessed) {
            setPaypalProcessed(true); // Mark as processed to prevent re-entry
            setPaypalReturnInfo({ status: paymentStatus, orderId: paypalOrderId });

            // Retrieve the stored guest checkout data (which includes discount/promo code)
            const storedGuestCheckoutData = localStorage.getItem("guestCheckoutData");
            const guestData = storedGuestCheckoutData ? JSON.parse(storedGuestCheckoutData) : null;

            // Clear the URL parameters to prevent re-triggering this effect
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.delete('paymentStatus');
            newSearchParams.delete('token');
            router.replace(`${window.location.pathname}?${newSearchParams.toString()}`, undefined, { shallow: true });

            if (paymentStatus === 'success' && paypalOrderId) {
                setLoading(false);
                handlePayPalPaymentSuccessInternal({
                    paypalOrderId,
                    cartState,
                    dispatch,
                    user,
                    showSnackbar,
                    router,
                    // ALWAYS use the values from guestData if available, as they were persisted before redirect
                    checkoutAmount: guestData?.totalAmount || checkoutAmount, // Fallback to current state if guestData not available
                    setLoading,
                    shippingAddressId: guestData?.selectedAddressId || selectedAddressId, // Use stored address ID
                    isAuthenticated,
                    shippingCost: guestData?.shippingCost || MOCK_SHIPPING_COST, // Use stored shipping cost
                    promoCodeId: guestData?.promoCodeId || appliedPromoCodeId, // Use stored promo code ID
                    discountAmount: guestData?.discountAmount || discountAmount, // Use stored discount amount
                    subtotal: guestData?.subtotal || subtotal, // Use stored subtotal
                });
                setPaypalReturnInfo({ status: null, orderId: null }); // Clear after successful processing
            } else if (paymentStatus === 'cancelled' && paypalOrderId) {
                setLoading(false);
                showSnackbar("PayPal payment cancelled by user.", "warning");
                handlePayPalPaymentError("User cancelled payment.");
                setPaypalReturnInfo({ status: null, orderId: null }); // Clear if cancelled
            } else if ((paymentStatus === 'failed' || paymentStatus === 'error') && paypalOrderId) {
                setLoading(false);
                showSnackbar("PayPal payment failed or encountered an error.", "error");
                handlePayPalPaymentError("Payment failed or error occurred.");
                setPaypalReturnInfo({ status: null, orderId: null }); // Clear if failed/error
            }
        }
    }, [searchParams, router, paypalProcessed, cartState, dispatch, user, showSnackbar, checkoutAmount, setLoading, selectedAddressId, isAuthenticated, MOCK_SHIPPING_COST, appliedPromoCodeId, discountAmount, handlePayPalPaymentError, subtotal]);


    /**
     * Handles the change of the checkout step.
     * @param {number} step - The index of the step to navigate to (0, 1, or 2).
     */
    const handleStepChange = (step) => {
        if (step >= 0 && step < 3) {
            setSelectedStep(step);
        }
    };

    const handleGuestCheckout = async () => {
        const guestPayload = {
            firstName,
            lastName,
            email,
            shipping,
            billing: sameAsShipping ? shipping : billing,
            cartItems: cartState.cart,
            totalAmount: parseFloat(checkoutAmount),
            shippingCost: MOCK_SHIPPING_COST,
            promoCodeId: appliedPromoCodeId,
            discountAmount: discountAmount,
            subtotal: subtotal, // Pass subtotal to guest payload
        };

        if (selectedPaymentMethod === "paypal") {
            guestPayload.paypalOrderId = paypalReturnInfo.orderId;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/guest-checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(guestPayload),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Guest checkout failed");

            showSnackbar("Order placed successfully!", "success");
            dispatch({ type: "CLEAR_CART" });
            localStorage.removeItem("guestCheckoutData"); // Clear guest data after successful order
            router.push(`/order-confirmation/${data.data.id}`);
        } catch (error) {
            console.error("Guest checkout error:", error);
            showSnackbar(`Failed to place order: ${error.message}`, "error");
        } finally {
            setLoading(false);
        }
    };


    /**
     * Handles advancing to the next step in the checkout process.
     * For PayPal, it initiates the REST API flow by creating a PayPal order on the backend.
     * For other methods, it proceeds directly to order creation.
     */
    const handleNext = async () => {
        setLoading(true);

        if (selectedStep < 2) {
            if (selectedStep === 1) {
                if (isAuthenticated) {
                    await handleSaveChanges();
                } else {
                    const isPersonalDetailsComplete = firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' && /\S+@\S+\.\S+/.test(email);
                    const requiredShippingFields = ['address1', 'city', 'state', 'zip', 'country'];
                    const isShippingComplete = requiredShippingFields.every(field => {
                        const value = shipping[field];
                        return typeof value === 'string' ? value.trim() !== '' : Boolean(value);
                    });
                    let isBillingComplete = true;
                    if (!sameAsShipping) {
                        const requiredBillingFields = ['address1', 'city', 'state', 'zip', 'country'];
                        isBillingComplete = requiredBillingFields.every(field => {
                            const value = billing[field];
                            return typeof value === 'string' ? value.trim() !== '' : Boolean(value);
                        });
                    }

                    if (!isPersonalDetailsComplete || !isShippingComplete || (!sameAsShipping && !isBillingComplete)) {
                        showSnackbar("Please fill in all required personal details, shipping address, and billing address fields.", "error");
                        setShowShippingFormErrors(true);
                        setLoading(false);
                        return;
                    }
                    setShowShippingFormErrors(false);
                    await handleSaveChanges();
                }
            }
            setSelectedStep(prev => prev + 1);
            setLoading(false);
        } else if (selectedStep === 2) {
            // Store all relevant checkout data in localStorage before redirecting to PayPal
            // This ensures promoCodeId and discountAmount are preserved across redirects
            const dataToStoreForRedirect = {
                firstName,
                lastName,
                email,
                shipping,
                billing: sameAsShipping ? shipping : billing,
                cartItems: cartState.cart,
                totalAmount: checkoutAmount, // Use the calculated checkoutAmount
                shippingCost: MOCK_SHIPPING_COST,
                promoCodeId: appliedPromoCodeId, // Store the applied promo code ID
                discountAmount: discountAmount, // Store the discount amount
                selectedAddressId: selectedAddressId, // Store selected address for authenticated users
                subtotal: subtotal, // Store the subtotal
            };
            localStorage.setItem("guestCheckoutData", JSON.stringify(dataToStoreForRedirect));


            if (selectedPaymentMethod === "paypal") {
                await initiatePayPalRestApiPayment({
                    cartState,
                    showSnackbar,
                    checkoutAmount,
                    setLoading,
                    MOCK_SHIPPING_COST,
                    MOCK_TAX_TOTAL,
                    discountAmount,
                });
            } else if (selectedPaymentMethod === "google") {
                showSnackbar("Google Pay selected!", "info");
                setLoading(false);
            } else if (selectedPaymentMethod === "card") {
                if (isAuthenticated) {
                    await handleCreateOrderInternal({
                        cartState,
                        dispatch,
                        user,
                        showSnackbar,
                        router,
                        checkoutAmount,
                        userData,
                        setLoading,
                        selectedPaymentMethod,
                        isAuthenticated,
                        shippingCost: MOCK_SHIPPING_COST,
                        promoCodeId: appliedPromoCodeId,
                        discountAmount: discountAmount,
                    });
                } else {
                    await handleGuestCheckout();
                }
            } else {
                if (isAuthenticated) {
                    await handleCreateOrderInternal({
                        cartState,
                        dispatch,
                        user,
                        showSnackbar,
                        router,
                        checkoutAmount,
                        userData,
                        setLoading,
                        selectedPaymentMethod,
                        isAuthenticated,
                        shippingCost: MOCK_SHIPPING_COST,
                        promoCodeId: appliedPromoCodeId,
                        discountAmount: discountAmount,
                    });
                } else {
                    await handleGuestCheckout();
                }
            }
        } else {
            setLoading(false);
        }
    };

    // --- Subsection 3.7: Helper Functions for UI Rendering ---
    const getPaymentSummaryButtonText = () => {
        if (selectedStep === 0) {
            return "Check Out Now";
        } else if (selectedStep === 1) {
            return "Proceed to Payment";
        } else if (selectedStep === 2) {
            switch (selectedPaymentMethod) {
                case "paypal":
                    return "Pay with PayPal";
                case "card":
                    return "Pay with Card";
                case "apple-pay":
                    return "Pay with Apple Pay";
                case "google":
                    return "Pay with Google Pay";
                default:
                    return "Continue to Order";
            }
        }
        return "";
    };

    const renderMainContent = () => {
        switch (selectedStep) {
            case 0: // Cart Summary Step
                return (
                    <>
                        {cartState.cart.map((product, index) => (
                            <CartItem product={product} key={index} />
                        ))}
                    </>
                );
            case 1: // Shipping/Details Step
                return (
                    <CheckoutForm
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        email={email}
                        setEmail={setEmail}
                        selectedAddressId={selectedAddressId}
                        setSelectedAddressId={setSelectedAddressId}
                        shipping={shipping}
                        setShipping={setShipping}
                        sameAsShipping={sameAsShipping}
                        setSameAsShipping={setSameAsShipping}
                        setBilling={setBilling}
                        billing={billing}
                        handleBack={handleBack}
                        loading={loading}
                        forceShowErrors={showShippingFormErrors}
                    />
                );
            case 2: // Payment Step
                return (
                    <PaymentForm
                        handleBack={handleBack}
                        paymentMethod={selectedPaymentMethod}
                        setPaymentMethod={setSelectedPaymentMethod}
                    />
                );
            default:
                return null;
        }
    };

    // --- Subsection 3.8: Component JSX Structure ---
    return (
        <>
            <Box mb={3} display={{ sm: "block", xs: "none" }}>
                <Stepper
                    stepperList={STEPPER_LIST}
                    selectedStep={selectedStep + 1}
                    onChange={ind => handleStepChange(ind)}
                />
            </Box>

            {selectedStep > 0 &&
                <Button onClick={handleBack} sx={{ mb: 2 }} >
                    <ChevronLeftIcon />
                    <H1>Back</H1>
                </Button>
            }
            {selectedStep == 0 &&
                <Button onClick={()=>router.push('/products/search/all')} sx={{ mb: 2 }} >
                    <ChevronLeftIcon />
                    <H1>Continue Shopping</H1>
                </Button>
            }

            <Grid container flexWrap="wrap-reverse" spacing={3}>
                <Grid item md={8} xs={12}>
                    {renderMainContent()}
                </Grid>
                <Grid item md={4} xs={12}>
                    <PaymentSummary
                        btnText={getPaymentSummaryButtonText()}
                        handleSave={handleNext}
                        loading={loading}
                        step={selectedStep}
                        onDiscountChange={setDiscountAmount}
                        onPromoCodeApplied={setAppliedPromoCodeId}
                        onSubtotalChange={setSubtotal}
                    />
                </Grid>
            </Grid>
        </>
    );
}
