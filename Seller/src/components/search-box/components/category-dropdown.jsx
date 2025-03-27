import MenuItem from "@mui/material/MenuItem";
import TouchRipple from "@mui/material/ButtonBase";
import useTheme from "@mui/material/styles/useTheme"; // MUI ICON COMPONENT

import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined"; // GLOBAL CUSTOM COMPONENT

import SymMenu from "../../../components/SymMenu"; // STYLED COMPONENT

import { DropDownHandler } from "../styles"; // DATA

import { categories } from "../categories"; // ==============================================================

// ==============================================================
export default function CategoryDropdown({
  title,
  handleChange
}) {
  const {
    breakpoints
  } = useTheme();
  return <SymMenu direction="left" sx={{
    zIndex: breakpoints.down("md") ? 99999 : 1502
  }} handler={<DropDownHandler px={3} gap={0.5} height="100%" color="grey.700" // bgcolor="grey.100"
  alignItems="center" component={TouchRipple}>
          {title}
          <KeyboardArrowDownOutlined fontSize="small" color="inherit" />
        </DropDownHandler>}>
      {categories.map(item => <MenuItem key={item.value} onClick={handleChange(item)}>
          {item.title}
        </MenuItem>)}
    </SymMenu>;
}