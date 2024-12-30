/**
 * Section14 Component - Displays a promotional section offering a discount with an image background.
 * It includes a heading, a short description, and a subscription input field for capturing user emails.
 * 
 * @returns {JSX.Element} Rendered Section14 component.
 */

import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENTS
import LazyImage from "../../../components/LazyImage"; // LOCAL CUSTOM COMPONENT
import { H2, Paragraph } from "../../../components/Typography"; // LOCAL CUSTOM COMPONENT
import SubscribeInput from "../../../components/subscribe-input"; // STYLED COMPONENT
import { RootStyle } from "./styles"; // IMPORT STYLES
import bgImage from "../../../../public/assets/images/banners/banner-37.jpg"; // IMPORT IMAGE

export default function Section14() {
  return (
    <Container sx={{ py: 10 }}>
      {/* Root Style Wrapper for layout */}
      <RootStyle>
        {/* Lazy loading the background image */}
        <LazyImage src={bgImage} alt="offer" />

        <div className="content">
          {/* Promotional Title */}
          <H2 mt={3} mb={1} lineHeight={1.2} fontSize={{ sm: 36, xs: 30 }}>
            GET $20 OFF YOUR <br />
            FIRST ORDER
          </H2>

          {/* Promotional Subtitle */}
          <Paragraph mb={3} lineHeight={1.2} fontSize={{ sm: 16, xs: 14 }}>
            On your next purchase
          </Paragraph>

          {/* Subscribe Input for capturing email */}
          <SubscribeInput fullWidth />
        </div>
      </RootStyle>
    </Container>
  );
}
