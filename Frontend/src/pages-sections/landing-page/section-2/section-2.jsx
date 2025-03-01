"use client";

import { Container, Box, Card } from '@mui/material';
import { FlexBox, FlexColCenter } from '@/components/flex-box';
import { motion } from "framer-motion";

export default function Section2() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', zIndex:2 }}>
      <Container sx={{ py: {sm:5} }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ height: "100%" }} // Ensures motion.div spans full height
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
        
        {/* LIST OF PILLS */}
        <FlexColCenter sx={{ py:{ xs:2, sm:5 }, width:"100%" }}>
          <Box sx={{ maxWidth:'1400px' }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ height: "100%" }} // Ensures motion.div spans full height
            >
              <FlexBox sx={textBubbleContainerStyle}>
                {benefits.map((benefit,index) => (
                  <Box key={index} sx={textBubbleStyle}>
                    {benefit}
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

const GraphicsCard = ({ sx, children, overLay = false, bgImage, ...rest }) => {
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

const textBubbleContainerStyle = { 
  display: "flex",
  flexWrap: "wrap",  // Allows pills to move to the next row when needed
  gap: { xs: 2, sm: 3 },
  py: 2,
  width: "100%",
  justifyContent: "space-between", // Ensures pills fill the row as much as possible
};


const textBubbleStyle = {
  textAlign:'center',
  alignItems:'center',
  alignContent:'center',
  maxWidth:{xs:'150px', sm:'250px', md:'500px'},
  py: {xs:1, sm:2},
  px: {xs:1, sm:3},
  mb: {xs:0, sm:2},
  fontFamily: 'Elemental End',
  textTransform: 'lowercase',
  background: 'rgba(255, 255, 255, 0.35)',
  fontSize: {xs:'8px', sm:'14px'},
  boxShadow: `
    inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
    inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
    inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
    inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
    inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)
  `,
  borderRadius: '80px',
  color: '#fff'
}

