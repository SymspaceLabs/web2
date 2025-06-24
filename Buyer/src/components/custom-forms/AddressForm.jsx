// =========================================================
// Address Form Component
// =========================================================

import { FlexBox } from '@/components/flex-box';
import { SymTextField, SymAutoComplete } from '@/components/custom-inputs'; // Assuming SymAutoComplete is correctly imported
import { FormHelperText } from '@mui/material'; // Import FormHelperText for displaying errors

import countryList from 'data/countryList'; // Ensure this path is correct

// =========================================================

export default function AddressForm({
    data,
    onChange,
    color="#FFF",
    errors = {}, // Destructure errors prop, defaulting to an empty object if not provided
    dialogContentRef // NEW PROP: Accept the ref to the DialogContent from the parent
}) {

    // This internal handler ensures that the field name and its new value
    // are passed up to the parent component's onChange function.
    const handleChange = (field, value) => {
        onChange(field, value);
    };

    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            {/* Address Line 1 Input Field */}
            <SymTextField
                title="Address Line 1"
                color={color}
                value={data.address1}
                placeholder="Enter address line 1"
                onChange={(e) => handleChange('address1', e.target.value)}
                required // Visually marks the field as required (assuming SymTextField handles this)
                error={!!errors.address1} // Passes a boolean indicating if there's an error for address1
                helperText={errors.address1} // Passes the specific error message for address1
                mandatory={true}
            />

            {/* Address Line 2 Input Field (Optional) */}
            <SymTextField
                title="Address Line 2 (Optional)"
                color={color}
                value={data.address2}
                placeholder="Enter address line 2 (optional)"
                onChange={(e) => handleChange('address2', e.target.value)}
                // No 'required', 'error', or 'helperText' props needed as it's optional
            />

            {/* Group of City, State, Country, Zip Code Inputs */}
            <FlexBox justifyContent="center" flexDirection={{ xs: "column", sm: "row" }} gap={1}>
                {/* City Input Field */}
                <SymTextField
                    title="City"
                    color={color}
                    value={data.city}
                    placeholder="Enter city"
                    onChange={(e) => handleChange('city', e.target.value)}
                    required // Made City required
                    error={!!errors.city} // Passes error state for city
                    helperText={errors.city} // Passes error message for city
                    sx={{ flex: 1 }} // Added flex: 1 to make it take equal width
                    mandatory={true}
                />
                {/* State Input Field */}
                <SymTextField
                    title="State"
                    color={color}
                    value={data.state}
                    placeholder="Enter state"
                    onChange={(e) => handleChange('state', e.target.value)}
                    required // Made State required
                    error={!!errors.state} // Passes error state for state
                    helperText={errors.state} // Passes error message for state
                    sx={{ flex: 1 }} // Added flex: 1 to make it take equal width
                    mandatory={true}
                />
                {/* Country AutoComplete Field */}
                <div style={{ flex: 1 }}> {/* Wrapper div with flex: 1 for equal width */}
                    <SymAutoComplete
                        title="Country"
                        color={color}
                        placeholder="Select country"
                        // Find the selected country object from the list based on data.country value
                        value={countryList.find((item) => item.value === data.country) || null}
                        // When a country is selected, update the 'country' field in the parent state
                        onChange={(val) => handleChange('country', val?.value ?? "")}
                        options={countryList}
                        required // Made Country required (assuming SymAutoComplete handles this visually)
                        mandatory={true}
                        // IMPORTANT FIX: Pass the dialogContentRef to the Autocomplete's PopperProps
                        // Add a conditional check to ensure dialogContentRef and its current property exist
                        PopperProps={
                            dialogContentRef && dialogContentRef.current
                                ? { container: dialogContentRef.current }
                                : {} // Pass an empty object if ref is not yet available
                        }
                    />
                    {/* Conditionally render FormHelperText for Country if there's an error */}
                    {!!errors.country && (
                        <FormHelperText error>{errors.country}</FormHelperText>
                    )}
                </div>
                {/* Zip Code Input Field */}
                <SymTextField
                    title="Zip Code"
                    color={color}
                    value={data.zip}
                    placeholder="Enter zip code"
                    onChange={(e) => handleChange('zip', e.target.value)}
                    required // Made Zip Code required
                    error={!!errors.zip} // Passes error state for zip
                    helperText={errors.zip} // Passes error message for zip
                    sx={{ flex: 1 }} // Added flex: 1 to make it take equal width
                    mandatory={true}
                />
            </FlexBox>
        </FlexBox>
    );
}
