"use client";

// ======================================================
// Section 1: Module Imports
// ======================================================

import { useCart } from "hooks/useCart";
import { useState, useEffect } from "react";
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
    const searchParams = useSearchParams();

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

    // Mock Financial Constants ---
    const MOCK_SHIPPING_COST = 4.99;
    const MOCK_TAX_TOTAL = 0.00;

    // Derived Values ---
    const calculateTotalAmount = () => {
        const itemsTotal = cartState.cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);
        const totalWithShippingAndTax = itemsTotal + MOCK_SHIPPING_COST + MOCK_TAX_TOTAL;
        return totalWithShippingAndTax.toFixed(2);
    };

    // Stores the calculated total checkout amount. This will be used in API calls.
    const checkoutAmount = calculateTotalAmount();

    // Fetch User
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

    /**
     * Callback function for when a PayPal payment encounters an error or is cancelled.
     * @param {object | string} error - The error object or string message.
     */
    const handlePayPalPaymentError = (error) => {
        showSnackbar("Payment failed. Please try again or choose another method.", "error");
        setLoading(false); // Ensures loading is off.
    };

    const handleSaveChanges = async () => {
        
        // Activates loading state.
        setLoading(true);

        if(isAuthenticated){

        } else {
            const payload = {
                firstName,
                lastName,
                email,
                shippingAddress: { // Assumes the first address in the array is either new or an update.
                    address1: shipping.address1,
                    address2: shipping.address2,
                    city: shipping.city,
                    state: shipping.state,
                    zip: shipping.zip,
                    country: shipping.country || 'US', 
                },
                billingAddress: { // Assumes the first address in the array is either new or an update.
                    address1: billing.address1,
                    address2: billing.address2,
                    city: billing.city,
                    state: billing.state,
                    zip: billing.zip,
                    country: billing.country || 'US', 
                }
            };
        }
        setLoading(false); 
    };

    /**
     * Handles navigating back to the previous step in the checkout process.
     */
    const handleBack = () => {
        // Only allows going back if not on the first step.
        if (selectedStep > 0) {
            setSelectedStep(prev => prev - 1);
            // When going back, hide any previously forced errors
            setShowShippingFormErrors(false);
        }
    };

    // Effect 3a: Captures PayPal return query parameters and stores them in state.
    // This effect runs on component mount and whenever searchParams change.
    useEffect(() => {
        const paymentStatus = searchParams.get('paymentStatus');
        const paypalOrderId = searchParams.get('token');

        // If PayPal return parameters are present and haven't been processed yet
        if (paymentStatus && !paypalProcessed) {
            setPaypalProcessed(true); // Mark as processed to prevent re-entry
            setPaypalReturnInfo({ status: paymentStatus, orderId: paypalOrderId });

            // Clear the URL parameters to prevent re-triggering this effect on subsequent renders
            // and keep the URL clean. `shallow: true` prevents a full page reload.
            router.replace(window.location.pathname, undefined, { shallow: true });
        }
    }, [searchParams, router, paypalProcessed]);

    // Effect 3b: Processes PayPal return *after* userData is confirmed to be available.
    // This effect runs when `paypalReturnInfo` or `userData` changes.
    useEffect(() => {
        const { status: paymentStatus, orderId: paypalOrderId } = paypalReturnInfo;

        // Proceed only if payment status is success, order ID is present, and user data with addresses is loaded.
        // IMPORTANT: Only clear paypalReturnInfo IF we actually process it successfully.
        if (paymentStatus === 'success' && paypalOrderId) {
            setLoading(false); // Reset loading to allow subsequent action
            handlePayPalPaymentSuccessInternal({
                paypalOrderId,
                cartState,
                dispatch,
                user,
                showSnackbar,
                router,
                checkoutAmount,
                setLoading,
                shippingAddressId: selectedAddressId,
                isAuthenticated
            });  // Calls success handler.
            // Clear paypalReturnInfo ONLY AFTER successful processing
            setPaypalReturnInfo({ status: null, orderId: null });
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
        // Dependencies:
        // - `paypalReturnInfo`: Triggers when PayPal return params are initially set.
        // - `userData`: Crucially, this ensures the effect re-evaluates when userData is fetched (after reload).
        // - `showSnackbar`: For displaying messages.
    }, [paypalReturnInfo, userData, showSnackbar, handlePayPalPaymentError, cartState, dispatch, user, router, checkoutAmount, setLoading, isAuthenticated]);

    /**
     * Handles the change of the checkout step.
     * @param {number} step - The index of the step to navigate to (0, 1, or 2).
     */
    const handleStepChange = (step) => {
        // Ensures the step index is within valid bounds.
        if (step >= 0 && step < 3) {
            setSelectedStep(step);
        }
    };

    const handleGuestCheckout = async () => {
        const guestPayload = {
            firstName,
            lastName,
            email,
            shippingAddress: shipping,
            billingAddress: sameAsShipping ? shipping : billing,
            items: cartState.cart.map(item => ({
                variantId: item.variant,
                quantity: item.qty,
            })),
            paymentMethod: selectedPaymentMethod,
            totalAmount: parseFloat(checkoutAmount),
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
        setLoading(true); // Activates loading indicator.

        if (selectedStep < 2) { // If not on the final (Payment) step (i.e., on Cart or Details step)
            if (selectedStep === 1) {
                
                // Conditional validation based on authentication status
                if (isAuthenticated) {
                    // If authenticated, skip client-side validation for personal and shipping details
                    // Assuming data is managed via saved addresses/profile
                    await handleSaveChanges(); // Directly attempt to save (update) user details
                } else {
                // Personal details validation: Now includes email regex check
                const isPersonalDetailsComplete = firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' && /\S+@\S+\.\S+/.test(email);

                // Shipping address validation
                const requiredShippingFields = ['address1', 'city', 'state', 'zip', 'country'];
                const isShippingComplete = requiredShippingFields.every(field => {
                    const value = shipping[field];
                    return typeof value === 'string' ? value.trim() !== '' : Boolean(value);
                });

                // Billing address validation (only if not same as shipping)
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
            setSelectedStep(prev => prev + 1); // Moves to the next step.
            setLoading(false); // Deactivates loading after successful step transition.
        } else if (selectedStep === 2) { // If on the final 'Payment' step
            const guestCheckoutData = {
                firstName,
                lastName,
                email,
                shipping,
                billing: sameAsShipping ? shipping : billing,
                cartItems: cartState.cart,
                totalAmount: checkoutAmount,
            };
            localStorage.setItem("guestCheckoutData", JSON.stringify(guestCheckoutData));
            
            if (selectedPaymentMethod === "paypal") {
                await initiatePayPalRestApiPayment({
                    cartState,
                    user,
                    showSnackbar,
                    router,
                    checkoutAmount,
                    setLoading,
                    MOCK_SHIPPING_COST,
                    MOCK_TAX_TOTAL,
                }); // Initiates PayPal REST API flow.
            } else if (selectedPaymentMethod === "google") {
                showSnackbar("Google Pay selected!", "info");
                setLoading(false); // Deactivate loading if button is not clicked.
            } else if (selectedPaymentMethod === "card") {
                // For 'card' payment, this is a placeholder. In a real app, this would involve
                // integrating with a payment gateway (e.g., Stripe, another PayPal API for direct card processing).
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
                        isAuthenticated
                    });
                } else {
                    await handleGuestCheckout();
                }

            } else {
                // For other payment methods (e.g., "cash on delivery"), proceeds to create the order directly.
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
                    });
                } else {
                    await handleGuestCheckout();
                }
            }
        } else {
            setLoading(false); // Deactivates loading if no action is taken.
        }
    };

    // --- Subsection 3.7: Helper Functions for UI Rendering ---
    // Dynamically determines the text for the action button in the PaymentSummary component.
    const getPaymentSummaryButtonText = () => {
        if (selectedStep === 0) {
            return "Check Out Now"; // Text for the 'Cart' step.
        } else if (selectedStep === 1) {
            return "Proceed to Payment"; // Text for the 'Details' step.
        } else if (selectedStep === 2) {
            switch (selectedPaymentMethod) {
                case "paypal":
                    return "Pay with PayPal";
                case "card":
                    return "Pay with Card"; // Or "Pay with Credit/Debit Card"
                case "apple-pay":
                    return "Pay with Apple Pay";
                case "google":
                    return "Pay with Google Pay";
                default:
                    return "Continue to Order"; // Default text if no method is selected or recognized
            }
        }
        return ""; // Default empty string if no step matches.
    };

    // Renders the main content area based on the `selectedStep`.
    const renderMainContent = () => {
        switch (selectedStep) {
            case 0: // Cart Summary Step
                return (
                    <>
                        {/* Maps through cart items and renders a CartItem component for each. */}
                        {cartState.cart.map((product, index) => (
                            <CartItem product={product} key={index} />
                        ))}
                    </>
                );
            case 1: // Shipping/Details Step
                return (
                    // Renders the CheckoutForm component, passing necessary props for state management and callbacks.
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
                        forceShowErrors={showShippingFormErrors} // Pass the new prop
                    />
                );
            case 2: // Payment Step
                return (
                    // Renders the PaymentForm component, passing payment method state and handler.
                    <PaymentForm
                        handleBack={handleBack}
                        paymentMethod={selectedPaymentMethod}
                        setPaymentMethod={setSelectedPaymentMethod}
                    />
                );
            default:
                return null; // Returns null for any unhandled step.
        }
    };

    // --- Subsection 3.8: Component JSX Structure ---
    return (
        <>
            {/* Stepper component: Displays the checkout progress steps.
                Hidden on extra small screens (`xs: "none"`) for better mobile layout. */}
            <Box mb={3} display={{ sm: "block", xs: "none" }}>
                <Stepper
                    stepperList={STEPPER_LIST} // List of step titles.
                    selectedStep={selectedStep + 1} // Current active step (1-indexed for display).
                    onChange={ind => handleStepChange(ind)} // Callback when a step is clicked.
                />
            </Box>

            {/* Main layout using Material-UI Grid.
                `flexWrap="wrap-reverse"` ensures the summary (right column) appears above main content
                on smaller screens, which is a common pattern for checkout. */}
            {selectedStep > 0 && 
                <Button onClick={handleBack} sx={{ mb: 2 }} >
                    <ChevronLeftIcon />
                    <H1>Back</H1>
                </Button>
            }
            {selectedStep == 0 && 
                <Button onClick={()=>router.push('/products/all')} sx={{ mb: 2 }} >
                    <ChevronLeftIcon />
                    <H1>Continue Shopping</H1>
                </Button>
            }
            
            <Grid container flexWrap="wrap-reverse" spacing={3}>
                {/* Left column: Main content area for Cart, Details, or Payment forms. */}
                <Grid item md={8} xs={12}>
                    {renderMainContent()}
                </Grid>
                {/* Right column: Payment Summary. This component is always visible. */}
                <Grid item md={4} xs={12}>
                    <PaymentSummary
                        btnText={getPaymentSummaryButtonText()} // Dynamic text for the main action button.
                        handleSave={handleNext} // The action button triggers `handleNext` to advance or place order.
                        loading={loading} // Passes the loading state to the summary for button disablement/indicators.
                        step={selectedStep} // Passes the current step to potentially adjust summary display.
                    />
                </Grid>
            </Grid>
        </>
    );
}
