"use client";

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';

export default function Section4() {
  const [activeBenefit, setActiveBenefit] = useState(benefits[0]);

  const handleBenefitChange = (benefit) => {
    setActiveBenefit(benefit);
  };

  useEffect(() => {
    const hash = window.location.hash; // Get the current hash from the URL
    if (hash && document.querySelector(hash)) {
      // Scroll to the element with the corresponding id
      document.querySelector(hash).scrollIntoView({ behavior: "smooth" });
    }
  }, []); // Run once when the component is mounted

  return (
    <Box id="features" sx={{ py: { xs: 2, sm: 5 } }}>
      <Container sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography fontSize={{ xs: 20, sm: 40 }} fontFamily="'Elemental End', sans-serif" textTransform="lowercase" textAlign="center" mb={4} color="white">
          environmental &nbsp;Impact
        </Typography>
        <Typography sx={{  marginBottom: '2rem', color: '#fff', fontFamily: 'Helvetica', fontSize: { xs: 10, sm: 14, md: 16 }, maxWidth:{ xs: '360px', sm: '1000px' }, textAlign:'center', lineHeight: {xs:'20px', sm:'35px'} }}>
          Symspace is revolutionizing e-commerce and real estate by integrating AR-powered solutions that significantly reduce waste and carbon footprints across industries. By leveraging our platform for Virtual Try-On, Digital Staging, AI-powered 3D Modeling, and 3D Product Advertisements—Symspace helps retailers, real estate professionals, and brands minimize unnecessary production, shipping, and inventory costs while maximizing efficiency.
        </Typography>

        <Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <List sx={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'15px' }}>
                {benefits.map((benefit, index) => (
                  <ListItem
                    key={index}
                    button
                    onMouseEnter={() => handleBenefitChange(benefit)}
                    sx={textBubbleStyle}
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
                  position: 'relative',
                  zIndex: 2,
                  borderRadius: '15px', // Optional rounded corners
                  backgroundColor: '#000', // Background placeholder color
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: {sm:'650px'},
                  height: {sm:'365px'},
                  overflow: 'hidden',
                }}
              >
                <video
                  width="100%"
                  height="100%"
                  autoPlay
                  loop
                  muted
                  src={activeBenefit.video}
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    objectFit: 'contain', // Ensures the video scales proportionally
                    backgroundColor: 'transparent', // Transparent for the video itself
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

const benefits = [
  { 
    title: 'virtual try-on',
    header: '3d products with visible details',
    content: 'Bring products to life with near-precise, true-to-size 3D models that capture every detail. This advanced feature ensures users can view items in their exact dimensions and brands can gauge products before mass producing. From furniture perfectly fitting into a space to clothing that aligns with measurements. We eliminate ambiguity and improve confidence in purchases, making every decision more informed and confident.',
    video: '/assets/videos/global-impact/visual-try-on.mp4'
  },
  { 
    title: 'digital staging',
    header: 'Immersive experience',
    content: 'Explore products as if they were in your room with high-resolution 3D models. Every texture, color, dimension, and intricate feature is rendered with stunning accuracy, allowing users to rotate, zoom, and inspect items from every angle. This immersive visualization makes online shopping and staging feel as real as browsing in-store.',
    video: '/assets/videos/global-impact/digital-staging.mp4'
  },
  { 
    title: '3d product modeling',
    header: 'Interactive digital trial room',
    content: "Take product interaction to the next level with advanced AR capabilities. From spatial mapping that places products seamlessly in real-world environments to dynamic lighting that adapts to your space, users can rotate, resize, and interact with items in ways that feel tangible and intuitive. This is more than AR; it's a hands-on experience.",
    video: '/assets/videos/global-impact/3d-product-modeling.mp4'
  },
  { 
    title: '3d product ads',
    header: 'Try before You buy, anytime, anywhere',
    content: "Take product interaction to the next level with advanced AR capabilities. From spatial mapping that places products seamlessly in real-world environments to dynamic lighting that adapts to your space, users can rotate, resize, and interact with items in ways that feel tangible and intuitive. This is more than just technology; it's a realistic shopping experience.",
    video: '/assets/videos/global-impact/3d-product-ads.mp4'
  }
];

const cardStyle = {
  filter: 'drop-shadow(0px 5px 50px rgba(0, 0, 0, 0.25))',
  borderRadius: '50px',
  position: 'relative',
  maxWidth: { xs: '100%', sm: '600px', md: '1200px' },
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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '5px',
  minHeight: '200px',
  minWidth: { sm:'1000px' },
  overflow: 'hidden',
};

const textBubbleStyle = {
  py: 2,
  cursor: 'pointer',
  mb: 2,
  fontFamily: 'Elemental End',
  textTransform: 'lowercase',
  '&:hover': {
    background: 'rgba(3, 102, 254, 0.6)',
  },
  background: 'rgba(255, 255, 255, 0.35)',
  boxShadow: `
    inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
    inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
    inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
    inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
    inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)
  `,
  borderRadius: '80px',
  px: 3,
  color: '#fff',
  textAlign:'center',
  maxWidth:'100%'
};
