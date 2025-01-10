import { Box, Container, Typography, Button } from "@mui/material";
import Image from "next/image";

const TextBubble = ({ positionStyles, children }) => {
  return (
    <Typography
      sx={{
        position: "absolute",
        background: "white",
        filter: "drop-shadow(0px 5px 50px rgba(0, 0, 0, 0.4))",
        p: { xs: 1, md:1.5, sm: 2 },
        borderRadius: "50px",
        textAlign: "center",
        fontFamily: "Elemental End",
        textTransform: "lowercase",
        fontSize: { xs: "8px", sm: "12px" },
        ...positionStyles, // Custom position styles passed as props
      }}
    >
      {children}
    </Typography>
  );
};

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
          <Typography
            fontSize={{ xs: 28, sm: 40 }}
            fontFamily="Elemental End"
            textTransform="lowercase"
            textAlign="center"
          >
            personalized experience
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              pb: "25px",
              color: "#434167",
              fontFamily: "Helvetica",
              textAlign: "center",
            }}
          >
            We curate customized shopping experiences from product sizes, user
            preferences, and interests.
            <br />
            It’s time for a seamless solution, especially for those unable to
            travel in-store or prefer not to.
          </Typography>
        </Box>

        <Button
          sx={{
            boxSizing: "border-box",
            py: 2,
            px: 5,
            background:
              "linear-gradient(180deg, #000000 0%, rgba(104, 104, 104, 0.6) 100%)",
            borderRadius: "20px",
            color: "white", // Ensures the text is visible on the dark gradient
            fontFamily: "Elemental End",
            textTransform: "lowercase",
            fontSize: "16px",
            fontWeight: "bold",
            "&:hover": {
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(104, 104, 104, 0.8) 100%)",
            },
          }}
        >
          Brands
        </Button>

        {/* TITLE & SUBTITLE 2 */}
        <Box>
          <Typography
            fontSize={{ xs: 28, sm: 40 }}
            fontFamily="Elemental End"
            textTransform="lowercase"
            textAlign="center"
          >
            easily manage products
          </Typography>
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

        <Button
          sx={{
              boxSizing: "border-box",
              py:2,
              px:5,
              background: "linear-gradient(180deg, #3084FF 0%, #1D4F99 100%)",
              borderRadius: "20px",
              color: "white", // Ensures the text is visible on the dark gradient
              fontFamily: "Elemental End",
              textTransform:'lowercase',
              fontSize: "16px",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(180deg, #1D4F99 0%, #3084FF 100%)",
              },
          }}
          
        >
          learn more
        </Button>

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

