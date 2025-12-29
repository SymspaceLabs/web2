"use client";

/**
 * Handles the internal processing after a successful PayPal payment.
 * @param {object} params - The parameters for the function.
 * @param {string} params.paypalOrderId - The order ID returned by PayPal.
 * @param {object} params.cartState - The current state of the cart from useCart hook.
 * @param {function} params.dispatch - The dispatch function from useCart hook.
 * @param {object} params.user - The authenticated user object (PASSED FROM COMPONENT).
 * @param {function} params.showSnackbar - Function to display snackbar messages.
 * @param {object} params.router - The Next.js router object.
 * @param {string} params.checkoutAmount - The total amount of the checkout.
 * @param {string} params.shippingAddressId - The ID of the selected shipping address for authenticated users.
 * @param {boolean} params.isAuthenticated - Flag indicating if the user is authenticated (PASSED FROM COMPONENT).
 * @param {number} params.shippingCost - The shipping cost for the order.
 * @param {string} [params.promoCodeId] - The ID of the applied promo code (optional).
 * @param {number} [params.discountAmount] - The discount amount applied to the order (optional).
 */
export const handlePayPalPaymentSuccessInternal = async ({
  paypalOrderId,
  cartState,
  dispatch,
  user, // User is received as a parameter
  showSnackbar,
  router,
  checkoutAmount,
  setLoading,
  shippingAddressId,
  isAuthenticated,
  shippingCost,
  promoCodeId, // Added promoCodeId
  discountAmount, // Added discountAmount
  subtotal
}) => {
  setLoading(true);

  let guestData = {};

  try {
    const items = cartState.cart.map(item => ({
      variantId: item.variant,
      quantity: item.qty,
    }));

    // This logic relies on the isAuthenticated value passed from the component
    const endpoint = isAuthenticated ? "/orders" : "/orders/guest-checkout";

    if (!isAuthenticated) {
      const getGuestCheckoutData = () => {
        if (typeof window !== "undefined") {
          const data = localStorage.getItem("guestCheckoutData");
          return data ? JSON.parse(data) : null;
        }
        return null;
      };
      guestData = getGuestCheckoutData();

      if (!guestData) {
        throw new Error("Guest data is missing from localStorage.");
      }
    }

    const payload = isAuthenticated
      ? {
          userId: user.id, // user from parameter
          items,
          shippingAddressId,
          paymentMethod: "paypal",
          totalAmount: parseFloat(checkoutAmount),
          paypalOrderId,
          shippingCost: shippingCost,
          promoCodeId: promoCodeId, // Included promoCodeId in payload
          discountAmount: discountAmount, // Included discountAmount in payload
          subtotal
        }
      : {
          firstName: guestData.firstName,
          lastName: guestData.lastName,
          email: guestData.email,
          shippingAddress: guestData.shipping,
          billingAddress: guestData.billing,
          items: guestData.cartItems.map(item => ({
            variantId: item.variant,
            quantity: item.qty,
          })),
          paymentMethod: "paypal",
          totalAmount: parseFloat(guestData.totalAmount),
          paypalOrderId,
          shippingCost: guestData.shippingCost,
          promoCodeId: guestData.promoCodeId, // Included promoCodeId from guest data
          discountAmount: guestData.discountAmount, // Included discountAmount from guest data
          subtotal
        };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseBody = await res.json();

    if (!res.ok) {
      throw new Error(responseBody.message || "Failed to create order.");
    }

    showSnackbar("PayPal order placed successfully!", "success");
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("guestCheckoutData");

    router.push(
      isAuthenticated
        ? `/orders/${responseBody.data.id}`
        : `/order-confirmation/${responseBody.data.id}`
    );
  } catch (error) {
    console.error("PayPal order creation failed:", error);
    showSnackbar(`Error: ${error.message}`, "error");
  } finally {
    setLoading(false);
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
 * @param {number} params.discountAmount - The discount amount applied to the order.
 */
export const initiatePayPalRestApiPayment = async ({
    cartState,
    showSnackbar,
    checkoutAmount,
    setLoading,
    MOCK_SHIPPING_COST,
    MOCK_TAX_TOTAL,
    discountAmount, // New parameter for discount amount
}) => {
    setLoading(true); // Activates loading state.
    try {
        // Ensure checkoutAmount is a positive number
        const finalCheckoutAmount = Math.max(0, parseFloat(checkoutAmount));

        // Maps cart items to PayPal's required item format.
        // The prices here are the original, undiscounted prices.
        const items = cartState.cart.map(item => ({
            name: item.name,
            unit_amount: {
                currency_code: "USD",
                value: item.price.toFixed(2),
            },
            quantity: item.qty,
        }));

        // Calculate the item total based on original (undiscounted) prices
        const originalItemTotal = items.reduce((sum, i) => sum + (parseFloat(i.unit_amount.value) * i.quantity), 0);

        // Constructs the order payload for PayPal, including breakdown of amount.
        const orderDataForPayPal = {
            intent: "CAPTURE", // Indicates that this order will be captured (funds transferred) later.
            purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: finalCheckoutAmount.toFixed(2), // Use the final calculated checkout amount
                    breakdown: { // Detailed breakdown of the total amount.
                        // item_total should be the original item total (undiscounted)
                        item_total: { currency_code: "USD", value: originalItemTotal.toFixed(2) },
                        shipping: { currency_code: "USD", value: MOCK_SHIPPING_COST.toFixed(2) },
                        tax_total: { currency_code: "USD", value: MOCK_TAX_TOTAL.toFixed(2) },
                        discount: { currency_code: "USD", value: discountAmount.toFixed(2) }, // Explicitly show discount
                    }
                },
                items: items, // List of items in the order with their original prices.
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
            },
            body: JSON.stringify(orderDataForPayPal),
        });

        // Checks if the backend API call was successful.
        if (!createOrderResponse.ok) {
            const errorData = await createOrderResponse.json();
            console.error("Backend error creating PayPal order:", errorData); // Log the full error data
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
    } finally {
        setLoading(false);
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
 * @param {number} params.shippingCost - The shipping cost for the order.
 * @param {string} [params.promoCodeId] - The ID of the applied promo code (optional).
 * @param {number} [params.discountAmount] - The discount amount applied to the order (optional).
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
    isAuthenticated,
    shippingCost,
    promoCodeId, // Added promoCodeId
    discountAmount, // Added discountAmount
}) => {
    setLoading(true); // Activates loading state.

    let guestData = {};

    try {
        const items = cartState.cart.map(item => ({
            variantId: item.variant,
            quantity: item.qty,
        }));

        const endpoint = isAuthenticated ? "/orders" : "/orders/guest-checkout";

        if (!isAuthenticated) {
            const getGuestCheckoutData = () => {
                if (typeof window !== "undefined") {
                    const data = localStorage.getItem("guestCheckoutData");
                    return data ? JSON.parse(data) : null;
                }
                return null;
            };
            guestData = getGuestCheckoutData();

            if (!guestData) {
                throw new Error("Guest data is missing from localStorage.");
            }
        }

        const payload = isAuthenticated
            ? {
                userId: user.id,
                items,
                shippingAddressId: userData?.addresses?.find(addr => addr.isDefault)?.id || userData?.addresses?.[0]?.id,
                paymentMethod: selectedPaymentMethod,
                totalAmount: parseFloat(checkoutAmount),
                shippingCost: shippingCost,
                promoCodeId: promoCodeId, // Included promoCodeId in payload
                discountAmount: discountAmount, // Included discountAmount in payload
            }
            : {
                firstName: guestData.firstName,
                lastName: guestData.lastName,
                email: guestData.email,
                shippingAddress: guestData.shipping,
                billingAddress: guestData.billing,
                items: guestData.cartItems.map(item => ({
                    variantId: item.variant,
                    quantity: item.qty,
                })),
                paymentMethod: selectedPaymentMethod,
                totalAmount: parseFloat(guestData.totalAmount),
                shippingCost: guestData.shippingCost,
                promoCodeId: guestData.promoCodeId, // Included promoCodeId from guest data
                discountAmount: guestData.discountAmount, // Included discountAmount from guest data
            };

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const responseBody = await res.json();

        if (!res.ok) {
            throw new Error(responseBody.message || "Failed to create order.");
        }

        showSnackbar("Order placed successfully!", "success");
        dispatch({ type: "CLEAR_CART" });
        localStorage.removeItem("guestCheckoutData"); // Clear guest data after successful order

        router.push(
            isAuthenticated
                ? `/orders/${responseBody.data.id}`
                : `/order-confirmation/${responseBody.data.id}`
        );
    } catch (error) {
        console.error("Order creation failed:", error);
        showSnackbar(`Error: ${error.message}`, "error");
    } finally {
        setLoading(false);
    }
};

/**
 * Handles the creation of an order for a guest user.
 * @param {object} payload - The guest checkout payload.
 * @param {function} showSnackbar - Function to display snackbar messages.
 * @param {function} dispatch - Cart dispatch function.
 * @param {object} router - Next.js router object.
 * @param {function} setLoading - Function to set loading state.
 */
export const handleGuestCheckout = async ({
    firstName,
    lastName,
    email,
    shipping,
    billing,
    sameAsShipping,
    cartItems,
    totalAmount,
    shippingCost,
    promoCodeId,
    discountAmount,
    subtotal,
    selectedPaymentMethod, // Pass this to determine if paypalOrderId is needed
    paypalOrderId, // Pass if it's a PayPal guest checkout
    showSnackbar,
    dispatch,
    router,
    setLoading
}) => {
    const guestPayload = {
        firstName,
        lastName,
        email,
        shipping,
        billing: sameAsShipping ? shipping : billing,
        cartItems: cartItems,
        totalAmount: parseFloat(totalAmount),
        shippingCost: shippingCost,
        promoCodeId: promoCodeId,
        discountAmount: discountAmount,
        subtotal: subtotal,
    };

    if (selectedPaymentMethod === "paypal") {
        guestPayload.paypalOrderId = paypalOrderId;
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
