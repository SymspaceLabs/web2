// ==================================================
// Welcome Dialog
// ==================================================

import { Box, Dialog, DialogContent, DialogTitle, Button, useMediaQuery, Typography } from '@mui/material';
import { FlexBox, FlexColCenter } from '@/components/flex-box';
import { LazyImage } from '@/components/lazy-image';
import { useAuth } from '@/contexts/AuthContext';

// ==================================================

const WelcomeDialog = ({ open }) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const { user } = useAuth();
    
    return (
        <Dialog
            open={open}
            maxWidth="md"
            fullWidth
            disableEscapeKeyDown
            disableBackdropClick
            PaperProps={{
                style: {
                    background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
                    boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: isMobile ? "20px" : "50px",
                    paddingBottom:5,
                    paddingTop:5
                },
            }}
        >
            <DialogTitle
                id="scroll-dialog-title"
                sx={{ pt: {xs:3, sm:5}, pb: {xs:3, sm:5} }} // Add top and bottom padding
            >
                <FlexColCenter>
                    <Box width={250}>
                        <LazyImage
                            src="/assets/images/dashboard/welcome.png"
                            width={500}
                            height={500}
                        />
                    </Box>
                </FlexColCenter>
                <FlexColCenter gap={2}>
                    <Typography sx={styles.titleHeader}>
                        congrats, {user.firstName}!
                    </Typography>
                    <Typography sx={{...styles.titleHeader, fontSize:32}}>
                        you're officially a seller
                    </Typography>
                    <Typography sx={styles.subtitle}>
                        We’re excited to have you join our community and AR marketplace.<br/>
                        Continue to complete setting up your business prior to listing products
                    </Typography>
                </FlexColCenter>

            </DialogTitle>

            <DialogContent sx={{ p: {xs:3, sm:5} }}>
                <FlexBox justifyContent="flex-end">
                    <Button sx={styles.btn}>
                        Continue
                    </Button>
                </FlexBox>
            </DialogContent>
        </Dialog>
    );
};

export default WelcomeDialog;

const styles = {
    titleHeader : {
        lineHeight: 1.25,
        fontFamily: 'Elemental End',
        textTransform: 'lowercase',
        color: '#fff',
        fontSize: {xs:16, sm:40},
        textAlign: 'center',
        letterSpacing: '0.05em',
        wordSpacing: '0.1em',
    },
    subtitle : {
        color: '#FFF',
        fontSize: {xs:16, sm:20},
        textAlign: 'center',
        fontWeight:400,
    },
    btn : {
        background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
        boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(50px)',
        borderRadius: '30px',
        color:'#FFF',
        fontFamily: 'Elemental End',
        textTransform:'lowercase',
        px:2,
        fontSize:{ xs:12,sm:16 },
        fontWeight:500,
        '&:hover' : {
            background:'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)'
        }
    }
}
