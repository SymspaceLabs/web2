"use client";

import { motion } from "framer-motion";
import { styles } from '../page-view/styles'; // Re-enabled original import
import { H1 } from "@/components/Typography"; // Re-enabled original import
import { Container, Box, Card } from '@mui/material';
import { FlexBox, FlexColCenter } from '@/components/flex-box'; // Re-enabled original imports
import { useState, useEffect, useRef, forwardRef } from 'react'; // Added React hooks for lazy loading

// Removed mock styles and components, assuming original imports are correct.
// If 'styles', 'H1', 'FlexBox', 'FlexColCenter' are not correctly imported,
// you might need to re-add their mock definitions or ensure their paths are valid.

// GraphicsCard component, now forwarding the ref
const GraphicsCard = forwardRef(({ sx, children, overLay = false, bgImage, ...rest }, ref) => {
  return (
    <Card
      ref={ref} // Attach the forwarded ref here
      role="img"
      rel="noopener noreferrer"
      aria-label="graphics card"
      elevation={0}
      sx={{
        bgcolor: 'grey.100',
        borderRadius: { xs: 6, sm: 8, md: 10 },
        ...(bgImage && {
          // Assuming GetImagePath is defined elsewhere or you'll handle image paths directly
          // backgroundImage: `url(${GetImagePath(bgImage)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }),

        ...(overLay && {
          position: 'relative',
          '&:before': {
            content: `' '`,
            position: 'absolute',
            width: 1,
            height: 1,
            top: 0,
            left: 0,
          }
        }),
        ...sx
      }}
      {...rest}
    >
      {overLay ? <Box sx={{ position: 'relative', height: 1 }}>{children}</Box> : children}
    </Card>
  );
});

GraphicsCard.displayName = 'GraphicsCard'; // Good practice for forwardRef components

export default function Section2() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoContainerRef = useRef(null); // Ref for the container to observe visibility

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If the target element is intersecting (in view) and video hasn't been loaded yet
        if (entries[0].isIntersecting && !videoLoaded) {
          setVideoLoaded(true); // Set state to true to render the video
          observer.disconnect(); // Stop observing once the video is loaded
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the target is visible
    );

    // Start observing the video container element
    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    // Cleanup function: disconnect the observer when the component unmounts
    return () => {
      if (observer && videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, [videoLoaded]); // Re-run effect if videoLoaded state changes

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', zIndex: 2 }}>
      <Container sx={{ py: { sm: 5 } }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ height: "100%" }} // Ensures motion.div spans full height
        >
          <GraphicsCard
            sx={{ display: { xs: "none", sm: "block" }, border: '5px solid', borderColor: 'grey.300', maxWidth: "1400px", mx: "auto" }}
            ref={videoContainerRef} // Attach the ref to GraphicsCard to observe its visibility
          >
            {videoLoaded ? ( // Conditionally render the video element
              <video
                playsInline
                width="100%"
                height="100%"
                style={{ display: 'flex', objectFit: 'cover' }}
                preload="metadata" // Preload metadata (duration, dimensions) but not the whole video
                autoPlay
                loop
                muted
                poster='https://placehold.co/1280x720/cccccc/333333'
              >
                {/* Provide multiple sources for broader browser compatibility and potential size benefits */}
                <source src='/assets/videos/landing-page/reimagining-shopping.webm' type="video/webm" />
                <source src='/assets/videos/landing-page/reimagining-shopping.mp4' type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              // Display an optimized image placeholder while the video is not loaded
              <img
                src='https://placehold.co/1280x720/cccccc/333333?text=Video+Placeholder' // Use your actual optimized poster image here
                alt="Reimagining Shopping Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'flex' }}
              />
            )}
          </GraphicsCard>
        </motion.div>

        {/* LIST OF PILLS */}
        <FlexColCenter sx={{ py: { xs: 2, sm: 5 }, width: "100%" }}>
          <Box sx={{ maxWidth: '1400px' }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ height: "100%" }} // Ensures motion.div spans full height
            >
              <FlexBox sx={styles.textBubbleContainer}>
                {benefits.map((benefit, index) => (
                  <Box key={index} sx={styles.textBubble}>
                    <H1 color='#FFF' fontSize={{ xs: '8px', sm: '14px' }}>
                      {benefit}
                    </H1>
                  </Box>
                ))}
              </FlexBox>
            </motion.div>
          </Box>
        </FlexColCenter>

      </Container>
    </Box>
  );
}

const benefits = [
  'realistic 3d product visualization',
  '3d product ads',
  'real-time ar product Sizing',
  'virtual try-on technology',
  'advanced ar functionality',
  'community support + engagement',
  'accessibility awareness',
  'digital staging'
];
