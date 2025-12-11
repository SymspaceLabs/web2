
import Link from 'next/link';
import { Box, Card } from '@mui/material';
import { H1 } from '@/components/Typography';
import { LazyImage } from '@/components/lazy-image';

export default function ProductCard4({
  textColor = "#000",
  item
}) {
  return (
    <Link href={item.url} passHref>
      <Card sx={styles.blogCard}>
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <H1
            color={textColor}
            fontSize={{ xs: 8, sm: 8, md: 21 }}
          >
            {item.title}
          </H1>
          <Box sx={{
            maxHeight: 400,
            p: { xs: 0, sm: 0, md: 5 },
            width: "100%",
            overflow: "hidden"
          }}>
            <LazyImage
              width={1000}
              height={1000}
              alt={item.title}
              src={item.image}
              style={{ 
                objectFit: "cover",
                width: "100%",
                height: "100%"
              }}
            />
          </Box>
        </Box>
      </Card>
    </Link>
  );
}

const styles = {
    blogCard : {
        borderRadius: {xs:'25px', sm:'25px', md:'80px'},
        pt: {xs:2, sm:2, md:5},
        px: {xs:1, sm:1, md:5},
        background: 'rgba(255, 255, 255, 0.4)',
        boxShadow: 'inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10.0285px)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
        }
    },
}
