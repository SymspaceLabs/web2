import { FlexColCenter } from '@/components/flex-box';
import { GlassBanner } from '@/components/custom-banner';
import { Box } from '@mui/material';

export default function Section2() {
  return (
    <FlexColCenter sx={{ py:10, px:{xs:2, sm:0} }}>
      <Box maxWidth="1200px" width="100%">
        <GlassBanner
          title="get in touch"
          subtitle="Learn more about our vision to help those who need it most."
          btnText="Contact Us"
          btnUrl="/contact-us"
        />
      </Box>
    </FlexColCenter>
  );
};