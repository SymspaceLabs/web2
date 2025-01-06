"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Badge from "@mui/material/Badge";
import { IconButton, MenuItem, Menu } from "@mui/material";
import PersonOutline from "@mui/icons-material/PersonOutline"; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlined from "../../../icons/ShoppingBagOutlined";
import useCart from "../../../hooks/useCart";
import { useAuth } from '../../../contexts/AuthContext';
import React from 'react';
import { styles } from './styles';
import axios from 'axios';
 // Import the new GoogleLoginButton component

export default function LoginCartButtons({ toggleDialog, toggleSidenav }) {
  const { state } = useCart();
  const ICON_COLOR = { color: "grey.600" };
  const { isAuthenticated, user, logout, handleAuthResponse } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
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
    <div>
      <IconButton onClick={toggleDialog}>
        <FavoriteBorderIcon sx={ICON_COLOR} />
      </IconButton>

      <Badge badgeContent={state.cart.length} color="primary">
        <IconButton onClick={toggleSidenav}>
          <ShoppingBagOutlined sx={ICON_COLOR} />
        </IconButton>
      </Badge>

      <IconButton onClick={handleMenuClick} aria-expanded={open ? "true" : undefined} aria-controls={open ? "account-menu" : undefined}>
        <PersonOutline sx={ICON_COLOR} />
      </IconButton>

      <Menu 
        open={open}
        id="account-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{ paper: styles.paper }}
      >
        {!isAuthenticated ? (
          <>
            <MenuItem onClick={handleLoginRoute} sx={styles.text}>Sign in</MenuItem>
            <MenuItem onClick={handleSignUp} sx={styles.text}>Sign up</MenuItem>
          </>
        ) : (
          <>
            <MenuItem sx={styles.text}>{user?.email || 'User'}</MenuItem>
            <MenuItem onClick={handleProfile} sx={styles.text}>Profile</MenuItem>
            <MenuItem onClick={handleLogout} sx={styles.text}>Logout</MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
}
