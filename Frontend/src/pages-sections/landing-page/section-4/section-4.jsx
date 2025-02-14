"use client";

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
import { Container, Typography, Button, Box } from '@mui/material'; // Import Material-UI components.
import { StyledGrid, SectionBox, TitleText } from './section4.styles'; // Import custom styled components.
import { useRouter } from "next/navigation";

export default function Section4() {

  const router = useRouter();
  
  const handleClick = () => {
    router.push('/register-partner');
  };

  return (
    <StyledGrid>
      {/* Floating image on the left side */}
      {/* <FloatingImage1>
        <LazyImage
          width={500}
          height={500}
          src="/assets/images/iphone2.png"
          alt="iphone"
        />
      </FloatingImage1> */}

      {/* Floating image on the right side */}
      {/* <FloatingImage2>
        <LazyImage
          width={400}
          height={400}
          src="/assets/images/rayBand.png"
          alt="rayBand"
        />
      </FloatingImage2> */}

      <Container>
        {/* Content section including title, description, and call-to-action button */}
        <SectionBox>
          {/* Section title */}
          <TitleText>
            Convenient & Comfortable
          </TitleText>

          {/* Section description */}
          <Typography sx={{  fontFamily: 'Helvetica', color: '#FFF', fontSize: 18, textAlign:'center', lineHeight:2 }}>
            Explore products from the comfort of your home to conveniently and confidently shop through Augmented Reality.<br/>
            Receive sizing recommendations and use our advanced AR application to augment products in real-time.
          </Typography>

          {/* Call-to-action "Shop" button */}
          <Box>
            <Button sx={buttonStyle} onClick={handleClick}>
              Shop
            </Button>
          </Box>
        </SectionBox>
      </Container>
    </StyledGrid>
  );
}

const buttonStyle = {
  border: '2px solid white',
  color: '#fff',
  background: 'transparent',
  borderRadius: '50px',
  py: 2,
  px: 8,
  fontFamily: 'Elemental End',
  textTransform: 'lowercase',
  ':hover': {
    background: '#fff',
    color: '#000',
  },
};
