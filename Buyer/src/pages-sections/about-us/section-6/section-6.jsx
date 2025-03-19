"use client";

// =============================================================================
// Section 6 - Open Roles -  About Us Section
// =============================================================================

import { useState, useEffect } from "react";
import { IconButton, Box, Container, Divider, Typography } from "@mui/material";
import { Carousel } from "@/components/carousel"; // Custom carousel component.
import { useRouter } from 'next/navigation';
import { FlexBox } from '@/components/flex-box';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useCarousel from "./useCarousel"; // Custom hook for carousel functionality.
import styled from "@mui/material/styles/styled";
import EastIcon from '@mui/icons-material/East';
import { BsArrowUpRight } from "react-icons/bs";
import { styles } from "../page-view/styles";

export default function Section6() {
  const { carouselRef, responsive, handleNext, handlePrev } = useCarousel();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const route = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs`);
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <Typography color="#fff">Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  
  return (
    <Box id="careers">
      <Container sx={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <Box sx={{ width:'100%', maxWidth:'1400px' }}>
          <FlexBox alignItems="center" justifyContent="space-between" mt={10} mb={3} sx={{ py:5 }}>
            {/* Section title */}
            <FlexBox alignItems="center" gap={2}>
              <Typography sx={{ ...styles.elementalEndFont, fontSize: { xs: 24, sm: 35 }, color: '#fff', wordSpacing:'10px' }}>
                open roles
              </Typography>
              <IconButton onClick={() => window.open('/careers#open-roles', '_blank')}>
                <BsArrowUpRight color="#fff" size="1.35em" />
              </IconButton>
            </FlexBox>

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
    </Box>

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
      <Typography color="#fff" fontSize={18} sx={{ py: 2, ...styles.elementalEndFont }}>
        {job.title}
      </Typography>
      <FlexBox justifyContent="flex-end">
        <EastIcon sx={{ color:'#fff' }} />
      </FlexBox>
    </CardWrapper>
  );
};