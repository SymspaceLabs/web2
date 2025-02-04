"use client";

import { IconButton, Box, Container, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Carousel } from "@/components/carousel"; // Custom carousel component.
import { FlexBetween } from "@/components/flex-box"; // Custom layout utility.
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useCarousel from "./useCarousel"; // Custom hook for carousel functionality.
import styled from "@mui/material/styles/styled";
import { useRouter } from 'next/navigation';
import { FlexBox } from '@/components/flex-box';
import EastIcon from '@mui/icons-material/East';

export default async function Section6() {
  const { carouselRef, responsive, handleNext, handlePrev } = useCarousel();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs`);
  const jobs = await response.json();
  
  return (
    <Container sx={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center' }}>
      <Box sx={{ width:'100%', maxWidth:'1400px' }}>
        <FlexBox alignItems="center" justifyContent="space-between" mt={10} mb={3} sx={{ py:5 }}>
          {/* Section title */}
          <Typography sx={{ fontFamily: 'Elemental End', fontSize: { xs: 24, sm: 35 }, color: '#fff' }}>
            open roles
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
        <Carousel spaceBetween={10} ref={carouselRef} slidesToShow={3} responsive={responsive} arrows={false}>
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </Carousel>
      </Box>
    </Container>
  );
}

const CardWrapper = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.35)',
  boxShadow: `inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
              inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
              inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)`,
  backdropFilter: 'blur(10.0285px)',
  borderRadius: "30px",
  padding: "35px",
  width: "100%",
  height: "auto",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  cursor: "pointer", // Default pointer cursor
  transition: "transform 0.2s ease, box-shadow 0.2s ease", // Smooth transitions
  "&:hover": {
    boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.25)`, // Add an outer shadow on hover
    cursor: "pointer", // Ensure pointer cursor on hover
  },
  [theme.breakpoints.up("sm")]: {
    height: "200px",
  },
}));

const JobCard = ({ job }) => {
  const router = useRouter(); // Initialize the router

  const handleCardClick = () => {
    router.push(`/careers/${job.id}`); // Navigate to the job details page
  };

  return (
    <CardWrapper onClick={handleCardClick}> {/* Attach click handler */}
      <Typography textTransform="uppercase" color="#fff" fontFamily="Helvetica" fontSize={16} sx={{ py: 1 }}>
        {job.location}
      </Typography>
      <Divider />
      <Typography color="#fff" fontFamily="Elemental End" fontSize={18} sx={{ py: 2, textTransform: 'lowercase' }}>
        {job.title}
      </Typography>
      <FlexBox justifyContent="flex-end">
        <EastIcon sx={{ color:'#fff' }} />
      </FlexBox>
    </CardWrapper>
  );
};