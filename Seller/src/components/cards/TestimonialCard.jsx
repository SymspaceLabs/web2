"use client"

import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { FlexBox } from "@/components/flex-box";
import { LazyImage } from "@/components/lazy-image";

const TestimonialWrapper = styled(Box)(({ theme }) => ({
    boxSizing: "border-box",
    borderRadius: "40px",
    background: "rgba(255, 255, 255, 0.1)",
    padding: "35px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 25px rgba(53, 53, 53, 0.5)",
    width: "100%",
    maxWidth: "450px",
    height: "auto",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
    [theme.breakpoints.up("sm")]: {
      height: "250px",
    },
}));

const TestimonialCard = ({ testimonial }) => {
    const { comment, user } = testimonial || {};

    return (
        <TestimonialWrapper>
          <Typography fontFamily="Helvetica" fontSize={16} sx={{ wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "normal" }}>
            {comment}
          </Typography>
          <FlexBox gap={2} alignItems="center">
            <Box sx={imageWrapper}>
              <LazyImage src={user?.avatar} width={50} height={50} alt="User" />
            </Box>
            <Typography fontFamily="Helvetica" fontSize={18}>
              {user.name}
            </Typography>
          </FlexBox>
        </TestimonialWrapper>
      );
}

export default TestimonialCard

const imageWrapper =  {
  width: 75,
  height: 75,
  flexShrink: 0,
  display: "flex",
  overflow: "hidden",
  borderRadius: "50%",
  border: "2px solid white"
};