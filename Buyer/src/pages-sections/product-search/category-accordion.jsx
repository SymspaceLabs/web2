// src/components/CategoryAccordion.js

"use client";

import { Span } from "@/components/Typography";
import { Fragment, useCallback, useMemo, useState } from 'react';
import { Checkbox, Collapse, FormControlLabel, FormGroup } from "@mui/material";
import AccordionHeader from "@/components/accordion/accordion-header";
import { Accordion } from "@mui/material"; // Assuming you need this for the full accordion structure

// NOTE: CATEGORIES_DATA is only needed if you are using it as the canonical source
// If the category data comes fully from the 'data' prop, you might not need this.
// For simplicity and based on your API, we'll focus on the 'data' prop.

// Helper function to recursively extract ALL granular (leaf) categories and fix the title
const extractGranularCategories = (categoryChildren, result = []) => {
    if (!categoryChildren || !Array.isArray(categoryChildren)) return result;

    categoryChildren.forEach(cat => {
        const hasChildren = cat.child && Array.isArray(cat.child) && cat.child.length > 0;
        
        if (hasChildren) {
            // Recursively get children
            extractGranularCategories(cat.child, result);
        } else if (cat.id) {
            // 🛠️ FIX: Ensure 'name' is used for the label if 'title' doesn't exist on the leaf node.
            // Using 'name' property from your API data: { "name": "Sofas" }
            result.push({
                id: cat.id,
                name: cat.name,
            });
        }
    });

    return result;
};


// 🛠️ FIX: The component should map over the 'data' array to render multiple top-level categories.
// We are renaming this to CategoryFilterGroup and creating a wrapper that maps over the data.
const CategoryItemAccordion = ({ categoryItem, checkedCategoryIds, onCategoryToggle }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleCheckboxChange = useCallback((itemId, isChecked) => {
        if (onCategoryToggle) {
            onCategoryToggle(itemId, isChecked);
        }
    }, [onCategoryToggle]);

    const handleToggleCategory = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);
    
    // Get all leaf-level children for this single category item
    const granularCategories = useMemo(() => {
        return extractGranularCategories(categoryItem.child);
    }, [categoryItem.child]);

    // Default to empty array for safe comparison
    const safeCheckedIds = useMemo(() => checkedCategoryIds || [], [checkedCategoryIds]);

    // Check availability only against the actual leaf categories available in the list
    // NOTE: We assume ALL leaf categories are visible for now, simplifying the logic that checked the API product list.
    const visibleCategories = granularCategories;


    return (
        <Fragment>
            <AccordionHeader
                open={isOpen}
                sx={{ pl: 0, cursor: 'pointer' }}
                onClick={handleToggleCategory}
            >
                <Span sx={{ fontWeight: 'bold' }}>{categoryItem.title}</Span>
            </AccordionHeader>

            <Collapse in={isOpen}>
                <FormGroup sx={{ pl: 2, pt: 1, pb: 1 }}>
                    {/* Loop through the filtered list: visibleCategories */}
                    {visibleCategories.map((item) => (
                        <FormControlLabel
                            key={`granular-item-${item.id}`}
                            sx={{ py: 0.5 }}
                            control={
                                <Checkbox
                                    // 🛠️ FIX: Ensure ID is compared as string if IDs in state are strings
                                    checked={safeCheckedIds.includes(String(item.id))} 
                                    // 🛠️ FIX: Pass item.id to the change handler
                                    onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                                    size="small"
                                />
                            }
                            // 🛠️ FIX: Use 'name' (or 'title' if applicable) for the label text
                            label={item.name} 
                        />
                    ))}
                </FormGroup>
            </Collapse>
        </Fragment>
    );
}

/**
 * @function CategoryAccordion
 * @description Renders a filter group for each top-level category in the 'data' prop.
 * * @param {Array} data - Array of top-level category objects from the API.
 * @param {Array} checkedCategoryIds - Array of currently checked category IDs (UUIDs).
 * @param {function} onCategoryToggle - Callback (id, isChecked) for checkbox changes.
 */
export const CategoryAccordion = ({ data, checkedCategoryIds, onCategoryToggle }) => {
    
    // 1. 🛠️ FIX: Check if data is an array before trying to map.
    if (!data || !Array.isArray(data) || data.length === 0) {
        return null;
    }

    // 2. 🛠️ FIX: Map over the entire 'data' array to render multiple accordions.
    return (
        <Fragment>
            {data.map((categoryItem) => (
                <CategoryItemAccordion 
                    key={categoryItem.slug || categoryItem.title} // Use a unique key
                    categoryItem={categoryItem}
                    checkedCategoryIds={checkedCategoryIds}
                    onCategoryToggle={onCategoryToggle}
                />
            ))}
        </Fragment>
    );
};