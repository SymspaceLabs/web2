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
import { FormHelperText } from "@mui/material"; // Add this at the top


// =================================================

export default function ProductReview({
  reviews,
  rating,
  setRating,
  content,
  setContent,
  handleSubmit,
  loading,
  errors
}) {

  return (
    <FlexCol gap={3}> 
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

      <FlexCol gap={1}>
        {reviews.length>0 && reviews?.map((item, index) => (
          <ProductComment 
            key={index}
            item={item}
          />
        ))}  
      </FlexCol>
    
    </FlexCol>
  );
}