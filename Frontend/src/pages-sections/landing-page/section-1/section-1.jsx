"use client";

import { Box, Container, Typography, Button, Grid, useTheme } from "@mui/material";
import { FlexBox, FlexColCenter } from "@/components/flex-box";
import { section1Styles } from "./styles";
import { LazyImage } from '@/components/lazy-image';
import { motion } from "framer-motion";

export default function Section1() {
  const theme = useTheme();
  const styles = section1Styles(theme);

  return (
    <Grid sx={{ background:'transparent' }}>
      <Container>
        <Box sx={{ flexGrow: 1, py: 8 }}>
          <Grid container spacing={3} alignItems="center">
            {/* Left content */}
            <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", zIndex: 2 }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ height: "100%" }} // Ensures motion.div spans full height
              >
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: {xs:18, sm:28}, mb:{xs:-1, sm:-3}, fontWeight: 'bold' }}>
                  AI Powered AR Commerce
                </Typography>
                
                <Typography sx={{fontFamily: 'Elemental End', fontSize: { xs: 48, sm: 60, md: 100 }, color: '#fff' }}>
                  SYMSPACE
                </Typography>
                
                <Typography sx={{ fontSize: {xs:11, sm:20}, color: '#fff' }}>
                  Revolutionize your shopping experience through Augmented Reality.
                </Typography>

                <FlexBox sx={{ gap: '15px', py: {xs:2, sm:5} }}>
                  <Button sx={containedButton}>
                    <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', fontSize: { xs:10, sm:16 }, fontWeight: 500 }}>
                      Get Started
                    </Typography>
                    <FlexColCenter sx={{ width: {xs:15, sm:35} }}>
                      <LazyImage 
                        alt="furniture shop" 
                        width={100} 
                        height={100} 
                        src="/assets/images/sparkler-white.png"
                      />
                    </FlexColCenter>
                  </Button>
                  <Button sx={outlinedButton}>
                    Shop Now
                  </Button>
                </FlexBox>
              </motion.div>
            </Grid>

            {/* Right content: Promotional video */}
            <Grid item xs={12} md={6} sx={{ zIndex: 2 }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ height: "100%" }} // Ensures motion.div spans full height
              >
                <Box sx={{ textAlign: 'center', zIndex: 2, position: 'relative' }}>
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
  );
}

const containedButton = {
  flex:{xs:1, sm:0},
  gap: {xs:1, sm:2},
  minWidth: { sm:250 },
  color: '#fff',
  borderRadius: '50px',
  border: '2px solid white',
  py: {xs:1, sm:2},
  background: 'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)',
  minWidth: { sm:'250px' },
  transition: 'all 0.3s ease-in-out',
  ':hover' : {
    boxShadow:' 0px 4px 4px rgba(0, 0, 0, 0.25)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
  },
}

const outlinedButton = {
  flex:{xs:1, sm:0},
  minWidth: { sm:250 },
  fontFamily: 'Elemental End',
  textTransform: 'lowercase',
  fontWeight: 500,
  color: '#fff',
  borderRadius: '50px',
  border: '2px solid white',
  py: {xs:1, sm:2},
  fontSize: { xs:10, sm:16 },
  transition: 'all 0.3s ease-in-out', // Smooth transition effect
  ':hover': {
    background: 'linear-gradient(94.91deg, #FFFFFF 0%, #AEAEAE 100%);',
    color: '#000',
  },
}
