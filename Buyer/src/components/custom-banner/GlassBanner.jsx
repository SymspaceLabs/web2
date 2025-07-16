// ===================================================================
// Glassmorphic Banner
// ===================================================================

import { styles } from './styles';
import { Box, Button } from '@mui/material';
import { H1, Paragraph } from '../Typography';
import { FlexBox, FlexCol, FlexColCenter } from '@/components/flex-box';

export default function GlassBanner({
    title,
    subtitle,
    btnText,
    onClick,
    sx
}) {
  return (
    <Box sx={{ width:'100%', ...sx}}>
        <Box sx={styles.banner}>
            <FlexBox flexDirection={{ xs:'column', sm:'row' }} justifyContent='space-between' gap={2}>
                <FlexCol>
                    <H1 fontSize={{xs:20, sm:40}} color="#FFF" pb={1} >
                        {title}
                    </H1>
                    <Paragraph fontSize={{ xs:14, sm:18 }} color="#FFF" sx={{ maxWidth:'850px' }}>
                        {subtitle}
                    </Paragraph>
                </FlexCol>
                <FlexColCenter sx={{ maxWidth:{xs:'100%', sm:'350px'} }}>
                    <Button sx={styles.bannerButton} onClick={onClick}>
                        {btnText}
                    </Button>
                </FlexColCenter>
            </FlexBox>
        </Box>
    </Box>
  );
};