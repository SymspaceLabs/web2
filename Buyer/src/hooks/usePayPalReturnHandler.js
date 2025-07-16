// src/hooks/usePayPalReturnHandler.js
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSnackbar } from '@/contexts/SnackbarContext'; // Assuming this path
import {
    handlePayPalPaymentSuccessInternal,
    // You might also move initiatePayPalRestApiPayment here if it's closely related
} from '@/services/paymentService'; // Assuming this path

/**
 * Custom hook to handle PayPal payment return parameters and process the payment.
 *
 * @param {object} params - Parameters needed for PayPal processing.
 * @param {object} params.cartState - The current state of the cart.
 * @param {function} params.dispatch - The cart dispatch function.
 * @param {object} params.user - Authenticated user object.
 * @param {number} params.checkoutAmount - The final calculated checkout amount.
 * @param {function} params.setLoading - Function to set loading state.
 * @param {string | null} params.selectedAddressId - The ID of the selected shipping address.
 * @param {boolean} params.isAuthenticated - Authentication status.
 * @param {number} params.MOCK_SHIPPING_COST - Mock shipping cost.
 * @param {number} params.MOCK_TAX_TOTAL - Mock tax total.
 * @param {number} params.discountAmount - Applied discount amount.
 * @param {string | null} params.appliedPromoCodeId - Applied promo code ID.
 * @param {number} params.subtotal - The subtotal before shipping and tax.
 * @returns {object} An object containing paypalProcessed state and setPaypalProcessed function.
 */
export const usePayPalReturnHandler = ({
    cartState,
    dispatch,
    user,
    checkoutAmount,
    setLoading,
    selectedAddressId,
    isAuthenticated,
    MOCK_SHIPPING_COST,
    MOCK_TAX_TOTAL, // Although not directly used in success internal, keep for consistency if needed elsewhere
    discountAmount,
    appliedPromoCodeId,
    subtotal
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { showSnackbar } = useSnackbar();

    const [paypalProcessed, setPaypalProcessed] = useState(false);
    const [paypalReturnInfo, setPaypalReturnInfo] = useState({ status: null, orderId: null });

    const handlePayPalPaymentError = () => {
        showSnackbar("Payment failed. Please try again or choose another method.", "error");
        setLoading(false);
    };

    useEffect(() => {
        const paymentStatus = searchParams.get('paymentStatus');
        const paypalOrderId = searchParams.get('token');

        if (paymentStatus && !paypalProcessed) {
            setPaypalProcessed(true); // Mark as processed to prevent re-entry
            setPaypalReturnInfo({ status: paymentStatus, orderId: paypalOrderId });

            const storedGuestCheckoutData = localStorage.getItem("guestCheckoutData");
            const guestData = storedGuestCheckoutData ? JSON.parse(storedGuestCheckoutData) : null;

            // Clear the URL parameters
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
            } else if (paymentStatus === 'cancelled' && paypalOrderId) {
                setLoading(false);
                showSnackbar("PayPal payment cancelled by user.", "warning");
                handlePayPalPaymentError();
                setPaypalReturnInfo({ status: null, orderId: null });
            } else if ((paymentStatus === 'failed' || paymentStatus === 'error') && paypalOrderId) {
                setLoading(false);
                showSnackbar("PayPal payment failed or encountered an error.", "error");
                handlePayPalPaymentError();
                setPaypalReturnInfo({ status: null, orderId: null });
            }
        }
    }, [searchParams, router, paypalProcessed, cartState, dispatch, user, showSnackbar, checkoutAmount, setLoading, selectedAddressId, isAuthenticated, MOCK_SHIPPING_COST, appliedPromoCodeId, discountAmount, subtotal]);

    return { paypalProcessed, setPaypalProcessed, paypalReturnInfo, setPaypalReturnInfo };
};