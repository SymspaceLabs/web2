import { useState } from "react";
import { TextField, InputAdornment, IconButton, FormHelperText, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FlexBox } from "../flex-box";

const SymPasswordInput = ({
    title,
    value,
    onChange,
    isEdit = true,
    placeholder = "",
    error,
    showError=true
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

    const errorMessage = showError && touched ? validatePassword(value) || error : "";

    // Handle password change
    const handlePasswordChange = (e) => {
        onChange(e); // Pass the updated value to parent
    };

    return (
        <FlexBox flexDirection="column" flex={1}>
            <Typography color="white" mb={0.5}  textAlign="left">
                {title}
            </Typography>
            <TextField
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={handlePasswordChange}
                onBlur={() => setTouched(true)} // Mark as touched when the user leaves the input
                disabled={!isEdit}
                placeholder={placeholder}
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
            {errorMessage && <FormHelperText sx={{ color: "red", mt: 0.5 }}>{errorMessage}</FormHelperText>}
        </FlexBox>
    );
};

export default SymPasswordInput;
