// src/components/BreadcrumbNav.js
"use client";

import { Breadcrumbs, Typography, Box } from "@mui/material";
import Link from "next/link";
import PropTypes from "prop-types";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

/**
 * Helper function to create a clean slug from a string.
 * It converts the string to lowercase, removes commas and '&' symbols, and replaces spaces with dashes.
 * @param {string} name The string to convert into a slug.
 * @returns {string} The formatted slug.
 */
const createSlug = (name) => {
  if (typeof name !== 'string') {
    return "";
  }
  return name.toLowerCase().replace(/[,&]/g, "").replace(/\s+/g, "-");
};

/**
 * Main helper function to get the full category path based on the product object.
 * It now correctly handles cases with and without a subcategoryItemChild.
 * @param {object} product The product data object from the API.
 * @returns {Array<Object>} An array of breadcrumb objects with `name` and `href`.
 */
const getCategoryPath = (product) => {
  const path = [];
  const { subcategoryItem, subcategoryItemChild } = product;

  // Prioritize subcategoryItemChild if it exists
  if (subcategoryItemChild) {
    const { subcategoryItem: parentSubcategoryItem } = subcategoryItemChild;
    const { subcategory } = parentSubcategoryItem;
    const { category } = subcategory;
    
    // Add top-level category
    if (category) {
      path.push({
        name: category.name,
        href: `/products/search/all?category=${createSlug(category.name)}`
      });
    }

    // Add subcategory
    if (subcategory) {
      path.push({
        name: subcategory.name,
        href: `/products/search/all?subcategory=${createSlug(subcategory.name)}`
      });
    }

    // Add subcategory item
    if (parentSubcategoryItem) {
      path.push({
        name: parentSubcategoryItem.name,
        href: `/products/search/all?subcategoryItem=${createSlug(parentSubcategoryItem.name)}`
      });
    }

    // Add the final subcategory item child
    path.push({
      name: subcategoryItemChild.name,
      href: `/products/search/all?subcategoryItemChild=${createSlug(subcategoryItemChild.name)}`
    });

  } else if (subcategoryItem) { // Fallback to subcategoryItem if no subcategoryItemChild
    const { subcategory } = subcategoryItem;
    const { category } = subcategory;

    // Add top-level category
    if (category) {
      path.push({
        name: category.name,
        href: `/products/search/all?category=${createSlug(category.name)}`
      });
    }

    // Add subcategory
    if (subcategory) {
      path.push({
        name: subcategory.name,
        href: `/products/search/all?subcategory=${createSlug(subcategory.name)}`
      });
    }

    // Add the final subcategory item
    path.push({
      name: subcategoryItem.name,
      href: `/products/search/all?subcategoryItem=${createSlug(subcategoryItem.name)}`
    });
  }

  return path;
};

// Main reusable BreadcrumbNav component
export default function BreadcrumbNav({ product }) {
  const categoryPath = getCategoryPath(product);
  const lastItemName = categoryPath.length > 0 ? categoryPath[categoryPath.length - 1].name : null;

  const breadcrumbItems = [
    <Box key="home" sx={{ display: 'flex', alignItems: 'center' }}>
      <Link
        href="/products/search/all"
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

  categoryPath.slice(0, -1).forEach((item) => {
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
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    subcategoryItem: PropTypes.shape({
      name: PropTypes.string,
      subcategory: PropTypes.shape({
        name: PropTypes.string,
        category: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    }),
    subcategoryItemChild: PropTypes.shape({
      name: PropTypes.string,
      subcategoryItem: PropTypes.shape({
        name: PropTypes.string,
        subcategory: PropTypes.shape({
          name: PropTypes.string,
          category: PropTypes.shape({
            name: PropTypes.string,
          }),
        }),
      }),
    }),
  }).isRequired,
};