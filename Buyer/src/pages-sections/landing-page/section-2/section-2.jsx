"use client";

import { motion } from "framer-motion";
import { styles } from '../page-view/styles';
import { Container, Box, Card } from '@mui/material';
import { FlexBox, FlexColCenter } from '@/components/flex-box';

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
              <FlexBox sx={styles.textBubbleContainer}>
                {benefits.map((benefit,index) => (
                  <Box key={index} sx={styles.textBubble}>
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

