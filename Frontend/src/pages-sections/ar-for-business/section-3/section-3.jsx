import { Box, Container, Typography, Button, Grid } from '@mui/material';
import BlogCard from "./blog-card"; // API FUNCTIONS

/**
 * Section4 Component
 *
 * This component renders a section that highlights engagement statistics using blog cards.
 * - Includes a title to emphasize customer engagement.
 * - Dynamically displays a grid of blog cards using mock data (`blogs` array).
 * - Each blog card showcases a key statistic and accompanying subtitle.
 *
 * @returns {JSX.Element} Rendered section with a title and grid of blog cards.
 */

export default async function Section4() {
  return <Box sx={{ py:10 }}>
      <Container>
        <Typography sx={{ textAlign:'center', color:'#000', pt:8, pb:3, fontFamily: 'Elemental End', textTransform: 'lowercase', fontSize: 48 }}>
          engage your customers
        </Typography>

        <Grid container spacing={3}>
          {blogs.map(blog => <Grid item lg={4} md={8} xs={12} key={blog.id}>
              <BlogCard date={blog.createdAt} title={blog.count} subTitle={blog.subTitle} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>;
}

const blogs = [
  {
    id: "1",
    count: 94,
    subTitle: "Increase in conversion rate for products accompanied with AR / VR try-on experiences",
  }, {
    id: "2",
    count: 56,
    subTitle: "Consumers are more confident in their purchases",
  }, {
    id: "3",
    count: 40,
    subTitle: "Increase in customer experience and satisfaction  has proven to minimize returns",
  }
];