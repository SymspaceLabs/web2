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
      sx={sx}
      disabled={loading}
      {...rest}
    >
      {loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : children}
    </Button>
  );
};

export default SymButton;
