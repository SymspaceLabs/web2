import { useState } from "react"; // MUI

import styled from "@mui/material/styles/styled";
import {IconButton, Button, MenuItem, Avatar, Menu, Box } from "@mui/material";
import { H6, Small } from "../../../Typography"; // STYLED COMPONENT

const Divider = styled("div")(({ theme }) => ({
  margin: "0.5rem 0",
  border: `1px dashed ${theme.palette.grey[200]}`
}));
export default function ButtonPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);
/* Menu-Main */
 

  return <div>
      <Button sx={{ color:'#fff', background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)', border: '1px solid #344767', borderRadius: '8px' }} aria-haspopup="true" onClick={e => setAnchorEl(e.currentTarget)} aria-expanded={open ? "true" : undefined} aria-controls={open ? "account-menu" : undefined}>
        Create New +
      </Button>

      <Menu open={open} id="account-menu" anchorEl={anchorEl} onClose={handleClose} onClick={handleClose} transformOrigin={{
      horizontal: "right",
      vertical: "top"
    }} anchorOrigin={{
      horizontal: "right",
      vertical: "bottom"
    }} slotProps={{
      paper: {
        elevation: 0,
        sx: { mt: 1, boxShadow: 2, minWidth: 200, borderRadius: "8px",
          overflow: "visible",
          border: "1px solid",
          borderColor: "grey.200",
          color:'#fff',
          background:'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)',
          "& .MuiMenuItem-root:hover": {
            background:'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)'
          },
          "&:before": {
            top: 0,
            right: 14,
            zIndex: 0,
            width: 10,
            height: 10,
            content: '""',
            display: "block",
            position: "absolute",
            borderTop: "1px solid",
            borderLeft: "1px solid",
            borderColor: "grey.200",
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)"
          }
        }
      }
    }}>

        <MenuItem>Product</MenuItem>
        <MenuItem>3D Product</MenuItem>
        <MenuItem>AR Visual</MenuItem>
      </Menu>
    </div>;
}