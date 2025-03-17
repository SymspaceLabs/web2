import { Box, useMediaQuery, Dialog, DialogContent, DialogTitle } from '@mui/material';
import LogoWithTitle from '../LogoWithTitle';
import { FlexColCenter } from '../flex-box';
import { LazyImage } from '../lazy-image';

const ComingSoonDialog = ({ open }) => {
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <Dialog
            open={open}
            maxWidth="md"
            fullWidth
            disableEscapeKeyDown  // Prevent closing with Escape key
            disableBackdropClick  // Prevent closing when clicking outside
            PaperProps={{
                style: {
                    backgroundColor: "#888888",
                    borderRadius: isMobile ? "20px" : "50px",
                    boxShadow:
                        "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
                },
            }}
        >
            <DialogTitle id="scroll-dialog-title" sx={{ position: "relative" }}>
                <FlexColCenter>
                    <Box width={250}>
                        <LazyImage
                            src="/assets/images/dashboard/welcome.png"
                            width={500}
                            height={500}
                        />
                    </Box>
                    
                </FlexColCenter>
                
                <LogoWithTitle
                    subTitle="We’re excited to have you join our community and AR marketplace."
                >
                    congrats, zayden!<br/>you're officially a seller
                </LogoWithTitle>
            </DialogTitle>

            <DialogContent sx={{ p: isMobile ? 0 : '10px' }}>
                <Box sx={{ padding: 1, background: 'transparent' }} />
            </DialogContent>
        </Dialog>
    );
};

export default ComingSoonDialog;
