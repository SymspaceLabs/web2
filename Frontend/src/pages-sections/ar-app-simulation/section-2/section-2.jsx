"use client";

import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

export default function Section2() {
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile screens

  return (
    <ParallaxProvider>
      <Box sx={{ background: "#fff" }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            py: "50px",
          }}
        >
          <Typography
            fontSize={{ xs: 28, sm: 40 }}
            fontFamily="Elemental End"
            textTransform="lowercase"
            textAlign="center"
          >
            revolutionizing shopping
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              py: "25px",
              color: "#434167",
              fontFamily: "Helvetica",
              textAlign: "center",
            }}
          >
            Transform how you shop and sell with immersive 3D experiences and
            cutting-edge AR technology, bringing
            <br /> products to life like never before. Seamless, interactive,
            and built for the next generation of shopping
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
              mt: "25px",
              gap: 2,
            }}
          >
            {isMobile ? (
              <>
                {/* Render images without parallax on mobile */}
                <Image
                  alt="model"
                  width={250}
                  height={162.5}
                  src="/assets/images/mobile-screens/mobile-screen-1.png"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
                <Image
                  alt="model"
                  width={250}
                  height={162.5}
                  src="/assets/images/mobile-screens/mobile-screen-2.png"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
                <Image
                  alt="model"
                  width={250}
                  height={162.5}
                  src="/assets/images/mobile-screens/mobile-screen-3.png"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </>
            ) : (
              <>
                {/* Render images with parallax on larger screens */}
                <Parallax translateY={[-10, 10]}>
                  <Image
                    alt="model"
                    width={250}
                    height={162.5}
                    src="/assets/images/mobile-screens/mobile-screen-1.png"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Parallax>
                <Parallax translateY={[-30, 30]}>
                  <Image
                    alt="model"
                    width={250}
                    height={162.5}
                    src="/assets/images/mobile-screens/mobile-screen-2.png"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Parallax>
                <Parallax translateY={[-10, 10]}>
                  <Image
                    alt="model"
                    width={250}
                    height={162.5}
                    src="/assets/images/mobile-screens/mobile-screen-3.png"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Parallax>
              </>
            )}
          </Box>
        </Container>
      </Box>
    </ParallaxProvider>
  );
}
