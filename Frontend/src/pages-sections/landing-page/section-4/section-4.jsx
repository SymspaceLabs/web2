/**
 * Section4 Component
 *
 * This component represents the "Convenient & Comfortable" section of the landing page.
 * It highlights the ease and comfort of shopping through the Symspace platform using 
 * Augmented Reality (AR) technology.
 *
 * Features:
 * - Displays floating product images for visual appeal.
 * - Includes a title and description emphasizing convenience and confidence in shopping.
 * - Provides a "Shop" button as a call-to-action.
 * - Utilizes custom components and styled elements for a modern and engaging design.
 *
 * Usage:
 * Integrate this component into the landing page to showcase how AR enhances the shopping
 * experience by offering convenience and confidence to users.
 */

import React from 'react';
import { Container, Box } from '@mui/material'; // Import Material-UI components.
import LazyImage from '../../../components/LazyImage'; // Custom lazy-loading image component.
import {
  StyledGrid,
  SectionBox,
  TitleText,
  DescriptionText,
  ShopButton,
  FloatingImage1,
  FloatingImage2,
} from './section4.styles'; // Import custom styled components.

export default function Section4() {
  return (
    <StyledGrid>
      {/* Floating image on the left side */}
      <FloatingImage1>
        <LazyImage
          width={500}
          height={500}
          src="/assets/images/iphone2.png"
          alt="iphone"
        />
      </FloatingImage1>

      {/* Floating image on the right side */}
      <FloatingImage2>
        <LazyImage
          width={400}
          height={400}
          src="/assets/images/rayBand.png"
          alt="rayBand"
        />
      </FloatingImage2>

      <Container>
        {/* Content section including title, description, and call-to-action button */}
        <SectionBox>
          {/* Section title */}
          <TitleText>
            Convenient & Comfortable
          </TitleText>

          {/* Section description */}
          <DescriptionText>
            Explore products from the comfort of your home to conveniently and
            confidently shop through Augmented Reality.
          </DescriptionText>

          {/* Call-to-action "Shop" button */}
          <Box>
            <ShopButton>
              Shop
            </ShopButton>
          </Box>
        </SectionBox>
      </Container>
    </StyledGrid>
  );
}
