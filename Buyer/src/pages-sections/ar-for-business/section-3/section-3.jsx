import { Box, Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion"; // Import Framer Motion
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

// Animation variants
const fadeInVariant = {
  hidden: { opacity: 0, y: 20 }, // Start lower and invisible
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2 } // Staggered effect
  },
};

export default function Section4() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible" // Only triggers animation when in viewport
      viewport={{ once: true, amount: 0.2 }} // Ensures it animates when at least 20% is visible
      variants={fadeInVariant}
    >
      <Box sx={{ py: 10 }}>
        <Container>
          {/* Title with fade-in effect */}
          <motion.div variants={fadeInVariant}>
            <Typography
              sx={{
                textAlign: "center",
                color: "#000",
                pt: 8,
                pb: 3,
                fontFamily: "'Elemental End', sans-serif",
                textTransform: "lowercase",
                fontSize: {xs:28, sm:48},
              }}
            >
              engage your customers
            </Typography>
          </motion.div>

          {/* Blog Cards with staggered animation */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Same viewport setting
          >
            <Grid container spacing={3}>
              {blogs.map((blog) => (
                <Grid item lg={4} md={8} xs={12} key={blog.id}>
                  <motion.div variants={fadeInVariant}>
                    <BlogCard date={blog.createdAt} title={blog.count} subTitle={blog.subTitle} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </motion.div>
  );
}

const blogs = [
  {
    id: "1",
    count: 94,
    subTitle: "Increase in conversion rate for products accompanied with AR / VR try-on experiences",
  },
  {
    id: "2",
    count: 56,
    subTitle: "Consumers are more confident in their purchases",
  },
  {
    id: "3",
    count: 40,
    subTitle: "Increase in customer experience and satisfaction has proven to minimize returns",
  },
];
