// =========================================
// Custom Password Input
// =========================================

import { useState } from "react";
import { H1 } from "../Typography";
import { FlexBox } from "../flex-box";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton, FormHelperText } from "@mui/material";

// =========================================

const SymPasswordInput = ({
    title,
    value,
    onChange,
    isEdit = true,
    placeholder = "",
    error,
    showError = true,
    forceValidate = false // New prop: set to true to force validation display
}) => {
    
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    // Password validation function
    const validatePassword = (password) => {
        if (!password) return "Password is required";
        if (password.length < 8) return "Must be at least 8 characters";
        if (!/[A-Z]/.test(password)) return "Must include an uppercase letter";
        if (!/[a-z]/.test(password)) return "Must include a lowercase letter";
        if (!/[0-9]/.test(password)) return "Must include a number";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Must include a special character";
        return "";
    };

    // Modified errorMessage logic to include forceValidate:
    // The error message will show if showError is true AND (the input has been touched OR forceValidate is true)
    const errorMessage = showError && (touched || forceValidate) ? validatePassword(value) || error : "";

    // Handle password change
    const handlePasswordChange = (e) => {
        onChange(e); // Pass the updated value to parent
    };

    return (
        <FlexBox flexDirection="column" flex={1}>
            <H1 color="white" mb={0.5} textAlign="left">
                {title}
            </H1>
            <TextField
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={handlePasswordChange}
                onBlur={() => setTouched(true)} // Mark as touched when the user leaves the input
                disabled={!isEdit}
                placeholder={placeholder}
                // error prop is true if there's an errorMessage
                error={Boolean(errorMessage)} 
                InputProps={{
                    style: { color: "#fff" },
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleTogglePassword} edge="end">
                                {showPassword ? <VisibilityOff sx={{ color: "#fff" }} /> : <Visibility sx={{ color: "#fff" }} />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{
                    background: "#000",
                    borderRadius: "5px",
                    color: "#fff",
                }}
            />
            {/* Display helper text only if errorMessage exists */}
            {errorMessage && <FormHelperText sx={{ color: "red", mt: 0.5 }}>{errorMessage}</FormHelperText>}
        </FlexBox>
    );
};

export default SymPasswordInput;

