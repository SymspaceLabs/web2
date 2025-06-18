// ============================================
// Shipping Form
// ============================================

import { FlexBox } from "@/components/flex-box";
import { AddressForm } from "@/components/custom-forms";
import { SymTextField } from "@/components/custom-inputs";
import { FormControlLabel, Checkbox, Box } from "@mui/material";
import { useState, useEffect } from "react";

// ============================================

export default function ShippingForm({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    shipping,
    setShipping,
    sameAsShipping,
    setSameAsShipping,
    setBilling,
    forceShowErrors = false // Prop to force error display from parent
}) {
    // Local state for personal details touch status
    const [firstNameTouched, setFirstNameTouched] = useState(false);
    const [lastNameTouched, setLastNameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);

    // Local state to track if any address field has been touched
    const [addressFieldsTouched, setAddressFieldsTouched] = useState({});

    // Effect to force all fields as "touched" when forceShowErrors becomes true
    useEffect(() => {
        if (forceShowErrors) {
            setFirstNameTouched(true);
            setLastNameTouched(true);
            setEmailTouched(true);
            // Mark all address fields as touched when forceShowErrors is true
            setAddressFieldsTouched({
                address1: true,
                city: true,
                state: true,
                country: true,
                zip: true,
            });
        }
    }, [forceShowErrors]);

    // Derived error messages for personal details
    const firstNameError = (firstNameTouched || forceShowErrors) && firstName.trim() === '' ? 'First Name is required' : '';
    const lastNameError = (lastNameTouched || forceShowErrors) && lastName.trim() === '' ? 'Last Name is required' : '';
    const emailError = (emailTouched || forceShowErrors) && email.trim() === '' ? 'Email is required' : '';

    // Function to generate an errors object for address fields
    const getShippingAddressErrors = () => {
        const errors = {};
        const requiredFields = ['address1', 'city', 'state', 'country', 'zip'];

        requiredFields.forEach(field => {
            const value = shipping[field];
            // Check if field is touched OR if forceShowErrors is true
            const isTouchedOrForced = addressFieldsTouched[field] || forceShowErrors;

            if (isTouchedOrForced) {
                // Special handling for country (SymAutoComplete returns an object with value)
                if (field === 'country') {
                    const countryValue = typeof value === 'object' ? value?.value : value;
                    if (!countryValue || countryValue.trim() === '') {
                        errors[field] = 'Country is required';
                    }
                } else if (typeof value === 'string' && value.trim() === '') {
                    errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
                }
            }
        });
        return errors;
    };

    // Calculate address errors
    const shippingAddressErrors = getShippingAddressErrors();

    // Handler for changes in address fields
    const handleAddressChange = (field, value) => {
        const updated = { ...shipping, [field]: value };
        setShipping(updated);
        setAddressFieldsTouched(prev => ({ ...prev, [field]: true })); // Mark field as touched
        if (sameAsShipping) {
            setBilling(updated);
        }
    };

    // Handlers for personal detail changes
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        setFirstNameTouched(true);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        setLastNameTouched(true);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailTouched(true);
    };


    return (
        <Box py={3}>
            <FlexBox flexDirection="column" gap={3}>
                <FlexBox flexDirection={{ xs: "column", sm: "row" }} gap={3}>
                    <SymTextField
                        title="First Name"
                        placeholder="First Name"
                        color="#000"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        required
                        error={!!firstNameError}
                        helperText={firstNameError}
                    />
                    <SymTextField
                        title="Last Name"
                        placeholder="Last Name"
                        color="#000"
                        value={lastName}
                        onChange={handleLastNameChange}
                        required
                        error={!!lastNameError}
                        helperText={lastNameError}
                    />
                </FlexBox>
                <SymTextField
                    title="Email"
                    placeholder="Email"
                    color="#000"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    error={!!emailError}
                    helperText={emailError}
                />
                <AddressForm
                    section="shipping"
                    color="#000"
                    data={shipping}
                    onChange={handleAddressChange} // Use the new handler
                    errors={shippingAddressErrors} // Pass the errors object
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={sameAsShipping}
                            onChange={(e) => setSameAsShipping(e.target.checked)}
                        />
                    }
                    label="Billing address is same as shipping"
                />
            </FlexBox>
        </Box>
    );
}
