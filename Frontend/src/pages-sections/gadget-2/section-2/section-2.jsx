"use client"

import Link from "next/link";
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { useState, useEffect } from "react";
import { Carousel } from "../../../components/carousel";
import { StyledGrid } from "./styles";

export default function Section2() {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
        const data = await response.json();
        setBlogs(data);
    } catch (error) {
      console.error("Error during fetching products:", error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <Box sx={{ py:3 }}>
      <Container>
        <Typography sx={{ textAlign:'center', color:'#000', pt:8, pb:3, fontFamily: 'Elemental End', textTransform: 'lowercase', fontSize: { xs: 30, sm: 30, md: 30, lg: 30, xl: 30 } }}>
          Trending News
        </Typography>
        <Carousel dots autoplay adaptiveHeight arrows={true} spaceBetween={1} slidesToShow={2}>
          {blogs.map((item, index) => (
            <Link href={`/articles/${item.slug}`} key={index}>
              <StyledGrid container sx={{ position: 'relative', borderRadius: 10, overflow: 'hidden' }}>
                <Grid item xs={12} sx={{ position: 'relative', height: 300, backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                    <Button sx={{ color:'#fff', fontFamily: 'Elemental End', textTransform: 'lowercase', background: "rgba(255, 255, 255, 0.01)", border: "0.9px solid rgba(255, 255, 255, 0.3)", backdropFilter: "blur(13.515px)", borderRadius: "37.03px" }} LinkComponent={Link} href={item.shopUrl}>
                      {item.title}
                    </Button>
                  </div>
                </Grid>
              </StyledGrid>
            </Link>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}

 