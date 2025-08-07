"use client";

import { Span } from "@/components/Typography";
import { Fragment, useCallback, useMemo, useState } from "react";
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup
} from "@mui/material";
import AccordionHeader from "@/components/accordion/accordion-header";

// Import the category data directly
import CATEGORIES_DATA from "@/data/categories";

export const CategoryAccordion = ({ checkedCategoryIds, onCategoryToggle }) => {
  // ADDED DEBUG LINE HERE
  console.log("Current checkedCategoryIds:", checkedCategoryIds);

  // State to manage which categories are open
  const [openCategories, setOpenCategories] = useState({});

  const handleCheckboxChange = useCallback((itemId, isChecked) => {
    if (onCategoryToggle) {
      onCategoryToggle(itemId, isChecked);
    }
  }, [onCategoryToggle]);

  // Function to toggle the open state of a category
  const handleToggleCategory = useCallback((categoryId) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  }, []);

  // Helper function to assign unique IDs and normalize the data structure
  const normalizeCategories = useCallback((data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    
    // Assign unique IDs and map 'title' to 'name', 'child' to 'subCategory'/'subcategoryItems'
    return data.map((category) => {
      const normalizedCategory = {
        id: category.id || Math.random().toString(36).substring(2, 15),
        name: category.title,
        subCategory: [],
      };

      if (category.child && Array.isArray(category.child)) {
        normalizedCategory.subCategory = category.child.map((sub) => {
          const normalizedSub = {
            id: sub.id || Math.random().toString(36).substring(2, 15),
            name: sub.title,
            subcategoryItems: [],
          };

          if (sub.child && Array.isArray(sub.child)) {
            normalizedSub.subcategoryItems = sub.child.map((item) => ({
              id: item.id || Math.random().toString(36).substring(2, 15),
              name: item.title,
              slug: item.slug,
            }));
          }
          return normalizedSub;
        });
      }
      return normalizedCategory;
    });
  }, []);

  // Use useMemo to normalize and sort the categories
  const sortedCategories = useMemo(() => {
    const normalizedData = normalizeCategories(CATEGORIES_DATA[0]?.child || []);
    const categoriesCopy = [...normalizedData];

    return categoriesCopy.sort((a, b) => {
      const aHasSubcategoryItems = a.subCategory && Array.isArray(a.subCategory) && a.subCategory.some(sub => sub.subcategoryItems && Array.isArray(sub.subcategoryItems) && sub.subcategoryItems.length > 0);
      const bHasSubcategoryItems = b.subCategory && Array.isArray(b.subCategory) && b.subCategory.some(sub => sub.subcategoryItems && Array.isArray(sub.subcategoryItems) && sub.subcategoryItems.length > 0);

      if (aHasSubcategoryItems && !bHasSubcategoryItems) {
        return -1;
      }
      if (!aHasSubcategoryItems && bHasSubcategoryItems) {
        return 1;
      }
      return 0;
    });
  }, [CATEGORIES_DATA, normalizeCategories]);

  // Helper function to render the categories and their subcategories
  const renderCategory = (categoriesToRender) => {
    if (!categoriesToRender || !Array.isArray(categoriesToRender)) {
      return null;
    }

    return categoriesToRender.map((cat) => {
      const catKey = `cat-${cat.id}`;
      const hasSubcategories = cat.subCategory && Array.isArray(cat.subCategory) && cat.subCategory.length > 0;
      const isOpen = openCategories[cat.id];

      return (
        <Fragment key={catKey}>
          {/* Main category header with a click handler and pointer cursor */}
          <AccordionHeader
            open={isOpen}
            sx={{ pl: 0, cursor: 'pointer' }}
            onClick={() => hasSubcategories && handleToggleCategory(cat.id)}
          >
            <Span sx={{ fontWeight: 'bold' }}>{cat.name}</Span>
          </AccordionHeader>

          {/* Render subcategories only if the parent is open */}
          {hasSubcategories && (
            <Collapse in={isOpen}>
              <FormGroup>
                {/* Iterate through all sub-categories and their items directly */}
                {cat.subCategory.map((sub) => (
                  <Fragment key={`sub-group-${sub.id}`}>
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
                          sx={{ pl: 4 }}
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
                  </Fragment>
                ))}
              </FormGroup>
            </Collapse>
          )}
        </Fragment>
      );
    });
  };

  return <>{renderCategory(sortedCategories)}</>;
};