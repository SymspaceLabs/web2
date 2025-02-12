"use client";

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, List, ListItem, ListItemText, Card, useMediaQuery } from '@mui/material';
import Image from 'next/image';

export default function Section3() {
  const downMd = useMediaQuery(theme => theme.breakpoints.down("sm"));
  const [activeBenefit, setActiveBenefit] = useState(benefits[0]);
  const [fade, setFade] = useState(true);

  const handleBenefitChange = (benefit) => {
    setFade(false); // Start fade-out
    setTimeout(() => {
      setActiveBenefit(benefit); // Change content
      setFade(true); // Start fade-in
    }, 300); // Match the duration of the fade-out effect
  };

  useEffect(() => {
    const hash = window.location.hash; // Get the current hash from the URL
    if (hash && document.querySelector(hash)) {
      // Scroll to the element with the corresponding id
      document.querySelector(hash).scrollIntoView({ behavior: "smooth" });
    }
  }, []); // Run once when the component is mounted

  return (
    <Box id="features" sx={{ py: { xs: 2, sm: 20 } }}>
      <Container sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography
          fontSize={{ xs: 20, sm: 40 }}
          fontFamily="Elemental End"
          textTransform="lowercase"
          textAlign="center"
          mb={4}
        >
          an&nbsp;&nbsp;app&nbsp;&nbsp;that&nbsp;&nbsp;redefines <br /> ar&nbsp;&nbsp;shopping
        </Typography>

        <Card
          sx={{
            filter: 'drop-shadow(0px 5px 50px rgba(0, 0, 0, 0.25))',
            borderRadius: '50px',
            position: 'relative',
            maxWidth: '1200px',
            width: '100%',
            boxShadow: `
              inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
              inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
              inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)
            `,
            backdropFilter: 'blur(10.0285px)',
            background: 'rgba(255, 255, 255, 0.35)',
          }}
        >
          <Grid container spacing={4}>
            {/* Left: List of benefits */}
            <Grid item xs={12} md={5}>
              <List sx={{ padding: '25px' }}>
                {benefits.map((benefit, index) => (
                  <ListItem
                    key={index}
                    button
                    onMouseEnter={() => handleBenefitChange(benefit)}
                    sx={{
                      py: 2,
                      cursor: 'pointer',
                      background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
                      boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '30px',
                      mb: 2,
                      '&:hover': {
                        background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.8) -19.85%, rgba(235, 235, 235, 0.6) 4.2%, rgba(224, 224, 224, 0.5) 13.88%, rgba(212, 212, 212, 0.4) 27.98%, rgba(207, 207, 207, 0.35) 37.8%, rgba(202, 202, 202, 0.3) 44.38%, rgba(200, 200, 200, 0.25) 50.54%, rgba(196, 196, 196, 0.2) 60.21%)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={benefit.title}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontFamily: 'Elemental End',
                          textTransform: 'lowercase',
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Right: Content */}
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  pr: { xs: 2, sm: 10 },
                  pl: { xs: 2, sm: 0 },
                  pt: { xs: 0, sm: 5 },
                  pb: { xs: 10, sm: 0 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '5px',
                  minHeight: '200px',
                }}
              >
                <Typography variant="h6" fontFamily="Elemental End" textTransform="lowercase">
                  {activeBenefit.header}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: { xs: 12, sm: 18 } }}>
                  {activeBenefit.content}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>

        {/* Circle */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: -100, sm: -150 },
            right: { xs: '50%', md: '10%' },
            width: { xs: 150, sm: 280 },
            height: { xs: 150, sm: 280 },
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow:
              '12.8px 57.6px 83.2px rgba(3, 102, 254, 0.1), inset 0px 1.6px 3.2px rgba(0, 0, 0, 0.04), inset -1.6px -6.4px 6.4px rgba(0, 0, 0, 0.06), inset 1.6px 6.4px 6.4px #FFFFFF',
            backdropFilter: 'blur(5px)',
            zIndex: 10,
            transition: 'opacity 0.1s ease',
            opacity: fade ? 1 : 0,
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              padding: '20px',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src={activeBenefit.image}
              alt={activeBenefit.title}
              width={downMd? 100: 200}
              height={downMd? 100: 200}
              style={{
                objectFit: 'contain',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

const benefits = [
  { 
    title: 'real-time true to size augmentation',
    header: '3d products with visible details',
    content: 'Bring products to life with near-precise, true-to-size 3D models that capture every detail. This advanced feature ensures users can view items in their exact dimensions and brands can gauge products before mass producing. From furniture perfectly fitting into a space to clothing that aligns with measurements. We eliminate ambiguity and improve confidence in purchases, making every decision more informed and confident.',
    image: '/assets/images/ar-app-simulation/benefit-1.png'
  },
  { 
    title: 'realistic 3d product visualization',
    header: 'Immersive experience',
    content: 'Explore products as if they were in your room with high-resolution 3D models. Every texture, color, dimension, and intricate feature is rendered with stunning accuracy, allowing users to rotate, zoom, and inspect items from every angle. This immersive visualization makes online shopping and staging feel as real as browsing in-store.',
    image: '/assets/images/ar-app-simulation/benefit-2.png'
  },
  { 
    title: 'advanced ar functionality',
    header: 'Interactive digital trial room',
    content: "Take product interaction to the next level with advanced AR capabilities. From spatial mapping that places products seamlessly in real-world environments to dynamic lighting that adapts to your space, users can rotate, resize, and interact with items in ways that feel tangible and intuitive. This is more than AR; it's a hands-on experience.",
    image: '/assets/images/ar-app-simulation/benefit-3.png'
  },
  { 
    title: 'virtual try-on technology',
    header: 'Try before You buy, anytime, anywhere',
    content: "Take product interaction to the next level with advanced AR capabilities. From spatial mapping that places products seamlessly in real-world environments to dynamic lighting that adapts to your space, users can rotate, resize, and interact with items in ways that feel tangible and intuitive. This is more than just technology; it's a realistic shopping experience.",
    image: '/assets/images/ar-app-simulation/benefit-4.png'
  },
  { 
    title: 'personalized ar shopping experience',
    header: 'Your Shopping Journey, Tailored to You',
    content: 'Experience a new level of personalization with AI-powered AR. From custom size recommendations based on body scans and inputs to curated product suggestions tailored to your preferences.  Every aspect of the journey is designed to feel unique. We cross reference size charts to the augmented products in order to provide near-precise sizing recommendations. ',
    image: '/assets/images/ar-app-simulation/benefit-5.png'
  },
];
