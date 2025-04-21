// ==================================================
// Welcome Card
// ==================================================

import { Box, DialogTitle, Typography } from '@mui/material';
import { FlexColCenter } from '@/components/flex-box';
import { LazyImage } from '@/components/lazy-image';
import { useAuth } from '@/contexts/AuthContext';
import { H1, Paragraph } from '@/components/Typography';

// ==================================================

const WelcomeCard = ({ open }) => {

    const { user } = useAuth();
    
    return (
        <DialogTitle sx={{ pt: { xs: 3, sm: 5 }, pb: { xs: 3, sm: 5 } }}>
            <FlexColCenter>
                <Box width={250}>
                    <LazyImage src="/assets/images/onboarding/welcome.png" width={500} height={500} />
                </Box>
            </FlexColCenter>
            <FlexColCenter gap={2}>
                <H1 sx={styles.titleHeader}>
                    congrats, {user.firstName}!
                </H1>
                <H1 sx={{ ...styles.titleHeader, fontSize: 32 }}>
                    you're officially a seller
                </H1>
                <Paragraph sx={styles.subtitle}>
                    We’re excited to have you join our community and AR marketplace.<br />
                    Continue to complete setting up your business prior to listing products
                </Paragraph>
            </FlexColCenter>
        </DialogTitle>
    );
};

export default WelcomeCard;

const styles = {
    titleHeader : {
        lineHeight: 1.25,
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
    }
}
