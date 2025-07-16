// src/hooks/useCheckoutProcess.js

import { useState, useEffect, useCallback, useReducer } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useCart } from "hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUserById } from "@/services/userService";
import {
    handlePayPalPaymentSuccessInternal,
    initiatePayPalRestApiPayment,
    handleCreateOrderInternal
} from "@/services/paymentService";
import { 
    initialCheckoutFormState,
    checkoutFormReducer,
    validateCheckoutForm
} from "@/services/checkoutService";

// Mock Financial Constants (consider moving these to a config file or fetching from backend)
const MOCK_SHIPPING_COST = 4.99;
const MOCK_TAX_TOTAL = 0.00;
const ORDER_CURRENCY = "USD";

export const useCheckoutProcess = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { state: cartState, dispatch: cartDispatch } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { showSnackbar } = useSnackbar();

    // --- State Management ---
    const [selectedStep, setSelectedStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("paypal");
    const [showFormErrors, setShowFormErrors] = useState(false); // For CheckoutForm validation
    const [paypalProcessed, setPaypalProcessed] = useState(false);
    const [paypalReturnInfo, setPaypalReturnInfo] = useState({ status: null, orderId: null });

    // States for pricing details (managed by PaymentSummary)
    const [discountAmount, setDiscountAmount] = useState(0);
    const [appliedPromoCodeId, setAppliedPromoCodeId] = useState(null);
    const [subtotal, setSubtotal] = useState(0);

    // Form data for authenticated and guest users
    const [formData, dispatchForm] = useReducer(checkoutFormReducer, initialCheckoutFormState);
    const [selectedAddressId, setSelectedAddressId] = useState(null); // For authenticated users

    // --- Derived Values ---
    const checkoutAmount = (
        cartState.cart.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const qty = parseFloat(item.qty) || 0;
            return sum + (price * qty);
        }, 0) - (parseFloat(discountAmount) || 0) + MOCK_SHIPPING_COST + MOCK_TAX_TOTAL
    ).toFixed(2);

    // --- Effects ---

    // Effect to calculate and set subtotal when cart items change
    useEffect(() => {
        const itemsTotal = cartState.cart.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const qty = parseFloat(item.qty) || 0;
            return sum + (price * qty);
        }, 0);
        setSubtotal(itemsTotal);
    }, [cartState.cart]);

    // Effect to fetch user data for authenticated users (pre-fill checkout form)
    useEffect(() => {
        const loadUserData = async () => {
            if (isAuthenticated && user?.id) {
                try {
                    const data = await fetchUserById(user.id);
                    dispatchForm({ type: 'LOAD_USER_DATA', payload: data });
                    // Set default shipping address ID if available and not already set
                    if (data?.addresses?.length > 0 && !selectedAddressId) {
                        const defaultAddr = data.addresses.find(addr => addr.isDefaultShipping) || data.addresses[0];
                        if (defaultAddr) {
                            setSelectedAddressId(defaultAddr.id);
                        }
                    }
                } catch (err) {
                    console.error("Failed to fetch user data:", err);
                    showSnackbar("Failed to load user address information.", "error");
                }
            }
        };
        loadUserData();
    }, [isAuthenticated, user?.id, selectedAddressId, showSnackbar]);

    // Effect to retrieve selected address ID after PayPal redirect
    useEffect(() => {
        const storedAddressId = localStorage.getItem("selectedAddressId");
        if (storedAddressId) {
            setSelectedAddressId(storedAddressId);
            localStorage.removeItem("selectedAddressId"); // Clean up
        }
    }, []);

    // Effect to handle PayPal return query parameters
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
                    dispatch: cartDispatch,
                    user,
                    showSnackbar,
                    router,
                    checkoutAmount: guestData?.totalAmount || checkoutAmount,
                    setLoading,
                    shippingAddressId: guestData?.selectedAddressId || selectedAddressId,
                    isAuthenticated,
                    shippingCost: guestData?.shippingCost || MOCK_SHIPPING_COST,
                    promoCodeId: guestData?.promoCodeId || appliedPromoCodeId,
                    discountAmount: guestData?.discountAmount || discountAmount,
                    subtotal: guestData?.subtotal || subtotal,
                    guestCheckoutFormData: isAuthenticated ? null : guestData // Pass guest form data if applicable
                });
                setPaypalReturnInfo({ status: null, orderId: null }); // Clear after successful processing
            } else if (paymentStatus === 'cancelled' && paypalOrderId) {
                setLoading(false);
                showSnackbar("PayPal payment cancelled by user.", "warning");
                // Optionally call onPaymentError if you have a general payment error handler
                setPaypalReturnInfo({ status: null, orderId: null }); // Clear if cancelled
            } else if ((paymentStatus === 'failed' || paymentStatus === 'error') && paypalOrderId) {
                setLoading(false);
                showSnackbar("PayPal payment failed or encountered an error.", "error");
                // Optionally call onPaymentError
                setPaypalReturnInfo({ status: null, orderId: null }); // Clear if failed/error
            }
        }
    }, [searchParams, router, paypalProcessed, cartState, cartDispatch, user, showSnackbar, checkoutAmount, selectedAddressId, isAuthenticated, appliedPromoCodeId, discountAmount, subtotal]);


    // --- Handlers ---

    const handlePayPalPaymentError = useCallback((error) => {
        console.error("PayPal payment error:", error);
        showSnackbar("Payment failed. Please try again or choose another method.", "error");
        setLoading(false);
    }, [showSnackbar]);

    const handlePaymentSuccess = useCallback(async (transactionResult) => {
        // This unified handler is called by PaymentForm (for Braintree/Google Pay)
        // and by handlePayPalPaymentSuccessInternal (after PayPal redirect success)

        // Common logic for all successful payments:
        showSnackbar("Order placed successfully!", "success");
        cartDispatch({ type: "CLEAR_CART" });
        localStorage.removeItem("guestCheckoutData"); // Clean up any guest data

        // Now, trigger the order creation on your backend
        await handleCreateOrderInternal({
            cartState,
            dispatch: cartDispatch, // Use the cart dispatch to clear cart
            user,
            showSnackbar,
            router,
            checkoutAmount,
            setLoading,
            selectedPaymentMethod,
            isAuthenticated,
            shippingCost: MOCK_SHIPPING_COST,
            promoCodeId: appliedPromoCodeId,
            discountAmount: discountAmount,
            subtotal: subtotal,
            shippingAddressId: selectedAddressId, // For authenticated users
            guestCheckoutFormData: isAuthenticated ? null : { // Pass full guest form data
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                shipping: formData.shipping,
                billing: formData.sameAsShipping ? formData.shipping : formData.billing,
            },
            // Pass the payment method nonce/token if available from Braintree/Google Pay
            // For PayPal, this is handled via query params and the previous `handlePayPalPaymentSuccessInternal`
            paymentNonceOrToken: transactionResult?.nonce || transactionResult?.paymentMethodData?.tokenizationData?.token, // Braintree/Google Pay
            paypalOrderId: selectedPaymentMethod === 'paypal' ? paypalReturnInfo.orderId : null,
        });

        // After successful backend order creation, redirect
        // The handleCreateOrderInternal should ideally return the order ID for redirection
        // For now, assuming a generic success path or that handleCreateOrderInternal handles redirect.
        // If handleCreateOrderInternal doesn't redirect, uncomment the line below (with actual orderId):
        // router.push(`/order-confirmation/${orderId}`); // You need to get orderId from handleCreateOrderInternal's response
    }, [cartState, cartDispatch, user, showSnackbar, router, checkoutAmount, setLoading, selectedPaymentMethod, isAuthenticated, appliedPromoCodeId, discountAmount, subtotal, selectedAddressId, formData, paypalReturnInfo.orderId]);


    const handlePaymentError = useCallback((message) => {
        showSnackbar(`Payment failed: ${message}`, "error");
        setLoading(false);
    }, [showSnackbar]);


    const handleBack = useCallback(() => {
        if (selectedStep > 0) {
            setSelectedStep(prev => prev - 1);
            setShowFormErrors(false);
        }
    }, [selectedStep]);

    const handleNext = useCallback(async () => {
        setLoading(true);

        // Step 0: Cart -> Details
        if (selectedStep === 0) {
            setSelectedStep(1);
            setLoading(false);
        }
        // Step 1: Details -> Payment
        else if (selectedStep === 1) {
            let isValid = true;
            if (!isAuthenticated) {
                const errors = validateCheckoutForm(formData);
                if (Object.keys(errors).length > 0) {
                    showSnackbar("Please fill in all required personal details and addresses.", "error");
                    setShowFormErrors(true);
                    isValid = false;
                }
            }

            if (isValid) {
                // Store relevant guest data to localStorage before proceeding
                // This will be picked up by the PayPal redirect handler OR by the final order creation.
                const dataToStoreForRedirect = {
                    ...formData, // Personal and address details
                    totalAmount: parseFloat(checkoutAmount),
                    shippingCost: MOCK_SHIPPING_COST,
                    promoCodeId: appliedPromoCodeId,
                    discountAmount: discountAmount,
                    subtotal: subtotal,
                    selectedAddressId: isAuthenticated ? selectedAddressId : null,
                    isAuthenticated: isAuthenticated, // Store auth status
                };
                localStorage.setItem("guestCheckoutData", JSON.stringify(dataToStoreForRedirect));

                setSelectedStep(2);
            }
            setLoading(false);
        }
        // Step 2: Payment -> Process Order
        else if (selectedStep === 2) {
            // For PayPal, we initiate the redirect. The actual order creation happens after the redirect.
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
                // Note: The loading state will be managed by the PayPal redirect and subsequent effect
            }
            // For other methods (Card, Google Pay), the payment form itself will handle the payment
            // and call handlePaymentSuccess/handlePaymentError (passed as props).
            // So, no direct order creation here, as it's triggered by the PaymentForm's successful tokenization.
            // The loading state for these methods is also managed by the PaymentForm's internal logic.
            else {
                // For 'card' and 'google' methods, the PaymentForm component
                // is responsible for handling the payment and calling
                // onPaymentSuccess/onPaymentError.
                // We just need to ensure the button click triggers that.
                // The `setLoading(false)` here is fine, as the actual payment logic
                // and loading indication shifts to the PaymentForm.
                setLoading(false);
            }
        }
    }, [selectedStep, isAuthenticated, formData, checkoutAmount, appliedPromoCodeId, discountAmount, subtotal, selectedAddressId, selectedPaymentMethod, cartState, showSnackbar]);

    // This function can be passed to PaymentSummary for step changes (e.g. clicking on Stepper)
    const handleStepChange = useCallback((step) => {
        if (step >= 0 && step < 3) { // Ensure step is within valid range
            setSelectedStep(step);
        }
    }, []);

    const getPaymentSummaryButtonText = useCallback(() => {
        if (selectedStep === 0) return "Check Out Now";
        if (selectedStep === 1) return "Proceed to Payment";
        if (selectedStep === 2) {
            switch (selectedPaymentMethod) {
                case "paypal": return "Pay with PayPal";
                case "card": return "Pay with Card";
                case "apple-pay": return "Pay with Apple Pay"; // If you enable it
                case "google": return "Pay with Google Pay";
                default: return "Continue to Order";
            }
        }
        return "";
    }, [selectedStep, selectedPaymentMethod]);


    return {
        // States
        selectedStep,
        loading,
        selectedPaymentMethod,
        showFormErrors,
        discountAmount,
        appliedPromoCodeId,
        subtotal,
        formData, // Entire form data
        selectedAddressId,
        paypalReturnInfo, // For debugging/display if needed

        // Setters for PaymentSummary and PaymentForm
        setLoading, // Allow children to control loading for their operations
        setSelectedPaymentMethod,
        setDiscountAmount,
        setAppliedPromoCodeId,
        setSubtotal,
        setSelectedAddressId,
        dispatchForm, // Allow CheckoutForm to update its fields

        // Handlers
        handleBack,
        handleNext,
        handleStepChange, // For Stepper component
        getPaymentSummaryButtonText,
        handlePaymentSuccess, // Pass to PaymentForm
        handlePaymentError,   // Pass to PaymentForm

        // Constants
        MOCK_SHIPPING_COST,
        MOCK_TAX_TOTAL,
        ORDER_CURRENCY,
        checkoutAmount,
    };
};