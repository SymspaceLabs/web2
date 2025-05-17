"use client";

// =================================================================
// Product Filter Card
// =================================================================

import { Fragment, useState, useEffect  } from "react";
import {
  Box,
  TextField,
  Slider,
  Checkbox,
  Rating,
  Divider,
  Collapse,
  FormControlLabel,
  Button,
} from "@mui/material";

import { FlexBetween, FlexBox } from "@/components/flex-box";
import { H5, H6, Paragraph, Span } from "@/components/Typography";
import AccordionHeader from "@/components/accordion/accordion-header";
import CATEGORIES_DATA from "@/data/categories";

// =================================================================

const otherOptions = ["On Sale", "In Stock", "Featured"];
const colorList = ["#1C1C1C", "#FF7A7A", "#FFC672", "#84FFB5", "#70F6FF", "#6B7AFF"];

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
  setSelectedGenders,
}) {

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleClearFilters = () => {
    setSelectedGenders([]);        // ← clear gender
    setSelectedBrands([]);
    setCheckedCategoryIds([]);
    setPriceRange(priceLimits);
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
              label={<Span>{g}</Span>}
              control={
                <Checkbox
                  size="small"
                  checked={isChecked}
                  onChange={() => {
                    setSelectedGenders(prev =>
                      isChecked
                        ? prev.filter(x => x !== g)
                        : [...prev, g]
                    );
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

      {/* SALES OPTIONS */}
      {otherOptions.map((item) => (
        <FormControlLabel
          key={item}
          sx={{ display: "flex" }}
          label={<Span color="inherit">{item}</Span>}
          control={<Checkbox size="small" color="secondary" />}
        />
      ))}

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

      {/* COLORS VARIANT FILTER */}
      <H6 mb={2}>Colors</H6>
      <FlexBox mb={2} flexWrap="wrap" gap={1}>
        {colorList.map((item) => (
          <Box
            key={item}
            width={25}
            height={25}
            flexShrink={0}
            bgcolor={item}
            borderRadius="50%"
            sx={{ cursor: "pointer" }}
          />
        ))}
      </FlexBox>

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

const CategoryAccordion = ({ data, setCheckedCategoryIds }) => {
  const [checkedMap, setCheckedMap] = useState({});

  useEffect(() => {
    const selectedIds = Object.entries(checkedMap)
      .filter(([, checked]) => checked)
      .map(([id]) => id);
    setCheckedCategoryIds(selectedIds);
  }, [checkedMap, setCheckedCategoryIds]);

  const onCheck = (itemId) => {
    setCheckedMap(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const renderCategory = (categories) =>
    categories.map((cat) => {
      const catKey = `cat-${cat.id}`;

      return (
        <Fragment key={catKey}>
          {/* Always show category header (optional click handler) */}
          <AccordionHeader
            open={true} // always open
            sx={{ pl: 0 }}
          >
            <Span sx={{ fontWeight: 'bold' }}>{cat.title}</Span>
          </AccordionHeader>

          {/* Always show subcategories */}
          <Collapse in={true}>
            {cat.subCategory.map((sub) => {
              const subKey = `sub-${sub.subcategoryItem.id}`;
              return (
                <FormControlLabel
                  key={subKey}
                  sx={{ pl: 3 }}
                  control={
                    <Checkbox
                      checked={!!checkedMap[sub.subcategoryItem.id]}
                      onChange={() => onCheck(sub.subcategoryItem.id)}
                      size="small"
                    />
                  }
                  label={sub.subcategoryItem.name}
                />
              );
            })}
          </Collapse>
        </Fragment>
      );
    });

  return <>{renderCategory(data)}</>;
};