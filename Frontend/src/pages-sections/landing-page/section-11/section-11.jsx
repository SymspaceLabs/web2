'use client'

import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

/**
 * Section11 Component
 *
 * This component displays three distinct cards with information about AR (Augmented Reality) statistics and services.
 * - The first set of cards displays statistics about AR usage and effectiveness.
 * - The second card provides details about AR Visuals, showcasing the company's AR services.
 * - The third card contains a video showcasing an AR visual, enhancing the user experience.
 * 
 * The layout is responsive, with card components adapting to various screen sizes.
 */
export default function Section11() {
  // Array of statistics for the first set of cards
  const cardsData1 = [
    { number: '90', description: (<>90%+ of Americans use/<br/>would use AR for e-commerce</>), },
    { number: '94', description: (<>94% conversion rate for products <br/> purchased through AR/VR ads</>) },
    { number: '98', description: (<>98% of Americans who used AR<br/>while shopping found it helpful</>) },
  ];

  return (
    // Main grid container with background and padding
    <Grid sx={{ background: '#1F1F1F', py: 10 }}>
      <Container>
        <Grid container spacing={3}>
          {/* Map over the cardsData1 array and render CustomCard1 for each entry */}
          {cardsData1.slice(0, 3).map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CustomCard1 number={card.number} description={card.description} />
            </Grid>
          ))}
          
          {/* Static Cards for CustomCard2 and CustomCard3 */}
          <Grid item xs={12} sm={6} md={6}>
            <CustomCard2 />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomCard3 />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

/**
 * CustomCard1 Component
 * 
 * A card displaying a percentage statistic with an animated number counter.
 * The number increases over time, and the card contains a description and a "Learn More" button.
 */
export const CustomCard1 = ({ number, description }) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  // Animated number counter that increases over time
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = Math.ceil(number / (duration / 50)); // Increment value based on target and duration
    const interval = setInterval(() => {
      start += increment;
      if (start >= number) {
        clearInterval(interval);
        start = number;
      }
      setCurrentNumber(start);
    }, 50);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [number]);

  return (
    <Card sx={{ minWidth: 275, mb: 2, borderRadius: '50px', '&:hover .fadeInBtn': { opacity: 1, transform: 'translateY(0)', }, }}>
      <CardContent sx={{ px: 0 }}>
        {/* Content for CustomCard1 */}
        <Box sx={{ px: 3, pt: 15, pb: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '30px' }}>
          <Typography component="div" sx={{ fontFamily: 'Helvetica', color: '#000', fontSize: 128, fontWeight: 'bold' }}>
            {currentNumber}% {/* Display the animated percentage */}
          </Typography>
          <Typography sx={{ fontFamily: 'Helvetica', color: '#909090', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
            {description} {/* Description text for the statistic */}
          </Typography>
          
          {/* Fade-in button with transition */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              className="fadeInBtn"
              sx={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'all 0.3s ease',
                width: '50%',
                py: 1,
                borderRadius: 50,
                border: '1px black solid',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 16,
                  fontFamily: 'Elemental End',
                  textTransform: 'lowercase',
                  fontWeight: 700,
                }}
              >
                Learn More
              </Typography>
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

/**
 * CustomCard2 Component
 * 
 * A card that describes AR Visuals and provides information about the company's AR services.
 * Includes a "Contact Us" button to engage users.
 */
export const CustomCard2 = () => {
  return (
    <Card sx={{ minWidth: 275, mb: 2, borderRadius: '50px', display: 'flex', flexDirection: 'column', height: '100%', '&:hover .fadeInBtn': { opacity: 1, transform: 'translateY(0)', } }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '30px', pt: 5, px:5,  }}>
        <Typography variant="h1" component="div" sx={{ fontFamily: 'Helvetica', color: '#000', fontSize: 72, fontWeight: 'bold' }}>
          AR Visuals
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'Helvetica', color: '#909090', fontSize: '24px', fontWeight: 'bold', textAlign: 'justify' }}>
          We create unique AR experiences for our clients. Share your vision and we will bring any idea into reality for your communities. AR Visuals provide businesses and consumers with an immersive medium for marketing. Conversion rates for AR advertising have been reported to be as high as 25%, which is more than 10 times higher than traditional ads.
        </Typography>
        
        {/* Contact Us button */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button className="fadeInBtn" sx={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.3s ease',
              width: '25%',
              py: 1,
              borderRadius: 50,
              border: '1px black solid',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
                fontFamily: 'Elemental End',
                textTransform: 'lowercase',
                fontWeight: 700,
              }}
            >
              Contact Us
            </Typography>
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

/**
 * CustomCard3 Component
 * 
 * A card that displays a video showcasing AR Visuals. It uses a webm video as a background to display AR content.
 */
export const CustomCard3 = () => {
  return (
    <Card sx={{ minWidth: 275, borderRadius: '50px', display: 'flex', flexDirection: 'column', height: 550, overflow: 'hidden' }}>
      <Box sx={{ position: 'relative', width: '100%', height: 550, overflow: 'hidden' }}>
        <video
          width={292}
          height={195}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          autoPlay loop muted
        >
          <source src="https://uploads-ssl.webflow.com/64694132a19474ee2218a9e6/646e4fcefb0291863787d1a7_AR_Visuals_Spaceman-transcode.webm" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Card>
  );
};
