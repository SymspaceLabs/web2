"use client";

/**
 * Section13 Component - Displays a testimonial section with a heading, description, 
 * and a list of testimonials. Each testimonial is rendered in a card format.
 * 
 * @returns {JSX.Element} Rendered Section13 component.
 */

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import MarqueeeSlider from "./MarqueeeSlider";

export default function Section13() {
  return (
    <motion.div
      component={Box} // Makes motion.div behave like a Box
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{ width: "100%", overflow: "hidden" }} // Ensures content stays within bounds
    >
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", py: 4, background: "#fff" }}>
        <Box sx={{ width: "100%", maxWidth: "1600px", p: 2 }}>
          <Typography fontSize="16px" sx={{ color: "#434167" }}>
            What everyone is saying
          </Typography>
          <Typography sx={{ pb: "25px" }} fontSize={{ xs: 20, sm: 40 }} fontFamily="Elemental End" textTransform="lowercase">
            trusted by users globally
          </Typography>
        </Box>
        <MarqueeeSlider testimonials={testimonials} />
      </Box>
    </motion.div>
  );
}


/**
 * Hardcoded List of Testimonials - Each testimonial contains a rating, comment, and user details.
 * This list is used to populate the testimonial cards.
 */
const testimonials = [
  {
    rating: 5,
    id: "aa95e3fd-c170-431a-b9cd-abaac45a048f",
    comment: `I never imagined AR could be this simple. It was easy to imagine a new sofa in my living room before buying it`,
    user: {
      name: "Noah",
      avatar: "/assets/images/faces/2.jpg",
      designation: "Executive Officer, Amazon",
    },
  },
  {
    rating: 5,
    id: "72c79d90-abc7-467d-b7b2-e94905a9e18a",
    comment: `The AR simulation helped me figure out if my new dining table would fit perfectly!`,
    user: {
      name: "Olivia",
      avatar: "/assets/images/faces/19.jpg",
      designation: "Manager, Google",
    },
  },
  {
    rating: 5,
    id: "72c79d90-abc7-467d-b7b2-e94905a9e18a",
    comment: `Using SymSpace to try on jewelry saved me so much time and hassle`,
    user: {
      name: "Esther",
      avatar: "/assets/images/faces/4.jpg",
      designation: "Manager, Google",
    },
  },
  {
    rating: 5,
    id: "72c79d90-abc7-467d-b7b2-e94905a9e18a",
    comment: `It was great seeing my dress and getting the right size before ordering here`,
    user: {
      name: "Yuri",
      avatar: "/assets/images/faces/5.jpg",
      designation: "Manager, Google",
    },
  },
  {
    rating: 5,
    id: "72c79d90-abc7-467d-b7b2-e94905a9e18a",
    comment: `Symspace will change the way I shop. Seeing furniture in my house before buying it was amazing`,
    user: {
      name: "David",
      avatar: "/assets/images/faces/6.png",
      designation: "Manager, Google",
    },
  },
  {
    rating: 5,
    id: "72c79d90-abc7-467d-b7b2-e94905a9e18a",
    comment: `I can’t travel outside a lot but this helped me see the possibilities of augmented reality`,
    user: {
      name: "Jasmine",
      avatar: "/assets/images/faces/17.jpg",
      designation: "Manager, Google",
    },
  },
  {
    rating: 5,
    id: "72c79d90-abc7-467d-b7b2-e94905a9e18a",
    comment: `I used Symspace to stage furniture for my tenants and it helped save so much time.`,
    user: {
      name: "Sholom",
      avatar: "/assets/images/faces/10.jpg",
      designation: "Manager, Google",
    },
  },
  {
    rating: 5,
    id: "72c79d90-abc7-467d-b7b2-e94905a9e18a",
    comment: `Being pregnant makes it hard to travel but I enjoyed seeing products in my home without having to go out.`,
    user: {
      name: "Maya",
      avatar: "/assets/images/faces/16.jpg",
      designation: "Manager, Google",
    },
  },
  {
    rating: 5,
    id: "72c79d90-abc7-467d-b7b2-e94905a9e18a",
    comment: `The virtual try-on feature is brilliant! I could see how glasses looked on me before ordering them.`,
    user: {
      name: "Shira",
      avatar: "/assets/images/faces/8.jpg",
      designation: "Manager, Google",
    },
  },
  {
    rating: 5,
    id: "72c79d90-abc7-467d-b7b2-e94905a9e18a",
    comment: `As a designer, I used Symspace for interior mockups. The realistic 3D products saved me hours of work`,
    user: {
      name: "Isabella",
      avatar: "/assets/images/faces/12.jpg",
      designation: "Manager, Google",
    },
  },
  {
    rating: 5,
    id: "72c79d90-abc7-467d-b7b2-e94905a9e18a",
    comment: `Symspace made my online shopping fun and interactive. My kids even loved trying on items with me`,
    user: {
      name: "Joel",
      avatar: "/assets/images/faces/13.jpg",
      designation: "Manager, Google",
    },
  },
];
