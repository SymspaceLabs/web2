"use client";

// =================================================================
// Product Filter Card
// =================================================================

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
  Typography
} from "@mui/material";
import { FlexBetween } from "@/components/flex-box";
import { H5, H6, Span } from "@/components/Typography";
import { CategoryAccordion } from "./category-accordion"; // LOCAL COMPONENT

// =================================================================

export default function ProductFilterCard({
  allBrands, // Array of all available brands
  selectedBrands, // Array of currently selected brands
  setSelectedBrands, // Function to update selected brands
  priceRange, // [min, max] price range selected
  setPriceRange, // Function to update price range
  priceLimits, // [min, max] allowed price values
  category, // Category tree data
  checkedCategoryIds, // Array of selected category IDs
  onCategoryFilterChange, // Function to handle category selection
  allGenders, // Array of all gender options
  selectedGenders, // Array of selected genders
  onGenderFilterChange, // Function to handle gender selection
  allAvailabilities, // Array of all availability options
  selectedAvailabilities, // Array of selected availabilities
  onAvailabilityFilterChange, // Function to handle availability selection
  allColors, // Array of all color options
  selectedColors, // Array of selected colors
  onColorFilterChange, // Function to handle color selection
  onClearAllFilters, // Function to clear all filters
}) {

  // Handles price slider and input changes
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Handles "Clear Filters" button click
  const handleClearFilters = () => {
    if (typeof onClearAllFilters === 'function') {
      onClearAllFilters();
    } else {
      console.error("Error: onClearAllFilters is not a function in ProductFilterCard.");
    }
  };

  return (
    <Box pt={{ sm: 7 }}>
      {/* GENDER FILTER: Checkbox list for gender selection */}
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
                    // Calls parent handler to update gender filter
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

      {/* CATEGORY VARIANT FILTER */}
      <H6 mb={1.25}>Categories</H6>

      {/* CATEGORY ACCORDION || CATEGORIES ACCORDION*/}
      <CategoryAccordion
        data={category}
        checkedCategoryIds={checkedCategoryIds}
        onCategoryToggle={onCategoryFilterChange}
      />

      <Box component={Divider} my={3} />

      {/* PRICE VARIANT FILTER */}
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
        {/* Minimum price input */}
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
        {/* Maximum price input */}
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

      {/* BRAND VARIANT FILTER: Checkbox list for brand selection */}
      <H6 mb={2}>Brands</H6>
      {allBrands.map((item, index) => {
        const isChecked = Array.isArray(selectedBrands) && selectedBrands.some(brand => brand.id === item.id);
        const handleBrandChange = () => {
          // Calls parent handler to update brand filter
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

      {/* AVAILABILITY FILTER: Checkbox list for availability selection */}
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
                    // Calls parent handler to update availability filter
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

      {/* COLORS VARIANT FILTER: Checkbox list with color swatches */}
      <H6 mb={2}>Colors</H6>
      <FormGroup>
        {allColors.map((color) => (
          <FormControlLabel
            key={color.code}
            control={
              <Checkbox
                checked={Array.isArray(selectedColors) && selectedColors.some((c) => c.code === color.code)}
                onChange={() => {
                  // Use the new onColorFilterChange prop from parent
                  if (onColorFilterChange) {
                    onColorFilterChange(color, !selectedColors.some((c) => c.code === color.code));
                  }
                }}
              />
            }
            label={
              <Box display="flex" alignItems="center">
                {/* Color swatch */}
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

      {/* RATINGS FILTER */}
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

      {/* CLEAR FILTERS BUTTON */}
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleClearFilters}
      >
        Clear Filters
      </Button>
    </Box>
  );
}