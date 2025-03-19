// ===================================================================
// Glassmorphic Banner
// ===================================================================

import Link from 'next/link';
import { styles } from './styles';
import { FlexBox, FlexColCenter } from '@/components/flex-box';
import { Box, Button, Container, Typography } from '@mui/material';

export default function GlassBanner({
    title,
    subtitle,
    btnText,
    btnUrl
}) {
  return (
    <Container sx={{ maxWidth:'1000px'}}>
        <Box sx={styles.banner}>
            <FlexBox flexDirection={{ xs:'column', sm:'row' }} justifyContent='space-between' gap={2}>
                <Box sx={{ display:'flex', flexDirection:'column', gap:2}}>
                <Typography sx={styles.bannerTitle}>
                    {title}
                </Typography>
                <Typography fontSize={{ xs:14, sm:18 }} color="#fff" sx={{ maxWidth:'850px' }}>
                    {subtitle}
                </Typography>
                </Box>
                <FlexColCenter sx={{ maxWidth:{xs:'100%', sm:'250px'} }}>
                    <Link href={btnUrl} passHref>
                        <Button sx={styles.bannerButton}>
                            {btnText}
                        </Button>
                    </Link>
                </FlexColCenter>
            </FlexBox>
        </Box>
    </Container>
  );
};