/**
 * Section6 Component
 *
 * This component displays a promotional section highlighting the ability to generate 3D models
 * of retail products. It includes a header, subheader, and a call-to-action button styled
 * with a gradient background.
 *
 * Features:
 * - Visually engaging typography styled with custom fonts and colors.
 * - A "Beta Access" button with an icon and gradient styling.
 * - Uses styled-components for custom layout and design consistency.
 * 
 * @returns {JSX.Element} The Section6 promotional component.
 */

import LazyImage from "../../../components/LazyImage"; // Lazy-loaded image component.
import { RootStyle } from "./styles"; // Custom styled-component for layout.
import { Box, Container, Typography, Button } from '@mui/material'; // MUI components.

export default function Section6() {
  return (
    <Container sx={{ pb: 10 }}>
      <RootStyle>
        <Box sx={{ p: 5 }}>
          {/* Main Header */}
          <Typography
            sx={{
              fontSize: '36px',
              fontFamily: 'Elemental End',
              textTransform: 'lowercase',
              color: '#fff',
            }}
          >
            generate 3d models<br /> of any retail product
          </Typography>

          {/* Subheader */}
          <Typography
            sx={{
              fontFamily: 'Helvetica',
              fontSize: 18,
              marginBottom: "1rem",
              color: '#fff',
            }}
          >
            Customize your customer experience today
          </Typography>

          {/* Call-to-Action Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              gap: 2,
              color: '#fff',
              borderRadius: '50px',
              py: 2,
              px: 4,
              background: 'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)',
            }}
          >
            {/* Button Text */}
            <Typography
              sx={{
                fontFamily: 'Elemental End',
                textTransform: 'lowercase',
                fontSize: 12,
              }}
            >
              Beta Access
            </Typography>

            {/* Icon inside the Button */}
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
        </Box>
      </RootStyle>
    </Container>
  );
}
