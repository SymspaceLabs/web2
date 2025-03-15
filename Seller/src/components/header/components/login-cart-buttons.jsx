"use client";

/**
 * Header Icons On the Right
 * 
 * 
 */

import { useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Badge from "@mui/material/Badge";
import { IconButton, MenuItem, Menu, Box } from "@mui/material";
import PersonOutline from "@mui/icons-material/PersonOutline"; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlined from "../../../icons/ShoppingBagOutlined";
import useCart from "../../../hooks/useCart";
import { useAuth } from '../../../contexts/AuthContext';
import React from 'react';
import { styles } from './styles';

import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { FlexBox } from "@/components/flex-box";
import BazaarCard from "@/components/BazaarCard";
import Link from "next/link";
import { ChildNavListWrapper } from '@/components/navbar/styles';
// Import the new GoogleLoginButton component

export default function LoginCartButtons({ toggleDialog, toggleSidenav }) {
  const { state } = useCart();
  const ICON_COLOR = { color: "grey.600" };
  const { isAuthenticated, user, logout, handleAuthResponse } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  const processedLogin = useRef(false); 

  const handleClose = () => setAnchorEl(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleMenuClose();
    toggleDialog();
  };

  const handleSignUp = () => {
    handleMenuClose();
    router.push('/register');
  };

  const handleLoginRoute = () => {
    handleMenuClose();    
    toggleDialog();
  };

  const handleProfile = () => {
    handleMenuClose();
    router.push('/profile');
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <FlexBox alignItems="center">
      {/* Favorite Icon Button */}
      <IconButton onClick={toggleDialog}>
        <FavoriteBorderIcon sx={ICON_COLOR} />
      </IconButton>

      {/* Shopping Bag Icon Button */}
      <Badge badgeContent={state.cart.length} color="primary">
        <IconButton onClick={toggleSidenav}>
          <ShoppingBagOutlined sx={ICON_COLOR} />
        </IconButton>
      </Badge>

      {/* Account Dropdown Wrapper */}
      <FlexBox
        sx={{
          position: "relative",
          "&:hover .child-nav-item": { display: "block" }, // Ensure dropdown stays visible on hover
          cursor: "pointer",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        alignItems="flex-end"
        gap={0.3}
      >
        {/* Account Button */}
        <FlexBox alignItems="center">
          <IconButton>
            <PersonOutline sx={ICON_COLOR} />
          </IconButton>
        </FlexBox>

        {/* Dropdown Menu */}
        <ChildNavListWrapper
          className="child-nav-item"
          sx={{ display: open ? "block" : "none" }}
          slotProps={{ paper: styles.paper }}
        >
          <BazaarCard
            elevation={3}
            sx={{
              ...styles.paper,
              py: 1,
              borderRadius: "8px",
              border: "1px solid white",
              "& .MuiMenuItem-root": {
                color: "#fff", // Ensures text remains white
                "&:hover": {
                  background: "linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)",
                  color: "#fff !important", // Force white color on hover
                },
              },
            }}
          >
            {!isAuthenticated ? (
              <>
                <MenuItem onClick={handleLoginRoute} sx={{ ...styles.text, color: "#fff" }}>
                  Sign in
                </MenuItem>
                <MenuItem onClick={handleSignUp} sx={{ ...styles.text, color: "#fff" }}>
                  Sign up
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem sx={{ ...styles.text, color: "#fff" }}>{user?.email || "User"}</MenuItem>
                <MenuItem onClick={handleProfile} sx={{ ...styles.text, color: "#fff" }}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ ...styles.text, color: "#fff" }}>
                  Logout
                </MenuItem>
              </>
            )}
          </BazaarCard>

        </ChildNavListWrapper>
      </FlexBox>
    </FlexBox>
  );
}
