// =============================================
// Custom Button
// =============================================

import { Button, CircularProgress } from "@mui/material";

// =============================================

const SymButton = ({
  onClick,
  loading = false,
  sx = {},
  children,
  ...rest // to allow other props like 'type', 'variant', etc.
}) => {
  return (
    <Button
      fullWidth
      onClick={onClick}
      sx={sx}
      disabled={loading}
      {...rest}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : children}
    </Button>
  );
};

export default SymButton;
