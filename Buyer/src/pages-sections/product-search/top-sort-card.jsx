"use client";

// ==============================================
// Top Sort Card used in Product Search Page
// ==============================================

import { Paragraph, Span } from "@/components/Typography";
import { MenuItem, TextField } from "@mui/material";
import { FlexBetween, FlexBox } from "@/components/flex-box";
import { useState, useMemo } from "react";

// ==============================================

const SORT_OPTIONS = [
  { label: "Relevance", value: "Relevance" },
  { label: "Date", value: "Date" },
  { label: "Price Low to High", value: "Price Low to High" },
  { label: "Price High to Low", value: "Price High to Low" },
];

const TopSortCard = ({
  products, // This prop is likely unused for the count now as totalProducts is passed
  slug,     // This prop is likely unused for the display name now as genderDisplayName is passed
  totalProducts,      // NEW: Prop for total count from ProductSearchPageView
  categoryDisplayName, // NEW: Prop for formatted category name from ProductSearchPageView
  genderDisplayName   // NEW: Prop for formatted gender name from ProductSearchPageView
}) => {
  const [selectedOption, setSelectedOption] = useState(SORT_OPTIONS[0].value);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // You would typically implement sorting logic here based on the selected option
  };

  // Construct the display text dynamically based on available props
  const displayFilterText = useMemo(() => {
    const parts = [];
    if (genderDisplayName) {
      parts.push(genderDisplayName);
    }
    if (categoryDisplayName) {
      parts.push(categoryDisplayName);
    }
    // Join the parts with " and " if both are present
    return parts.length > 0 ? `for ${parts.join(' and ')}` : '';
  }, [genderDisplayName, categoryDisplayName]);


  return (
    <FlexBetween
      mb="10px"
      py={{ sm: "1rem", md: "0.5rem", xs: "1.25rem 0.25rem" }}
      flexWrap="wrap"
      alignItems="center"
      gap={1}
    >
      <div>
        <Paragraph color="grey.600">
          Total {totalProducts} results {displayFilterText}
        </Paragraph>
      </div>

      <FlexBox alignItems="center" gap={2}>
        <Paragraph color="grey.600" whiteSpace="pre">
          Sort by:
        </Paragraph>
        <TextField
          select
          size="small"
          variant="outlined"
          placeholder="Sort by"
          value={selectedOption}
          onChange={handleOptionChange}
          sx={{ minWidth: "150px", width: "auto" }}
        >
          {SORT_OPTIONS.map((item) => (
            <MenuItem value={item.value} key={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
      </FlexBox>
    </FlexBetween>
  );
};

export default TopSortCard;
