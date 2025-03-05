"use client";

import { useState, Fragment } from "react";
import { Box, Snackbar, Alert, Dialog, Drawer, useMediaQuery } from '@mui/material';
import { LoginPageView } from "../../../pages-sections/sessions/page-view"; // GLOBAL CUSTOM COMPONENTS
import { MiniCart } from "../../../components/mini-cart"; // LOGIN PAGE SECTIONS
import { Wrapper } from "../../../pages-sections/sessions/styles";
import LogoWithTitle from "@/components/LogoWithTitle";
import LoginBottom from "../../../pages-sections/sessions/components/login-bottom";
import { SocialButtons } from "./SocialButtons";

// ==============================================================
export default function DialogDrawer(props) {  
  const { dialogOpen, sidenavOpen, toggleDialog, toggleSidenav } = props;
  const isMobile = useMediaQuery(theme => theme.breakpoints.down("xs"));

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <Fragment>
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
                <LoginPageView closeDialog={toggleDialog} setSnackbarOpen={setSnackbarOpen} />
                <SocialButtons />
                <LoginBottom />
              </Wrapper>
            </Box>
          </Box>
        </Box>
      </Dialog>

      <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav} sx={{ zIndex: 9999 }}>
        <MiniCart toggleSidenav={toggleSidenav} />
      </Drawer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Signin Successful!
        </Alert>
      </Snackbar>
    </Fragment>
  );
}