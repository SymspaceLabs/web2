import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Badge, useMediaQuery, Container, Menu, MenuItem, List, ListItem, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

// Import icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Use a styled component or custom styles to give the ListItem buttons a similar look to the original Buttons
// This is an example of inline styling for simplicity. You can move this to a styled component or a CSS file.
const navItemStyles = {
  color: 'inherit',
  textTransform: 'none',
  padding: '8px 16px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
};

const SimpleMUIHeader = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // State for the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#000', py: 1.5 }}>
      <Container disableGutters>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          {/* LEFT SECTION */}
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: { xs: '48px', md: 'auto' } }}>
            {!isDesktop ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Link href="/">
                <img
                  src="/assets/images/logos/Logo.svg"
                  alt="Symspace Logo"
                  width={175}
                  height={40}
                  style={{
                    width: "100%",
                    maxWidth: 175,
                    height: "auto",
                    display: "block",
                  }}
                />
              </Link>
            )}
          </Box>

          {/* MIDDLE SECTION */}
          <Box
            component="nav"
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mx: { xs: 1, md: 2 }
            }}
          >
            {isDesktop ? (
              <List sx={{ display: 'flex', gap: 2, p: 0 }}>
                <ListItem sx={{ ...navItemStyles, width: 'auto' }}>
                  <Link href="#" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemText primary="Marketplace" />
                  </Link>
                </ListItem>

                {/* AR for Business Dropdown Item */}
                <ListItem
                  sx={{ ...navItemStyles, width: 'auto' }}
                  onClick={handleClick}
                >
                  <ListItemText primary="AR for Business" />
                  <ArrowDropDownIcon />
                </ListItem>
                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Solutions</MenuItem>
                  <MenuItem onClick={handleClose}>Pricing</MenuItem>
                  <MenuItem onClick={handleClose}>Contact</MenuItem>
                </Menu>

                <ListItem sx={{ ...navItemStyles, width: 'auto' }}>
                  <Link href="#" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemText primary="Partner" />
                  </Link>
                </ListItem>
                <ListItem sx={{ ...navItemStyles, width: 'auto' }}>
                  <Link href="#" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemText primary="About Us" />
                  </Link>
                </ListItem>
              </List>
            ) : (
              <Link href="/">
                <img
                  src="/assets/images/logo_without_text.svg"
                  alt="logo"
                  style={{
                    width: "100%",
                    maxWidth: 35,
                    height: "auto",
                    display: "block"
                  }}
                />
              </Link>
            )}
          </Box>

          {/* RIGHT SECTION: Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" aria-label="shopping cart">
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" aria-label="favourites">
              <Badge badgeContent={17} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" aria-label="account">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default SimpleMUIHeader;