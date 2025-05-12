// =================================================
// Custom Submit Button
// =================================================

import { btnStyle } from "./styles";
import { Button, CircularProgress } from "@mui/material";

// =================================================

const SymSubmitButton = ({ 
  isValid,
  onClick,
  loading,
  children,
  sx
}) => {
  return (
    <Button
      sx={{ ...btnStyle({ isValid }), ...sx }}
      onClick={onClick}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};

export default SymSubmitButton;
