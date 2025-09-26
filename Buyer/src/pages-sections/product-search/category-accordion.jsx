"use client";

import { Span } from "@/components/Typography";
import { Fragment, useCallback, useMemo, useState } from "react";
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import AccordionHeader from "@/components/accordion/accordion-header";

// Import the full categories data
import CATEGORIES_DATA from "@/data/categories";

// Helper function to find the top-level category from full data
const findTopCategory = (data, fullCategoryData) => {
  if (!data || !Array.isArray(data) || !fullCategoryData) return null;

  const apiCategoryTitle = data[0]?.title;
  if (!apiCategoryTitle) return null;

  const find = (categories, title) => {
    for (const category of categories) {
      if (category.title === apiCategoryTitle) return category;
      if (category.child) {
        const found = find(category.child, apiCategoryTitle);
        if (found) return found;
      }
    }
    return null;
  };

  // Assuming top-level categories are immediately under the 'Categories' root
  return find(fullCategoryData[0]?.child || [], apiCategoryTitle);
};

// Helper function to recursively extract ALL granular (leaf) categories
const extractAllGranularCategories = (categoryChildren, result = []) => {
  if (!categoryChildren || !Array.isArray(categoryChildren)) return result;

  categoryChildren.forEach(cat => {
    const hasChildren = cat.child && Array.isArray(cat.child) && cat.child.length > 0;
    
    if (hasChildren) {
      // If it has children, recurse
      extractAllGranularCategories(cat.child, result);
    } else if (cat.id && cat.slug) {
      // If it has no children, it's a leaf node/granular category
      result.push(cat);
    }
  });

  return result;
};


export const CategoryAccordion = ({ data, checkedCategoryIds, onCategoryToggle }) => {
  
  // State to manage the collapse of the main category. Default to open.
  const [isOpen, setIsOpen] = useState(true);

  const handleCheckboxChange = useCallback((itemSlug, isChecked) => {
    if (onCategoryToggle) {
      // This function handles the filtering logic (e.g., adding/removing the slug from a list)
      onCategoryToggle(itemSlug, isChecked);
    }
  }, [onCategoryToggle]);

  const handleToggleCategory = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // 1. Find the single top-level category from the full data
  const topLevelCategory = useMemo(() => {
    return findTopCategory(data, CATEGORIES_DATA); 
  }, [data]);

  // 2. Extract ALL granular categories under this top-level category from the FULL data structure
  const granularCategories = useMemo(() => {
    if (!topLevelCategory) return [];
    return extractAllGranularCategories(topLevelCategory.child);
  }, [topLevelCategory]);
  
  // 3. **NEW LOGIC:** Create a set of IDs for categories that CURRENTLY HAVE PRODUCTS (from the API response)
  const categoriesWithProducts = useMemo(() => {
    // The API data array's first item holds the top level, and its 'child' array holds the subcategories
    const apiSubcategories = data[0]?.child || [];
    // Extract all IDs that came back from the API
    return new Set(apiSubcategories.map(item => item.id));
  }, [data]);


  // 4. **NEW LOGIC:** Filter the list to only include categories that have products
  const visibleCategories = useMemo(() => {
    // Always show the category if it is currently CHECKED, even if its product count is zero (it was zeroed out by another filter)
    // OR if its ID is present in the `categoriesWithProducts` Set.
    return granularCategories.filter(item => 
      categoriesWithProducts.has(item.id) || checkedCategoryIds.includes(item.id)
    );
  }, [granularCategories, categoriesWithProducts, checkedCategoryIds]);


  if (!topLevelCategory) {
    return null;
  }

  return (
    <Fragment>
      <AccordionHeader
        open={isOpen}
        sx={{ pl: 0, cursor: 'pointer' }}
        onClick={handleToggleCategory}
      >
        <Span sx={{ fontWeight: 'bold' }}>{topLevelCategory.title}</Span>
      </AccordionHeader>

      <Collapse in={isOpen}>
        <FormGroup sx={{ pl: 2, pt: 1, pb: 1 }}>
          {/* Loop through the newly filtered list: visibleCategories */}
          {visibleCategories.map((item) => (
            <FormControlLabel
              key={`granular-item-${item.id}`}
              sx={{ py: 0.5 }}
              control={
                <Checkbox
                  // The checkbox is checked if its ID is present in the checkedCategoryIds prop
                  checked={checkedCategoryIds.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.slug, !checkedCategoryIds.includes(item.id))}
                  size="small"
                />
              }
              label={item.title} 
            />
          ))}
        </FormGroup>
      </Collapse>
    </Fragment>
  );
};