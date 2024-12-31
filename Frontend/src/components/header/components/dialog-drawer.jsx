"use client";

import { useState, Fragment } from "react";
import { Box, Snackbar, Alert, Dialog, Drawer, useMediaQuery } from '@mui/material';
import { LoginPageView } from "../../../pages-sections/sessions/page-view"; // GLOBAL CUSTOM COMPONENTS
import { MiniCart } from "../../../components/mini-cart"; // LOGIN PAGE SECTIONS
import { Wrapper } from "../../../pages-sections/sessions/styles";
import LogoWithTitle from "../../../pages-sections/sessions/components/logo-title";
import LoginBottom from "../../../pages-sections/sessions/components/login-bottom";
import { SocialButtons } from "./SocialButtons";

// ==============================================================
export default function DialogDrawer(props) {  
  const { dialogOpen, sidenavOpen, toggleDialog, toggleSidenav } = props;
  const isMobile = useMediaQuery(theme => theme.breakpoints.down("xs"));

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <Fragment>
      <Dialog PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none', borderRadius: '80px', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)' },}} scroll="body" open={dialogOpen} fullWidth={isMobile} onClose={toggleDialog} sx={{ zIndex: 9999 }}>
        <Box style={{ width: 580, height: 885, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
          <Box style={{ alignSelf: 'stretch', flex: '1 1 0', position: 'relative' }}>
            <img style={{ background: 'rgba(255,255,255,0.2)', width: 580, height: 885, left: 0, top: 0, position: 'absolute', boxShadow: '0px 1.0028538703918457px 20.55850601196289px rgba(255, 255, 255, 0.80) inset', backdropFilter: 'blur(20.06px)'}} src="/assets/images/background/Rectangle.png"/>
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