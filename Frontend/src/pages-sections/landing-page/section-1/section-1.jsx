"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Typography, Button, Grid, useTheme, Card } from "@mui/material";
import LazyImage from "../../../components/LazyImage";
import { section1Styles } from "./styles";
import { motion, useScroll, useTransform } from "framer-motion";
import { FlexBox } from "@/components/flex-box";

export default function Section1() {
  const theme = useTheme();
  const styles = section1Styles(theme);
  const containerRef = useRef(null);
  const [fadeIn, setFadeIn] = useState(false);

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const hasAnimatedRef = useRef(false);

  // Refs for each section
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  // State for each section
  const [fadeIn1, setFadeIn1] = useState(false);
  const [fadeIn2, setFadeIn2] = useState(false);
  const [fadeIn3, setFadeIn3] = useState(false);

    // Observer function
    const observeSection = (ref, setFadeIn) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setFadeIn(true);
          }
        },
        { threshold: 0.6 }
      );
  
      if (ref.current) observer.observe(ref.current);
  
      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    };

  // Observe all sections
  useEffect(() => observeSection(section1Ref, setFadeIn1), []);
  useEffect(() => observeSection(section2Ref, setFadeIn2), []);
  useEffect(() => observeSection(section3Ref, setFadeIn3), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          setFadeIn(true);
          hasAnimatedRef.current = true; // Ensures it never triggers again
        }
      },
      { threshold: 0.6 }
    );
  
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
  
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  


  // threshold - adjust threshold as needed
  const options = { root: null, rootMargin: '0px', threshold: 0.6 };

  // Handle video play/pause based on intersection with the viewport
  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Autoplay was prevented:", error);
          });
      }
    }
  }, []);
  
  
  useEffect(() => {
    setFadeIn(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.4, 0.6], [0.9, 0.92, 0.94, 0.96, 1]);

  return (
    <Box sx={{ position: 'relative', background: '#1F1F1F', overflow: 'hidden' }}>
      {/* Section 1 */}
      <Grid ref={section1Ref}>
        <Container sx={styles.container}>
          {/* Decorative blobs */}
          <Box sx={{ ...styles.blob1, zIndex: 1 }} />
          <Box sx={{ ...styles.blob2, zIndex: 1 }} />
          <Box sx={{ ...styles.blob3, zIndex: 2 }} />
          <Box sx={{ ...styles.blob4, zIndex: 1 }} />

          <Box sx={styles.contentBox}>
            <Grid container spacing={4} alignItems="center">
              {/* Left content */}
              <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", zIndex: 2 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: fadeIn ? 1 : 0, y: fadeIn ? 0 : 30 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <Typography sx={styles.heading}>AI Powered AR Commerce</Typography>
                  <Typography sx={styles.title}>SYMSPACE</Typography>
                  <Typography sx={styles.description}>
                    Revolutionize your shopping experience through Augmented Reality.
                  </Typography>
                  <Box sx={styles.buttonGroup}>
                    <Button variant="contained" sx={styles.containedButton}>
                      <Typography sx={styles.buttonText}>Get Started</Typography>
                      <Box sx={styles.imageBox}>
                        <LazyImage alt="furniture shop" width={25} height={25} src="/assets/images/sparkler.png" />
                      </Box>
                    </Button>
                    <Button sx={styles.outlinedButton}>Shop Now</Button>
                  </Box>
                </motion.div>
              </Grid>

              {/* Right content: Promotional video */}
              <Grid item xs={12} md={6} sx={{ zIndex: 2 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: fadeIn ? 1 : 0, y: fadeIn ? 0 : 30 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <Box sx={styles.videoContainer}>
                    <video
                      width="50%"
                      height="auto"
                      autoPlay
                      loop
                      muted
                      src="https://uploads-ssl.webflow.com/64694132a19474ee2218a9e6/648a8e1d8d146c19eb799200_Prosthetic_CMP_black_trimeed-transcode.mp4"
                      poster="https://uploads-ssl.webflow.com/64694132a19474ee2218a9e6/648a8e1d8d146c19eb799200_Prosthetic_CMP_black_trimeed-poster-00001.jpg"
                      style={{ position: "relative", zIndex: 2 }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Grid>

      {/* Section 2 */}
      <Container sx={{ py: 5 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: fadeIn ? 1 : 0, y: fadeIn ? 0 : 30 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <GraphicsCard sx={{ border: '5px solid', borderColor: 'grey.300', maxWidth: "1400px", mx: "auto" }}>
            <video
              playsInline
              width="100%"
              height="100%"
              style={{ display: 'flex', objectFit: 'cover' }}
              preload="metadata"
              autoPlay
              loop
              muted
              poster='/assets/videos/landing-page/reimagining-shopping.mp4'
            >
              <source src='/assets/videos/landing-page/reimagining-shopping.mp4' type="video/mp4" />
            </video>
          </GraphicsCard>
        </motion.div>
      </Container>

      {/* Section 3 */}
      <FlexBox flexDirection="column" width="100%" sx={{ py:5 }} ref={section3Ref}>
        <motion.div 
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: fadeIn ? 1 : 0, y: fadeIn ? 0 : 30 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <FlexBox justifyContent="center" gap={3} width="100%" sx={{ flexDirection: { xs: "column", sm: "row" }, gap: { xs: 2, sm: 3 }, p:2 }}>
            {benefits.slice(0, 4).map((benefit,index) => (
              <Box key={index} sx={textBubbleStyle}>
                {benefit}
              </Box>
            ))}
          </FlexBox>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: fadeIn ? 1 : 0, y: fadeIn ? 0 : 30 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <FlexBox justifyContent="center" gap={3} width="100%" sx={{ flexDirection: { xs: "column", sm: "row" }, gap: { xs: 2, sm: 3 }, p:2 }}>
            {benefits.slice(4, 8).map((benefit, index) => (
              <Box  key={index} sx={textBubbleStyle}>
                {benefit}
              </Box>
            ))}
          </FlexBox>
        </motion.div>
      </FlexBox>
    </Box>
  );
}

const GraphicsCard = ({ sx, children, overLay = false, bgImage, ...rest }) => {
  const theme = useTheme();

  return (
    <Card
      role="img"
      rel="noopener noreferrer"
      aria-label="graphics card"
      elevation={0}
      sx={{
        bgcolor: 'grey.100',
        borderRadius: { xs: 6, sm: 8, md: 10 },
        ...(bgImage && {
          backgroundImage: `url(${GetImagePath(bgImage)})`,
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
            background: typeof overLay === 'string' ? overLay : alpha(theme.palette.grey[100], 0.75)
          }
        }),
        ...sx
      }}
      {...rest}
    >
      {overLay ? <Box sx={{ position: 'relative', height: 1 }}>{children}</Box> : children}
    </Card>
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

const textBubbleStyle = {
  py: 2,
  mb: 2,
  fontFamily: 'Elemental End',
  textTransform: 'lowercase',
  background: 'rgba(255, 255, 255, 0.35)',
  boxShadow: `
    inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
    inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
    inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
    inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
    inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)
  `,
  borderRadius: '80px',
  px:3,
  color: '#fff'
}
