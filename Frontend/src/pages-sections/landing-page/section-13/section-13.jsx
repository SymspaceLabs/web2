/**
 * Section13 Component - Displays a testimonial section with a heading, description, 
 * and a list of testimonials. Each testimonial is rendered in a card format.
 * 
 * @returns {JSX.Element} Rendered Section13 component.
 */

import { Box, Grid, Container } from "@mui/material";
import { H3, Paragraph } from "../../../components/Typography"; // LOCAL CUSTOM COMPONENT
import TestimonialCard from "./testimonial-card"; // LOCAL CUSTOM COMPONENT

export default async function Section13() {
  return (
    <Box bgcolor="grey.50" pt={15} pb={15}>
      <Container>
        {/* Section Header: Title and description */}
        <Box mb={5} textAlign="center">
          <H3 fontSize={{ sm: 30, xs: 27 }}>Testimonial</H3>
          <Paragraph color="grey.600" fontSize={{ sm: 16, xs: 14 }}>
            There are many variations of passages
          </Paragraph>
        </Box>

        {/* Grid Layout: Iterates over the testimonialList to display cards */}
        <Grid container spacing={3}>
          {testimonialList.map(item => (
            <Grid item md={4} xs={12} key={item.id}>
              <TestimonialCard testimonial={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

/**
 * Hardcoded List of Testimonials - Each testimonial contains a rating, comment, and user details.
 * This list is used to populate the testimonial cards.
 */
const testimonialList = [
  {
    rating: 5,
    id: "aa95e3fd-c170-431a-b9cd-abaac45a048f",
    comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.`,
    user: {
      name: "Jonathon Doe",
      avatar: "/assets/images/faces/10.jpg",
      designation: "Executive Officer, Amazon",
    },
  },
  {
    rating: 5,
    id: "72c79d90-abc7-467d-b7b2-e94905a9e18a",
    comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.`,
    user: {
      name: "Jonathon Doe",
      avatar: "/assets/images/faces/10.jpg",
      designation: "Executive Officer, Amazon",
    },
  },
  {
    rating: 5,
    id: "fc39e3b3-de7b-4ffa-aa64-63ca0c21c5c8",
    comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.`,
    user: {
      name: "Jonathon Doe",
      avatar: "/assets/images/faces/10.jpg",
      designation: "Executive Officer, Amazon",
    },
  },
];
