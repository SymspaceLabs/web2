"use client";

// ======================================================
// Section 1: Module Imports
// ======================================================

import { useCart } from "hooks/useCart";
import { useState, useEffect } from "react";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { H1 } from "@/components/Typography";



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
    const { state: cartState, dispatch } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { showSnackbar } = useSnackbar();
    const router = useRouter();
    const searchParams = useSearchParams();

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
        country: "", // Will store the country value (e.g., "US")
        zip: ""
    });
    // Stores the billing address details.
    const [billing, setBilling] = useState({
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "", // Will store the country value (e.g., "US")
        zip: ""
    });

    const [loading, setLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
    const [paypalProcessed, setPaypalProcessed] = useState(false); // Flag to prevent multiple PayPal processing
    // New state to hold PayPal return parameters, persisting across renders
    const [paypalReturnInfo, setPaypalReturnInfo] = useState({ status: null, orderId: null });
    // New state to control error visibility in shipping form
    const [showShippingFormErrors, setShowShippingFormErrors] = useState(false);

    // --- Subsection 3.3: Mock Financial Constants ---
    const MOCK_SHIPPING_COST = 4.99;
    const MOCK_TAX_TOTAL = 0.00;

    // --- Subsection 3.4: Derived Values ---
    const calculateTotalAmount = () => {
        const itemsTotal = cartState.cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);
        const totalWithShippingAndTax = itemsTotal + MOCK_SHIPPING_COST + MOCK_TAX_TOTAL;
        return totalWithShippingAndTax.toFixed(2);
    };

    // Stores the calculated total checkout amount. This will be used in API calls.
    const checkoutAmount = calculateTotalAmount();

    // --- Subsection 3.5: Event Handlers and Core Logic Functions (Moved Up) ---

    /**
     * Callback function for when a PayPal payment encounters an error or is cancelled.
     * @param {object | string} error - The error object or string message.
     */
    const handlePayPalPaymentError = (error) => {
        showSnackbar("Payment failed. Please try again or choose another method.", "error");
        setLoading(false); // Ensures loading is off.
    };

    /**
     * Handles saving user's checkout details (first name, last name, email, addresses).
     * This is typically called when moving from the 'Details' step.
     */
    const handleSaveChanges = async () => {
        setLoading(true); // Activates loading state.
        // Constructs the payload for updating user details and addresses.
        const payload = {
            firstName,
            lastName,
            email,
            addresses: [{ // Assumes the first address in the array is either new or an update.
                address1: shipping.address1,
                address2: shipping.address2,
                city: shipping.city,
                state: shipping.state,
                zip: shipping.zip,
                // Ensure country value is always a string. If your country selector returns an object
                // like { label: 'United States', value: 'US' }, then shipping.country should already
                // be updated to just 'US' by the setShipping in CheckoutForm.
                country: shipping.country || 'US', 
            }]
        };

        try {
            // API call to your backend to update user details and addresses.
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`, {
                method: 'PATCH', // Using PATCH for partial updates.
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${user.token}` // Uncomment if backend requires auth.
                },
                body: JSON.stringify(payload)
            });

            // Checks if the API response was successful.
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to save shipping details on backend.");
            }

            showSnackbar("Shipping details saved successfully.", "success"); // Displays success message.
        } catch (error) {
            // Logs and displays an error message if saving fails.
            showSnackbar(`Failed to save shipping details: ${error.message}`, "error");
        } finally {
            setLoading(false); // Always deactivates loading.
        }
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

    // --- Subsection 3.6: useEffect Hooks for Data Fetching and Side Effects (Revised Order) ---

    // Effect 1: Fetches user data (profile and addresses) from the backend.
    useEffect(() => {
        const fetchUserData = async () => {
            // Prevents fetching if the user is not authenticated or user ID is missing.
            if (!isAuthenticated || !user?.id) {
                setUserData(null); // Clears user data if not authenticated.
                return;
            }

            setLoading(true); // Activates loading state.
            try {
                // API call to fetch user profile data, including addresses.
                const userProfileResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${user.token}` // Uncomment if backend requires authentication token.
                    },
                });

                // Checks if the API response was successful.
                if (!userProfileResponse.ok) {
                    const errorData = await userProfileResponse.json();
                    throw new Error(errorData.message || 'Failed to fetch user profile.');
                }
                // Parses the JSON response.
                const userProfile = await userProfileResponse.json();

                // Updates the `userData` state with the fetched profile and addresses.
                setUserData({
                    id: userProfile.id,
                    firstName: userProfile.firstName,
                    lastName: userProfile.lastName,
                    email: userProfile.email,
                    addresses: userProfile.addresses, // Addresses are now part of the user profile.
                });

                // Initializes form state variables with fetched user data.
                setFirstName(userProfile.firstName || "");
                setLastName(userProfile.lastName || "");
                setEmail(userProfile.email || "");

            } catch (error) {
                // Logs and displays an error message if fetching fails.
                console.error("Error fetching user data:", error);
                showSnackbar(`Failed to load user information: ${error.message}`, "error");
                setUserData(null); // Clears data on error to prevent inconsistent state.
            } finally {
                setLoading(false); // Deactivates loading state.
            }
        };

        // Conditional call: only fetch if authenticated, user ID exists, and `userData` hasn't been loaded.
        // Also ensure not to refetch unnecessarily if userData is already available.
        if (isAuthenticated && user?.id && !userData) {
            fetchUserData();
        }
        // Dependencies array: effect re-runs if any of these values change.
    }, [isAuthenticated, user?.id, process.env.NEXT_PUBLIC_BACKEND_URL, showSnackbar, userData]);

    // Effect 2: Populates shipping and billing addresses from fetched `userData`.
    // This effect now conditionally updates to prevent overwriting user input.
    useEffect(() => {
        if (userData && userData.addresses && userData.addresses.length > 0) {
            const defaultAddress = userData.addresses[0];

            // Normalize fetched country to a string if it's an object with a 'value' property
            const fetchedCountry = defaultAddress.country && typeof defaultAddress.country === 'object' 
                                 ? defaultAddress.country.value 
                                 : defaultAddress.country;

            const fetchedShippingData = {
                address1: defaultAddress.address1 || "",
                address2: defaultAddress.address2 || "",
                city: defaultAddress.city || "",
                state: defaultAddress.state || "",
                country: fetchedCountry || "US",
                zip: defaultAddress.zip || "",
            };

            // Check if current shipping state is "empty" (initial state)
            // or if the fetched data is genuinely different from the current state.
            const isShippingCurrentlyEmpty = Object.values(shipping).every(val => val === "");

            if (isShippingCurrentlyEmpty || JSON.stringify(shipping) !== JSON.stringify(fetchedShippingData)) {
                setShipping(fetchedShippingData);
            }

            // If `sameAsShipping` is true, updates the billing address to match shipping.
            // Includes a check to prevent infinite loops if values are already identical.
            if (sameAsShipping) {
                if (JSON.stringify(billing) !== JSON.stringify(fetchedShippingData)) {
                    setBilling(fetchedShippingData);
                }
            }
        } else if (userData && userData.addresses && userData.addresses.length === 0) {
            // If user data loaded but no addresses exist, clears shipping and billing.
            // Only clear if they are not already empty, to avoid unnecessary state updates.
            const isShippingCurrentlyEmpty = Object.values(shipping).every(val => val === "");
            const isBillingCurrentlyEmpty = Object.values(billing).every(val => val === "");

            if (!isShippingCurrentlyEmpty) {
                setShipping({
                    address1: "", address2: "", city: "", state: "", country: "", zip: ""
                });
            }
            if (!isBillingCurrentlyEmpty) {
                setBilling({
                    address1: "", address2: "", city: "", state: "", country: "", zip: ""
                });
            }
        }
        // Dependencies array: effect re-runs if `userData` or `sameAsShipping` changes.
        // `shipping` and `billing` are not direct dependencies to avoid infinite loops,
        // but their *current values* are checked inside the effect.
    }, [userData, sameAsShipping]); // Removed `billing` from dependencies here.

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
    }, [searchParams, router, paypalProcessed]); // Dependencies: only re-run if searchParams or paypalProcessed changes

    // Effect 3b: Processes PayPal return *after* userData is confirmed to be available.
    // This effect runs when `paypalReturnInfo` or `userData` changes.
    useEffect(() => {
        const { status: paymentStatus, orderId: paypalOrderId } = paypalReturnInfo;

        // Proceed only if payment status is success, order ID is present, and user data with addresses is loaded.
        if (paymentStatus === 'success' && paypalOrderId && userData?.addresses?.[0]?.id) {
            setLoading(false); // Reset loading to allow subsequent action
            handlePayPalPaymentSuccessInternal({
                paypalOrderId,
                cartState,
                dispatch,
                user,
                showSnackbar,
                router,
                checkoutAmount,
                userData,
                setLoading,
            });  // Calls success handler.
            // Clear paypalReturnInfo to prevent re-processing on subsequent userData updates
            setPaypalReturnInfo({ status: null, orderId: null });
        } else if (paymentStatus === 'cancelled' && paypalOrderId) {
            setLoading(false);
            showSnackbar("PayPal payment cancelled by user.", "warning");
            handlePayPalPaymentError("User cancelled payment.");
            setPaypalReturnInfo({ status: null, orderId: null });
        } else if ((paymentStatus === 'failed' || paymentStatus === 'error') && paypalOrderId) {
            setLoading(false);
            showSnackbar("PayPal payment failed or encountered an error.", "error");
            handlePayPalPaymentError("Payment failed or error occurred.");
            setPaypalReturnInfo({ status: null, orderId: null });
        }
        // Dependencies:
        // - `paypalReturnInfo`: Triggers when PayPal return params are initially set.
        // - `userData`: Crucially, this ensures the effect re-evaluates when userData is fetched (after reload).
        // - `showSnackbar`: For displaying messages.
    }, [paypalReturnInfo, userData, showSnackbar, handlePayPalPaymentError, cartState, dispatch, user, router, checkoutAmount, setLoading]);


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

    /**
     * Handles advancing to the next step in the checkout process.
     * For PayPal, it initiates the REST API flow by creating a PayPal order on the backend.
     * For other methods, it proceeds directly to order creation.
     */
    const handleNext = async () => {
        setLoading(true); // Activates loading indicator.

        if (selectedStep < 2) { // If not on the final (Payment) step (i.e., on Cart or Details step)
            if (selectedStep === 1) {
                // Validate personal details
                const isPersonalDetailsComplete = firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '';

                // Validate shipping address
                const requiredShippingFields = ['address1', 'city', 'state', 'zip', 'country'];
                const isShippingComplete = requiredShippingFields.every(field => {
                    const value = shipping[field];
                    // Handle both string and potentially object.value for country field
                    if (field === 'country') {
                        return typeof value === 'string' ? value.trim() !== '' : (value && typeof value.value === 'string' && value.value.trim() !== '');
                    }
                    return typeof value === 'string' ? value.trim() !== '' : Boolean(value); // For other fields, just check for truthiness if not string
                });

                if (!isPersonalDetailsComplete || !isShippingComplete) {
                    showSnackbar("Please fill in all required personal details and shipping address fields.", "error");
                    setShowShippingFormErrors(true); // Force show errors in ShippingForm
                    setLoading(false);
                    return; // Stop progression
                }
                setShowShippingFormErrors(false); // Reset if validation passes
                await handleSaveChanges(); // Saves user details when moving from 'Details' to 'Payment'.
            }
            setSelectedStep(prev => prev + 1); // Moves to the next step.
            setLoading(false); // Deactivates loading after successful step transition.
        } else if (selectedStep === 2) { // If on the final 'Payment' step
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
                showSnackbar("Card payment (direct) not fully implemented in this example. Simulating direct order.", "info");
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
                }); // Simulates direct order creation.
            } else {
                // For other payment methods (e.g., "cash on delivery"), proceeds to create the order directly.
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
            // Text for the 'Payment' step, varies based on selected payment method.
            return selectedPaymentMethod === "paypal" || selectedPaymentMethod === "card"
                ? "Confirm Order"
                : "Place Order";
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
                    <>                      
                        {/* Renders the PaymentForm component, passing payment method state and handler. */}
                        <PaymentForm
                            handleBack={handleBack}
                            paymentMethod={selectedPaymentMethod}
                            setPaymentMethod={setSelectedPaymentMethod}
                        />
                        {/* Displays a loading message specifically for PayPal redirection. */}
                        {selectedPaymentMethod === "paypal" && loading && (
                            <Box mt={3}>
                                <Typography variant="body2" color="text.secondary" mt={2}>
                                    Redirecting to PayPal for secure payment...
                                </Typography>
                            </Box>
                        )}
                        {/* Conditionally render Google Pay button */}
                        {selectedPaymentMethod === "google"  && loading &&  (
                            <Box mt={3}>
                                <Typography variant="body2" color="text.secondary" mt={2}>
                                    Processing Google Pay payment...
                                </Typography>
                            </Box>
                        )}
                    </>
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
            

            <Grid container flexWrap="wrap-reverse" spacing={3}>
                {/* Left column: Main content area for Cart, Details, or Payment forms. */}

                <Grid item md={8} xs={12}>
                    
                    {renderMainContent()} {/* Renders the dynamic content based on the current step. */}
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
