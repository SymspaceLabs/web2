// ==================================================
// Welcome Card
// ==================================================

import { useAuth } from '@/contexts/AuthContext';
import { LazyImage } from '@/components/lazy-image';
import { FlexColCenter } from '@/components/flex-box';
import { H1, Paragraph } from '@/components/Typography';
import { Box, DialogTitle, Button } from '@mui/material';

// ==================================================

const CongratsCard = ({ openStoreDialog }) => {

    const { user } = useAuth();

    return (
        <DialogTitle sx={{ pt: { xs: 3, sm: 5 }, pb: { xs: 3, sm: 5 } }}>
            <FlexColCenter>
                <Box width={250}>
                    <LazyImage src="/assets/images/onboarding/congrats.png" width={500} height={500} />
                </Box>
            </FlexColCenter>
            <FlexColCenter gap={2}>
                <H1 sx={styles.titleHeader}>
                    congrats, {user.firstName}!
                </H1>
                <H1 sx={{ ...styles.titleHeader, fontSize: 32 }}>
                    you’ve completed registering <br/> your business
                </H1>
                <Paragraph sx={styles.subtitle}>
                    Begin Setting up your Business on Symspace’s Platform
                </Paragraph>
                <Button sx={styles.btn} onClick={openStoreDialog}>
                    Store Settings
                </Button>
            </FlexColCenter>
        </DialogTitle>
    );
};

export default CongratsCard;

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
    },
    btn: {
        background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
        boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(50px)',
        borderRadius: '30px',
        color: '#FFF',
        px: 2,
        fontSize: { xs: 12, sm: 16 },
        fontWeight: 500,
        '&:hover': {
            background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)'
        }
    }
}
