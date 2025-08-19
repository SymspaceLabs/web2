// src/components/BreadcrumbNav.js
"use client";

import { Breadcrumbs, Typography, Box } from "@mui/material";
import Link from "next/link";
import PropTypes from "prop-types";
import CATEGORIES_DATA from "@/data/categories";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

/**
 * Helper function to get the full category path based on a given ID.
 * It now searches for both subcategoryItemChild and subcategoryItem by their `id`.
 * @param {string} queryId The ID to search for in the categories data.
 * @param {Array} allCategories The categories data array.
 * @returns {Array<Object>} An array of breadcrumb objects with `name` and `href`.
 */
const getCategoryPath = (queryId, allCategories) => {
  const path = [];
  if (!queryId || !allCategories) {
    return path;
  }

  const topLevelCategories = allCategories[0]?.child;
  if (!topLevelCategories) {
    return path;
  }

  for (const clothingCategory of topLevelCategories) {
    const categorySlug = clothingCategory.title.toLowerCase().replace(/,?\s&/g, "").replace(/\s+/g, "-");
    
    for (const subcategory of clothingCategory.child) {
      const subcategorySlug = subcategory.title.toLowerCase().replace(/,?\s&/g, "").replace(/\s+/g, "-");

      if (subcategory.child) {
        for (const subcategoryItem of subcategory.child) {
          // Check for subcategoryItemChild ID first
          if (subcategoryItem.child) {
            for (const subcategoryItemChild of subcategoryItem.child) {
              if (subcategoryItemChild.id === queryId) {
                path.push({ name: clothingCategory.title, href: `/products/search/all?category=${categorySlug}` });
                path.push({ name: subcategory.title, href: `/products/search/all?subcategory=${subcategorySlug}` });
                path.push({ name: subcategoryItem.title, href: `/products/search/all?subcategoryItem=${subcategoryItem.slug}` });
                path.push({ name: subcategoryItemChild.title, href: `/products/search/all?subcategoryItemChild=${subcategoryItemChild.slug}` });
                return path;
              }
            }
          }

          // If no child ID match, check for subcategoryItem ID
          if (subcategoryItem.id === queryId) {
            path.push({ name: clothingCategory.title, href: `/products/search/all?category=${categorySlug}` });
            path.push({ name: subcategory.title, href: `/products/search/all?subcategory=${subcategorySlug}` });
            path.push({ name: subcategoryItem.title, href: `/products/search/all?subcategoryItem=${subcategoryItem.slug}` });
            return path;
          }
        }
      }
    }
  }

  return path;
};

// Main reusable BreadcrumbNav component
export default function BreadcrumbNav({ subcategoryItemId, subcategoryItemChildId }) {
  // Prioritize subcategoryItemChildId. If it's null or undefined, use subcategoryItemId.
  const queryId = subcategoryItemChildId || subcategoryItemId;
  
  const categoryPath = getCategoryPath(queryId, CATEGORIES_DATA);
  const lastItemName = categoryPath.length > 0 ? categoryPath[categoryPath.length - 1].name : null;

  const breadcrumbItems = [
    <Box key="home" sx={{ display: 'flex', alignItems: 'center' }}>
      <Link
        href="/"
        style={{
          color: 'text.secondary',
          textDecoration: 'none',
          '&:hover': {
            color: 'text.primary',
            fontWeight: 'bold',
          },
        }}
      >
        Home
      </Link>
    </Box>,
  ];

  categoryPath.slice(0, -1).forEach((item, index) => {
    breadcrumbItems.push(
      <Box key={item.name} sx={{ display: 'flex', alignItems: 'center' }}>
        <Link
          href={item.href}
          style={{
            color: 'text.secondary',
            textDecoration: 'none',
            '&:hover': {
              color: 'text.primary',
              fontWeight: 'bold',
            },
          }}
        >
          {item.name}
        </Link>
      </Box>
    );
  });

  if (lastItemName) {
    breadcrumbItems.push(
      <Typography key="last" color="text.primary" fontWeight="bold">
        {lastItemName}
      </Typography>
    );
  } else {
    breadcrumbItems.push(
      <Typography key="all-products" color="text.primary" fontWeight="bold">
        All Products
      </Typography>
    );
  }

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
      sx={{ mb: 3 }}
    >
      {breadcrumbItems}
    </Breadcrumbs>
  );
}

// Prop types for validation
BreadcrumbNav.propTypes = {
  subcategoryItemId: PropTypes.string,
  subcategoryItemChildId: PropTypes.string,
};