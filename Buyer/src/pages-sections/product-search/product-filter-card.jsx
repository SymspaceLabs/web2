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
import { CategoryAccordion } from "./category-accordion";

// =================================================================

export default function ProductFilterCard({
  allBrands,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  priceLimits,
  category,
  setCheckedCategoryIds,
  allGenders,
  selectedGenders,
  onGenderFilterChange,
  allAvailabilities,
  selectedAvailabilities,
  setSelectedAvailabilities,
  allColors,
  selectedColors,
  setSelectedColors,
}) {

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleClearFilters = () => {
    // Call the onGenderFilterChange to clear gender filters via the parent
    if (onGenderFilterChange) {
      onGenderFilterChange('', false); // Pass empty string or appropriate value to signify clearing all genders
    }
    // setSelectedGenders([]);
    setSelectedBrands([]);
    setCheckedCategoryIds([]);
    setSelectedColors([]);
    setPriceRange(priceLimits);
  };

  const handleToggle = (color) => {
    const exists = selectedColors.some((c) => c.code === color.code);
    if (exists) {
      setSelectedColors(selectedColors.filter((c) => c.code !== color.code));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  return (
    <Box pt={{sm:7}}>

      {/* GENDER FILTER */}
      <H6 mb={1.25}>Gender</H6>
      <Box display="flex" flexDirection="column">
        {allGenders.map((g) => {
          const isChecked = selectedGenders.includes(g);
          return (
            <FormControlLabel
              key={g}
              label={<Span>{g.charAt(0).toUpperCase() + g.slice(1)}</Span>}
              control={
                <Checkbox
                  size="small"
                  checked={isChecked} // Checked state comes directly from selectedGenders prop
                  onChange={() => {
                    // <--- IMPLEMENTATION POINT: Call the new prop here
                    if (onGenderFilterChange) {
                      // Pass the current gender value (g) and the new checked state (!isChecked)
                      onGenderFilterChange(g, !isChecked);
                    }
                  }}
                />
              }
            />
          );
        })}
      </Box>
      {/* <Box display="flex" flexDirection="column">
        {allGenders.map((g) => {
          const isChecked = selectedGenders.includes(g);
          return (
            <FormControlLabel
              key={g}
              label={<Span>{g.charAt(0).toUpperCase() + g.slice(1)}</Span>}
              control={
                <Checkbox
                  size="small"
                  checked={selectedGenders.includes(g)}
                  // checked={isChecked}
                  onChange={() => {
                    setSelectedGenders(prev =>
                      prev.includes(g)
                        ? prev.filter(x => x !== g)
                        : [...prev, g]
                    );
                  }}
                />
              }
            />
          );
        })}
      </Box> */}

      <Box component={Divider} my={3} />

      {/* CATEGORY VARIANT FILTER */}
      <H6 mb={1.25}>Categories</H6>

      <CategoryAccordion
        data={category}
        setCheckedCategoryIds={setCheckedCategoryIds}
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

      {/* BRAND VARIANT FILTER */}
      <H6 mb={2}>Brands</H6>
      {allBrands.map((item,index) => {
        const isChecked = selectedBrands.some(brand => brand.id === item.id);

        const handleBrandChange = () => {
          if (isChecked) {
            setSelectedBrands(selectedBrands.filter(brand => brand.id !== item.id));
          } else {
            setSelectedBrands([...selectedBrands, item]);
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

      {/* CATEGORY VARIANT FILTER */}
      <H6 mb={1.25}>Availability</H6>
      <Box display="flex" flexDirection="column">
        {allAvailabilities.map((avail) => {
          const isChecked = selectedAvailabilities.includes(avail)
          return (
            <FormControlLabel
              key={avail}
              label={<Span color="inherit">{avail}</Span>}
              control={
                <Checkbox
                  size="small"
                  checked={isChecked}
                  onChange={() => {
                    setSelectedAvailabilities(prev =>
                      isChecked
                        ? prev.filter(x => x !== avail)
                        : [...prev, avail]
                    )
                  }}
                />
              }
            />
          )
        })}
      </Box>


      <Box component={Divider} my={3} />

      {/* COLORS VARIANT FILTER */}
      <H6 mb={2}>Colors</H6>
      <FormGroup>
        {allColors.map((color) => (
          <FormControlLabel
            key={color.code}
            control={
              <Checkbox
                checked={selectedColors.some((c) => c.code === color.code)}
                onChange={() => handleToggle(color)}
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