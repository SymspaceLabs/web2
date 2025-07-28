"use client";

// ==============================================================
// Loading Page
// ==============================================================

import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles"; // Import styled
import { FlexRowCenter } from "@/components/flex-box";

// ==============================================================

// Create a styled component for the loading container to apply the theme
const LoadingContainer = styled(FlexRowCenter)(({ theme }) => ({
  minHeight: "100vh",
  // Apply the same dark background color
  backgroundColor: '#000',
  // Apply the same large, blurred blue radial gradient
  backgroundImage: 'radial-gradient(circle at 50% 120%, rgba(48, 132, 255, 0.25), transparent 50%)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center bottom',
  backgroundSize: '200% 150%',
  position: 'relative',
  overflow: 'hidden',
}));

const Loading = () => {
  return (
    // Use the styled container
    <LoadingContainer>
      {/* CircularProgress will use your theme's primary color,
          which should ideally be a blue that matches the Symspace Labs theme.
          If your primary color isn't blue, you might set it explicitly:
          <CircularProgress sx={{ color: '#3084FF' }} />
      */}
      <CircularProgress color="primary" />
    </LoadingContainer>
  );
};

export default Loading;