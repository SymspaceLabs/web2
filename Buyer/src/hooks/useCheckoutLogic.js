// hooks/useCheckoutLogic.js
import { useState, useEffect, useCallback } from "react";
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
import { validateCheckoutDetails, processGuestCheckout } from "@/utils/checkoutHelpers";

export const MOCK_SHIPPING_COST = 4.99;
export const MOCK_TAX_TOTAL = 0.00;
export const ORDER_CURRENCY = "USD";

export const useCheckoutLogic = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { state: cartState, dispatch } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { showSnackbar } = useSnackbar();

    const [selectedStep, setSelectedStep] = useState(0);
    const [sameAsShipping, setSameAsShipping] = useState(true); // <--- This needs to be returned
    const [userData, setUserData] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [shipping, setShipping] = useState({
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "US",
        zip: ""
    });
    const [billing, setBilling] = useState({
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "US",
        zip: ""
    });
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("paypal");
    const [showShippingFormErrors, setShowShippingFormErrors] = useState(false);
    const [paypalProcessed, setPaypalProcessed] = useState(false);
    const [paypalReturnInfo, setPaypalReturnInfo] = useState({ status: null, orderId: null });
    const [discountAmount, setDiscountAmount] = useState(0);
    const [appliedPromoCodeId, setAppliedPromoCodeId] = useState(null);
    const [subtotal, setSubtotal] = useState(0);

    const calculateTotalAmount = useCallback(() => {
        let itemsTotal = cartState.cart.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const qty = parseFloat(item.qty) || 0;
            return sum + (price * qty);
        }, 0);

        let finalItemsTotal = itemsTotal - (parseFloat(discountAmount) || 0);
        if (finalItemsTotal < 0) finalItemsTotal = 0;

        const totalWithShippingAndTax = finalItemsTotal + MOCK_SHIPPING_COST + MOCK_TAX_TOTAL;
        return Number(totalWithShippingAndTax).toFixed(2);
    }, [cartState.cart, discountAmount]);

    const checkoutAmount = calculateTotalAmount();

    // Effect to update subtotal state
    useEffect(() => {
        const itemsTotal = cartState.cart.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const qty = parseFloat(item.qty) || 0;
            return sum + (price * qty);
        }, 0);
        setSubtotal(itemsTotal);
    }, [cartState.cart]);

    // Fetch User Data
    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserById(user.id);
                setUserData(data);
            } catch (err) {
                console.error("Failed to fetch user data:", err);
                showSnackbar("Failed to load user profile.", "error");
            }
        };
        if (isAuthenticated && user?.id) {
            getUserData();
        }
    }, [isAuthenticated, user?.id, showSnackbar]);

    // Retrieve selected address ID after PayPal redirect
    useEffect(() => {
        const storedAddressId = localStorage.getItem("selectedAddressId");
        if (storedAddressId) {
            setSelectedAddressId(storedAddressId);
            localStorage.removeItem("selectedAddressId");
        }
    }, []);

    const handlePayPalPaymentError = useCallback((error) => {
        console.error("PayPal Payment Error:", error);
        showSnackbar("Payment failed. Please try again or choose another method.", "error");
        setLoading(false);
    }, [showSnackbar]);

    const handleSaveChanges = useCallback(async () => {
        setLoading(true);
        if (isAuthenticated) {
            localStorage.setItem("selectedAddressId", selectedAddressId);
        }
        setLoading(false);
    }, [isAuthenticated, selectedAddressId]);

    const handleBack = useCallback(() => {
        if (selectedStep > 0) {
            setSelectedStep(prev => prev - 1);
            setShowShippingFormErrors(false);
        }
    }, [selectedStep]);

    // Effect to capture PayPal return query parameters and process payment
    useEffect(() => {
        const paymentStatus = searchParams.get('paymentStatus');
        const paypalOrderId = searchParams.get('token');

        if (paymentStatus && !paypalProcessed) {
            setPaypalProcessed(true);
            setPaypalReturnInfo({ status: paymentStatus, orderId: paypalOrderId });

            const storedGuestCheckoutData = localStorage.getItem("guestCheckoutData");
            const guestData = storedGuestCheckoutData ? JSON.parse(storedGuestCheckoutData) : null;

            // Clear the URL parameters
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.delete('paymentStatus');
            newSearchParams.delete('token');
            router.replace(`${window.location.pathname}?${newSearchParams.toString()}`, { shallow: true });

            if (paymentStatus === 'success' && paypalOrderId) {
                setLoading(false);
                handlePayPalPaymentSuccessInternal({
                    paypalOrderId,
                    cartState,
                    dispatch,
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
                });
                setPaypalReturnInfo({ status: null, orderId: null });
            } else if (paymentStatus === 'cancelled' || paymentStatus === 'failed' || paymentStatus === 'error') {
                setLoading(false);
                showSnackbar(`PayPal payment ${paymentStatus}. Please try again.`, paymentStatus === 'cancelled' ? "warning" : "error");
                handlePayPalPaymentError(`User cancelled or payment ${paymentStatus}.`);
                setPaypalReturnInfo({ status: null, orderId: null });
            }
        }
    }, [searchParams, router, paypalProcessed, cartState, dispatch, user, showSnackbar, checkoutAmount, selectedAddressId, isAuthenticated, appliedPromoCodeId, discountAmount, handlePayPalPaymentError, subtotal]);


    const handleStepChange = useCallback((step) => {
        if (step >= 0 && step < 3) {
            setSelectedStep(step);
        }
    }, []);

    const handleAdvanceStep = useCallback(async () => {
        setLoading(true);

        if (selectedStep < 2) {
            if (selectedStep === 1) { // Details step validation
                if (!isAuthenticated) {
                    const validationResult = validateCheckoutDetails({
                        firstName,
                        lastName,
                        email,
                        shipping,
                        sameAsShipping,
                        billing
                    });

                    if (!validationResult.isValid) {
                        showSnackbar(validationResult.message, "error");
                        setShowShippingFormErrors(true);
                        setLoading(false);
                        return;
                    }
                    setShowShippingFormErrors(false);
                }
                await handleSaveChanges();
            }
            setSelectedStep(prev => prev + 1);
            setLoading(false);
        } else if (selectedStep === 2) { // Payment step
            const dataToStoreForRedirect = {
                firstName,
                lastName,
                email,
                shipping,
                billing: sameAsShipping ? shipping : billing,
                cartItems: cartState.cart,
                totalAmount: checkoutAmount,
                shippingCost: MOCK_SHIPPING_COST,
                promoCodeId: appliedPromoCodeId,
                discountAmount: discountAmount,
                selectedAddressId: selectedAddressId,
                subtotal: subtotal,
            };
            localStorage.setItem("guestCheckoutData", JSON.stringify(dataToStoreForRedirect));

            if (selectedPaymentMethod === "paypal") {
                await initiatePayPalRestApiPayment({
                    cartState,
                    showSnackbar,
                    checkoutAmount,
                    setLoading,
                    shippingCost: MOCK_SHIPPING_COST,
                    taxTotal: MOCK_TAX_TOTAL,
                    discountAmount,
                });
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
                    try {
                        const guestOrderData = await processGuestCheckout({
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
                            subtotal: subtotal,
                            // paypalOrderId: paypalReturnInfo.orderId, // Only if this was a PayPal callback for guest
                        });
                        showSnackbar("Order placed successfully!", "success");
                        dispatch({ type: "CLEAR_CART" });
                        localStorage.removeItem("guestCheckoutData");
                        router.push(`/order-confirmation/${guestOrderData.data.id}`);
                    } catch (error) {
                        console.error("Guest checkout error:", error);
                        showSnackbar(`Failed to place order: ${error.message}`, "error");
                    } finally {
                        setLoading(false);
                    }
                }
            } else if (selectedPaymentMethod === "google") {
                showSnackbar("Google Pay selected! (Integration pending)", "info");
                setLoading(false);
            } else {
                // Handle other payment methods or default behavior
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
                    try {
                        const guestOrderData = await processGuestCheckout({
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
                            subtotal: subtotal,
                        });
                        showSnackbar("Order placed successfully!", "success");
                        dispatch({ type: "CLEAR_CART" });
                        localStorage.removeItem("guestCheckoutData");
                        router.push(`/order-confirmation/${guestOrderData.data.id}`);
                    } catch (error) {
                        console.error("Guest checkout error:", error);
                        showSnackbar(`Failed to place order: ${error.message}`, "error");
                    } finally {
                        setLoading(false);
                    }
                }
            }
        } else {
            setLoading(false);
        }
    }, [
        selectedStep, isAuthenticated, firstName, lastName, email, shipping,
        sameAsShipping, billing, showSnackbar, handleSaveChanges, cartState,
        checkoutAmount, appliedPromoCodeId, discountAmount, selectedPaymentMethod,
        selectedAddressId, dispatch, user, router, userData, subtotal
    ]);


    const getPaymentSummaryButtonText = useCallback(() => {
        if (selectedStep === 0) {
            return "Check Out Now";
        } else if (selectedStep === 1) {
            return "Proceed to Payment";
        } else if (selectedStep === 2) {
            switch (selectedPaymentMethod) {
                case "paypal": return "Pay with PayPal";
                case "card": return "Pay with Card";
                case "apple-pay": return "Pay with Apple Pay";
                case "google": return "Pay with Google Pay";
                default: return "Continue to Order";
            }
        }
        return "";
    }, [selectedStep, selectedPaymentMethod]);

    return {
        // States
        selectedStep,
        sameAsShipping, // <--- Add this line
        userData,
        firstName, setFirstName,
        lastName, setLastName,
        email, setEmail,
        shipping, setShipping,
        billing, setBilling,
        selectedAddressId, setSelectedAddressId,
        loading, setLoading,
        selectedPaymentMethod, setSelectedPaymentMethod,
        showShippingFormErrors, setShowShippingFormErrors,
        discountAmount, setDiscountAmount,
        appliedPromoCodeId, setAppliedPromoCodeId,
        subtotal, setSubtotal,
        checkoutAmount,
        cartState,
        isAuthenticated,

        // Handlers
        handleStepChange,
        handleBack,
        handleNext: handleAdvanceStep, // Renamed for clarity within the hook
        getPaymentSummaryButtonText,
        setSameAsShipping, // <--- Add this line
    };
};