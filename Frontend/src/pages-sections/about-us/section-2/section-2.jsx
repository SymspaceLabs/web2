"use client";

import { Box, Container, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

export default function Section2() {

  const rows = [
    { 
      title: "innovation",
      description: "The future of shopping is immersive. We push the boundaries of AI-driven 3D modeling and AR to create smarter, more intuitive experiences for consumers and brands."
    },
    { 
      title: "inclusion", 
      description: "Technology works best when it works for everyone. We prioritize accessibility-first design, ensuring individuals of all abilities, backgrounds, and circumstances can fully engage with AR commerce."
    },
    { 
      title: "sustainability",
      description: "Reducing waste starts with better technology. Our virtual try-ons, digital staging, and AI-powered modeling help brands cut down on returns, overproduction, and environmental impact."
    },
    { 
      title: "empowerment",
      description: "Convenience should never be a barrier. Whether it’s homebound shoppers, expectant mothers, or veterans, we develop tools that enhance independence and confidence in every purchase."
    },
    { 
      title: "impact", 
      description: "We don’t just build AR experiences—we create solutions that bridge gaps, remove limitations, and set new standards for inclusive digital commerce." 
    },
  ];

  return (
    <Container sx={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', py:9 }}>
      <Box sx={{ width:'100%', maxWidth:'1400px' }}>
        <Typography sx={{ borderBottom:'1px solid white', py:1, fontFamily: 'Elemental End', fontSize: { xs: 25, sm: 35 }, color: '#fff' }}>
          our  Mission
        </Typography>
        <Box sx={{ maxWidth:'1200px', pt:4}}>
          <Typography sx={{ pb:3, fontFamily: 'Helvetica', fontSize: { xs: 15, sm: 20 }, color: '#fff', textAlign:'justify' }}>
            We envision a future where anyone, anywhere can experience products in the real-world—conveniently, confidently, and comfortably.
          </Typography>
          <Typography sx={{ pb:3, fontFamily: 'Helvetica', fontSize: { xs: 15, sm: 20 }, color: '#fff', textAlign:'justify' }}>
            At Symspace, we bridge the gap between physical and virtual shopping, redefining digital commerce and real estate staging with AI-driven 3D modeling and AR solutions. Our mission is to make shopping and staging more accessible, immersive, and efficient for brands, retailers, and consumers.
          </Typography>
          <Typography sx={{ pb:3, fontFamily: 'Helvetica', fontSize: { xs: 15, sm: 20 }, color: '#fff', textAlign:'justify' }}>
            By prioritizing inclusivity, innovation, and sustainability, we empower persons with disabilities, expectant mothers, veterans, and homebound individuals to interact with true-to-size AR products, transforming how they shop and experience spaces. At the same time, we help businesses reduce returns, lower costs, and optimize inventory through 3D visuals and AR trial rooms.
          </Typography>
        </Box>        
      </Box>
    </Container>
  );
}