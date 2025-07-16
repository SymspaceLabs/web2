"use client";

import { Span } from "@/components/Typography";
import { Fragment, useCallback } from "react";
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup // Import FormGroup here
} from "@mui/material";
import AccordionHeader from "@/components/accordion/accordion-header";

export const CategoryAccordion = ({ data, checkedCategoryIds, onCategoryToggle }) => {
  const handleCheckboxChange = useCallback((itemId, isChecked) => {
    if (onCategoryToggle) {
      onCategoryToggle(itemId, isChecked);
    }
  }, [onCategoryToggle]);

  // Helper function to render the categories and their subcategories
  const renderCategory = (categories) => {
    // Add a check to ensure categories is an array before mapping
    if (!categories || !Array.isArray(categories)) {
      console.warn("Category data is not an array:", categories);
      return null; // Or return an empty array/message
    }

    return categories.map((cat) => {
      const catKey = `cat-${cat.id}`;

      // Check if the category has subCategory and if it's an array with items
      const hasSubcategories = cat.subCategory && Array.isArray(cat.subCategory) && cat.subCategory.length > 0;

      return (
        <Fragment key={catKey}>
          {/* Main category header, always open */}
          <AccordionHeader
            open={true} // Always open as per your original logic
            sx={{ pl: 0 }}
          >
            {/* Use cat.name for the title as per the combined backend structure */}
            <Span sx={{ fontWeight: 'bold' }}>{cat.name}</Span>
          </AccordionHeader>

          {/* Only render subcategories and their checkboxes if they exist */}
          {hasSubcategories && (
            <Collapse in={true}>
              <FormGroup>
                {cat.subCategory.map((sub) => {
                  if (!sub || !sub.subcategoryItem || !sub.subcategoryItem.id) {
                    console.warn("Invalid subcategory item found:", sub);
                    return null;
                  }
                  const subKey = `sub-${sub.subcategoryItem.id}`;
                  const isChecked = checkedCategoryIds.includes(sub.subcategoryItem.id);

                  return (
                    <FormControlLabel
                      key={subKey}
                      sx={{ pl: 3 }}
                      control={
                        <Checkbox
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(sub.subcategoryItem.id, !isChecked)}
                          size="small"
                        />
                      }
                      label={sub.subcategoryItem.name}
                    />
                  );
                })}
              </FormGroup>
            </Collapse>
          )}
          {/* If there are no subcategories, nothing else is rendered for this category here,
              just its AccordionHeader (title) will be visible. */}
        </Fragment>
      );
    });
  };

  return <>{renderCategory(data)}</>;
};