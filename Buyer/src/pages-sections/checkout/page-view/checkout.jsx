"use client";

// ======================================================
// Section 1: Module Imports
// ======================================================

import { useCart } from "hooks/useCart";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Grid, Box, Typography } from "@mui/material";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useRouter, useSearchParams } from 'next/navigation';

import Stepper from "../stepper";
import CartItem from "../cart-item";
import PaymentForm from "../payment-form";
import CheckoutForm from "../checkout-form";
import PaymentSummary from "../payment-summary";

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
        country: "",
        zip: ""
    });
    // Stores the billing address details.
    const [billing, setBilling] = useState({
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        zip: ""
    });
    const [loading, setLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
    const [paypalProcessed, setPaypalProcessed] = useState(false); // Flag to prevent multiple PayPal processing
    // New state to hold PayPal return parameters, persisting across renders
    const [paypalReturnInfo, setPaypalReturnInfo] = useState({ status: null, orderId: null });


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
     * Callback function for when a PayPal payment is successfully completed (captured).
     * This is triggered after the user returns from PayPal and the capture API call succeeds (backend handled).
     * @param {object} details - Contains `paypalOrderId` from URL query parameters.
     */
    const handlePayPalPaymentSuccessInternal = async ({ paypalOrderId }) => { // Renamed from handlePayPalPaymentSuccess
        setLoading(true); // Activates loading for internal order creation.

        try {
            // Ensures user is authenticated.
            if (!isAuthenticated || !user?.id) {
                showSnackbar("User not authenticated. Please sign in.", "error");
                setLoading(false);
                return;
            }

            // Retrieves shipping address ID. `userData` should now be populated by the `useEffect`'s wait.
            const shippingAddressId = userData?.addresses?.[0]?.id;
            if (!shippingAddressId) {
                // This scenario should be rare now with the `useEffect` wait.
                showSnackbar("No shipping address found for this user. Please add one.", "error");
                setLoading(false);
                return;
            }

            // Maps cart items to backend format.
            const items = cartState.cart.map(item => ({
                variantId: item.variant,
                quantity: item.qty,
            }));

            // Constructs the payload for your backend's order creation API.
            const payload = {
                userId: user.id,
                items,
                shippingAddressId,
                paymentMethod: "paypal", // Explicitly sets payment method to "paypal".
                totalAmount: parseFloat(checkoutAmount),
                paypalOrderId: paypalOrderId // Stores PayPal's order ID for reference.
            };

            // API call to your backend's `/orders` endpoint to record the PayPal order.
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${user.token}` // Include auth token if needed.
                },
                body: JSON.stringify(payload),
            });

            const responseBody = await res.json();

            // Checks if the API response was successful.
            if (!res.ok) {
                throw new Error(responseBody.message || `Failed to create internal order after PayPal success.`);
            }

            // Displays success message, clears cart, and redirects to the order detail page.
            showSnackbar(`PayPal order successfully placed and recorded!`, "success");
            dispatch({ type: "CLEAR_CART" });
            router.push(`/orders/${responseBody.data.id}`);

        } catch (error) {
            // Logs and displays an error message if recording the order fails.
            console.error("Error creating internal order after PayPal success:", error);
            showSnackbar(`Failed to record order after PayPal payment: ${error.message}`, "error");
        } finally {
            setLoading(false); // Ensures loading is off.
        }
    };

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
                country: shipping.country.value || 'US', // Extracts the country value correctly.
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
    // Runs when `userData` or `sameAsShipping` changes.
    useEffect(() => {
        // Checks if user data and addresses are available.
        if (userData && userData.addresses && userData.addresses.length > 0) {
            const defaultAddress = userData.addresses[0]; // Uses the first address as default.

            // Creates a new shipping address object.
            const newShipping = {
                address1: defaultAddress.address1 || "",
                address2: defaultAddress.address2 || "",
                city: defaultAddress.city || "",
                state: defaultAddress.state || "",
                country: defaultAddress.country || "US",
                zip: defaultAddress.zip || "",
            };
            setShipping(newShipping); // Sets the shipping address.

            // If `sameAsShipping` is true, updates the billing address to match shipping.
            // Includes a check to prevent infinite loops if values are already identical.
            if (sameAsShipping) {
                if (JSON.stringify(billing) !== JSON.stringify(newShipping)) {
                    setBilling(newShipping);
                }
            }
        } else if (userData && userData.addresses && userData.addresses.length === 0) {
            // If user data loaded but no addresses exist, clears shipping and billing.
            setShipping({
                address1: "", address2: "", city: "", state: "", country: "", zip: ""
            });
            setBilling({
                address1: "", address2: "", city: "", state: "", country: "", zip: ""
            });
        }
        // Dependencies array: effect re-runs if any of these values change.
    }, [userData, sameAsShipping, billing]);

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
            console.log("Returned from PayPal: Payment successful. PayPal Order ID:", paypalOrderId);
            handlePayPalPaymentSuccessInternal({ paypalOrderId }); // Calls success handler.
            // Clear paypalReturnInfo to prevent re-processing on subsequent userData updates
            setPaypalReturnInfo({ status: null, orderId: null });
        } else if (paymentStatus === 'cancelled' && paypalOrderId) {
            setLoading(false);
            console.log("Returned from PayPal: Payment cancelled.");
            showSnackbar("PayPal payment cancelled by user.", "warning");
            handlePayPalPaymentError("User cancelled payment.");
            setPaypalReturnInfo({ status: null, orderId: null });
        } else if ((paymentStatus === 'failed' || paymentStatus === 'error') && paypalOrderId) {
            setLoading(false);
            console.error("Returned from PayPal: Payment failed or error occurred. PayPal Order ID:", paypalOrderId);
            showSnackbar("PayPal payment failed or encountered an error.", "error");
            handlePayPalPaymentError("Payment failed or error occurred.");
            setPaypalReturnInfo({ status: null, orderId: null });
        }
        // Dependencies:
        // - `paypalReturnInfo`: Triggers when PayPal return params are initially set.
        // - `userData`: Crucially, this ensures the effect re-evaluates when userData is fetched (after reload).
        // - `showSnackbar`: For displaying messages.
        // - `handlePayPalPaymentSuccessInternal`, `handlePayPalPaymentError`: Stable function references.
    }, [paypalReturnInfo, userData, showSnackbar, handlePayPalPaymentSuccessInternal, handlePayPalPaymentError]);


    /**
     * Handles advancing to the next step in the checkout process.
     * For PayPal, it initiates the REST API flow by creating a PayPal order on the backend.
     * For other methods, it proceeds directly to order creation.
     */
    const handleNext = async () => {
        setLoading(true); // Activates loading indicator.

        if (selectedStep < 2) { // If not on the final (Payment) step (i.e., on Cart or Details step)
            if (selectedStep === 1) {
                await handleSaveChanges(); // Saves user details when moving from 'Details' to 'Payment'.
            }
            setSelectedStep(prev => prev + 1); // Moves to the next step.
            setLoading(false); // Deactivates loading after successful step transition.
        } else if (selectedStep === 2) { // If on the final 'Payment' step
            if (selectedPaymentMethod === "paypal") {
                await initiatePayPalRestApiPayment(); // Initiates PayPal REST API flow.
            } else if (selectedPaymentMethod === "card") {
                // For 'card' payment, this is a placeholder. In a real app, this would involve
                // integrating with a payment gateway (e.g., Stripe, another PayPal API for direct card processing).
                showSnackbar("Card payment (direct) not fully implemented in this example. Simulating direct order.", "info");
                await handleCreateOrderInternal(); // Simulates direct order creation.
                setLoading(false);
            } else {
                // For other payment methods (e.g., "cash on delivery"), proceeds to create the order directly.
                if (isAuthenticated) {
                    await handleCreateOrderInternal();
                } else {
                    showSnackbar("Sign In to make payment", "error"); // Prompts user to sign in if not authenticated.
                }
                setLoading(false); // Deactivates loading for non-PayPal methods.
            }
        } else {
            setLoading(false); // Deactivates loading if no action is taken.
        }
    };

    /**
     * Initiates the PayPal payment flow using the REST API.
     * This involves creating an order on your backend (which then calls PayPal's API)
     * and redirecting the user to PayPal for approval.
     */
    const initiatePayPalRestApiPayment = async () => {
        setLoading(true); // Activates loading state.
        try {
            // Ensures user is authenticated before proceeding with PayPal.
            if (!isAuthenticated || !user?.id) {
                showSnackbar("User not authenticated. Please sign in.", "error");
                setLoading(false);
                return;
            }

            // Maps cart items to PayPal's required item format.
            const items = cartState.cart.map(item => ({
                name: item.name,
                unit_amount: {
                    currency_code: "USD",
                    value: item.price.toFixed(2),
                },
                quantity: item.qty,
            }));

            // Constructs the order payload for PayPal, including breakdown of amount.
            const orderDataForPayPal = {
                intent: "CAPTURE", // Indicates that this order will be captured (funds transferred) later.
                purchase_units: [{
                    amount: {
                        currency_code: "USD",
                        value: checkoutAmount, // Total amount for the order.
                        breakdown: { // Detailed breakdown of the total amount.
                            item_total: { currency_code: "USD", value: items.reduce((sum, i) => sum + (parseFloat(i.unit_amount.value) * i.quantity), 0).toFixed(2) },
                            shipping: { currency_code: "USD", value: MOCK_SHIPPING_COST.toFixed(2) },
                            tax_total: { currency_code: "USD", value: MOCK_TAX_TOTAL.toFixed(2) },
                        }
                    },
                    items: items, // List of items in the order.
                    payee: {
                        email_address: "sb-merchant@example.com" // Sandbox merchant email. In production, this is usually configured on the backend.
                    }
                }],
                application_context: {
                    // URLs where PayPal redirects the user after approval or cancellation.
                    return_url: `${window.location.origin}/checkout?paymentStatus=success`,
                    cancel_url: `${window.location.origin}/checkout?paymentStatus=cancelled`,
                    shipping_preference: "NO_SHIPPING" // Controls how shipping address is handled by PayPal.
                }
            };

            console.log("Frontend: Calling backend to create PayPal order with payload:", orderDataForPayPal);

            // API call to your backend to create a PayPal order.
            const createOrderResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/paypal/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${user.token}` // Uncomment if backend requires auth.
                },
                body: JSON.stringify(orderDataForPayPal),
            });

            // Checks if the backend API call was successful.
            if (!createOrderResponse.ok) {
                const errorData = await createOrderResponse.json();
                throw new Error(errorData.message || 'Failed to create PayPal order on backend.');
            }

            const paypalOrder = await createOrderResponse.json();
            console.log("Frontend: Received PayPal Order Response from backend:", paypalOrder);

            // Redirects the user to PayPal's approval URL.
            if (paypalOrder.approvalUrl) {
                window.location.href = paypalOrder.approvalUrl;
                // Loading state will naturally end as the user leaves the application.
            } else {
                throw new Error("No approval URL found from backend for PayPal order. Check backend response structure.");
            }

        } catch (error) {
            // Logs and displays an error message if PayPal initiation fails.
            console.error("Error initiating PayPal REST API payment:", error);
            showSnackbar(`Failed to start PayPal payment: ${error.message}`, "error");
            setLoading(false); // Deactivates loading if an error occurs before redirection.
        }
    };

    /**
     * This function handles order creation for payment methods that are NOT PayPal (REST API) or Card.
     * Examples: "Cash on Delivery", other direct integrations.
     * It makes an API call to your backend's `/orders` endpoint.
     */
    const handleCreateOrderInternal = async () => {
        setLoading(true); // Activates loading state.

        console.log(userData)

        try {
            // Ensures user is authenticated before creating an order.
            // if (!isAuthenticated || !user?.id) {
            //   showSnackbar("User not authenticated. Please sign in.", "error");
            //   setLoading(false);
            //   return;
            // }

            // Retrieves the shipping address ID from `userData`.
            const shippingAddressId = userData?.addresses?.[0]?.id;
            if (!shippingAddressId) {
                showSnackbar("No shipping address found for this user. Please add one.", "error");
                setLoading(false);
                return;
            }

            // Maps cart items to the format required by your backend's order creation API.
            const items = cartState.cart.map(item => ({
                variantId: item.variant,
                quantity: item.qty,
            }));

            // Checks if the cart is empty.
            if (items.length === 0) {
                showSnackbar("Your cart is empty. Please add items to proceed.", "error");
                setLoading(false);
                return;
            }

            // Constructs the payload for your backend's order creation API.
            const payload = {
                userId: user.id,
                items,
                shippingAddressId,
                paymentMethod: selectedPaymentMethod, // Uses the currently selected payment method.
                totalAmount: parseFloat(checkoutAmount), // Ensures totalAmount is a number.
            };

            // API call to your backend's `/orders` endpoint to create the order.
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${user.token}` // Include auth token if needed.
                },
                body: JSON.stringify(payload),
            });

            const responseBody = await res.json();

            // Checks if the API response was successful.
            if (!res.ok) {
                throw new Error(responseBody.message || `Failed to create order via ${selectedPaymentMethod}`);
            }

            // Displays success message, clears cart, and redirects to the order detail page.
            showSnackbar(`${selectedPaymentMethod} order successfully placed!`, "success");
            dispatch({ type: "CLEAR_CART" });
            router.push(`/orders/${responseBody.data.id}`);

        } catch (error) {
            // Logs and displays an error message if order creation fails.
            console.error("Error creating order (non-PayPal):", error);
            showSnackbar(`Failed to place order: ${error.message}`, "error");
        } finally {
            setLoading(false); // Always deactivates loading, regardless of success or failure.
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
