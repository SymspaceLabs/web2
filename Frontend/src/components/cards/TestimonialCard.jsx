"use client"

import React from 'react';
import { FlexBox } from "@/components/flex-box";
import { H6, Paragraph } from "@/components/Typography";
import { ImageWrapper } from "@/pages-sections/landing-page/section-13/styles";
import LazyImage from "@/components/LazyImage";
import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";

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
          <Typography
            sx={{
              wordWrap: "break-word", // Ensures long words break to the next line
              overflowWrap: "break-word", // Adds additional compatibility for wrapping
              whiteSpace: "normal", // Ensures text wraps instead of staying in one line
            }}
          >
            {comment}
          </Typography>
          <FlexBox gap={2} alignItems="center">
            <ImageWrapper>
              <LazyImage src={user.avatar} width={50} height={50} alt="User" />
            </ImageWrapper>
            <div>
              <H6 fontSize={18}>{user.name}</H6>
              <Paragraph color="grey.600">{user.designation}</Paragraph>
            </div>
          </FlexBox>
        </TestimonialWrapper>
      );
}

export default TestimonialCard