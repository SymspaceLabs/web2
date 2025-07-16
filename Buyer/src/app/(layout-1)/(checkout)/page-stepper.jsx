"use client";

import { Box, Container } from "@mui/material";

export default function PageStepper({
  children
}) {
  return (
    <Box sx={{ background: 'linear-gradient(94.91deg, #838383 0%, #FFFFFF 100%)', width:'100%', py:5 }}>
      <Container>
        {children}
      </Container>
    </Box>
  );
}