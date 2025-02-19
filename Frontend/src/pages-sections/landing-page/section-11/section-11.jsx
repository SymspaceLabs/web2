'use client'

import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


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
  const cardsData = [
    { number: '90', description: (<>90%+ of Americans use/<br/>would use AR for e-commerce</>), },
    { number: '94', description: (<>94% conversion rate for products <br/> purchased through AR/VR ads</>) },
    { number: '98', description: (<>98% of Americans who used AR<br/>while shopping found it helpful</>) },
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    // Main grid container with background and padding
    <Grid sx={{ background: '#1F1F1F', py: 10 }}>
      <Container>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Grid container spacing={3}>
            {/* Map over the cardsData array and render CustomCard1 for each entry */}
            {cardsData.slice(0, 3).map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div variants={fadeInVariants}>
                  <CustomCard1 number={card.number} description={card.description} />
                </motion.div>
              </Grid>
            ))}
            
            <motion.div variants={fadeInVariants} style={{ width: '100%' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                  <CustomCard2 />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <motion.div variants={fadeInVariants}>
                    <CustomCard3 />
                  </motion.div>
                </Grid>
              </Grid>
            </motion.div>

          </Grid>
        </motion.div>
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
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (!inView) return; // Start only when in view

    let start = 0;
    const duration = 2000;
    const increment = Math.ceil(number / (duration / 50));
    const interval = setInterval(() => {
      start += increment;
      if (start >= number) {
        clearInterval(interval);
        start = number;
      }
      setCurrentNumber(start);
    }, 50);

    return () => clearInterval(interval);
  }, [inView, number]);

  return (
    <Card 
      ref={ref} 
      sx={{ 
        mb: 2, 
        borderRadius: '50px', 
        '&:hover .fadeInBtn': { opacity: 1, transform: 'translateY(0)' } // Button fades in on hover
      }}
    >
      <CardContent sx={{ px: 0 }}>
        <Box sx={{ px: 3, pt: {xs:5, sm:20}, pb: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '50px' }}>
          <Typography component="div" sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#000', fontSize: 100 }}>
            {currentNumber}%
          </Typography>
          <Typography sx={{ fontFamily: 'Helvetica', color: '#353535', fontSize: 24, fontWeight: 500, textAlign: 'center' }}>
            {description}
          </Typography>
          {/* Button with fade-in effect */}
          <Box>
            <Button 
              className="fadeInBtn"
              sx={{ 
                opacity: 0, 
                transform: 'translateY(20px)', 
                transition: 'all 0.3s ease',
                py: 2,
                px: 3,
                borderRadius: 50,
                border: '2px solid black',
                color: 'black',
                fontSize: 12,
                fontFamily: 'Elemental End',
                textTransform: 'lowercase',
                fontWeight: 500,
                ':hover': {
                  background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
                  color: '#FFF',
                  border: '2px solid white',
                }
              }}
            >
              Learn More
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
    <Card sx={{ borderRadius: '50px', display: 'flex', flexDirection: 'column', height: '100%', '&:hover .fadeInBtn': { opacity: 1, transform: 'translateY(0)'} }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '30px', pt: 5, px:5 }}>
        <Typography component="div" sx={{ fontFamily: 'Elemental End', textTransform:'lowercase', color: '#000', fontSize: {xs:48, sm:72}, fontWeight: 'bold' }}>
          AR Visuals
        </Typography>
        <Typography sx={{ fontFamily: 'Helvetica', color: '#353535', fontSize: '24px', fontWeight: 500, textAlign: 'justify' }}>
          We create unique AR experiences for our clients. Share your vision and we will bring any idea into reality for your communities. AR Visuals provide businesses and consumers with an immersive medium for marketing. Conversion rates for AR advertising have been reported to be as high as 25%, which is more than 10 times higher than traditional ads.
        </Typography>
        
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button className="fadeInBtn" 
            sx={{ 
              opacity: 0, 
              transform: 'translateY(20px)', 
              transition: 'all 0.3s ease',
              width: '25%',
              py: 2,
              px: 3,
              borderRadius: 50,
              border: '2px solid black',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              color: 'black',
              fontSize: 12,
              fontFamily: 'Elemental End',
              textTransform: 'lowercase',
              fontWeight: 500,
              ':hover' : {
                background : 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
                color: '#FFF',
                border: '2px solid white',
              }
            }}
          >
            Contact Us
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
