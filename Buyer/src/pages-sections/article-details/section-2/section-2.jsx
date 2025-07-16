
// ===============================================================
// Section 2 | Article Details Page
// ===============================================================

import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FlexColCenter } from '@/components/flex-box';
import { GlassBanner } from '@/components/custom-banner';

export default function Section2() {
  const router = useRouter();
  
  return (
    <FlexColCenter sx={{ py:10, px:{xs:2, sm:0} }}>
      <Box maxWidth="1200px" width="100%">
        <GlassBanner
          title="get in touch"
          subtitle="Learn more about our vision to help those who need it most."
          btnText="Contact Us"
          onClick={()=> router.push('/contact-us')}
        />
      </Box>
    </FlexColCenter>
  );
};