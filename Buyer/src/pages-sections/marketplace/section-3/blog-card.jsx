import { Box, Card } from '@mui/material';
import { H1 } from '@/components/Typography';
import { LazyImage } from '@/components/lazy-image';
import { styles } from '../page-view/styles';

export default function BlogCard({ title, image, textColor="#000" }) {
  return (
    <Card sx={styles.blogCard}>
      <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center'}}>
        <H1
          color={textColor}
          fontSize={{xs:8, sm:8, md:21}}
        >
          {title}
        </H1>
        <Box sx={{
            maxHeight: 400,
            p: { xs:0, sm:0, md:5 },
            width: "100%",
            overflow: "hidden"
          }}
        >
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
