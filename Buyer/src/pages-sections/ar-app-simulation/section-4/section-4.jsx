"use client"

// ===========================================================
// Section 4
// ===========================================================

import Image from "next/image";
import { styles } from "../page-view/styles";
import { Box, Container, Typography, Button } from "@mui/material";
import { H1, Paragraph } from "@/components/Typography";
import Link from "next/link";

export default function Section4() {
  return (
    <Box sx={{ py: 5, background: "#fff" }}>
      <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", py: "50px", gap: 10,}}>
        {/* IMAGE WITH TEXT BUBBLES 1 */}
        <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", mt: "25px", maxWidth: "600px", width: "100%",}}>
          {/* IMAGE */}
          <Image
            alt="model"
            width={500}
            height={500}
            src="/assets/images/ar-app-simulation/feature-1.png"
            style={{
              width: "60%", // Ensures responsiveness
              height: "auto",
            }}
          />

          {/* TEXT BUBBLES */}
          <TextBubble
            positionStyles={{
              top: { xs: "10%", sm: 30 },
              right:  { xs: -90, sm: -100, md: -415 },
              transform: "translateX(-50%)",
            }}
          >
            scan environment before augmenting
          </TextBubble>
          <TextBubble
            positionStyles={{
              top: { xs: "30%", sm: "40%" },
              left: { xs: 110, sm: 50, md: -50 },
              transform: "translateX(-50%)",
            }}
          >
            input preferences & measurements
          </TextBubble>
          <TextBubble
            positionStyles={{
              top: { xs: "60%", sm: "70%" },
              right: { xs: -70, sm: -100, md:  -315 },
              transform: "translate(-50%, -50%)",
            }}
          >
            explore products from home
          </TextBubble>
          <TextBubble
            positionStyles={{
              bottom: { xs: "10%", sm: "5%" },
              left: { xs: 100, sm: 50, md: -10 },
              transform: "translateX(-50%)",
            }}
          >
            shop conveniently with ar
          </TextBubble>
        </Box>

        {/* TITLE & SUBTITLE */}
        <Box>
          <H1 fontSize={{ xs: 28, sm: 40 }} textAlign="center">
            personalized experience
          </H1>
          <Paragraph sx={{ fontSize: "16px", pb: "25px", color: "#434167", textAlign: "center",}}>
            We curate customized shopping experiences from product sizes, user
            preferences, and interests.
            <br />
            It’s time for a seamless solution, especially for those unable to
            travel in-store or prefer not to.
          </Paragraph>
        </Box>

        {/* TITLE & SUBTITLE 2 */}
        <Box>
          <H1 fontSize={{ xs: 28, sm: 40 }} textAlign="center" wordSpacing="10px" >
            easily manage products
          </H1>
          <Typography
            sx={{
              fontSize: "16px",
              pb: "25px",
              color: "#434167",
              fontFamily: "Helvetica",
              textAlign: "center",
            }}
          >
            Migrate your Entire Catalogue into a Centralized 3D Repository to market and gauge product<br/> demand prior to manufacturing 
          </Typography>
        </Box>

        <Link href="/#3d-repository" passHref>
          <Button sx={styles.learnMoreBtn} >
            learn more
          </Button>
        </Link>


        {/* IMAGE WITH TEXT BUBBLES 2 */}
        <Box
          sx={{
            position: "relative", // Enable absolute positioning for text bubbles
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "25px",
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {/* IMAGE */}
          <Box
            sx={{
              width: { xs: "100%", sm: "80%", md: "50%" }, // Responsive widths
            }}
          >
            <Image
              alt="model"
              width={500}
              height={500}
              src="/assets/images/ar-app-simulation/feature-2.png"
              style={{
                width: "100%", // Ensures the image takes the full width of the parent
                height: "auto", // Maintains aspect ratio
              }}
            />
          </Box>


          {/* TEXT BUBBLES */}
          <TextBubble
            positionStyles={{
              top:  { xs: "10%", sm: 30 },
              left: { xs: 110, sm: 150, md: 140 },
              transform: "translateX(-50%)",
            }}
          >
            gauge product demand through ar
          </TextBubble>
          <TextBubble
            positionStyles={{
              top: "50%",
              right: { xs: -60, sm: -100, md: -30 },
              transform: "translate(-50%, -50%)",
            }}
          >
            generate 3d products 
          </TextBubble>
          <TextBubble
            positionStyles={{
              bottom: "15%",
              left: { xs: 100, sm: 130, md: 150 },
              transform: "translateX(-50%)",
            }}
          >
            manage inventory and traction
          </TextBubble>
        </Box>
      </Container>
    </Box>
  );
}

const TextBubble = ({ positionStyles, children }) => {
  return (
    <H1
      sx={{
        position: "absolute",
        background: "white",
        filter: "drop-shadow(0px 5px 50px rgba(0, 0, 0, 0.4))",
        p: { xs: 1, md:1.5, sm: 2 },
        borderRadius: "50px",
        textAlign: "center",
        fontSize: { xs: "8px", sm: "12px" },
        ...positionStyles, // Custom position styles passed as props
      }}
    >
      {children}
    </H1>
  );
};


