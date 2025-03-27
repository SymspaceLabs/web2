"use client"

// ===========================================================================
// Section 1 - About Us
// ===========================================================================

import { useRouter } from "next/navigation";
import { H1 } from '@/components/Typography';
import { Box, Container } from '@mui/material';
import { FlexBox } from '@/components/flex-box';
import { LazyImage } from '@/components/lazy-image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Section1() {

  const items = [
    {
      content:'improving conversion for businesses',
      url:'/sell-on-symspace'
    },
    {
      content:'enhancing real estate experiences',
      url:'/ar-real-estate'
    },
    {
      content:'prioritizing accessibility for all',
      url:'/global-impact'
    }
  ]

  return (
    <Container sx={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', py:9 }}>
      <Box sx={{ display:'flex', flexDirection:'column', width:'100%', maxWidth:'1400px' }}>
        <H1 fontSize={{xs:25,sm:45}} color='#FFF' wordSpacing="10px">
          simulating reality with technology that brings spaces to life
        </H1>

        <FlexBox sx={{ flexDirection:{ xs:'column', sm:'row' }, justifyContent: { xs:'center', sm:'space-between' }, mt:{ xs:0, sm:-6 } }} alignItems="center">
          <FlexBox flexDirection="column" gap={2}>
            {
              items.map((item, index)=> (
                <GlassCard key={index} content={item.content} url={item.url} />
              ))
            }
            
          </FlexBox>
          
          <Box sx={{ width: {xs:'250px', sm:'500px'} }}>
            <LazyImage
              alt="furniture shop"
              width={500}
              height={500}
              src="/assets/images/about-us/hero.png"
            />
          </Box>
        </FlexBox>
      </Box>
    </Container>
  );
}

const GlassCard = ({content, url}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(url);
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.35)',
    boxShadow:
      'inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10.0285px)',
    borderRadius: '80px',
    p: 2,
    cursor: 'pointer', // Ensure the entire box is clickable
    transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Add smooth transitions
    "&:hover": {
      background: "rgba(122, 169, 243, 0.7)", // Changes the background color on hover
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    },
  };

  return (
    <FlexBox
      justifyContent="space-between"
      sx={cardStyle}
      gap={3}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && handleClick()}
    >
      <H1 color="#fff" fontSize={{xs:'10px',sm:'14px'}}>
        {content}
      </H1>
      <ArrowForwardIosIcon fontSize="small" sx={{ color: "#fff" }} />
    </FlexBox>
  )

}
