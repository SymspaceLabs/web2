"use client";

import { Span } from "@/components/Typography";
import { Fragment, useCallback, useMemo } from "react"; // Import useMemo
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup
} from "@mui/material";
import AccordionHeader from "@/components/accordion/accordion-header";

export const CategoryAccordion = ({ data, checkedCategoryIds, onCategoryToggle }) => {
  const handleCheckboxChange = useCallback((itemId, isChecked) => {
    if (onCategoryToggle) {
      onCategoryToggle(itemId, isChecked);
    }
  }, [onCategoryToggle]);

  // Use useMemo to sort the categories
  const sortedCategories = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    // Create a copy to avoid mutating the original prop array
    const categoriesCopy = [...data];

    // Sort criteria: Categories with subcategoryItems first
    // A category has subcategoryItems if any of its subCategory objects
    // have a non-empty subcategoryItems array.
    return categoriesCopy.sort((a, b) => {
      const aHasSubcategoryItems = a.subCategory && Array.isArray(a.subCategory) &&
                                   a.subCategory.some(sub => sub.subcategoryItems && Array.isArray(sub.subcategoryItems) && sub.subcategoryItems.length > 0);

      const bHasSubcategoryItems = b.subCategory && Array.isArray(b.subCategory) &&
                                   b.subCategory.some(sub => sub.subcategoryItems && Array.isArray(sub.subcategoryItems) && sub.subcategoryItems.length > 0);

      if (aHasSubcategoryItems && !bHasSubcategoryItems) {
        return -1; // 'a' comes before 'b'
      }
      if (!aHasSubcategoryItems && bHasSubcategoryItems) {
        return 1;  // 'b' comes before 'a'
      }
      return 0; // Maintain original order if both have or both don't have subcategoryItems
    });
  }, [data]); // Recalculate only when 'data' prop changes

  // Helper function to render the categories and their subcategories
  const renderCategory = (categoriesToRender) => {
    if (!categoriesToRender || !Array.isArray(categoriesToRender)) {
      return null;
    }

    return categoriesToRender.map((cat) => {
      const catKey = `cat-${cat.id}`;

      const hasSubcategories = cat.subCategory && Array.isArray(cat.subCategory) && cat.subCategory.length > 0;

      return (
        <Fragment key={catKey}>
          {/* Main category header */}
          <AccordionHeader
            open={true}
            sx={{ pl: 0 }}
          >
            <Span sx={{ fontWeight: 'bold' }}>{cat.name}</Span>
          </AccordionHeader>

          {/* Render subcategories if they exist */}
          {hasSubcategories && (
            <Collapse in={true}>
              {cat.subCategory.map((sub) => {
                const subKey = `sub-${sub.id}`;

                const hasSubcategoryItems = sub.subcategoryItems && Array.isArray(sub.subcategoryItems) && sub.subcategoryItems.length > 0;

                return (
                  <Fragment key={subKey}>

                    {/* Render subcategory items if they exist under the subcategory */}
                    {hasSubcategoryItems && (
                      <Collapse in={true}>
                        <FormGroup>
                          {sub.subcategoryItems.map((item) => {
                            if (!item || !item.id) {
                              console.warn("Invalid subcategory item found:", item);
                              return null;
                            }
                            const itemKey = `item-${item.id}`;
                            const isChecked = checkedCategoryIds.includes(item.id);

                            return (
                              <FormControlLabel
                                key={itemKey}
                                sx={{ pl: 4 }} // Further indent for subcategory items
                                control={
                                  <Checkbox
                                    checked={isChecked}
                                    onChange={() => handleCheckboxChange(item.id, !isChecked)}
                                    size="small"
                                  />
                                }
                                label={item.name}
                              />
                            );
                          })}
                        </FormGroup>
                      </Collapse>
                    )}
                  </Fragment>
                );
              })}
            </Collapse>
          )}
        </Fragment>
      );
    });
  };

  return <>{renderCategory(sortedCategories)}</>; // Pass the sorted categories to render
};