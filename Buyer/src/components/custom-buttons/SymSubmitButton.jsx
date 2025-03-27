import { Button } from "@mui/material";
import { btnStyle } from "./styles";

const SymSubmitButton = ({ isValid, onClick, children }) => {
  return (
    <Button sx={btnStyle({ isValid })} onClick={onClick}>
      {children}
    </Button>
  );
};

export default SymSubmitButton;
