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
            {/* Wrap FormControlLabel components in FormGroup to ensure vertical layout */}
            <FormGroup>
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
        </Fragment>
      );
    });

  return <>{renderCategory(data)}</>;
};
