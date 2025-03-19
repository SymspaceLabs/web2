import { Box, Card } from '@mui/material';
import { H3 } from '@/components/Typography';
import { LazyImage } from '@/components/lazy-image';
import { styles } from '../page-view/styles';

export default function BlogCard({ title, image, textColor="#000" }) {
  return (
    <Card
      sx={{
        borderRadius: '80px',
        padding: 5,
        background: 'rgba(255, 255, 255, 0.4)',
        boxShadow: 'inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10.0285px)',
        position: 'relative', // Ensure the Card is positioned relatively
        overflow: 'hidden',   // Ensure overflow is hidden to contain child elements
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff' }}>
        <H3
          sx={{
            ...styles.elementalEndFont,
            fontSize: 21,
            color:textColor
          }}
        >
          {title}
        </H3>
        <Box sx={{ maxHeight: 400, p:5, width: "100%", overflow: "hidden" }}>
          <LazyImage
            width={1000}
            height={1000}
            alt="Apple Watch" 
            src={image}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </Box>
      </Box>
    </Card>
  );
}
