'use client'

// =============================================================
// Section 12 Component
// =============================================================

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { styles } from '../page-view/styles';
import { Container, Grid } from '@mui/material';
import { H1, Paragraph } from '@/components/Typography';
import { useInView } from 'react-intersection-observer';
import { FlexBox, FlexCol } from '@/components/flex-box';
import { Box, Card, CardContent, Button } from '@mui/material';

// =============================================================

export default function Section12() {
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
    <Grid sx={{ py: {xs:2, sm:10}, position:'relative', zIndex:2 }}>
      <Container sx={{ pr:0, px: {xs:2} }} disableGutters>
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
              <Grid container spacing={3} sx={{marginLeft:'0 !important', width: '100%', mt:{xs:0}}}>
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

// CustomCard1 Component

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
    <Box 
      ref={ref} 
      sx={{ 
        background:"#FFF",
        mb: { sm: 2 },
        px: { xs: 1 },
        borderRadius: {xs:'30px', sm:'50px'}, 
        '&:hover .fadeInBtn': { 
          opacity: 1,
          transform: 'translateY(0)'
        }
      }}
    >
      <FlexBox sx={{ px: {xs:1, sm:3}, pt: {xs:3, sm:20}, pb: 3, flexDirection: {xs:'row', sm:'column'}, alignItems: 'center', justifyContent: {xs:'space-between', sm:'center'}, height: '100%', gap: {sm:'50px'} }}>
        <H1 sx={{  color: '#000', fontSize: {xs:40, sm:100} }}>
          {currentNumber}%
        </H1>
        <Paragraph sx={{ color: '#353535', fontSize: {xs:10, sm:20}, textAlign: {xs:'left', sm:'center'}, maxWidth:{xs:'120px', sm:'100%'}, px: {xs:1} }}>
          {description}
        </Paragraph>
        {/* Button with fade-in effect */}
        <FlexBox>
          <Link href="/global-impact" passHref>
            <Button
              className="fadeInBtn"
              sx={{
                opacity: { xs: 1, sm: 0 }, // Keep button always visible on mobile
                transform: { xs: 'none', sm: 'translateY(20px)' }, // Remove fade-in effect on mobile
                transition: { xs: 'none', sm: 'all 0.3s ease' }, // Remove animation on mobile
                py: { sm:2 },
                px: { sm:3 },
                borderRadius: 50,
                border: '2px solid black',
                color: 'black',
                fontSize: {xs:8, sm:12},
                mb: { xs:0, sm:5 },
                ':hover': {
                  background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
                  color: '#FFF',
                  border: '2px solid white',
                },
              }}
            >
              Learn More
            </Button>
          </Link>
        </FlexBox>
      </FlexBox>
    </Box>
  );
};

// CustomCard2 Component

export const CustomCard2 = () => {
  return (
    <FlexCol
      sx={{
        borderRadius: { xs: '20px', sm: '50px' },
        height: '100%',
        background:'#FFF',
        '&:hover .fadeInBtn': {
          opacity: { sm: 1 }, // Fade-in only on desktop
          transform: { sm: 'translateY(0)' },
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs:'25px', sm:'30px' },
          py: { xs: 4, sm: 8 },
          px: { xs: 2, sm: 10 },
        }}
      >
        <H1 sx={{ ...styles.sectionHeader, color: '#000' }}>
          AR Visuals
        </H1>
        <Paragraph
          sx={{
            color: '#353535',
            fontSize: { xs: '14px', sm: '20px' },
            fontWeight: 500,
            textAlign: 'justify',
            lineHeight: 1.75
          }}
        >
          We create unique AR experiences for brands helping them bring any idea into reality.
          Augment animated visuals on top of products, displays, or billboards for an immersive marketing medium.
          Conversion rates for AR advertising have been reported to be as high as 25%, which is more than 10 times higher than traditional ads.
        </Paragraph>
        <FlexBox>
          <Link  href="/contact-us" passHref>
            <Button
              className="fadeInBtn"
              sx={{
                opacity: { xs: 1, sm: 0 }, // Keep button always visible on mobile
                transform: { xs: 'none', sm: 'translateY(20px)' }, // Remove fade-in effect on mobile
                transition: { xs: 'none', sm: 'all 0.3s ease' }, // Remove animation on mobile
                py: { sm:2 },
                px: { sm:3 },
                borderRadius: 50,
                border: '2px solid black',
                color: 'black',
                fontSize: {xs:8, sm:12},
                ':hover': {
                  background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
                  color: '#FFF',
                  border: '2px solid white',
                },
              }}
            >
              Contact Us
            </Button>
          </Link>
          </FlexBox>
      </CardContent>
    </FlexCol>
  );
};


// CustomCard 3 Component
export const CustomCard3 = () => {
  return (
    <Card sx={{ minWidth: 275, borderRadius: '50px', display: 'flex', flexDirection: 'column', height: {xs:350, sm:580}, overflow: 'hidden' }}>
      <Box sx={{ position: 'relative', width: '100%', height: {xs:350, sm:580}, overflow: 'hidden' }}>
        <video
          width={292}
          height={195}
          style={{ 
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster='https://placehold.co/1280x720/cccccc/cccccc'
        >
          <source src='/assets/videos/landing-page/ar-visuals.webm' type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Card>
  );
};
