// =============================================
// Custom Button
// =============================================

import { Button, CircularProgress } from "@mui/material";

// =============================================

const SymButton = ({
  onClick,
  loading = false,
  fullWidth = true, // ✅ Default to full width unless overridden
  sx = {},
  children,
  ...rest
}) => {
  return (
    <Button
      onClick={onClick}
      fullWidth={fullWidth} // ✅ Use passed prop
      variant="contained"
      color="primary"
      // Added styles to ensure consistent height and centered content
      sx={{
        minHeight: 58, // Adjust this value if your button height is different
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx // Spread existing sx last to allow overriding minHeight if needed
      }}
      disabled={loading} // Button should be disabled when loading
      {...rest}
    >
      {loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : children}
    </Button>
  );
};

export default SymButton;