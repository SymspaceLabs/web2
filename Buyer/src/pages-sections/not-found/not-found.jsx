"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, styled } from "@mui/material";
import { FlexRowCenter } from "@/components/flex-box"; // Assuming this component provides centered flex layout

// Styled components to encapsulate theme-specific styles
const RootStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  // Updated background color to rgb(31, 31, 31)
  backgroundColor: '#000',
  // Large, blurred blue radial gradient from the bottom center, matching the hero section
  backgroundImage: 'radial-gradient(circle at 50% 120%, rgba(48, 132, 255, 0.25), transparent 50%)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center bottom', // Position the gradient at the bottom center
  backgroundSize: '200% 150%', // Make the gradient large and spread
  position: 'relative', // Needed for potential pseudo-elements or more complex gradients
  overflow: 'hidden', // Ensures the gradient doesn't spill
  padding: theme.spacing(2),
}));

const ContentStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  maxWidth: 600, // Constrain width for better readability
  zIndex: 1, // Ensure content is above the background gradient
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

// Styles for the primary black button with subtle glow
const primaryButtonStyle = {
  backgroundColor: '#1A1A1A', // Very dark grey/black background, similar to "GET INVOLVED" button
  color: '#FFFFFF', // White text
  borderRadius: '999px', // Fully rounded pill shape
  padding: '12px 30px',
  fontWeight: 600,
  border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle light border
  boxShadow: '0 0 15px rgba(48, 132, 255, 0.3)', // Subtle blue glow
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#2A2A2A', // Slightly lighter black on hover
    boxShadow: '0 0 25px rgba(48, 132, 255, 0.5)', // Enhanced blue glow
    borderColor: 'rgba(48, 132, 255, 0.5)', // Blue border on hover
    transform: 'translateY(-2px)', // Slight lift
  },
};

// Styles for the secondary outlined button
const secondaryButtonStyle = {
  color: '#FFFFFF', // White text
  borderColor: 'rgba(255, 255, 255, 0.2)', // Subtle white border
  borderRadius: '999px',
  padding: '12px 30px',
  fontWeight: 600,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    borderColor: '#3084FF', // Blue border on hover
    color: '#3084FF', // Blue text on hover
    backgroundColor: 'rgba(48, 132, 255, 0.05)', // Very slight blue background tint
    boxShadow: '0 0 15px rgba(48, 132, 255, 0.4)', // Subtle blue glow
    transform: 'translateY(-2px)', // Slight lift
  },
};

export default function NotFound() {
  const router = useRouter();

  return (
    <RootStyle>
      <ContentStyle>
        {/* Large "404" in bold white text */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
            fontWeight: 800,
            lineHeight: 1,
            mb: 2,
            color: '#FFFFFF', // Bold white text
            textShadow: '0 0 10px rgba(48, 132, 255, 0.5)', // Subtle blue glow for text
          }}
        >
          404
        </Typography>

        {/* Heading for Page Not Found */}
        <Typography
          variant="h4"
          color="#FFFFFF" // Bold white text for heading
          sx={{ mb: 1.5, fontWeight: 700 }}
        >
          Page Not Found
        </Typography>

        {/* Descriptive text */}
        <Typography
          variant="body1"
          color="#A0A0A0" // Light grey for body text
          sx={{ mb: 4, maxWidth: 450, lineHeight: 1.6 }}
        >
          Oops! The page you're trying to reach doesn't seem to exist. It might have been moved or deleted.
        </Typography>

        {/* Action Buttons */}
        <FlexRowCenter flexWrap="wrap" gap={2}>
          <Button variant="outlined" sx={secondaryButtonStyle} onClick={() => router.back()}>
            Go Back
          </Button>

          <Button variant="contained" sx={primaryButtonStyle} onClick={() => router.push("/")}>
            Go to Home
          </Button>
        </FlexRowCenter>
      </ContentStyle>
    </RootStyle>
  );
}