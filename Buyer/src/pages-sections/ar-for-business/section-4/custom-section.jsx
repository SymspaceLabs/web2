import { Box, Grid, Card, Typography, Button } from '@mui/material';
import { styles } from '../page-view/styles';
import Link from 'next/link';
import { H1 } from '@/components/Typography';

export default function CustomSection({ title, subTitle, btnText, btnUrl, children, invert=false }) {
  return (
    <Box sx={{ flexGrow: 1, py: 8, zIndex: 2 }}>
      {!invert?
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <BlogCard
              title={title}
              subTitle={subTitle}
              btnText={btnText}
              btnUrl={btnUrl}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ zIndex: 2 }}>
            <Box sx={{ textAlign: 'center', zIndex: 2, position: 'relative' }}>
              {children}
            </Box>
          </Grid>
        </Grid>
        :
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} sx={{ zIndex: 2 }}>
            <Box sx={{ textAlign: 'center', zIndex: 2, position: 'relative' }}>
              {children}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <BlogCard
              title={title}
              subTitle={subTitle}
              btnText={btnText}
              btnUrl={btnUrl}
            />
          </Grid>
        </Grid>
      }
    </Box>
  );
}

const BlogCard = ({ title, subTitle, btnText, btnUrl }) => {
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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection:'column', gap:'25px' }}>
        <H1 fontSize={21} color='#2F2F2F'>
          {title}
        </H1>
        <Typography sx={{ fontFamily: 'Helvetica', fontSize: 16, color:'#434167' }}>
          {subTitle}
        </Typography>
        <Box sx={{ display:'flex', justifyContent:'flex-end'}}>
          <Link href={btnUrl}>
            <Button
              sx={{ 
                background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', 
                borderRadius:'30px',
                ...styles.elementalEndFont,
                fontSize: 11,
                color:'#2F2F2F',
                px:2,
                boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {btnText}
            </Button>
          </Link>
        </Box>
      </Box>
    </Card>
  )
}
