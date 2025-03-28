"use client";

// =================================================================
// Section 2
// =================================================================

import { useEffect, useState, useRef } from 'react';
import { Box, Container, Grid } from "@mui/material";
import { styles } from '../page-view/styles';
import { H1, Paragraph } from '@/components/Typography';
import { FlexRowCenter } from '@/components/flex-box';

export default function Section2() {
  return (
    <FlexRowCenter alignItems="center">
      <Container>
        <Grid container spacing={3}>
          {blogs.map(blog => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={blog.id}>
              <BlogCard date={blog.createdAt} title={blog.count} subTitle={blog.subTitle} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </FlexRowCenter>
  );
}

const blogs = [
  {
    id: "1",
    count: 68,
    subTitle: "Pregnant Women Prefer Online Shopping for Convenience",
  }, {
    id: "2",
    count: 66,
    subTitle: "Shoppers are Interested in Using AR for Shopping Assistance",
  }, {
    id: "3",
    count: 50,
    subTitle: "Persons with Disabilities Shop Online for Physical Products at least Once a Week",
  }
];

function BlogCard({ title, subTitle }) {
  const [count, setCount] = useState(0); // Current count for the animation
  const [isVisible, setIsVisible] = useState(false); // Tracks if the card is visible in the viewport
  const cardRef = useRef(null); 

  useEffect(() => {
    // Observer callback to check if the card is in the viewport
    const handleIntersection = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true); // Mark the card as visible
        observer.disconnect(); // Stop observing once visible to optimize performance
      }
    };

    // Create an IntersectionObserver instance with the callback
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Trigger when 50% of the card is visible
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect(); // Cleanup observer when the component unmounts
  }, []);

  useEffect(() => {
    // Only start the counting animation if the card is visible
    if (!isVisible) return;

    let start = 0;
    const end = parseInt(title, 10); // Parse the target count value from the title prop
    const duration = 2000; // Total duration of the animation in milliseconds
    const incrementTime = 10; // Time interval for each increment step
    const incrementValue = Math.ceil(end / (duration / incrementTime)); // Increment value per step

    // Timer to increment the count
    const timer = setInterval(() => {
      start += incrementValue; // Increment the count
      if (start >= end) {
        start = end; // Ensure the final count matches the target
        clearInterval(timer); // Stop the timer once the count reaches the target
      }
      setCount(start); // Update the count state
    }, incrementTime);

    return () => clearInterval(timer); // Cleanup timer when the effect re-runs or the component unmounts
  }, [isVisible, title]);

  return (
    <Box ref={cardRef} sx={styles.glassCard}>
      {/* Title */}
      <H1 fontSize={{xs:30, sm:96}} color='#FFF' textAlign='center'>
        {count}%
      </H1>

      {/* Subtitle */}
      <Paragraph fontSize={{xs:14, sm:24}} color='#FFF' textAlign='center'>
        {subTitle}
      </Paragraph>
    </Box>
  );
}