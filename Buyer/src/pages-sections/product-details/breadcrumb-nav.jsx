// src/components/BreadcrumbNav.js
"use client";

import { Breadcrumbs, Typography, Box } from "@mui/material";
import Link from "next/link";
import PropTypes from "prop-types";
import CATEGORIES_DATA from "@/data/categories";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// Helper function to get the full category path based on your data structure
const getCategoryPath = (querySlug, allCategories) => {
  const path = [];
  if (!querySlug || !allCategories) {
    return path;
  }

  const normalizedQuerySlug = querySlug.toLowerCase();

  // Find the parent of all categories, which is "Categories"
  const topLevelCategories = allCategories[0]?.child;
  if (!topLevelCategories) {
    return path;
  }

  for (const clothingCategory of topLevelCategories) {
    const categorySlug = clothingCategory.title.toLowerCase().replace(/,?\s&/g, '').replace(/\s+/g, '-');
    if (categorySlug === normalizedQuerySlug) {
      path.push({ name: clothingCategory.title, href: `/products/search/all?category=${categorySlug}` });
      return path;
    }

    for (const subcategory of clothingCategory.child) {
      const subcategorySlug = subcategory.title.toLowerCase().replace(/,?\s&/g, '').replace(/\s+/g, '-');
      if (subcategorySlug === normalizedQuerySlug) {
        path.push({ name: clothingCategory.title, href: `/products/search/all?category=${categorySlug}` });
        path.push({ name: subcategory.title, href: `/products/search/all?subcategory=${subcategorySlug}` });
        return path;
      }

      if (subcategory.child) {
        for (const subcategoryItem of subcategory.child) {
          if (subcategoryItem.slug && subcategoryItem.slug.toLowerCase() === normalizedQuerySlug) {
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
export default function BreadcrumbNav({ subcategoryItem }) {
  const categoryPath = getCategoryPath(subcategoryItem, CATEGORIES_DATA);
  const lastItemName = categoryPath.length > 0 ? categoryPath[categoryPath.length - 1].name : null;

  const breadcrumbItems = [
    <Box key="home" sx={{ display: 'flex', alignItems: 'center' }}>
      <Link
        href="/"
        sx={{
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
          sx={{
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
  subcategoryItem: PropTypes.string
};