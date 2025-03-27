import { Button } from "@mui/material";
import { btnStyle } from "./styles";

const SymSubmitButton = ({ isValid, onClick, children, sx  }) => {
  return (
    <Button sx={{ ...btnStyle({ isValid }), ...sx }} onClick={onClick}>
      {children}
    </Button>
  );
};

export default SymSubmitButton;
