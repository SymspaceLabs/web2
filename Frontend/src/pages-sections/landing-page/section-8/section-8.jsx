/**
 * Section8 Component
 *
 * This component showcases the "SYM-AI" 3D modeling SaaS platform with:
 * - A floating image for enhanced visual appeal.
 * - A centralized description of the platform's features.
 * - A call-to-action button encouraging users to learn more.
 *
 * The layout adjusts responsively, and the floating image is hidden on smaller screens.
 */
import { Box, Container, Typography, Button, Grid } from '@mui/material'; // Importing Material-UI components for layout and styling
import LazyImage from "../../../components/LazyImage"; // Importing a lazy-loading image component

export default function Section8() {
  return (
    // Main grid container with a light background and vertical padding
    <Grid sx={{ background: '#EDEDED', py: 8, position: 'relative' }}>
      {/* Floating image positioned to the left of the section */}
      <FloatingImage1 />

      <Container>
        {/* Centered content box for text and button */}
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            alignItems: 'center',
          }}
        >
          {/* Section Title */}
          <Typography
            sx={{
              fontFamily: 'Helvetica',
              color: '#4E4E4E',
              fontSize: 72,
              fontWeight: 'bold',
            }}
          >
            3d simulation
          </Typography>

          {/* Description of the platform */}
          <Typography
            sx={{
              fontFamily: 'Helvetica',
              color: '#909090',
              fontSize: 18,
              textAlign: 'justify',
              maxWidth: 900,
              lineHeight: '30px'
            }}
          >
            Symspace's Generative AI 3D modeling SaaS serves as a collaborative
            platform, facilitating communication and feedback between brands
            and our team. This ensures that the generated 3D models align with
            the brand's vision and requirements, fostering a productive
            partnership. Brands can request custom 3D models based on their
            specific requirements, such as adding branding elements, adjusting
            colors or materials, and exploring different variations of the
            product. Distinct size measurements can also be requested. This
            adaptability allows brands to showcase their products in a unique
            and tailored manner. We have streamlined the entire 3D modeling
            process, from requesting models to receiving the final outputs.
            This efficient workflow saves time and resources for brands,
            enabling them to focus on their core business activities. This 3D
            Product shirt is used in our AR Marketplace for consumers to view
            in our AR Trial Room experience.
          </Typography>

          {/* Call-to-action button */}
          <Box sx={{ width: '100%' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                gap: 2,
                fontFamily: 'Helvetica',
                color: '#fff',
                borderRadius: '50px',
                py: 2,
                background:
                  'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)',
                minWidth: '300px',
              }}
            >
              {/* Button Text */}
              <Typography
                sx={{
                  fontFamily: 'Elemental End',
                  textTransform: 'lowercase',
                  fontSize: 16,
                }}
              >
                Learn More
              </Typography>

              {/* Icon inside the button */}
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
        </Box>
      </Container>
    </Grid>
  );
}

/**
 * FloatingImage1 Component
 *
 * Displays a floating image positioned to the left of the section.
 * The image is hidden on smaller screens for better responsiveness.
 */
export const FloatingImage1 = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: -20,
        transform: 'translateY(-60%)',
        zIndex: 10,
        width: '40%',
        height: 'auto',
        display: { xs: 'none', md: 'block' }, // Hide on mobile, show on medium and larger screens
      }}
    >
      <LazyImage
        width={500}
        height={500}
        src="/assets/images/iphone3.png"
        alt="iphone"
      />
    </Box>
  );
};
