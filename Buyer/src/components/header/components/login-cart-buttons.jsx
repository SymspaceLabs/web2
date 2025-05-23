"use client";

// =============================================================
// Header Icons On the Right | Account Popover
// =============================================================

import { useState } from 'react';
import { styles } from './styles';
import { useRouter } from 'next/navigation';
import { FlexBox } from "@/components/flex-box";
import { useAuth } from '@/contexts/AuthContext';
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { useFavorites } from '@/contexts/FavoritesContext';
import { IconButton, MenuItem, Badge } from "@mui/material";
import { ChildNavListWrapper } from '@/components/navbar/styles';

import { useCart } from "@/hooks/useCart";
import SymCard from "@/components/custom-components/SymCard";
import PersonOutline from "@mui/icons-material/PersonOutline"; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// =============================================================


export default function LoginCartButtons({ toggleDialog, toggleCartOpen, toggleFavouriteOpen }) {
  const { state } = useCart();
  const cartList = state.cart;

  const { state: favState } = useFavorites();
  
  const ICON_COLOR = { color: "grey.600" };
  const { isAuthenticated, user, logout } = useAuth();

  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogin = () => {
    toggleDialog();
  };

  const handleSignUp = () => {
    router.push('/register');
  };

  const handleProfile = () => {
    router.push('/profile/view');
  };

  const handleDashboard = () => {
    router.push(`${process.env.NEXT_PUBLIC_SELLER_URL}`);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <FlexBox alignItems="center">
      {/* Favorite Icon Button */}
      <Badge badgeContent={favState.favorites.length} color="primary">
        <IconButton onClick={toggleFavouriteOpen}>
          <FavoriteBorderIcon sx={ICON_COLOR} />
        </IconButton>
      </Badge>

      {/* Shopping Cart Icon Button */}
      <Badge badgeContent={cartList.reduce((acc, item) => acc + item.qty, 0)} color="primary">
        <IconButton onClick={toggleCartOpen}>
          <PiShoppingCartSimpleBold color="#7D879C" />
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
          <SymCard
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
                <MenuItem onClick={handleLogin} sx={{ ...styles.text, color: "#fff" }}>
                  Sign in
                </MenuItem>
                <MenuItem onClick={handleSignUp} sx={{ ...styles.text, color: "#fff" }}>
                  Sign up
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem sx={{ ...styles.text, color: "#fff" }}>
                  {user?.email || "User"}
                </MenuItem>
            
                {user?.role === "buyer" ? (
                  <MenuItem onClick={handleProfile} sx={{ ...styles.text, color: "#fff" }}>
                    Profile
                  </MenuItem>
                ) : user?.role === "seller" ? (
                  <MenuItem onClick={handleDashboard} sx={{ ...styles.text, color: "#fff" }}>
                    Dashboard
                  </MenuItem>
                ) : null}
            
                <MenuItem onClick={handleLogout} sx={{ ...styles.text, color: "#fff" }}>
                  Logout
                </MenuItem>
              </>
            )}
          </SymCard>

        </ChildNavListWrapper>
      </FlexBox>
    </FlexBox>
  );
}
