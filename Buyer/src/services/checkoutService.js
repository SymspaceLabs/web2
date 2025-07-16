// src/services/checkoutService.js

/**
 * Determines the appropriate button text for the Payment Summary component
 * based on the current checkout step and selected payment method.
 * @param {number} selectedStep - The current step in the checkout process (0, 1, or 2).
 * @param {string} selectedPaymentMethod - The currently selected payment method (e.g., "paypal", "card").
 * @returns {string} The text to display on the payment summary button.
 */
export const getPaymentSummaryButtonText = (selectedStep, selectedPaymentMethod) => {
    if (selectedStep === 0) {
        return "Check Out Now";
    } else if (selectedStep === 1) {
        return "Proceed to Payment";
    } else if (selectedStep === 2) {
        switch (selectedPaymentMethod) {
            case "paypal":
                return "Pay with PayPal";
            case "card":
                return "Pay with Card";
            case "apple-pay":
                return "Pay with Apple Pay";
            case "google":
                return "Pay with Google Pay";
            default:
                return "Continue to Order";
        }
    }
    return "";
};

/**
 * Calculates the total amount for the checkout, including items, shipping, tax, and discount.
 * @param {Array<object>} cartItems - The list of items in the cart.
 * @param {number} discountAmount - The total discount applied.
 * @param {number} shippingCost - The cost of shipping.
 * @param {number} taxTotal - The total tax amount.
 * @returns {string} The formatted total amount as a string (e.g., "44.98").
 */
export const calculateTotalAmount = (cartItems, discountAmount, shippingCost, taxTotal) => {
    let itemsTotal = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        const qty = parseFloat(item.qty) || 0;
        return sum + (price * qty);
    }, 0);

    let finalItemsTotal = itemsTotal - (parseFloat(discountAmount) || 0);
    if (finalItemsTotal < 0) finalItemsTotal = 0;

    const totalWithShippingAndTax = finalItemsTotal + shippingCost + taxTotal;
    return Number(totalWithShippingAndTax).toFixed(2);
};


/**
 * Validates the personal details, shipping, and billing addresses for a guest checkout.
 * Displays snackbar messages and sets form error states if validation fails.
 *
 * @param {object} params - The parameters for validation.
 * @param {string} params.firstName - User's first name.
 * @param {string} params.lastName - User's last name.
 * @param {string} params.email - User's email address.
 * @param {object} params.shipping - Shipping address object.
 * @param {object} params.billing - Billing address object.
 * @param {boolean} params.sameAsShipping - True if billing is same as shipping.
 * @param {function} params.showSnackbar - Function to display snackbar messages.
 * @param {function} params.setShowShippingFormErrors - Function to set form error visibility.
 * @returns {boolean} True if all required fields are valid, false otherwise.
 */
export const validateCheckoutForm = ({
    firstName,
    lastName,
    email,
    shipping,
    billing,
    sameAsShipping,
    showSnackbar,
    setShowShippingFormErrors
}) => {
    // Validate personal details
    const isPersonalDetailsComplete =
        firstName.trim() !== '' &&
        lastName.trim() !== '' &&
        email.trim() !== '' &&
        /\S+@\S+\.\S+/.test(email); // Basic email format validation

    if (!isPersonalDetailsComplete) {
        showSnackbar("Please fill in all required personal details correctly.", "error");
        setShowShippingFormErrors(true);
        return false;
    }

    // Define required fields for addresses
    const requiredAddressFields = ['address1', 'city', 'state', 'zip', 'country'];

    // Validate shipping address
    const isShippingComplete = requiredAddressFields.every(field => {
        const value = shipping[field];
        // Check if value is a non-empty string or a truthy boolean/number (though typically strings for addresses)
        return typeof value === 'string' ? value.trim() !== '' : Boolean(value);
    });

    if (!isShippingComplete) {
        showSnackbar("Please fill in all required shipping address fields.", "error");
        setShowShippingFormErrors(true);
        return false;
    }

    // Validate billing address if it's different from shipping
    let isBillingComplete = true; // Assume complete if sameAsShipping
    if (!sameAsShipping) {
        isBillingComplete = requiredAddressFields.every(field => {
            const value = billing[field];
            return typeof value === 'string' ? value.trim() !== '' : Boolean(value);
        });

        if (!isBillingComplete) {
            showSnackbar("Please fill in all required billing address fields.", "error");
            setShowShippingFormErrors(true);
            return false;
        }
    }

    // If all validations pass, clear any previous form errors and return true
    setShowShippingFormErrors(false);
    return true;
};