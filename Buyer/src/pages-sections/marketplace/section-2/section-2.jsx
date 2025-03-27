"use client";

// ===============================================================
// Section 2 News & Articles
// ===============================================================

import Link from "next/link";
import { StyledGrid } from "./styles";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { H1 } from "@/components/Typography";
import { Carousel } from "@/components/carousel";
import { elementalEndFont } from "../page-view/styles";
import { Box, Container, Button, Grid } from "@mui/material";

// ===============================================================

export default function Section2() {
  // State to hold the list of blogs fetched from the API
  const [blogs, setBlogs] = useState([]);

  // Fetches blog data from the backend API
  const getAllBlogs = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setBlogs(data); // Update the state with fetched blog data
    } catch (error) {
      console.error("Error during fetching blogs:", error); // Log errors for debugging
    }
  };

  // useEffect to call getAllBlogs on initial render
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Box sx={{ py: 3 }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }} 
          >
            {/* Section heading */}
            <H1 textAlign="center" color="#000" pt={8} pb={3} fontSize={{xs:20,sm:30}}>
              Trending News
            </H1>
            
            {/* Carousel to display blogs */}
            <Carousel dots autoplay adaptiveHeight arrows={true} spaceBetween={1} slidesToShow={2}>
              {blogs.map((item, index) => (
                <Link href={`/press-releases/${item.slug}`} key={index}>
                  {/* Grid styled for each blog */}
                  <StyledGrid
                    container
                    sx={{ position: "relative", borderRadius: 10, overflow: "hidden" }}
                  >
                    {/* Blog image section */}
                    <Grid
                      item
                      xs={12}
                      sx={{
                        position: "relative",
                        height: 300,
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* Title button styled as an overlay */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 20,
                          left: "50%",
                          transform: "translateX(-50%)",
                          textAlign: "center",
                        }}
                      >
                        <Button
                          sx={{
                            color: "#fff",
                            ...elementalEndFont,
                            background: "rgba(255, 255, 255, 0.01)",
                            border: "0.9px solid rgba(255, 255, 255, 0.3)",
                            backdropFilter: "blur(13.515px)",
                            borderRadius: "37.03px",
                          }}
                          LinkComponent={Link}
                          href={item.shopUrl}
                        >
                          {item.title}
                        </Button>
                      </div>
                    </Grid>
                  </StyledGrid>
                </Link>
              ))}
            </Carousel>
          </motion.div>
        </Container>
    </Box>
  );
}
