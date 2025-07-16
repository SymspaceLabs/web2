"use client";

// ======================================================
// Section 1: Module Imports
// ======================================================

import { useCart } from "hooks/useCart";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { H1 } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { Grid, Box, Button } from "@mui/material";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useFetchUserData } from "@/hooks/useFetchUserData";
import { usePayPalReturnHandler } from "@/hooks/usePayPalReturnHandler";
import { processCheckoutStep } from "@/services/checkoutProcessingService"; // New import
import { getPaymentSummaryButtonText, calculateTotalAmount } from "@/services/checkoutService";

import Stepper from "../stepper";
import CartItem from "../cart-item";
import PaymentForm from "../payment-form";
import CheckoutForm from "../checkout-form";
import PaymentSummary from "../payment-summary";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

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

    const { state: cartState, dispatch } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { showSnackbar } = useSnackbar();

    // --- Subsection 3.2: State Management ---
    const [selectedStep, setSelectedStep] = useState(0);
    const [sameAsShipping, setSameAsShipping] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [shipping, setShipping] = useState({
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: 'US',
        zip: ""
    });
    // Stores the billing address details.
    const [billing, setBilling] = useState({
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: 'US', // Will store the country value (e.g., "US")
        zip: ""
    });

    const [loading, setLoading] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [showShippingFormErrors, setShowShippingFormErrors] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("paypal");

    // States to receive discount and promo code from PaymentSummary (for display and initial payload)
    const [discountAmount, setDiscountAmount] = useState(0);
    const [appliedPromoCodeId, setAppliedPromoCodeId] = useState(null);
    const [subtotal, setSubtotal] = useState(0); // New state for subtotal

    // Mock Financial Constants ---
    const MOCK_SHIPPING_COST = 4.99;
    const MOCK_TAX_TOTAL = 0.00;

    const checkoutAmount = calculateTotalAmount(
        cartState.cart,
        discountAmount,
        MOCK_SHIPPING_COST,
        MOCK_TAX_TOTAL
    );

    // Effect to update subtotal state when cart items or discount changes
    useEffect(() => {
        const itemsTotal = cartState.cart.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const qty = parseFloat(item.qty) || 0;
            return sum + (price * qty);
        }, 0);
        setSubtotal(itemsTotal);
    }, [cartState.cart]); // Depend on cartState.cart

    const userData = useFetchUserData(user, isAuthenticated);

    // Retrieve selected address ID after PayPal redirect
    useEffect(() => {
        const storedAddressId = localStorage.getItem("selectedAddressId");
        if (storedAddressId) {
            setSelectedAddressId(storedAddressId);
            localStorage.removeItem("selectedAddressId"); // Clean up
        }
    }, []);

    // Handles navigating back to the previous step in the checkout process.
    const handleBack = () => {
        if (selectedStep > 0) {
            setSelectedStep(prev => prev - 1);
            setShowShippingFormErrors(false);
        }
    };

    const { paypalReturnInfo } = usePayPalReturnHandler({
        cartState,
        dispatch,
        user,
        checkoutAmount,
        setLoading,
        selectedAddressId,
        isAuthenticated,
        MOCK_SHIPPING_COST,
        MOCK_TAX_TOTAL,
        discountAmount,
        appliedPromoCodeId,
        subtotal
    });

    /**
     * Handles the change of the checkout step.
     * @param {number} step - The index of the step to navigate to (0, 1, or 2).
     */
    const handleStepChange = (step) => {
        if (step >= 0 && step < 3) {
            setSelectedStep(step);
        }
    };


    /**
     * Handles advancing to the next step in the checkout process.
     * For PayPal, it initiates the REST API flow by creating a PayPal order on the backend.
     * For other methods, it proceeds directly to order creation.
     */
    const handleNext = async () => {
        const success = await processCheckoutStep({
            selectedStep,
            isAuthenticated,
            firstName, lastName, email, shipping, billing, sameAsShipping,
            cartState, checkoutAmount, MOCK_SHIPPING_COST, MOCK_TAX_TOTAL,
            discountAmount, appliedPromoCodeId, subtotal,
            showSnackbar, setLoading, router, dispatch, selectedAddressId, userData,
            selectedPaymentMethod, setShowShippingFormErrors, paypalReturnInfo
        });

        if (success && selectedStep < 2) {
            setSelectedStep(prev => prev + 1);
        }
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
            case 1: // Shipping Details Step
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

            {selectedStep === 0 ? (
                <Button onClick={() => router.push('/products/search/all')} sx={{ mb: 2 }}>
                    <ChevronLeftIcon />
                    <H1>Continue Shopping</H1>
                </Button>
            ) : (
                selectedStep > 0 && (
                    <Button onClick={handleBack} sx={{ mb: 2 }}>
                        <ChevronLeftIcon />
                        <H1>Back</H1>
                    </Button>
                )
            )}

            <Grid container flexWrap="wrap-reverse" spacing={3}>
                <Grid item md={8} xs={12}>
                    {renderMainContent()}
                </Grid>
                <Grid item md={4} xs={12}>
                    <PaymentSummary
                        btnText={getPaymentSummaryButtonText(selectedStep, selectedPaymentMethod)}
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
