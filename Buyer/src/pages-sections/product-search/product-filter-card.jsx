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
    // newValue is an array [min, max] from the slider, or a custom array from the text fields.
    // Ensure newValue is an array of two numbers before setting state.
    if (Array.isArray(newValue) && newValue.length === 2 && typeof newValue[0] === 'number' && typeof newValue[1] === 'number') {
      setPriceRange(newValue);
    } else {
      console.error("Error: Invalid price range value passed to setPriceRange:", newValue);
    }
  };

  // Corrected function for TextField updates to ensure proper number conversion and state update
  const handleMinPriceChange = (e) => {
    // Convert the string value to a number. If the input is empty or invalid, treat it as 0
    const newMin = Number(e.target.value) || 0; 
    // Create a new array to pass to setPriceRange
    const newRange = [newMin, priceRange[1]];
    setPriceRange(newRange);
  };

  const handleMaxPriceChange = (e) => {
    // Convert the string value to a number. If the input is empty or invalid, treat it as the max limit
    const newMax = Number(e.target.value) || priceLimits[1]; 
    // Create a new array to pass to setPriceRange
    const newRange = [priceRange[0], newMax];
    setPriceRange(newRange);
  };

  const handleSliderChangeCommitted = (event, newValue) => {
    // Note: The main onChange handler handles the updates during drag.
  };

  return (
    <>
      <H6 mb={2}>Price Range</H6>
      <Box px={1}>
        <Slider
          min={priceLimits[0]}
          max={priceLimits[1]}
          size="small"
          // Ensure priceRange is an array of numbers, use fallback if necessary
          value={Array.isArray(priceRange) ? priceRange : priceLimits} 
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `$${v}`}
          onChange={handlePriceChange} // This handles the slider drag/move
          onChangeCommitted={handleSliderChangeCommitted} // Optional: To see when the user stops dragging
        />
      </Box>
      <FlexBetween>
        <TextField
          placeholder={priceLimits[0].toString()}
          type="number"
          size="small"
          fullWidth
          value={priceRange[0]}
          onChange={handleMinPriceChange} // Use the dedicated handler
          inputProps={{ min: priceLimits[0], max: priceLimits[1] }} // Set min/max for input field
        />
        <H5 color="grey.600" px={1}>
          -
        </H5>
        <TextField
          placeholder={priceLimits[1].toString()}
          type="number"
          size="small"
          fullWidth
          value={priceRange[1]}
          onChange={handleMaxPriceChange} // Use the dedicated handler
          inputProps={{ min: priceLimits[0], max: priceLimits[1] }} // Set min/max for input field
        />
      </FlexBetween>
      <Box component={Divider} my={3} />
    </>
  );
};

// Availability Filter Component - FINAL FIX
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
            // ✅ FIX: Ensure the handler accepts the event object 'e' 
            // to maintain proper MUI/React click handling.
            onChange={(e) => {
              if (onAvailabilityFilterChange) {
                // The rest of your logic remains the same:
                onAvailabilityFilterChange(avail, !isChecked);
              }
            }}
            control={
              <Checkbox
                size="small"
                checked={isChecked}
                // No inner onChange is still correct
              />
            }
          />
        );
      })}
    </Box>
    <Box component={Divider} my={3} />
  </>
);

// Color Filter Component - FIXED to filter/match by 'code' property
const ColorFilter = ({ allColors, selectedColors, onColorFilterChange }) => {
    // Extract just the codes from the selectedColors for fast lookup
    const selectedColorCodes = useMemo(() => {
        if (!Array.isArray(selectedColors)) return [];
        return selectedColors.map(c => c.code);
    }, [selectedColors]);

    return (
    <>
      <H6 mb={2}>Colors</H6>
      <FormGroup>
        {allColors.map((color) => {
          // 1. Determine the current checked status by checking if the color's 'code' exists in the selected codes array
          const isChecked = selectedColorCodes.includes(color.code);

          return (
            <FormControlLabel
              key={color.code}
              control={
                <Checkbox
                  size="small"
                  // 2. Bind the checked state directly to the calculated status
                  checked={isChecked}
                  onChange={() => {
                    if (onColorFilterChange) {
                      // 3. Pass the color object and the NEW state (the opposite of the current state)
                      onColorFilterChange(color, !isChecked);
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
          );
        })}
      </FormGroup>
      <Box component={Divider} my={3} />
    </>
  );
};

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
      {
        allGenders.length> 0 &&
        <GenderFilter
          allGenders={allGenders}
          selectedGenders={selectedGenders}
          onGenderFilterChange={onGenderFilterChange}
        />
      }
      
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