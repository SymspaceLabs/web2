"use client";

import { FlexBox } from "@/components/flex-box";
import { Link, Breadcrumbs, Button, Box, Container, Divider, Typography, Grid } from "@mui/material";
import styled from "@mui/material/styles/styled";

export default function Section1({job, toggleDialog}) {
  return (
    <Container sx={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', py:9 }}>
      <Box sx={{ width:'100%' }}>
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#fff", fontSize: 14 }} separator="›">
          <Link href="/careers" underline="hover" color="primary" fontFamily='Helvetica' fontWeight={600} >
            Careers
          </Link>
          <Typography  fontWeight={600}>
            {job.location}
          </Typography>
        </Breadcrumbs>
        <FlexBox gap={3} justifyContent="space-between" sx={{ py:5, flexDirection:{xs:'column', sm:'row'}, alignItems:{xs:'left', sm:"center"} }} >
          <Typography sx={{ fontFamily: 'Elemental End', textTransform:'lowercase', fontSize: { xs: 25, sm: 50 }, color: '#fff' }}>
            {job.title}
          </Typography>
          <Button onClick={toggleDialog} sx={{ fontFamily: 'Elemental End', background:'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)', borderRadius: '25px', px:10, py:2.5, color: '#fff', fontSize:'20px', textTransform:'lowercase', fontWeight:400 }}>
            Apply
          </Button>
        </FlexBox>
        <Divider />
        <Grid container spacing={3} py={3}>
            <Grid item xs={12} sm={4}>
              <JobCard title="location" value={job.location} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <JobCard title="job type" value={job.jobType} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <JobCard title="experience" value={job.experience} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <JobCard title="remote work policy" value={job.remoteWorkPolicy} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <JobCard 
                title="visa sponsorship" 
                value={job.visaSponsorship}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <JobCard 
                title="preferred timezone" 
                value={job.preferredTimezone}
              />
            </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

const CardWrapper = styled(Box)(({ theme }) => ({
  borderRadius: "20px",
  background: '#fff',
  paddingTop: "20px",
  paddingBottom: "20px",
  paddingRight: "30px",
  paddingLeft: "30px",
  display: "flex",
  flexDirection: "column",
  justifyContent:'space-between',
}));

const JobCard = ({ title, value }) => {
  return (
    <CardWrapper>
      <Typography color="#000" fontFamily="Elemental End" fontSize={20} sx={{ py:1 }}>
        {title}
      </Typography>
      <Box sx={{ borderTop:'1px solid black'}} />
      <Typography color="#000" fontFamily="Helvetica" fontSize={20} fontWeight={400} sx={{ py:3 }}>
        {value}
      </Typography>
    </CardWrapper>
  );
}