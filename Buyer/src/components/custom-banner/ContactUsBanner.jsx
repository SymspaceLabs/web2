"use client"

import { styles } from "../styles";
import { motion } from "framer-motion";
import styled from "@mui/material/styles/styled";
import { LazyImage } from '@/components/lazy-image';
import { Box, Typography, Button, Container} from "@mui/material";
import Link from "next/link";

export default function ContactUsBanner({title, subtitle}) {  
  return (
    <Box>
      <motion.div
        component={Box}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ width: "100%", overflow: "hidden" }} // Ensures content stays within bounds
      >
        <Container sx={{ py: 10 }}>
          <RootStyle>
            <LazyImage
              src="/assets/images/banners/banner-55.png"
              alt="offer"
              width={500}
              height={500}
            />
            <div className="content">
              <Typography
                sx={styles.elementalEndFont}
                mt={3}
                mb={1}
                lineHeight={1.2}
                fontSize={{ xs: 20, sm: 40 }}
              >
                {title}
              </Typography>

              <Typography fontFamily="Helvetica" mb={{ xs: 0, sm: 3 }} lineHeight={1.2} fontSize={{ sm: 18, xs: 14 }}>
                {subtitle}
              </Typography >

            <Link href="/contact-us">
                <Button sx={darkBtn}>
                    Contact Us
                </Button>
            </Link>
            </div>
          </RootStyle>
        </Container>
      </motion.div>
    </Box>
  );
}

const darkBtn = {
    ...styles.elementalEndFont,
    px:2,
    py:2,
    borderRadius:'50px',
    boxShadow: '0px 4px 4px 3px rgba(0, 0, 0, 0.25)',
    color:'#FFF',
    background:'#000',
    border:'2px solid white',
    '&hover' : {
        background:'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)',
    }
  }

const RootStyle = styled("div")(({
    theme
  }) => ({
    minHeight: 300,
    borderRadius: '50px',
    display: "flex",
    overflow: "hidden",
    position: "relative",
    img: {
      objectFit: "cover"
    },
    ".content": {
      top: "40%",
      left: "10%",
      position: "absolute",
      transform: "translateY(-40%)",
      [theme.breakpoints.down("sm")]: {
        top: "50%",
        insetInline: 0,
        padding: "2rem",
        transform: "translateY(-50%)"
      },
      [theme.breakpoints.down(375)]: {
        h2: {
          fontSize: 24,
          marginTop: 0
        }
      }
    },
    [theme.breakpoints.down(375)]: {
      minHeight: 260
    }
  }));
