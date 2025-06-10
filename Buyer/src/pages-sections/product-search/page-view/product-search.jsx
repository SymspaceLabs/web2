"use client";

// ======================================================
// Product Search Page
// ======================================================

import { H5 } from "@/components/Typography";
import { useSearchParams, useRouter } from "next/navigation";
import { Grid, Container, Box } from "@mui/material";
import { useState, useEffect, useMemo, useCallback } from "react";

import ProductFilterCard from "../product-filter-card"; // GLOBAL CUSTOM COMPONENTS
import ProductsGridView from "../products-grid-view";
import TopSortCard from "../top-sort-card"; // Make sure TopSortCard is correctly imported

// ======================================================

// Helper function for shallow array comparison to avoid unnecessary re-renders
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort(); // Sort to handle different orderings
  const sortedB = [...b].sort();
  for (let i = 0; i < sortedA.length; i++) {
    if (sortedA[i] !== sortedB[i]) return false;
  }
  return true;
}

export default function ProductSearchPageView({ slug }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // These useMemo calls are retained because genderQuery and categoryQuery are used
  // in other parts of the component (e.g., filter logic, TopSortCard).
  const genderQuery = useMemo(
    () => searchParams.getAll("gender").map(g => g.toLowerCase()),
    [searchParams]
  );
  const categoryQuery = useMemo(
    () => searchParams.getAll("category").map(c => c.toLowerCase()),
    [searchParams]
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allGenders, setAllGenders] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [priceLimits, setPriceLimits] = useState([0, 300]);
  const [category, setCategory] = useState([]);
  // This is the single source of truth for checked categories
  const [checkedCategoryIds, setCheckedCategoryIds] = useState([]);
  const [allAvailabilities, setAllAvailabilities] = useState([]);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]); // State for selected colors

  useEffect(() => {
    setLoading(true);

    // Derive current query values INSIDE the effect for stable dependencies
    const currentGenderQuery = searchParams.getAll("gender").map(g => g.toLowerCase());
    const currentCategoryQuery = searchParams.getAll("category").map(c => c.toLowerCase());

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
      .then(res => res.json())
      .then(data => {
        const validGenders = data.genders.map(g => g.toLowerCase());
        const filteredQueryGenders = currentGenderQuery.filter(g => validGenders.includes(g));

        setAllProducts(data.products);
        setAllBrands(data.brands);
        setPriceLimits([data.priceRange.min, data.priceRange.max]);
        setPriceRange([data.priceRange.min, data.priceRange.max]);
        setCategory(data.category);
        setAllGenders(data.genders.map(g => g.toLowerCase()));
        setSelectedGenders(filteredQueryGenders);
        setAllAvailabilities(data.availabilities);
        setAllColors(data.colors);

        // Initialize checkedCategoryIds based on URL category query on initial load
        const initialCheckedCategoryIds = [];
        const initialCheckedCategoryNames = new Set(currentCategoryQuery);

        if (currentCategoryQuery.length > 0 && data.category) {
          data.category.forEach(cat => {
            if (cat.subCategory) {
              cat.subCategory.forEach(sub => {
                if (sub.subcategoryItem && initialCheckedCategoryNames.has(sub.subcategoryItem.name.toLowerCase())) {
                  initialCheckedCategoryIds.push(sub.subcategoryItem.id);
                }
              });
            }
          });
        }
        
        // IMPORTANT FIX: If currentCategoryQuery is present but no valid IDs are found,
        // it means the requested category doesn't exist in our data.
        // In this scenario, set displayedProducts to an empty array immediately.
        if (currentCategoryQuery.length > 0 && initialCheckedCategoryIds.length === 0) {
          setDisplayedProducts([]); // Show 0 products for non-existent categories
          setCheckedCategoryIds([]); // Ensure state reflects no checked categories
        } else {
          // Otherwise, proceed with setting the products and categories
          // Only update if the initial state is different from the default empty array
          if (!arraysEqual(initialCheckedCategoryIds, checkedCategoryIds)) {
              setCheckedCategoryIds(initialCheckedCategoryIds);
          }
          // Initial filtering logic will happen in the second useEffect based on updated states
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug, searchParams.toString()]); // Depend on slug and the stringified searchParams

  // Callback function to handle gender filter changes and update the URL
  const handleGenderFilterChange = useCallback((genderValue, isChecked) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    let newSelectedGenders = [...selectedGenders];

    if (isChecked) {
      if (!newSelectedGenders.includes(genderValue)) {
        newSelectedGenders.push(genderValue);
      }
    } else {
      newSelectedGenders = newSelectedGenders.filter(g => g !== genderValue);
    }

    if (!arraysEqual(newSelectedGenders, selectedGenders)) {
        setSelectedGenders(newSelectedGenders);
    }

    currentParams.delete("gender");
    newSelectedGenders.forEach(g => currentParams.append("gender", g));

    const newUrlParams = currentParams.toString();
    if (newUrlParams !== searchParams.toString()) { // Compare stringified URL params
      router.replace(`${window.location.pathname}?${newUrlParams}`);
    }
  }, [selectedGenders, searchParams, router]);

  // Callback function to handle category filter changes and update the URL
  const handleCategoryFilterChange = useCallback((categoryId, isChecked) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    let nextCheckedCategoryIds;

    if (isChecked) {
      // Add categoryId if not already present
      nextCheckedCategoryIds = checkedCategoryIds.includes(categoryId)
        ? [...checkedCategoryIds] // If already present, return a new array reference that's identical
        : [...checkedCategoryIds, categoryId]; // Add the new ID
    } else {
      // Remove categoryId
      nextCheckedCategoryIds = checkedCategoryIds.filter(id => id !== categoryId);
    }

    // Only update state if the array content has actually changed
    if (!arraysEqual(nextCheckedCategoryIds, checkedCategoryIds)) {
      setCheckedCategoryIds(nextCheckedCategoryIds);
    }

    // Reconstruct the category names for URL based on the newCheckedCategoryIds
    const newCategoryNames = [];
    // Ensure 'category' data is available before mapping IDs to names
    if (category && category.length > 0) {
      const categoryNameMap = new Map();
      category.forEach(cat => {
        if (cat.subCategory) {
          cat.subCategory.forEach(sub => {
            if (sub.subcategoryItem) {
              categoryNameMap.set(sub.subcategoryItem.id, sub.subcategoryItem.name.toLowerCase());
            }
          });
        }
      });

      nextCheckedCategoryIds.forEach(id => {
        const name = categoryNameMap.get(id);
        if (name) {
          newCategoryNames.push(name);
        }
      });
    }

    // Update URL parameters for 'category'
    currentParams.delete("category");
    newCategoryNames.forEach(name => currentParams.append("category", name));

    const newUrlParams = currentParams.toString();
    // Only update URL if the new parameters are different from current URL parameters
    if (newUrlParams !== searchParams.toString()) {
      router.replace(`${window.location.pathname}?${newUrlParams}`);
    }
  }, [checkedCategoryIds, category, searchParams, router]); // Dependencies for useCallback

  // Recompute displayedProducts whenever any filter changes:
  useEffect(() => {
    let list = allProducts;

    // Category filter: Relies on `checkedCategoryIds`
    // This part runs AFTER the initial fetch useEffect.
    // If categoryQuery was present but didn't find a match, displayedProducts would already be []
    // from the first useEffect. This ensures it remains [] or is correctly filtered.
    if (checkedCategoryIds.length > 0) {
      const subIds = new Set(checkedCategoryIds);
      list = list.filter(p => p.subcategoryItem && subIds.has(p.subcategoryItem.id));
    } else if (categoryQuery.length > 0 && checkedCategoryIds.length === 0) {
        // If there was a category in the URL but no matching IDs, explicitly show no products.
        // This handles cases where the URL contained an invalid category.
        list = [];
    }


    // Brand filter
    if (selectedBrands.length) {
      const brandIds = new Set(selectedBrands.map(b => b.id));
      list = list.filter(p => p.company && brandIds.has(p.company.id));
    }

    // Gender filter
    if (selectedGenders.length) {
      const genderSet = new Set(selectedGenders);
      list = list.filter(p => p.gender && genderSet.has(p.gender));
    }

    // Price range filter
    list = list.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Availability filter
    if (selectedAvailabilities.length) {
      const availSet = new Set(selectedAvailabilities);
      list = list.filter(p => Array.isArray(p.availability) ? p.availability.some(a => availSet.has(a)) : availSet.has(p.availability)); // Defensive check for p.availability
    }

    // Color filter
    if (selectedColors.length) {
      const colorCodes = new Set(selectedColors.map(c => c.code.toLowerCase()));
      list = list.filter(p =>
        p.colors?.some(c => colorCodes.has(c.code?.toLowerCase()))
      );
    }

    setDisplayedProducts(list);
  }, [
    allProducts,
    selectedBrands,
    checkedCategoryIds, // IMPORTANT: Dependency for category filtering
    selectedGenders,
    priceRange,
    selectedAvailabilities,
    selectedColors,
    categoryQuery // Added categoryQuery as a dependency to react to its changes for 0 products
  ]);


  if (error) {
    return (
      <Container className="mt-2 mb-3">
        <H5>Error: {error}</H5>
      </Container>
    );
  }

  // Determine the display string for the category in TopSortCard
  const categoryDisplayName = categoryQuery.length > 0
    ? `'${categoryQuery.map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(', ')}'`
    : '';

  // Determine the display string for the gender in TopSortCard
  const genderDisplayName = genderQuery.length > 0
    ? `'${genderQuery.map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(', ')}'`
    : '';


  return (
    <Box sx={{ py: 5, background:"#FFF" }} >
      <Container>
        <Grid container spacing={3}>

          {/* Left Filter Card */}
          <Grid item md={2.5} sx={{ display: { md: "block", xs: "none" } }}>
            <ProductFilterCard
              allBrands={allBrands}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              priceLimits={priceLimits}
              category={category}
              checkedCategoryIds={checkedCategoryIds} // Pass the current checkedCategoryIds state down
              onCategoryFilterChange={handleCategoryFilterChange} // Pass the handler for category changes
              allGenders={allGenders}
              selectedGenders={selectedGenders}
              onGenderFilterChange={handleGenderFilterChange}
              allAvailabilities={allAvailabilities}
              selectedAvailabilities={setSelectedAvailabilities}
              allColors={allColors}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors} // FIX: Ensure setSelectedColors is passed
            />
          </Grid>

          {/* Right Product List */}
          <Grid item md={9.5} xs={12}>
            {/* Top Sort Card */}
            <TopSortCard
              products={displayedProducts} // This prop is likely unused for the count now
              slug={genderQuery[0]} // This prop is likely unused for the display name now
              // Pass the total product count and the display names for category and gender
              totalProducts={displayedProducts.length}
              categoryDisplayName={categoryDisplayName}
              genderDisplayName={genderDisplayName} // NEW: Pass gender display name
            />

            {/* Products Grid View */}
            <ProductsGridView
              products={displayedProducts}
              loading={loading}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>

  );
}
