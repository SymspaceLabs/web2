import { Box, Button, Divider } from "@mui/material";
import Card from "@mui/material/Card";
import styled from "@mui/material/styles/styled";

const fbStyle = {
    background: "#3B5998",
    color: "white"
  };
  const googleStyle = {
    background: "#4285F4",
    color: "white"
  };

  export const Wrapper = styled(Card)(({ theme }) => ({
    padding: "2rem 3rem",
    background: 'transparent',
  
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "2rem 2rem", // Mobile-specific padding
    },
    ".facebookButton": {
      marginBottom: 10,
      ...fbStyle,
      "&:hover": fbStyle,
    },
    ".googleButton": {
      ...googleStyle,
      "&:hover": googleStyle,
    },
    ".agreement": {
      marginTop: 12,
      marginBottom: 24,
    },
  }));
  

// General Background Styles
export const mainContainerStyle = {
  position: 'relative',
  backgroundColor: '#3F3F3F',
  flexDirection:'column',
  justifyContent: "flex-start",
  alignItems: 'center',
  minHeight: '100vh',
  py: { xs: 0, sm: 5 },
  // minHeight: 'auto',
  height: '100%',

};

// Blurred Background Overlay
export const blurredOverlayStyle1 = {
  zIndex: 0,
  position: 'absolute',
  top: '40%', // Move it higher
  transform: 'translate(-50%, -40%)', // Adjust translation
  left: '50%',
  width: { xs: '100%', sm: '80%', md: '890px' }, // Adjust width based on screen size
  height: { xs: '50vh', sm: '60vh', md: '700px' }, // Reduce height
  background: 'rgba(3, 102, 254, 0.8)',
  borderRadius: { xs: '30px', sm: '40px', md: '50px' }, // Adjust border radius for smaller screens
  opacity: 0.4,
  filter: 'blur(100px)',
  backdropFilter: 'blur(100px)',
  boxShadow:
    '0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.5), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
};

// Blurred Background Overlay
export const blurredOverlayStyle2 = {
  zIndex: 0,
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: { xs: '100%', sm: '80%', md: '890px' }, // Adjust width based on screen size
  height: { xs: '70vh', sm: '80vh', md: '1000px' }, // Adjust height for smaller screens
  background: 'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)',
  borderRadius: { xs: '30px', sm: '40px', md: '50px' }, // Adjust border radius for smaller screens
  transform: 'translate(-50%, -50%)',
  opacity: 0.4,
  filter: 'blur(100px)',
  backdropFilter: 'blur(100px)',
  boxShadow:
    '0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.5), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
};


// Wrapper Box Style
export const wrapperStyle = {
  background:
    'linear-gradient(0deg, rgba(140, 140, 140, 0.3), rgba(140, 140, 140, 0.3)), rgba(255, 255, 255, 0.1)',
  borderRadius: '50px',
};

// Button Style
export const registerButtonStyle = {
  color: '#fff',
  borderRadius: '12px',
  fontFamily: 'Helvetica',
  fontWeight: 700,
  fontSize: { xs: '16px', sm: '22px' }, // Mobile-specific font size
  backdropFilter: 'blur(50px)',
  py: 1.5,
  background: 'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)',
  boxShadow:
    '0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.5), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
};

// Divider Style
export const dividerTextStyle = {
  color: '#fff',
  lineHeight: 1,
  px: 1,
};
