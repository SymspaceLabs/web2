import { useState } from "react";
import { TextField, InputAdornment, IconButton, FormHelperText } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FlexBox } from "../flex-box";
import { Small } from "../Typography";

const SymPasswordInput = ({
    title,
    value,
    onChange,
    isEdit = true,
    placeholder = "",
    error, // Receive error from parent

}) => {
    const [showPassword, setShowPassword] = useState(false);
    // const [error, setError] = useState("");


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

    const errorMessage = validatePassword(value) || error;


    // Handle password change
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        onChange(e); // Pass the updated value to parent
        setError(validatePassword(newPassword));
    };

    return (
        <FlexBox flexDirection="column" flex={1}>
            <Small color="white" mb={0.5}>
                {title}
            </Small>
            <TextField
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={handlePasswordChange}
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
