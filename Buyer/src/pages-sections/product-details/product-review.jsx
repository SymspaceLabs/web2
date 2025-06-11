"use client";

// =================================================
// Product Review
// =================================================

import ProductComment from "./product-comment";
import Link from 'next/link'; // Import the Link component

import { Box, Rating, FormHelperText } from "@mui/material";
import { H1, H5, H2, Paragraph, Span } from "@/components/Typography";
import { FlexBox, FlexCol } from "@/components/flex-box";
import { SymTextField } from "@/components/custom-inputs";
import { SymButton } from "@/components/custom-components";
import { BoxLink } from "../sessions/components";


// =================================================

export default function ProductReview({
  reviews,
  rating,
  setRating,
  content,
  setContent,
  handleSubmit,
  loading,
  errors,
  isAuthenticated
}) {

  return (
    <FlexCol gap={3}>
      {!isAuthenticated ? (
        // Display message for unauthenticated users
        <Span display={{ color:'#000', sm: "inline-block", fontSize: 18 }}>
          <BoxLink textColor="#000" title="Sign in" href="/sign-in" /> &nbsp;to add a review.
        </Span>
      ) : (
        // Display review form for authenticated users
        <>
          <Box mt={2}>
            <FlexBox mb={1.5} gap={0.5}>
              <H1>Your Rating</H1>
              <H5 color="error.main">*</H5>
            </FlexBox>
            <Rating
              color="warn"
              size="medium"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            {errors?.rating && (
              <FormHelperText error>{errors.rating}</FormHelperText>
            )}
          </Box>
          <FlexCol>
            <SymTextField
              title='Your Review'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline={true}
              placeholder="Write a review here"
              theme="light"
              mandatory={true}
            />
            {errors?.content && (
              <FormHelperText error>
                {errors.content}
              </FormHelperText>
            )}
          </FlexCol>
          <FlexBox>
            <SymButton
              sx={{
                mb:5,
                background: 'primary'
              }}
              onClick={handleSubmit}
              loading={loading}
              fullWidth={false}
            >
              Submit
            </SymButton>
          </FlexBox>
        </>
      )}

      <FlexCol gap={1}>
        {/* Render existing product comments */}
        {reviews.length > 0 && reviews?.map((item, index) => (
          <ProductComment
            key={index}
            item={item}
          />
        ))}
      </FlexCol>

    </FlexCol>
  );
}
