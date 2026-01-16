
import Link from 'next/link';
import { Box, Card } from '@mui/material';
import { H1 } from '@/components/Typography';
import { styles } from '../page-view/styles';
import { LazyImage } from '@/components/lazy-image';

export default function ProductCard({
  textColor = "#000",
  item
}) {
  return (
    <Link href={`/products?category=${item.slug}`} passHref>
      <Card
        sx={{
          ...styles.blogCard,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
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
