"use client";

import {
  Box,
  TextField,
  Slider,
  Checkbox,
  Rating,
  Divider,
  FormControlLabel,
  Button,
  FormGroup,
  Typography,
} from "@mui/material";
import { FlexBetween } from "@/components/flex-box";
import { H5, H6, Span } from "@/components/Typography";
import { CategoryAccordion } from "./category-accordion";
import { useMemo } from "react";

// =================================================================
// Filter Components (No changes here)
// =================================================================

// Gender Filter Component
const GenderFilter = ({ allGenders, selectedGenders, onGenderFilterChange }) => (
  <>
    <H6 mb={1.25}>Gender</H6>
    <Box display="flex" flexDirection="column">
      {allGenders.map((g) => {
        const isChecked = Array.isArray(selectedGenders) && selectedGenders.includes(g);
        return (
          <FormControlLabel
            key={g}
            label={<Span>{g.charAt(0).toUpperCase() + g.slice(1)}</Span>}
            control={
              <Checkbox
                size="small"
                checked={isChecked}
                onChange={() => {
                  if (onGenderFilterChange) {
                    onGenderFilterChange(g, !isChecked);
                  }
                }}
              />
            }
          />
        );
      })}
    </Box>
    <Box component={Divider} my={3} />
  </>
);

// Brand Filter Component
const BrandFilter = ({ allBrands, selectedBrands, setSelectedBrands }) => (
  <>
    <H6 mb={2}>Brands</H6>
    {allBrands.map((item, index) => {
      const isChecked = Array.isArray(selectedBrands) && selectedBrands.some(brand => brand.id === item.id);
      const handleBrandChange = () => {
        if (typeof setSelectedBrands === 'function') {
          if (isChecked) {
            setSelectedBrands(selectedBrands.filter(brand => brand.id !== item.id));
          } else {
            setSelectedBrands([...selectedBrands, item]);
          }
        }
      };
      return (
        <FormControlLabel
          key={index}
          sx={{ display: "flex" }}
          label={<Span color="inherit">{item.entityName}</Span>}
          control={
            <Checkbox
              size="small"
              color="primary"
              checked={isChecked}
              onChange={handleBrandChange}
            />
          }
        />
      );
    })}
    <Box component={Divider} my={3} />
  </>
);

// Price Filter Component
const PriceFilter = ({ priceRange, setPriceRange, priceLimits }) => {
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <>
      <H6 mb={2}>Price Range</H6>
      <Box px={1}>
        <Slider
          min={priceLimits[0]}
          max={priceLimits[1]}
          size="small"
          value={priceRange}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `$${v}`}
          onChange={handlePriceChange}
        />
      </Box>
      <FlexBetween>
        <TextField
          placeholder="0"
          type="number"
          size="small"
          fullWidth
          value={priceRange[0]}
          onChange={(e) =>
            handlePriceChange(null, [Number(e.target.value), priceRange[1]])
          }
        />
        <H5 color="grey.600" px={1}>
          -
        </H5>
        <TextField
          placeholder="250"
          type="number"
          size="small"
          fullWidth
          value={priceRange[1]}
          onChange={(e) =>
            handlePriceChange(null, [priceRange[0], Number(e.target.value)])
          }
        />
      </FlexBetween>
      <Box component={Divider} my={3} />
    </>
  );
};

// Availability Filter Component
const AvailabilityFilter = ({ allAvailabilities, selectedAvailabilities, onAvailabilityFilterChange }) => (
  <>
    <H6 mb={1.25}>Availability</H6>
    <Box display="flex" flexDirection="column">
      {allAvailabilities.map((avail) => {
        const isChecked = Array.isArray(selectedAvailabilities) && selectedAvailabilities.includes(avail);
        return (
          <FormControlLabel
            key={avail}
            label={<Span color="inherit">{avail}</Span>}
            control={
              <Checkbox
                size="small"
                checked={isChecked}
                onChange={() => {
                  if (onAvailabilityFilterChange) {
                    onAvailabilityFilterChange(avail, !isChecked);
                  }
                }}
              />
            }
          />
        );
      })}
    </Box>
    <Box component={Divider} my={3} />
  </>
);

// Color Filter Component
const ColorFilter = ({ allColors, selectedColors, onColorFilterChange }) => (
  <>
    <H6 mb={2}>Colors</H6>
    <FormGroup>
      {allColors.map((color) => (
        <FormControlLabel
          key={color.code}
          control={
            <Checkbox
              checked={Array.isArray(selectedColors) && selectedColors.some((c) => c.code === color.code)}
              onChange={() => {
                if (onColorFilterChange) {
                  onColorFilterChange(color, !selectedColors.some((c) => c.code === color.code));
                }
              }}
            />
          }
          label={
            <Box display="flex" alignItems="center">
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: color.code,
                  border: "1px solid #ccc",
                  mr: 1.5,
                }}
              />
              <Typography variant="body2">{color.name}</Typography>
            </Box>
          }
        />
      ))}
    </FormGroup>
    <Box component={Divider} my={3} />
  </>
);

// Ratings Filter Component
const RatingsFilter = () => (
  <>
    <H6 mb={2}>Ratings</H6>
    {[5, 4, 3, 2, 1].map((item) => (
      <FormControlLabel
        key={item}
        control={<Checkbox size="small" color="secondary" />}
        label={<Rating size="small" value={item} color="warn" readOnly />}
        sx={{ display: "flex" }}
      />
    ))}
    <Box component={Divider} my={3} />
  </>
);

// Clear Filters Component
const ClearFiltersButton = ({ onClearAllFilters }) => {
  const handleClearFilters = () => {
    if (typeof onClearAllFilters === 'function') {
      onClearAllFilters();
    } else {
      console.error("Error: onClearAllFilters is not a function in ProductFilterCard.");
    }
  };

  return (
    <Button
      variant="outlined"
      color="secondary"
      fullWidth
      sx={{ mt: 2 }}
      onClick={handleClearFilters}
    >
      Clear Filters
    </Button>
  );
};

// =================================================================
// Main Product Filter Card
// =================================================================

export default function ProductFilterCard({
  allBrands,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  priceLimits,
  category, 
  checkedCategoryIds,
  onCategoryFilterChange,
  allGenders,
  selectedGenders,
  onGenderFilterChange,
  allAvailabilities,
  selectedAvailabilities,
  onAvailabilityFilterChange,
  allColors,
  selectedColors,
  onColorFilterChange,
  onClearAllFilters,
  products // Make sure products are passed as a prop
}) {

  // Corrected logic to handle the `undefined` products array
  const productCategoryIds = useMemo(() => {
    // Provide a default empty array if products is undefined or null
    const productList = products || []; 
    const ids = new Set();
    productList.forEach(product => {
      if (product.subcategoryItemChildId) {
        ids.add(product.subcategoryItemChildId);
      } else if (product.subcategoryItemId) {
        ids.add(product.subcategoryItemId);
      }
    });
    return Array.from(ids);
  }, [products]);

  return (
    <Box pt={{ sm: 7 }}>
      <GenderFilter
        allGenders={allGenders}
        selectedGenders={selectedGenders}
        onGenderFilterChange={onGenderFilterChange}
      />
      <CategoryAccordion
        data={category}
        productCategoryIds={productCategoryIds}
        checkedCategoryIds={checkedCategoryIds}
        onCategoryToggle={onCategoryFilterChange}
      />
      <Box component={Divider} my={3} />
      <BrandFilter
        allBrands={allBrands}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
      />
      <PriceFilter
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        priceLimits={priceLimits}
      />
      <AvailabilityFilter
        allAvailabilities={allAvailabilities}
        selectedAvailabilities={selectedAvailabilities}
        onAvailabilityFilterChange={onAvailabilityFilterChange}
      />
      <ColorFilter
        allColors={allColors}
        selectedColors={selectedColors}
        onColorFilterChange={onColorFilterChange}
      />
      <RatingsFilter />
      <ClearFiltersButton onClearAllFilters={onClearAllFilters} />
    </Box>
  );
}