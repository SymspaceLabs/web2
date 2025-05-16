"use client";

// =================================================
// Section 2 | Marketplace | Trending News
// =================================================

import Link from "next/link";
import { StyledGrid } from "./styles";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { H1 } from "@/components/Typography";
import { Carousel } from "@/components/carousel";
import { LazyImage } from "@/components/lazy-image";
import { Box, Container, Button, Grid, useMediaQuery } from "@mui/material";

export default function Section2() {

  const isMobile = useMediaQuery('(max-width:600px)');

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
      console.error("Error during fetching blogs:", error);
    }
  };

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
          <H1 textAlign="center" color="#000" pt={0} pb={5} fontSize={{ xs: 20, sm: 30 }}>
            Trending News
          </H1>

          {/* Wrap blog items differently based on screen size */}
          {isMobile ? (
            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                gap: 2,
                py: 2,
                scrollSnapType: "x mandatory",
                scrollPaddingX: 2,
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {blogs.map((item, index) => (
                <Box
                  sx={{
                    width: "400px",
                    flex: "0 0 auto",
                    scrollSnapAlign: "start",
                  }}
                >
                  <Link href={`/press-releases/${item.slug}`}>
                    <StyledGrid
                      container
                      sx={{
                        position: "relative",
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sx={{
                          position: "relative",
                          height: 240, // increased from 200 to 240
                          borderRadius: "20px",
                          overflow: "hidden",
                          backgroundColor: "#eee",
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            minHeight: 250,
                            width: "450px",
                          }}
                        >
                          <LazyImage
                            src={item.image}
                            alt={item.title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </Box>

                        {/* Absolute positioned button over image */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            px: 3,
                          }}
                        >
                          <Button
                            sx={{
                              color: "#fff",
                              background:
                                "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
                              border: "0.9px solid rgba(255, 255, 255, 0.3)",
                              backdropFilter: "blur(13.515px)",
                              borderRadius: "37.03px",
                              p: 0,
                              mt: '-75px',
                              mb: 1, // optional vertical position tweak
                              width: "100%",
                            }}
                          >
                            <H1
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "10px",
                                maxWidth: "90%",
                              }}
                            >
                              {item.title}
                            </H1>

                          </Button>
                        </Box>
                      </Grid>
                    </StyledGrid>
                  </Link>
                </Box>
              ))}
            </Box>
          ) : (
            <Carousel
              dots
              autoplay
              adaptiveHeight
              arrows
              spaceBetween={1}
              slidesToShow={2}
              responsive={[
                {
                  breakpoint: 900,
                  settings: {
                    slidesToShow: 1,
                  },
                },
              ]}
            >
              {blogs.map((item, index) => (
                <Link href={`/press-releases/${item.slug}`} key={index}>
                  <StyledGrid container sx={{ position: "relative", borderRadius: 10, overflow: "hidden" }}>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        position: "relative",
                        height: { xs: 200, sm: 300 },
                        borderRadius: "20px",
                        overflow: "hidden",
                        backgroundColor: "#eee",
                      }}
                    >
                      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                        <LazyImage
                          src={item.image}
                          alt={item.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                      <Box
                        sx={{
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
                      </Box>
                    </Grid>
                  </StyledGrid>
                </Link>
              ))}
            </Carousel>
          )}
        </motion.div>
      </Container>
    </Box>

  );
}
