"use client";

// =================================================
// Product Review
// =================================================

import ProductComment from "./product-comment";

import { Box, Rating } from "@mui/material";
import { H1, H5, H2 } from "@/components/Typography";
import { FlexBox, FlexCol } from "@/components/flex-box";
import { SymTextField } from "@/components/custom-inputs";
import { SymButton } from "@/components/custom-components";

// =================================================

export default function ProductReview({
  reviews,
  rating,
  setRating,
  content,
  setContent,
  handleSubmit,
  loading
}) {

  return (
    <FlexCol gap={2}> 
      <H2 fontWeight="600" mt={7} mb={2.5}>
        Write a Review for this product
      </H2>

      <Box mb={2.5}>
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
      </Box>

      <SymTextField
        title='Your Review'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        multiline={true}
        placeholder="Write a review here"
        theme="light"
        mandatory={true}
      />

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

      {reviews.length>0 && reviews?.map((item, index) => (
        <ProductComment 
          key={index}
          item={item}
        />
      ))}      
    </FlexCol>
  );
}