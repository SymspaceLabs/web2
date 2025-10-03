'use client';

// ====================================================================
// Section 1 | Company Details Page 
// ====================================================================

import Link from 'next/link';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import { LazyImage } from '@/components/lazy-image';
import { Paragraph } from '@/components/Typography';
import { FlexBox, FlexCol, FlexRowCenter } from '@/components/flex-box';
import { Box, IconButton, Stack, Button } from '@mui/material';

// ====================================================================

export default function Section1({ company }) {

  const getWebsiteUrl = (url) => {
    if (!url) return "#";
    return url.startsWith("http://") || url.startsWith("https://") 
      ? url 
      : `https://${url}`;
  };

  return (
    <Box sx={{ color: '#fff', minHeight: '400px', pb:10, pt:'100px' }}>

      {/* BANNER BG */}
      <FlexRowCenter
        sx={{
          height: '300px',
          overflow: 'hidden',
          backgroundColor: company.banner ? 'transparent' : '#e0e0e0',
        }}
      >
        {company.banner ? (
          <LazyImage
            src={company.banner}
            width={500}
            height={500}
            alt="Background Banner"
            style={{ width: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Paragraph color="#555">No Banner Available</Paragraph>
        )}
      </FlexRowCenter>


      {/* Foreground content */}
      <FlexBox sx={styles.descriptionCard}> 
        <FlexBox sx={{ flexDirection: {xs:'column', sm:'column', md:'row'}, gap:5, maxWidth:'1500px', width:'100%', mt: '-90px', p:5 }}>

        {/* SHOW LOGO ONLY WHEN EXIST */}
        {company.logo && 
            <LazyImage
              src={company.logo}
              alt="Company Logo"
              width={500}
              height={500}
              sx={{
                width: 200,
                height: 200,
                margin: '0 auto',
                border: '5px solid #FFF',
                borderRadius:'100px',
                boxShadow: '0px 4px 23.3px 18px rgba(0, 0, 0, 0.25)'
              }}
            />
        }
          

          <FlexCol gap={5}>
            <Button mt={2} sx={styles.btn}>
              {company.entityName}
            </Button>
            <Paragraph color="#000" sx={{ mb: 2 }}>
              {company.description}
            </Paragraph>
            <Paragraph color="#000" fontWeight={600} fontSize={{xs:'20px', sm:'24px'}} sx={{ mb: 2 }}>
              {company.tagLine}
            </Paragraph>
          </FlexCol>

          <FlexCol alignItems={{xs:"flex-start", sm:"flex-start", md:"flex-end"}} gap={5}>
            <FlexBox sx={styles.glassCard} justifyContent="space-between" spacing={2}>
              {company.website &&
                <Link href={getWebsiteUrl(company.website)} rel="noopener noreferrer" target="blank">
                    <IconButton color="inherit">
                      <PublicIcon />
                    </IconButton>
                </Link>
              }
              {company.instagram && 
                <Link href={getWebsiteUrl(company.instagram)} rel="noopener noreferrer" target="blank">
                  <IconButton color="inherit" onClick={() => window.location.href = company.instagram}>
                    <InstagramIcon />
                  </IconButton>
                </Link>
              }
              {company.twitter &&
                <Link href={getWebsiteUrl(company.twitter)} rel="noopener noreferrer" target="blank">
                    <IconButton color="inherit" onClick={() => window.location.href = company.twitter}>
                      <TwitterIcon />
                    </IconButton>
                </Link>
              }
              {company.youtube &&
                <Link href={getWebsiteUrl(company.youtube)} rel="noopener noreferrer" target="blank">
                  <IconButton color="inherit" onClick={() => window.location.href = company.youtube}>
                    <YouTubeIcon />
                  </IconButton>
                </Link>
              }
              {company.facebook && 
                <Link href={getWebsiteUrl(company.facebook)} rel="noopener noreferrer" target="blank">
                  <IconButton color="inherit" onClick={() => window.location.href = company.facebook}>
                    <FacebookIcon />
                  </IconButton>
                </Link>
              }
            </FlexBox>

            <FlexCol alignItems={{xs:"flex-start", sm:"flex-start", md:"flex-end"}}  gap={2}>
              <Stack direction="row" width="260px" alignItems="center" justifyContent="flex-start" spacing={1} mb={1}>
                  <EmailIcon sx={{ color: '#2196f3' }} />
                  <Paragraph color="#000">{company.emailSupport}</Paragraph>
              </Stack>
              <Stack direction="row"  width="260px" alignItems="center" justifyContent="flex-start" spacing={1}>
                <PhoneIcon sx={{ color: '#4caf50' }} />
                <Paragraph color="#000">{company.phoneSupport}</Paragraph>
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
    borderRadius: '80px',
    cursor: 'default', // disables the pointer
    '&:hover': {
      cursor: 'default',
    },
  },
  descriptionCard : {
    justifyContent:'center',
    background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
    boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
    backdropFilter: 'blur(12px)' 
  },
  glassCard : {
    background: `
    linear-gradient(0deg, rgba(20, 20, 20, 0.1), rgba(20, 20, 20, 0.1)),
    linear-gradient(
      117.54deg,
      rgba(255, 255, 255, 0.4) -19.85%,
      rgba(200, 200, 200, 0.35) 4.2%,
      rgba(180, 180, 180, 0.3) 13.88%,
      rgba(160, 160, 160, 0.25) 27.98%,
      rgba(140, 140, 140, 0.2) 37.8%,
      rgba(130, 130, 130, 0.15) 44.38%,
      rgba(120, 120, 120, 0.12) 50.54%,
      rgba(100, 100, 100, 0.1) 60.21%
    )`,
    boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
    backdropFilter: 'blur(12px)',
    borderRadius: '80px',
    px:5
  }
}