"use client";

import Link from "next/link"; // Used for navigation.
import { IconButton, Box, Container, Typography } from "@mui/material";
import { FlexBox } from "@/components/flex-box"; // Custom utility for flexible layouts.
import { Carousel } from "@/components/carousel"; // Custom carousel component.
import { LazyImage } from "@/components/lazy-image";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useCarousel from "./useCarousel"; // Custom hook for carousel functionality.

export default function Section5() {

  const { carouselRef, responsive, handleNext, handlePrev } = useCarousel();
  

  return (
    <Box id="team">
      <Container sx={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <Box sx={{ width:'100%', maxWidth:'1400px' }}>
          <FlexBox alignItems="center" justifyContent="space-between" mt={10} mb={3} sx={{ py:5 }}>
            {/* Section title */}
            <Typography sx={{ fontFamily: 'Elemental End', fontSize: { xs: 24, sm: 35 }, color: '#fff', wordSpacing:'10px' }}>
              our leadership team
            </Typography>

            {/* Navigation buttons for the carousel */}
            <FlexBox justifyContent="space-between" maxWidth="90px" >
              <IconButton onClick={handlePrev}>
                <ArrowBackIosIcon fontSize="large" sx={{ color:"#fff" }}  />
              </IconButton>
              <IconButton onClick={handleNext}>
                <ArrowForwardIosIcon fontSize="large" sx={{ color:"#fff" }} />
              </IconButton>
            </FlexBox>
          </FlexBox>

          {/* Carousel displaying staffs */}
          <Carousel spaceBetween={20} ref={carouselRef} slidesToShow={4} responsive={responsive} arrows={false}>
            {staffs.map((staff) => (
              <Link href={`https://www.linkedin.com/in/${staff.slug}`} target="_blank" key={staff.id}>
                {/* staff card */}
                <FlexBox sx={cardStyle} gap={3}>
                  {/* staff image */}
                  <LazyImage
                    alt={staff.title}
                    width={100}
                    height={100}
                    sx={{ width: "150px", height: "150px" }}
                    src={staff.imgUrl}
                  />
                  {/* staff title */}
                  <FlexBox flexDirection="column" alignItems="center" gap={1}>
                    <Typography sx={{ fontFamily: "Elemental End", textTransform: "lowercase", color: "#fff" }}>
                      {staff.title}
                    </Typography>
                    <Typography color="#fff">
                      {staff.role}
                    </Typography>
                  </FlexBox>
                </FlexBox>
              </Link>
            ))}
          </Carousel>
        </Box>
      </Container>
    </Box>

  );
}

const staffs = [
  { 
    id: 1, 
    title: "zayden puton",
    role: "Founder & CEO",
    imgUrl: "/assets/images/about-us/staff-1.png",
    slug: "zayden/"
  },
  { 
    id: 2, 
    title: "oleh kalashnyk",
    role: "CTO",
    imgUrl: "/assets/images/about-us/staff-2.png",
    slug: "kalasha666"
  },
  { 
    id: 3, 
    title: "mo mohamed",
    role: "CPO",
    imgUrl: "/assets/images/about-us/staff-3.png",
    slug: "mo-cafe/"
  },
  { 
    id: 4,
    title: "ben kim",
    role: "PGM",
    imgUrl: "/assets/images/about-us/staff-4.png",
    slug: "benjakim/"
  },
  { 
    id: 5,
    title: "thilak sundaram",
    role: "Full Stack Developer",
    imgUrl: "/assets/images/about-us/staff-5.png",
    slug: "thilak-sundaram"
  },
  { 
    id: 6,
    title: "steve lee chun",
    role: "Lead 3D /VFX Designer",
    imgUrl: "/assets/images/about-us/staff-6.png",
    slug: "lee-thong-chun-025baa16a/"
  },
];

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.35)',
  boxShadow: `inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
              inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
              inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)`,
  backdropFilter: 'blur(10.0285px)',
  borderRadius: "40px",
  py: 4,
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  height:  { xs: "280px", sm: "340px" },
};