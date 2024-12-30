/**
 * Section6 Component
 *
 * This component renders a promotional section with a headline, 
 * a description, a call-to-action button for beta access, and an image. 
 * The section uses Material-UI (MUI) for styling and includes styled components.
 *
 * @returns {JSX.Element} The rendered promotional section.
 */

import LazyImage from "../../../components/LazyImage"; // Lazy loading component for optimized image rendering
import { RootStyle, StyledButton } from "./styles"; // Custom styled components
import { Box, Container, Typography, Button } from '@mui/material'; // Material-UI components for layout and styling

import shirt from "../../../../public/assets/images/background/banner-img.png"; // Image used in the section

export default function Section6() {
  return (
    <Container>
      {/* Root container for the section */}
      <RootStyle>
        {/* Content area for text and call-to-action button */}
        <div className="content">
          {/* Section headline */}
          <h2>
            Augment Products whenever.<br /> From wherever.
          </h2>
          {/* Section description */}
          <Typography 
            sx={{
              fontFamily: 'Helvetica',
              fontSize: 16,
              marginBottom: "1rem",
            }}
          >
            Sign up today.
          </Typography>

          {/* Call-to-action button for beta access */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              gap: 2,
              color: '#fff',
              borderRadius: '50px',
              py: 2,
              px: 2,
              background: 'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)',
            }}
          >
            {/* Button text */}
            <Typography
              sx={{
                fontFamily: 'Elemental End',
                textTransform: 'lowercase',
                fontSize: 12,
              }}
            >
              Beta Access
            </Typography>
            {/* Sparkler icon inside the button */}
            <Box
              sx={{
                width: '35px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LazyImage
                alt="furniture shop"
                width={25}
                height={25}
                src="/assets/images/sparkler.png"
              />
            </Box>
          </Button>
        </div>

        {/* Image wrapper to display the promotional image */}
        <div className="img-wrapper">
          <LazyImage src={shirt} alt="Watch" />
        </div>
      </RootStyle>
    </Container>
  );
}
