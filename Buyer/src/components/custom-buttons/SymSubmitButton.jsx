// =============================================
// Custom Submit Button
// =============================================

import { btnStyle } from "./styles";
import { Button, CircularProgress } from "@mui/material";

// =============================================

const SymSubmitButton = ({
  isValid,
  onClick,
  children,
  loading
}) => {
  return (
    <Button
      sx={btnStyle({ isValid })}
      onClick={onClick}
    >
      {loading ? 
        <CircularProgress
          size={20}
          sx={{ color: "#fff" }}
        /> 
        :
        children
      }
    </Button>
  );
};

export default SymSubmitButton;
