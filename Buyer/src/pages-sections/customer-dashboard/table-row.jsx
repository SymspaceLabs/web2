import Card from "@mui/material/Card";
import styled from "@mui/material/styles/styled";

const TableRow = styled(Card)(({
  theme
}) => ({
  gap: 16,
  marginBlock: 16,
  display: "flex", // Changed to flex
  justifyContent: "space-between", // Added justifyContent
  borderRadius: 10,
  cursor: "pointer",
  alignItems: "center",
  padding: ".6rem 1.2rem",
  [theme.breakpoints.down("sm")]: {
    gap: 8,
    flexDirection: "column", // Added for small screens to stack items
    alignItems: "flex-start", // Adjust alignment when stacked
  }
}));

export default TableRow;
