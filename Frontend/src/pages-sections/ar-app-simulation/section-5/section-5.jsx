"use client"

import { Box, Typography } from "@mui/material";
import { keyframes, styled } from "@mui/system";
import TestimonialCard from "@/components/cards/TestimonialCard";

const marqueeAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const MarqueeContainer = styled(Box)({
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "relative",
  width: "100%",
  background: "rgba(255, 255, 255, 0.1)",
});

const MarqueeWrapper = styled(Box)({
  paddingTop: "25px",
  paddingBottom: "25px",
  display: "inline-flex",
  animation: `${marqueeAnimation} 100s linear infinite`,
  gap: "20px",
  width: "max-content",
  "&:hover": {
    animationPlayState: "paused",
  },
});

export default function Section5() {
  return (
    <Box sx={{ width: "100%", display:'flex', flexDirection:'column', alignItems:'center', py: 4, background:'#fff' }}>
      <Box sx={{ width: "100%", maxWidth:'1200px', p:2}}>
        <Typography fontSize="16px" fontFamily="Helvetica" sx={{ color: "#434167" }}>
          What everyone is saying
        </Typography>
        <Typography sx={{ pb: "25px" }} fontSize={{ xs: 28, sm: 40 }} fontFamily="Elemental End" textTransform="lowercase">
          trusted by users globally
        </Typography>
      </Box>

      <MarqueeContainer>
        <MarqueeWrapper>
          {testimonials.concat(testimonials).map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </MarqueeWrapper>
      </MarqueeContainer>
    </Box>
  );
}

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
      avatar: "/assets/images/faces/3.jpg",
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
      avatar: "/assets/images/faces/7.png",
      designation: "Manager, Google",
    },
  },
  {
    rating: 5,
    id: "72c79d90-abc7-467d-b7b2-e94905a9e18a",
    comment: `I used Symspace to stage furniture for my tenants and it helped save so much time.`,
    user: {
      name: "Sholom",
      avatar: "/assets/images/faces/8.png",
      designation: "Manager, Google",
    },
  },
  {
    rating: 5,
    id: "72c79d90-abc7-467d-b7b2-e94905a9e18a",
    comment: `Being pregnant makes it hard to travel but I enjoyed seeing products in my home without having to go out.`,
    user: {
      name: "Maya",
      avatar: "/assets/images/faces/9.jpg",
      designation: "Manager, Google",
    },
  },
  {
    rating: 5,
    id: "72c79d90-abc7-467d-b7b2-e94905a9e18a",
    comment: `The virtual try-on feature is brilliant! I could see how glasses looked on me before ordering them.`,
    user: {
      name: "Shira",
      avatar: "/assets/images/faces/10.jpg",
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
