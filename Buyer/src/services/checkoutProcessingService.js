// src/services/checkoutProcessingService.js (new file)
import { validateCheckoutForm } from "./checkoutService";
import { initiatePayPalRestApiPayment, handleCreateOrderInternal, handleGuestCheckout } from "./paymentService";

export const processCheckoutStep = async ({
    selectedStep,
    isAuthenticated,
    // Form data
    firstName, lastName, email, shipping, billing, sameAsShipping,
    // Cart and financials
    cartState, checkoutAmount, MOCK_SHIPPING_COST, MOCK_TAX_TOTAL,
    discountAmount, appliedPromoCodeId, subtotal,
    // Other state/hooks
    showSnackbar, setLoading, router, dispatch, selectedAddressId, userData,
    selectedPaymentMethod, setShowShippingFormErrors, paypalReturnInfo
}) => {
    setLoading(true);

    if (selectedStep < 2) {
        if (selectedStep === 1) {
            if (!isAuthenticated) {
                const isValid = validateCheckoutForm({
                    firstName, lastName, email, shipping, billing, sameAsShipping,
                    showSnackbar, setShowShippingFormErrors
                });
                if (!isValid) {
                    setLoading(false);
                    return;
                }
            }
            // handleSaveChanges logic (if it remains simple, can be inlined or passed as a callback)
            if (isAuthenticated) {
                localStorage.setItem("selectedAddressId", selectedAddressId);
            }
        }
        setLoading(false);
        return true; // Indicate successful step change
    } else if (selectedStep === 2) {
        const dataToStoreForRedirect = {
            firstName, lastName, email, shipping,
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
                cartState, showSnackbar, checkoutAmount, setLoading,
                MOCK_SHIPPING_COST, MOCK_TAX_TOTAL, discountAmount,
            });
        } else if (selectedPaymentMethod === "google") {
            showSnackbar("Google Pay selected!", "info");
            setLoading(false);
        } else if (selectedPaymentMethod === "card") {
            const commonPayload = {
                cartState, dispatch, user, showSnackbar, router, checkoutAmount,
                setLoading, selectedPaymentMethod, isAuthenticated,
                shippingCost: MOCK_SHIPPING_COST, promoCodeId: appliedPromoCodeId,
                discountAmount: discountAmount,
            };

            if (isAuthenticated) {
                await handleCreateOrderInternal({ ...commonPayload, userData });
            } else {
                await handleGuestCheckout({
                    firstName, lastName, email, shipping, billing, sameAsShipping,
                    cartItems: cartState.cart, totalAmount: checkoutAmount,
                    shippingCost: MOCK_SHIPPING_COST, promoCodeId: appliedPromoCodeId,
                    discountAmount: discountAmount, subtotal: subtotal,
                    selectedPaymentMethod, paypalOrderId: paypalReturnInfo.orderId,
                    showSnackbar, dispatch, router, setLoading
                });
            }
        } else { // Fallback for other methods (e.g., if "card" is default but not chosen)
             const commonPayload = {
                cartState, dispatch, user, showSnackbar, router, checkoutAmount,
                setLoading, selectedPaymentMethod, isAuthenticated,
                shippingCost: MOCK_SHIPPING_COST, promoCodeId: appliedPromoCodeId,
                discountAmount: discountAmount,
            };

            if (isAuthenticated) {
                await handleCreateOrderInternal({ ...commonPayload, userData });
            } else {
                 await handleGuestCheckout({
                    firstName, lastName, email, shipping, billing, sameAsShipping,
                    cartItems: cartState.cart, totalAmount: checkoutAmount,
                    shippingCost: MOCK_SHIPPING_COST, promoCodeId: appliedPromoCodeId,
                    discountAmount: discountAmount, subtotal: subtotal,
                    selectedPaymentMethod, paypalOrderId: paypalReturnInfo.orderId,
                    showSnackbar, dispatch, router, setLoading
                });
            }
        }
        setLoading(false);
        return true; // Indicate successful payment initiation/order creation
    }
    setLoading(false);
    return false; // Indicate no action taken or failure
};