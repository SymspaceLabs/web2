"use client";

import { Span } from "@/components/Typography";
import { Fragment, useCallback } from "react"; // Removed useState, useEffect, useRef
import { Checkbox, Collapse, FormControlLabel } from "@mui/material";
import AccordionHeader from "@/components/accordion/accordion-header";

// Removed arraysEqual helper as it's no longer needed with this controlled approach.

export const CategoryAccordion = ({ data, checkedCategoryIds, onCategoryToggle }) => { // onCategoryToggle is the new prop for handling changes
  // No internal checkedMap state anymore.
  // The 'checked' status is now directly controlled by 'checkedCategoryIds' prop.

  // Callback function to handle a checkbox toggle.
  // This function now directly calls the 'onCategoryToggle' prop passed from the parent.
  const handleCheckboxChange = useCallback((itemId, isChecked) => {
    // We pass the itemId and its new checked state directly to the parent handler.
    if (onCategoryToggle) {
      onCategoryToggle(itemId, isChecked);
    }
  }, [onCategoryToggle]); // Dependency array includes onCategoryToggle to ensure it's up-to-date.

  // Helper function to render the categories and their subcategories
  const renderCategory = (categories) =>
    categories.map((cat) => {
      const catKey = `cat-${cat.id}`;

      return (
        <Fragment key={catKey}>
          {/* Main category header, always open */}
          <AccordionHeader
            open={true}
            sx={{ pl: 0 }}
          >
            <Span sx={{ fontWeight: 'bold' }}>{cat.title}</Span>
          </AccordionHeader>

          {/* Collapse component to always show subcategories */}
          <Collapse in={true}>
            {cat.subCategory.map((sub) => {
              // Basic validation to ensure subcategoryItem exists before accessing its properties
              if (!sub || !sub.subcategoryItem || !sub.subcategoryItem.id) {
                console.warn("Invalid subcategory item found:", sub);
                return null; // Skip rendering an invalid item
              }
              const subKey = `sub-${sub.subcategoryItem.id}`;
              const isChecked = checkedCategoryIds.includes(sub.subcategoryItem.id); // Direct check against the prop

              return (
                <FormControlLabel
                  key={subKey}
                  sx={{ pl: 3 }}
                  control={
                    <Checkbox
                      // The 'checked' state is now directly derived from the 'checkedCategoryIds' prop
                      checked={isChecked}
                      // When the checkbox is changed, call the new 'handleCheckboxChange'
                      // which in turn calls the 'onCategoryToggle' prop.
                      onChange={() => handleCheckboxChange(sub.subcategoryItem.id, !isChecked)}
                      size="small"
                    />
                  }
                  label={sub.subcategoryItem.name}
                />
              );
            })}
          </Collapse>
        </Fragment>
      );
    });

  return <>{renderCategory(data)}</>;
};
