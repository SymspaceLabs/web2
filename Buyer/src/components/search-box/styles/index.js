import { Card } from "@mui/material";
import { elementalEnd } from "@/app/layout"; // Calling custom font
import { FlexBox } from "@/components/flex-box";
import styled from "@mui/material/styles/styled";
import SearchOutlined from "@mui/icons-material/SearchOutlined"; // GLOBAL CUSTOM COMPONENT

export const elementalEndFont = {
    fontFamily: `${elementalEnd.style.fontFamily}, sans-serif`,
    textTransform:'lowercase',
    fontWeight: 500
}

export const SearchOutlinedIcon = styled(SearchOutlined)(({
  theme
}) => ({
  color: theme.palette.grey[600],
  marginRight: 6
}));
export const SearchResultCard = styled(Card)({
  zIndex: 99,
  top: "100%",
  width: "100%",
  position: "absolute",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem"
});
export const DropDownHandler = styled(FlexBox)(({
  theme
}) => ({
  whiteSpace: "pre",
  borderLeft: `1px solid ${theme.palette.grey[400]}`,
  [theme.breakpoints.down("xs")]: {
    display: "none"
  }
}));