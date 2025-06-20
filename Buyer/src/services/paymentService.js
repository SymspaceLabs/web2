/**
 * Handles the internal processing after a successful PayPal payment.
 * This includes recording the order in your backend, clearing the cart,
 * and redirecting the user to the order details page.
 *
 * @param {object} params - The parameters for the function.
 * @param {string} params.paypalOrderId - The order ID returned by PayPal.
 * @param {object} params.cartState - The current state of the cart from useCart hook.
 * @param {function} params.dispatch - The dispatch function from useCart hook.
 * @param {object} params.user - The authenticated user object.
 * @param {function} params.showSnackbar - Function to display snackbar messages.
 * @param {object} params.router - The Next.js router object.
 * @param {string} params.checkoutAmount - The total amount of the checkout.
 * @param {object} params.userData - The fetched user profile and addresses.
 * @param {function} params.setLoading - Function to set the loading state.
 */
export const handlePayPalPaymentSuccessInternal = async ({
    paypalOrderId,
    cartState,
    dispatch,
    user,
    showSnackbar,
    router,
    checkoutAmount,
    userData,
    setLoading,
}) => {
    setLoading(true); // Activates loading for internal order creation.

    try {
        // Ensures user is authenticated.
        if (!user?.id) { // isAuthenticated check should ideally happen before calling this function or be passed here too if needed
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
        router.push(`/orders/${responseBody.data.id}`); // Changed to /orders for consistency

    } catch (error) {
        // Logs and displays an error message if recording the order fails.
        console.error("Error creating internal order after PayPal success:", error);
        showSnackbar(`Failed to record order after PayPal payment: ${error.message}`, "error");
    } finally {
        setLoading(false); // Ensures loading is off.
    }
};

/**
 * Initiates the PayPal payment flow using the REST API.
 * This involves creating an order on your backend (which then calls PayPal's API)
 * and redirecting the user to PayPal for approval.
 *
 * @param {object} params - The parameters for the function.
 * @param {object} params.cartState - The current state of the cart from useCart hook.
 * @param {object} params.user - The authenticated user object.
 * @param {function} params.showSnackbar - Function to display snackbar messages.
 * @param {object} params.router - The Next.js router object.
 * @param {string} params.checkoutAmount - The total amount of the checkout.
 * @param {function} params.setLoading - Function to set the loading state.
 * @param {number} params.MOCK_SHIPPING_COST - The mock shipping cost.
 * @param {number} params.MOCK_TAX_TOTAL - The mock tax total.
 */
export const initiatePayPalRestApiPayment = async ({
    cartState,
    user,
    showSnackbar,
    router,
    checkoutAmount,
    setLoading,
    MOCK_SHIPPING_COST,
    MOCK_TAX_TOTAL,
}) => {
    setLoading(true); // Activates loading state.
    try {
        // Ensures user is authenticated before proceeding with PayPal.
        if (!user?.id) {
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
 *
 * @param {object} params - The parameters for the function.
 * @param {object} params.cartState - The current state of the cart from useCart hook.
 * @param {function} params.dispatch - The dispatch function from useCart hook.
 * @param {object} params.user - The authenticated user object.
 * @param {function} params.showSnackbar - Function to display snackbar messages.
 * @param {object} params.router - The Next.js router object.
 * @param {string} params.checkoutAmount - The total amount of the checkout.
 * @param {object} params.userData - The fetched user profile and addresses.
 * @param {function} params.setLoading - Function to set the loading state.
 * @param {string} params.selectedPaymentMethod - The currently selected payment method.
 * @param {boolean} params.isAuthenticated - Flag indicating if the user is authenticated.
 */
export const handleCreateOrderInternal = async ({
    cartState,
    dispatch,
    user,
    showSnackbar,
    router,
    checkoutAmount,
    userData,
    setLoading,
    selectedPaymentMethod,
    isAuthenticated, // Added isAuthenticated as a parameter
}) => {
    setLoading(true); // Activates loading state.

    try {
        // Ensures user is authenticated before creating an order.
        if (!isAuthenticated || !user?.id) { // This check is now externalized and passed in
          showSnackbar("User not authenticated. Please sign in.", "error");
          setLoading(false);
          return;
        }

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
