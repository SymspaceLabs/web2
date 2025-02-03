"use client"

import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Checkbox, ListItemText, InputAdornment, Typography, Divider, TextField, MenuItem, Select, useMediaQuery, FormControl } from '@mui/material';
import styled from "@mui/material/styles/styled";
import { FlexBox } from '@/components/flex-box';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import EastIcon from '@mui/icons-material/East';

export default function Section3() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allLocations, setAllLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      let locationFilter = "";
  
      // Check if selectedLocation is empty or contains "All Locations" (handle remote scenario)
      if (selectedLocation.length > 0 && !selectedLocation.includes("All Locations")) {
        locationFilter = `&location=${encodeURIComponent(selectedLocation.join("|"))}`;
      } else {
        // Ensure that if no location is selected or "All Locations" is selected, fetches all jobs
        locationFilter = ""; // No filter
      }
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs?search=${encodeURIComponent(searchQuery)}${locationFilter}`
      );
  
      const jobsData = await response.json();
      setJobs(jobsData);
      setFilteredJobs(jobsData);
    };
  
    fetchJobs();
  }, [searchQuery, selectedLocation]);
  

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs`);
      const jobs = await response.json();
    
      // Extract unique locations using Set
      const uniqueLocations = [...new Set(jobs.map((job) => job.location))];
    
      setAllLocations(uniqueLocations); // Update state with unique locations
    };
    fetchLocations(); // Run fetchLocations only once when the component mounts
  }, []); // Empty dependency array ensures this runs only once
  

  return (
    <Box sx={{ py: { xs: 2, sm: 20 } }}>
      <Container sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FlexBox flexDirection={isMobile? 'column': 'row'} justifyContent="space-between" width="100%" sx={{ py: 5 }} gap={2}>
          <Typography sx={{ fontFamily: 'Elemental End', fontSize: { xs: 25, sm: 35 }, color: '#fff' }}>
            open roles
          </Typography>
          <FlexBox gap={2} flexDirection={isMobile? 'column': 'row'}>
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
            <FormControl sx={{ minWidth: 150, maxHeight:'47px', background: '#fff', borderRadius: '25px', position: 'relative' }}>
              <FmdGoodIcon
                style={{
                  position: 'absolute',
                  left: '15px', // Position to the left of the input
                  top: '50%', // Vertically center the icon
                  transform: 'translateY(-50%)',
                  color: '#000',
                  fontSize: 22,
                  zIndex: 1, // Ensure the icon stays on top
                }}
              />
              <Select
                multiple
                value={selectedLocation}
                onChange={(e) => {
                  const newSelection = e.target.value;
                  if (newSelection.includes("All Locations")) {
                    setSelectedLocation([]); // Clear all selections
                  } else {
                    setSelectedLocation(newSelection);
                  }
                }}
                displayEmpty
                sx={{
                  maxHeight: "47px",
                  minWidth: "250px",
                  borderRadius: "25px",
                  paddingLeft: "35px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                  },
                }}
                renderValue={(selected) =>
                  selected.length ? selected.join(", ") : "All Locations"
                }
              >
                <MenuItem value="All Locations">
                  <Checkbox checked={selectedLocation.length === 0} />
                  <ListItemText primary="All Locations" />
                </MenuItem>
                {allLocations.map((location, index) => (
                  <MenuItem key={index} value={location}>
                    <Checkbox checked={selectedLocation.includes(location)} />
                    <ListItemText primary={location} />
                  </MenuItem>
                ))}
              </Select>

            </FormControl>
          </FlexBox>
        </FlexBox>

        <Grid container spacing={3}>
          {filteredJobs.map((job, index) => (
            <Grid item key={index} xs={12} sm={4}>
              <JobCard key={index} job={job} />
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
