"use client";

// =========================================================
// SymDialog | Custom Dialog Component for:
// - user login 
// =========================================================

import { Fragment } from "react";
import { LogoWithTitle } from "@/components";
import { styled } from '@mui/material/styles';
import { SocialButtons } from "../header/components/SocialButtons";
import { Box, Dialog, Card } from '@mui/material';
import { LoginBottom } from "@/pages-sections/sessions/components";
import { LoginPageView } from "@/pages-sections/sessions/page-view";

// ==============================================================

export default function SymDialog({ 
  dialogOpen, 
  toggleDialog
}) {  
  return (
    <Fragment>
      
      {/* Login Dialog */}
      <Dialog 
        PaperProps={{ 
          style: { 
            background: 'rgba(255, 255, 255, 0.39)', 
            borderRadius: '50px', 
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', 
            backdropFilter: 'blur(7.2px)', 
            WebkitBackdropFilter: 'blur(7.2px)', 
            border: '1px solid rgba(255, 255, 255, 0.72)' 
          }
        }}
        scroll="body" 
        open={dialogOpen} 
        fullWidth 
        onClose={toggleDialog} 
        sx={{ zIndex: 9999 }}
      >
        <Box style={{ width: '100%', maxWidth: 580, height: 885, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
          <Box style={{ width: '100%', alignSelf: 'stretch',  flex: '1 1 0', position: 'relative', overflow: 'hidden' }}>
            <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textAlign: 'center'}}>
              <Wrapper>
                <LogoWithTitle title="Continue your Journey" subTitle="Log in to an existing account using your email" />
                <LoginPageView closeDialog={toggleDialog} />
                <SocialButtons />
                <LoginBottom />
              </Wrapper>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Fragment>
  );
}

const fbStyle = {
  background: "#3B5998",
  color: "white"
};
const googleStyle = {
  background: "#4285F4",
  color: "white"
};

const Wrapper = styled(Card)(({ theme }) => ({
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