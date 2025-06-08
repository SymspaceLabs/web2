"use client";

// =================================================
// Product Review
// =================================================

import styles from "./styles";
import ProductReview from "./product-review";
import styled from "@mui/material/styles/styled";
import ProductDescription from "./product-description";

import { useState, useEffect } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

// =================================================

// STYLED COMPONENT
const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 40,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontSize: {xs:'16px', sm:'24px'},
    ...styles.elementalEndFont,
  }
}));

export default function ProductTabs({
  productId
}) {

  const { user } = useAuth();
  const { showSnackbar } = useSnackbar();
  
  const [selectedOption, setSelectedOption] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let formErrors = {};

    if (!rating) {
      formErrors.rating = "Rating is required";
    }

    if (!content.trim()) {
      formErrors.content = "Review needs to be filled";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    setLoading(true);

    const body = {
      productId,
      userId: user.id,
      rating,
      content,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // ✅ Clear inputs
        setRating(0);
        setContent("");
        // ✅ Refetch reviews
        await fetchReviews();
        showSnackbar("Review submitted successfully!", "success");
      } else {
        showSnackbar("Failed to submit review:", "error");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  };


  
  const fetchReviews = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/product/${productId}`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };
  
  useEffect(() => {
    if (productId) {
      fetchReviews()
    };
  }, [productId]);

  const handleOptionClick = (_, value) => setSelectedOption(value);

  return (
    <Box sx={{
      my: 8, px: 5, py: 1,
      boxSizing: "border-box",
      background: "linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)",
      boxShadow: "0px 1px 24px -1px rgba(0, 0, 0, 0.18)",
      backdropFilter: "blur(12px)",
      borderRadius: "30px",
    }}>
      <StyledTabs
        textColor="#f9f9f9"
        indicatorColor="#000" 
        value={selectedOption}
        onChange={handleOptionClick}
        TabIndicatorProps={{
          style: { backgroundColor: '#353535' }
        }}
      >
        <Tab 
          className="inner-tab"
          label="Description"
          color={ selectedOption === 0 ? '#353535' : 'grey'}
        />
        <Tab
          className="inner-tab"
          label={`Review (${reviews.length})`}
          sx={{
            color: selectedOption === 1 ? '#353535' : 'grey'
          }}
        />
      </StyledTabs>

      <Box mb={6}>
        {selectedOption === 0 && <ProductDescription />}
        
        {selectedOption === 1 && (
          <ProductReview
            reviews={reviews}
            rating={rating}
            setRating={setRating}
            content={content}
            setContent={setContent}
            handleSubmit={handleSubmit}
            loading={loading}
            errors={errors}
          />
        )}
      </Box>
    </Box>
  );
}
