import { FlexBox, FlexColCenter } from '@/components/flex-box';
import { Box, Button, Typography } from '@mui/material';
import { styles } from '../page-view/styles';
import Link from 'next/link';

export default function Section2() {
  return (
    <FlexColCenter sx={{ py:10, px:{xs:2, sm:0} }}>
      <Box sx={styles.banner}>
        <FlexBox flexDirection={{ xs:'column', sm:'row' }} justifyContent='space-between' gap={2}>
          <Box sx={{ display:'flex', flexDirection:'column', gap:2}}>
            <Typography sx={styles.bannerTitle}>
              get in touch
            </Typography>
            <Typography fontSize={{ xs:14, sm:18 }} color="#fff" sx={{ maxWidth:'850px' }}>
              Learn more about our vision to help those who need it most.
            </Typography>
          </Box>
          <FlexColCenter sx={{ maxWidth:{xs:'100%', sm:'250px'} }}>
            <Link href="/contact-us" passHref>
              <Button sx={styles.bannerButton}>
                Contact Us
              </Button>
            </Link>
          </FlexColCenter>
        </FlexBox>
      </Box>
    </FlexColCenter>
  );
}

;