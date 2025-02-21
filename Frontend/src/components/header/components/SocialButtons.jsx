
import { Fragment } from "react";
import { Span } from "../../../components/Typography"; // IMPORT IMAGES
import AppleSigninButton from "./AppleLoginButton";
import FacebookLoginButton from "./FacebookLoginButton";
import GoogleLoginButton from './GoogleLoginButton';
import { Divider, Box, Grid, } from '@mui/material';

export const SocialButtons = () => { 
    return (
        <Fragment>
            <Box my={3} width="100%">
                <Divider sx={{ borderColor: '#fff' }}>
                    <Span lineHeight={1} px={1} sx={{ color: '#fff' }}>
                        or
                    </Span>
                </Divider>
            </Box>
            <Grid container spacing={1} alignItems="center">
            <Grid item sm={4} xs={12}>
                <GoogleLoginButton />
            </Grid>
            <Grid item sm={4} xs={12}>
                <FacebookLoginButton />
            </Grid>
            <Grid item sm={4} xs={12}>
                <AppleSigninButton />          
            </Grid>
            </Grid>
        </Fragment>
    );
  }