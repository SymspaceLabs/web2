// ======================================================
// Menu Popover | Navbar Dropdown | Navbar Menu
// ======================================================

import { useState } from "react"; // MUI
import styled from "@mui/material/styles/styled";
import { useAuth } from '@/contexts/AuthContext';
import { H1, Small } from "@/components/Typography"; // STYLED COMPONENT
import { Box, Menu, MenuItem, Avatar, IconButton } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person'; // New import for default icon
import { useRouter } from "next/navigation"; // New: Import useRouter

// ======================================================

const Divider = styled("div")(({
  theme
}) => ({
  margin: "0.5rem 0",
  border: `1px dashed ${theme.palette.grey[200]}`
}));

// Styled Paper for the Menu component
const StyledMenuPaper = {
  mt: 1,
  boxShadow: 2,
  minWidth: 200,
  borderRadius: "8px",
  overflow: "visible",
  border: "1px solid",
  borderColor: "grey.200",
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "grey.200"
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
};


export default function AccountPopover() {
  
  // Fetch User
  const { logout, user } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const router = useRouter(); // New: Initialize router

  const handleClose = () => setAnchorEl(null);
  
  const handleLogout = () => {
    logout();
  };

  // Handler for Settings click
  const handleProfileClick = () => {
    handleClose();
    router.push("/vendor/profile");
  };

  // Handler for Settings click
  const handleSettingsClick = () => {
    handleClose();
    router.push("/vendor/site-settings");
  };

  // Handler for Settings click
  const handleShopSettingsClick = () => {
    handleClose();
    router.push("/vendor/shop-settings");
  };

  const handleOrdersClick = () => {
    handleClose();
    router.push("/vendor/orders");
  };


  // Determine the avatar source
  // Assuming user.profilePictureUrl holds the URL, otherwise it's null/undefined
  const avatarSrc = user?.profilePictureUrl;
  const avatarAlt = user?.firstName ? `${user.firstName} ${user.lastName}` : "User Avatar";

  return (
    <div>
      <IconButton sx={{padding: 0}} aria-haspopup="true" onClick={e => setAnchorEl(e.currentTarget)} aria-expanded={open ? "true" : undefined} aria-controls={open ? "account-menu" : undefined}>
        <Avatar alt={avatarAlt} src={avatarSrc}>
          {/* Conditional rendering: show PersonIcon if no profile picture URL */}
          {!avatarSrc && <PersonIcon />}
        </Avatar>
      </IconButton>

      <Menu
        open={open}
        id="account-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose} 
        transformOrigin={{
          horizontal: "right",
          vertical: "top"
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom"
        }} 
        slotProps={{
          paper: {
            elevation: 0,
            sx: StyledMenuPaper
          }
        }}
      >
        <Box px={2} pt={1}>
          <H1>{user?.firstName} {user?.lastName}</H1>
          <Small color="grey.500">{user?.company?.entityName}</Small>
        </Box>

        <Divider />
        <MenuItem onClick={handleProfileClick} sx={{ textTransform: "lowercase" }}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleOrdersClick}>
          My Orders
        </MenuItem>
        <MenuItem onClick={handleSettingsClick}>
          Site Settings
        </MenuItem>
        <MenuItem  onClick={handleShopSettingsClick}>
          Shop Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}