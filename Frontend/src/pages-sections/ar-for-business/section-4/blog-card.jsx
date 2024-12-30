import { Box, Button, Card, Typography } from '@mui/material';
import { H3 } from '../../../components/Typography';
import LazyImage from '../../../components/LazyImage';
import Link from 'next/link';

export default function BlogCard({ title, subTitle, btnUrl }) {
  return (
    <Card
      sx={{
        borderRadius: '50px',
        padding: 5,
        maxWidth:'500px',
        background: 'rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(6.5px)',
        WebkitBackdropFilter: 'blur(6.5px)',
        border: '1px solid rgba(255, 255, 255, 1)',
        position: 'relative', // Ensure the Card is positioned relatively
        overflow: 'hidden',   // Ensure overflow is hidden to contain child elements
      }}
    >
      {/* <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(/assets/images/background/Rectangle.png)`,
          mixBlendMode: 'overlay',
        }}
      /> */}
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection:'column', gap:'25px' }}>
        <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', fontSize: 21, color:'#2F2F2F' }}>
          {title}
        </Typography>
        <Typography sx={{ fontFamily: 'Helvetica', fontSize: 16, color:'#434167' }}>
          {subTitle}
        </Typography>
        <Box sx={{ display:'flex', justifyContent:'flex-end'}}>
          <Link href={btnUrl}>
            <Button
              sx={{ 
                background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', 
                borderRadius:'30px',
                fontFamily: 'Elemental End',
                textTransform: 'lowercase',
                fontSize: 11,
                color:'#2F2F2F',
                px:2,
                boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
                backdropFilter: 'blur(10px)'
              }}
            >
              Learn More
            </Button>
          </Link>
        </Box>
        
        
      </Box>
    </Card>
  );
}
