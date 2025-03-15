import { Button } from "@mui/material";

const AuthSubmitButton = ({ isValid, onClick, title, loading }) => {
  return (
    <Button
      sx={{
        fontFamily: "Helvetica",
        fontWeight: "bold",
        background: !isValid
          ? "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)"
          : "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)",
        boxShadow:
          "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(50px)",
        borderRadius: "12px",
        color: "#fff",
        cursor: !isValid ? "not-allowed" : "pointer",
        pointerEvents: !isValid ? "none" : "auto",
        "&:hover": {
          background: !isValid
            ? "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)"
            : "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)",
        },
      }}
      fullWidth
      type="submit"
      color="primary"
      variant="contained"
      size="large"
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default AuthSubmitButton;
