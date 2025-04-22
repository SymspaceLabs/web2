'use client';

import { Box, Typography, Avatar, Grid, IconButton, Stack, Button, Container } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import PublicIcon from '@mui/icons-material/Public';
import { LazyImage } from '@/components/lazy-image';
import { H1, Paragraph } from '@/components/Typography';
import { FlexBox, FlexCol } from '@/components/flex-box';

export default function Section1({ company }) {
  return (
    <Box sx={{ color: '#fff', minHeight: '400px', pb:10 }}>

      {/* BANNER BG */}
      <Box sx={{ maxHeight:'400px', overflow: 'hidden'  }}>
        <LazyImage
          src={company.banner}
          width={500}
          height={500}
          alt="Background Banner"
        />
      </Box>

      {/* Foreground content */}
      <FlexBox sx={styles.descriptionCard}> 
        <FlexBox sx={{ flexDirection: {xs:'column', sm:'row'}, gap:5, maxWidth:'1500px', width:'100%', mt: '-90px', p:5 }}>

          <Avatar
            src={company.logo}
            alt="Wave World Logo"
            sx={{
              width: 200,
              height: 200,
              margin: '0 auto',
              border: '5px solid #FFF',
              boxShadow: '0px 4px 23.3px 18px rgba(0, 0, 0, 0.25)'
            }}
          />

          <FlexCol gap={5}>
            <Button mt={2} sx={styles.btn}>
              WAVE WORLD
            </Button>
            <Paragraph color="#000" sx={{ mb: 2 }}>
              Wave World aims to leverage Augmented Reality (AR) as our backbone to set ourselves apart from competitors
              while also providing multifaceted products. Our products embody both present and vintage fashion trends.
            </Paragraph>
            <Paragraph color="#000" sx={{ mb: 2 }}>
              Innovate. Inspire. Change.
            </Paragraph>
          </FlexCol>

          <FlexCol alignItems="flex-end" gap={5}>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <IconButton color="inherit"><PublicIcon /></IconButton>
              <IconButton color="inherit"><InstagramIcon /></IconButton>
              <IconButton color="inherit"><TwitterIcon /></IconButton>
              <IconButton color="inherit"><YouTubeIcon /></IconButton>
              <IconButton color="inherit"><FacebookIcon /></IconButton>
            </Stack>

            <FlexCol alignItems="flex-end" gap={2}>
              <Stack direction="row" width="260px" alignItems="center" justifyContent="flex-start" spacing={1} mb={1}>
                  <EmailIcon sx={{ color: '#2196f3' }} />
                  <Paragraph color="#000">contact@waveworld.io</Paragraph>
              </Stack>
              <Stack direction="row"  width="260px" alignItems="center" justifyContent="flex-start" spacing={1}>
                <PhoneIcon sx={{ color: '#4caf50' }} />
                <Paragraph color="#000">656-245-3321</Paragraph>
              </Stack>
            </FlexCol>

          </FlexCol>
        
        </FlexBox>

      </FlexBox>
    </Box>
  );
}


const styles = {
  btn : {
    maxWidth:'200px',
    background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
    boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(12px)',
    borderRadius: '80px'
  },
  descriptionCard : {
    justifyContent:'center',
    background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
    boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
    backdropFilter: 'blur(12px)' 
  }
}