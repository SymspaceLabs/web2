import { Box, Container } from "@mui/material";

export default function Layout({
  children
}) {
  return (
    <Box sx={{ background: 'linear-gradient(94.91deg, #838383 0%, #FFFFFF 100%)', width:'100%', py:5, pt:{xs:'75px', sm:'75px', md:'175px'} }}>
      <Container>
        {children}
      </Container>
    </Box>
  );
}