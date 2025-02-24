"use client"

import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, InputAdornment, Typography, Divider, TextField, useMediaQuery, Button } from '@mui/material';
import { FlexBox } from '@/components/flex-box';
import { useRouter } from 'next/navigation';
import { LazyImage } from '@/components/lazy-image';
import styled from "@mui/material/styles/styled";
import SearchIcon from '@mui/icons-material/Search';

export default function Section1() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs?search=${encodeURIComponent(searchQuery)}`
      );
  
      const jobsData = await response.json();
      setJobs(jobsData);
      setFilteredJobs(jobsData);
    };
  
    fetchJobs();
  }, [searchQuery]);
  


  return (
    <Box sx={{ py: { xs: 2, sm: 5 } }}>
      <Container sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FlexBox flexDirection={isMobile? 'column': 'row'} justifyContent="space-between" width="100%" sx={{ py: 5 }} gap={2} alignItems="center">
          <Typography sx={{ fontFamily: 'Elemental End', fontSize: { xs: 25, sm: 50 }, color: '#fff' }}>
            press releases
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Job title, skill, keyword"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ paddingLeft: 1 }}>
                  <SearchIcon style={{ color: '#000', fontSize: 22 }} />
                </InputAdornment>
              ),
              style: { 
                color: '#000',
                background:"#fff",
                borderRadius:'25px',
                padding:5
              },
            }}
          />
        </FlexBox>

        <Grid container spacing={3}>
          {filteredJobs.map((blog, index) => (
            <Grid item key={index} xs={12} sm={4}>
              <BlogCard key={index} blog={blog} />
            </Grid>
          ))}
        </Grid>
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
  borderRadius: "40px",
  padding: "25px",
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  gap:3,
  // cursor: "pointer",
  // transition: "transform 0.2s ease, box-shadow 0.2s ease", // Smooth transitions
  // "&:hover": {
  //   boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.25)`, // Add an outer shadow on hover
  //   cursor: "pointer", // Ensure pointer cursor on hover
  // },
  // [theme.breakpoints.up("sm")]: {
  //   height: "350px",
  // },
}));

const btnStyle = { 
  fontFamily:'Elemental End',
  textTransform:'lowercase', 
  fontSize:10, 
  px:3, 
  background:'#000', 
  border:'2px solid white', 
  borderRadius:'50px', 
  color:'#fff', 
  fontWeight:400, 
  boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)' 
}

const BlogCard = ({ blog }) => {
  const router = useRouter(); // Initialize the router

  const handleCardClick = () => {
    router.push(`/articles/${blog.slug}`); // Navigate to the blog details page
  };

  return (
    <CardWrapper>
      <Box sx={{ maxHeight: "150px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", borderRadius:'20px' }}>
        <LazyImage src={blog.image} width={500} height={500} alt="blog-image" sx={{ height: "150px", width: "100%", objectFit: "cover" }} />
      </Box>
      <Typography fontWeight={600} color="#fff" fontFamily="Helvetica" fontSize={20} sx={{ py: 1 }}>
        {blog.handle_url_title}
      </Typography>
      <Divider />
      <Typography color="#fff" fontFamily="Helvetica" fontSize={18} sx={{ py: 1, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {blog.title}
      </Typography>
      <Typography color="#fff" fontFamily="Helvetica" fontSize={18} fontStyle="italic" sx={{ fontWeight: 300, overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
        {blog.content}
      </Typography>
      <FlexBox justifyContent="flex-end" sx={{ pt:5 }}>
        <Button onClick={handleCardClick} sx={btnStyle}>
          Read More
        </Button>
      </FlexBox>
    </CardWrapper>
  );
};
