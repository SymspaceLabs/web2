// src/components/top-sort-card/TopSortCard.js

"use client";

// ==============================================
// Top Sort Card used in Product Search Page
// ==============================================

import { Paragraph } from "@/components/Typography";
import { MenuItem, TextField } from "@mui/material";
import { FlexBetween, FlexBox } from "@/components/flex-box";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Import the hook
import { useTitle } from "@/contexts/TitleContext";

// ==============================================

const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Latest", value: "latest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const TopSortCard = ({
  totalProducts,
  categoryDisplayName,
  genderDisplayName,
  sortOption,
  onSortChange 
}) => {
  const [selectedOption, setSelectedOption] = useState(SORT_OPTIONS[0].value);
  const searchParams = useSearchParams(); // Use the hook directly here
  const { setTitle, setSlug } = useTitle(); // Get the setTitle function from context


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Construct the display text dynamically, prioritizing URL parameters.
  const displayFilterText = useMemo(() => {
    // 1. Check for 'search' term
    const searchTerm = searchParams.get('search');
    if (searchTerm) {
      return `for "${searchTerm}"`;
    }

    // 2. Check for specific subcategory/category parameters
    const subcategoryItemChild = searchParams.get('subcategoryItemChild');
    if (subcategoryItemChild) {
      return `for ${subcategoryItemChild.charAt(0).toUpperCase() + subcategoryItemChild.slice(1)}`;
    }

    const subcategoryItem = searchParams.get('subcategoryItem');
    if (subcategoryItem) {
      return `for ${subcategoryItem.charAt(0).toUpperCase() + subcategoryItem.slice(1)}`;
    }

    const subcategory = searchParams.get('subcategory');
    if (subcategory) {
      return `for ${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}`;
    }

    const category = searchParams.get('category');
    if (category) {
      return `for ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    }

    // 3. Fallback to genderDisplayName and categoryDisplayName props
    const parts = [];
    if (genderDisplayName) {
      parts.push(genderDisplayName);
    }
    // Only add categoryDisplayName if it's not empty,
    // as it might be an empty string if no specific category was found by useProductFilters.
    if (categoryDisplayName) {
      parts.push(categoryDisplayName);
    }

    return parts.length > 0 ? `for ${parts.join(' and ')}` : '';
  }, [searchParams, genderDisplayName, categoryDisplayName]); // Dependencies for re-evaluation

  // Update the title in the context
  useEffect(() => {
    const newTitle = displayFilterText
      ? `Results for ${displayFilterText}`
      : "Product Search"; // Use a default title if filter text is empty
    setTitle(newTitle);
    setSlug(displayFilterText);
  }, [displayFilterText, setTitle]); // setTitle is stable, but include for clarity

  return (
    <FlexBetween
      mb="10px"
      py={{ sm: "1rem", md: "0.5rem", xs: "1.25rem 0.25rem" }}
      flexWrap="wrap"
      alignItems="center"
      gap={1}
    >
      <Paragraph color="grey.600">
        Total {totalProducts} results {displayFilterText}
      </Paragraph>

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
