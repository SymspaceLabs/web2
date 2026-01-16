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

  // Helper function to turn "casual-dresses" into "Casual dresses"
  const formatTitle = (str) => {
    if (!str) return "";
    const cleanStr = str.replace(/-/g, " "); // Replace hyphens with spaces
    return cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1).toLowerCase();
  };

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
    if (subcategoryItemChild) return formatTitle(subcategoryItemChild);

    const subcategoryItem = searchParams.get('subcategoryItem');
    if (subcategoryItem) return formatTitle(subcategoryItem);

    const subcategory = searchParams.get('subcategory');
    if (subcategory) return formatTitle(subcategory);

    const category = searchParams.get('category');
    if (category) return formatTitle(category);

    // 3. Fallback to gender and category props
    const parts = [];
    if (genderDisplayName) parts.push(genderDisplayName);
    if (categoryDisplayName) parts.push(categoryDisplayName);

    return parts.length > 0 ? parts.join(' and ') : '';
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
        Total {totalProducts} results for {displayFilterText}
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
