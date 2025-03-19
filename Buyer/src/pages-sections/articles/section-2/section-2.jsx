import { FlexColCenter } from '@/components/flex-box';
import { GlassBanner } from '@/components/custom-banner';

export default function Section2() {
  return (
    <FlexColCenter sx={{ py:10, px:{xs:2, sm:0} }}>
      <GlassBanner
        title="get in touch"
        subtitle="Learn more about our vision to help those who need it most."
        btnText="Contact Us"
        btnUrl="/contact-us"
      />
    </FlexColCenter>
  );
};