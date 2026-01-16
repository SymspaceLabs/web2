// src/components/BreadcrumbNav.js
"use client";

import { Breadcrumbs, Typography, Box } from "@mui/material";
import Link from "next/link";
import PropTypes from "prop-types";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

/**
 * Main helper function to get the full category path based on the product object.
 * This now works with the parent chain structure from the API.
 * @param {object} product The product data object from the API.
 * @returns {Array<Object>} An array of breadcrumb objects with `name`, `href`, and `depth`.
 */
const getCategoryPath = (product) => {
  const path = [];
  
  if (!product.category) {
    return path;
  }

  // Build the hierarchy by traversing up the parent chain
  const hierarchy = [];
  let currentCategory = product.category;
  
  while (currentCategory) {
    hierarchy.unshift(currentCategory); // Add to beginning of array
    currentCategory = currentCategory.parent;
  }

  // Convert hierarchy to breadcrumb path with appropriate query parameters
  // Depth 0 = top level (category), Depth 1 = second level (subcategory), 
  // Depth 2 = third level (subcategoryItem), Depth 3+ = fourth level (subcategoryItemChild)
  hierarchy.forEach((cat, index) => {
    const depth = index;
    let queryParam = 'category'; // Default to category
    
    if (depth === 1) {
      queryParam = 'subcategory';
    } else if (depth === 2) {
      queryParam = 'subcategoryItem';
    } else if (depth >= 3) {
      queryParam = 'subcategoryItem';
    }
    
    path.push({
      name: cat.name,
      href: `/products?${queryParam}=${cat.slug}`,
      depth: depth
    });
  });

  return path;
};

// Main reusable BreadcrumbNav component
export default function BreadcrumbNav({ product }) {
  const categoryPath = getCategoryPath(product);
  const lastItemName = categoryPath.length > 0 ? categoryPath[categoryPath.length - 1].name : null;

  const breadcrumbItems = [
    <Box key="home" sx={{ display: 'flex', alignItems: 'center' }}>
      <Link
        href="/products"
        style={{
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        <Typography
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'text.primary',
              fontWeight: 'bold',
            },
          }}
        >
          Home
        </Typography>
      </Link>
    </Box>,
  ];

  // Make all category items clickable, including the last one
  categoryPath.forEach((item) => {
    breadcrumbItems.push(
      <Box key={item.name} sx={{ display: 'flex', alignItems: 'center' }}>
        <Link
          href={item.href}
          style={{
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <Typography
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
                fontWeight: 'bold',
              },
            }}
          >
            {item.name}
          </Typography>
        </Link>
      </Box>
    );
  });

  // If no categories, show "All Products" as the current page
  if (categoryPath.length === 0) {
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
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      slug: PropTypes.string,
      parent: PropTypes.object, // Can be nested parent objects
    }),
  }).isRequired,
};