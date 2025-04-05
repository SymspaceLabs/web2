// ==================================================
// Welcome Card
// ==================================================

import { Box, DialogTitle, Typography } from '@mui/material';
import { FlexColCenter } from '@/components/flex-box';
import { LazyImage } from '@/components/lazy-image';
import { useAuth } from '@/contexts/AuthContext';
import { H1, Paragraph } from '@/components/Typography';
import BoxLink from '@/components/BoxLink';

// ==================================================

const CongratsCard = ({ open }) => {

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
                    Set up your Business Store on Symspace’s platform <BoxLink href="/sign-in">here</BoxLink> .
                </Paragraph>
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
    }
}
