// ===========================================================
// Custom Autocomplete Input
// ===========================================================

import { H1 } from "../Typography";
import { FlexBox } from "../flex-box";
import { Autocomplete, TextField } from "@mui/material";

// ===========================================================

const SymAutoComplete = ({
    title,
    value,
    onChange,
    isEdit = true,
    placeholder = "",
    options,
    color="white",
    mandatory= false,
    PopperProps, // Explicitly destructure PopperProps
    // No ...rest props here to prevent unintended forwarding
}) => {
    // Define internal PopperProps. The zIndex will act as a fallback,
    // but `container` (if passed from AddressForm) is the primary fix for Dialog layering.
    const internalPopperProps = {
        sx: {
            zIndex: 1500, // A high zIndex to ensure it's on top if 'container' isn't explicitly set or works
        },
        ...(PopperProps || {}), // Merge external PopperProps, or use an empty object if undefined
        sx: {
            zIndex: 1500, // Ensure our zIndex is applied first
            ...(PopperProps && PopperProps.sx), // Then merge any sx from external props
        }
    };

    return (
        // Explicitly pass only necessary props to FlexBox.
        // Assuming FlexBox handles 'flexDirection' and 'flex' directly or via its own 'sx' prop.
        // If FlexBox accepts other props like 'sx', you'd include them here.
        <FlexBox flexDirection="column" flex={1}>
            <H1 color={color} mb={0.5} textAlign="left">
                {title}
            </H1>

            <Autocomplete
                fullWidth
                options={options}
                value={value ?? null}
                onChange={(e, newValue) => onChange(newValue)}
                getOptionLabel={(option) => option?.label || ""} // safely get label
                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                disabled={!isEdit}
                // Pass PopperProps only to the Material-UI Autocomplete component
                PopperProps={internalPopperProps}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                        sx={{
                            background: "#000",
                            borderRadius: "5px",
                            input: {
                                color: "#fff",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#444",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#888",
                            },
                            "& .MuiSvgIcon-root": {
                                color: "#fff", // make dropdown arrow white
                            },
                        }}
                    />
                )}
            />
        </FlexBox>
    );
};

export default SymAutoComplete;
