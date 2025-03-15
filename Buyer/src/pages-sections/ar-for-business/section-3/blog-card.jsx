'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';

/**
 * BlogCard Component
 *
 * This component displays a percentage-based count and a subtitle, with an animated counting effect when the card enters the viewport.
 * - The `title` prop determines the target count value.
 * - The `subTitle` prop provides a description or additional context below the count.
 * - Uses the Intersection Observer API to detect when the card is visible in the viewport and triggers the counting animation.
 *
 * Props:
 * - `title` (string): The target count value to animate towards, expressed as a percentage (e.g., "94").
 * - `subTitle` (string): The descriptive text displayed below the count.
 *
 * @param {string} title - The target percentage value for the count animation.
 * @param {string} subTitle - The subtitle text displayed below the count.
 * @returns {JSX.Element} Rendered BlogCard component.
 */

export default function BlogCard({ title, subTitle }) {
  const [count, setCount] = useState(0); // Current count for the animation
  const [isVisible, setIsVisible] = useState(false); // Tracks if the card is visible in the viewport
  const cardRef = useRef(null); // Reference for the card element to observe

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
      observer.observe(cardRef.current); // Start observing the card element
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
    <Box
      ref={cardRef}
      sx={{
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Animated count displayed as a percentage */}
      <Typography
        sx={{
          fontFamily: 'Elemental End',
          textTransform: 'lowercase',
          fontSize: 96,
          color: '#2F2F2F',
          textAlign: 'center',
        }}
      >
        {count}%
      </Typography>
      {/* Subtitle for additional context */}
      <Typography
        sx={{
          fontFamily: 'Helvetica',
          fontSize: 16,
          color: '#909090',
          textAlign: 'center',
        }}
      >
        {subTitle}
      </Typography>
    </Box>
  );
}
