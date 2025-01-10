/**
 * Section2 Component
 *
 * This component represents the "Future of Retail" section on the landing page. 
 * It highlights the capabilities of Symspace in XR hardware and AR ecosystems, 
 * showcasing the company's vision for immersive shopping experiences.
 *
 * Key Features:
 * - Displays floating images for decorative and visual impact.
 * - Includes a title, detailed description, and a call-to-action button.
 * - Uses styled components for consistent and maintainable design.
 *
 * Usage:
 * Import and use this component in a landing page layout to present the 
 * "Future of Retail" vision with an emphasis on AR and XR integration.
 */

import React from 'react';
import { Container } from '@mui/material';
import LazyImage from '../../../components/LazyImage'; // Optimized custom image component
import {
  StyledGrid,
  SectionBox,
  TitleText,
  DescriptionText,
  PartnerButton,
  FloatingImage1,
  FloatingImage2,
} from './section2.styles'; // Styled components specific to this section

export default function Section2() {
  return (
    <StyledGrid>
      {/* Floating image on the left */}
      <FloatingImage1>
        <LazyImage
          width={400}
          height={400}
          src="/assets/images/VR_set.png"
          alt="VR set"
        />
      </FloatingImage1>

      {/* Floating image on the right */}
      <FloatingImage2>
        <LazyImage
          width={400}
          height={400}
          src="/assets/images/iphone.png"
          alt="iphone"
        />
      </FloatingImage2>

      <Container>
        <SectionBox>
          {/* Section Title */}
          <TitleText>
            Future of Retail
          </TitleText>

          {/* Section Description */}
          <DescriptionText>
            In the rapidly advancing era of XR hardware, Symspace is at the
            forefront of empowering brands for the future. By creating highly
            accurate, detailed, realistic 3D models, we enable seamless
            integration into the upcoming AR ecosystem. We imagine a world where
            individuals can effortlessly explore and purchase products remotely
            by immersing themselves in digital and virtual experiences. With
            Symspace, brands are prepared to spearhead the AR revolution and
            redefine the shopping experience. Embrace the future and shape the
            landscape of retail with us.
          </DescriptionText>

          {/* Call-to-action button */}
          <PartnerButton>
            Partner
          </PartnerButton>
        </SectionBox>
      </Container>
    </StyledGrid>
  );
}
