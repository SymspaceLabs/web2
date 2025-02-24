import { Box, Typography, Container } from '@mui/material';
import { LazyImage } from '@/components/lazy-image';

export default function Section1() {

  return (
    <Container sx={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', py:9 }}>
      <Box sx={{ display:'flex', flexDirection:'column', width:'100%', maxWidth:'1000px' }}>
          <Typography sx={{ fontFamily: 'Elemental End', fontSize: { xs: 25, sm: 45 }, color: '#fff' }}>
            Let’s build the future together
          </Typography>
          <Box sx={{ display:'flex', justifyContent: { xs:'center', sm:'flex-end' }, mt:{ xs:0, sm:-6 } }}>
            <Box sx={{ width: {xs:'250px', sm:'500px'} }}>
              <LazyImage
                alt="furniture shop"
                width={500}
                height={500}
                src="/assets/images/careers/hero-image.png"
              />
            </Box>
          </Box>
      </Box>
    </Container>
  );
}
