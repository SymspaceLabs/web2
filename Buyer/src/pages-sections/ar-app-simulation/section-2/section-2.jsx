"use client";

// ===========================================================
// Section 2
// ===========================================================

import Image from "next/image";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { styles } from "../page-view/styles";
import { H1, Paragraph } from "@/components/Typography";

export default function Section2() {
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile screens

  return (
    <ParallaxProvider>
      <Box >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            py: "50px",
          }}
        >
          <H1 color='#4E4E4E' fontSize={{ xs: 28, sm: 40 }} textAlign="center">
            revolutionizing shopping
          </H1>
          <Paragraph
            sx={{
              fontSize: "16px",
              py: "25px",
              color: "#434167",
              textAlign: "center",
            }}
          >
            Transform how you shop and sell with immersive 3D experiences and
            cutting-edge AR technology, bringing
            <br /> products to life like never before. Seamless, interactive,
            and built for the next generation of shopping
          </Paragraph>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
              mt: "150px",
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
                <Parallax translateY={[-15, 30]}>
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
