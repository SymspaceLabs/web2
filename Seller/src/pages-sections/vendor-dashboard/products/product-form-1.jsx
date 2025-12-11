//========================================================================
// Create Product Form 1
//========================================================================

import { 
  useState, 
  useMemo, 
  useEffect, 
  useImperativeHandle, 
  forwardRef, 
  useCallback 
} from "react";
import { H1 } from "@/components/Typography";
import { FlexBox, FlexCol } from "@/components/flex-box";
import { InfoOutlined } from "@mui/icons-material";
import { Autocomplete, TextField, Box, Typography, Button, Tooltip, IconButton, Chip, Checkbox } from "@mui/material"; 
import { 
  baseColors, 
  baseSizes, 
  ageGroups, 
  genders
} from "@/utils/product-form-constants"; 

import dynamic from "next/dynamic";
import SizeDialog from './components/SizeDialog';
import ColorDialog from './components/ColorDialog';
import SymTextField from './components/SymTextField';
import SymMultiSelectChip from './components/SymMultiSelectChip';
import SymMultiLevelSelect from './components/SymMultiLevelSelect';
import SymSingleSelectDropdown from "./components/SymSingleSelectDropdown";

import { useCategoryLogic } from "@/hooks/useCategoryLogic";
import { useProductFormState } from "@/hooks/useProductFormState";
import { useSizeColorDialogs } from "@/hooks/useSizeColorDialogs"; // NOTE: Implementation assumed/needed

//========================================================================

const DynamicRichTextInputBox = dynamic(
  () => import("./components/SymRichTextInputBox"),
  { 
    ssr: false, 
    loading: () => <p>Loading editor...</p> 
  }
);

const ProductForm1 = forwardRef((props, ref) => {
  const { 
    initialValues: initialValuesProp, 
    handleFormSubmit,
    selectedColors,
    setSelectedColors,
    selectedSizes,
    setSelectedSizes,
    setIsCategoryLoading
  } = props;

  // 🆕 Manage subcategoryDetails at the parent level
  const [subcategoryDetails, setSubcategoryDetails] = useState(null);

  // --- 1. CORE FORM STATE ---
  const { 
      values, 
      errors, 
      handleChange, 
      setFieldValue,
      handleBlur,
      initialCategoryValue,
      validateForm
  } = useProductFormState(
      initialValuesProp, 
      handleFormSubmit, 
      ref, 
      subcategoryDetails // ✅ Now properly passed
  );

  // ✅ CRITICAL: These must be memoized with empty dependency arrays if the functions are stable
  const stableSetFieldValue = useCallback(
    (name, value) => setFieldValue(name, value), 
    [] // ✅ Empty if setFieldValue from useProductFormState is stable
  );

  const stableSetIsCategoryLoading = useCallback(
    (loading) => setIsCategoryLoading(loading), 
    [] // ✅ Empty if setIsCategoryLoading from props is stable
  );

  const stableSetSubcategoryDetails = useCallback(
    (details) => setSubcategoryDetails(details), 
    [] // ✅ Empty - setState functions are always stable
  );

  // --- 2. CATEGORY LOGIC ---
  const {
      handleCategorySelect,
      selectedCategory
  } = useCategoryLogic(
    initialValuesProp,
    stableSetFieldValue,
    stableSetIsCategoryLoading,
    stableSetSubcategoryDetails,
    ageGroups, 
    genders, 
    values
  );

  // --- 3. DIALOG LOGIC (Consolidated Color/Size) ---
  // NOTE: Assuming this hook is correctly implemented or stubbed with the provided logic
  const {
    openColorDialog,
    openSizeDialog,
    handleOpenColorDialog,
    handleCloseColorDialog,
    handleAddCustomColor,
    handleColorChange,
    handleOpenSizeDialog,
    handleCloseSizeDialog,
    handleAddCustomSize,
    newColor,
    setNewColor,
    color,
    setColor,
    newSize,
    setNewSize,
    sizeChartUrl,
    setSizeChartUrl,
  } = useSizeColorDialogs(setSelectedColors, setSelectedSizes, selectedColors); 

  // Helper function to convert stored string values back to objects for SymMultiSelectChip
  const getSelectedTagObjects = (tagFieldName, options) => {
    return (values[tagFieldName] || [])
        .map(value => options.find(opt => opt.value === value))
        .filter(item => item);
  };

  // 5. EXPOSE METHODS TO PARENT VIA REF
  // This is handled inside useProductFormState, ensuring the latest values are used.

  return (
    <form onSubmit={(e) => { e.preventDefault(); /* Ensure no accidental submission */ }}>
      <FlexBox flexDirection="column" gap={3} sx={{ pr: 4, position: 'relative' }}>
        
        <Box sx={{ overflow: 'visible', position: 'relative', zIndex: 2 }}>
          <Box sx={{ p: 6, background: 'transparent' }}>
            <FlexBox flexDirection="column" gap={4}> 

              {/* Product Name */}
              <Box>
                <SymTextField
                  label="Product Name"
                  name="name"
                  placeholder="Enter product name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Box>

              {/* Product URL */}
              <Box>
                <SymTextField
                  label="Product Url"
                  name="productUrl"
                  placeholder="Enter product url"
                  value={values.productUrl}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!errors.productUrl}
                  helperText={errors.productUrl}
                />
              </Box>

              {/* Category */}
              <FlexCol sx={{ gap:1  }}>
                <Box sx={{ display: 'flex', alignItems: 'center', minWidth:'250px' }}>
                  <H1  color='#FFF'>
                    Product Category 
                  </H1>
                  <Tooltip title="Choose a category for the product">
                    <IconButton>
                      <InfoOutlined sx={{ color: '#fff', fontSize: 10 }} />
                    </IconButton>
                  </Tooltip>
                </Box>

                <SymMultiLevelSelect
                  onCategorySelect={handleCategorySelect}
                  selectedCategory={selectedCategory || initialCategoryValue}
                  error={!!errors.category}
                  helperText={errors.category}
                />
              </FlexCol>
              

              {/* Category Tags */}
              {subcategoryDetails && (subcategoryDetails.tags_required.includes('age_group') ||  subcategoryDetails.tags_required.includes('gender')) && (
                <Box>
                  <FlexBox gap={1} flexDirection="column">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <H1 color='#FFF' mr={1}>
                        Category Tags
                      </H1>
                      <Tooltip title="Choose tags to refine the product category">
                        <IconButton>
                          <InfoOutlined sx={{ color: '#fff', fontSize: 10 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    {/* Age Group Chip - Conditionally Rendered */}
                    {subcategoryDetails && subcategoryDetails.tags_required.includes('age_group') && (
                        <SymSingleSelectDropdown // 👈 Using the new component
                            label="Age Group"
                            placeholder="Select Applicable Age Group"
                            options={ageGroups} // Assume ageGroups = [{ label: 'Adult', value: 'ADULT' }, ...]
                            // Find the currently selected object based on the stored value (string)
                            selectedItem={ageGroups.find(opt => opt.value === values.age_group) || null} 
                            // Handle the single item selection
                            setSelectedItem={(newSelectedItem) => {
                                // Extract the single value (string) from the selected object
                                const newValue = newSelectedItem ? newSelectedItem.value : null;
                                setFieldValue('age_group', newValue); // Set the form field to the single value (string or null)
                            }}
                            onBlur={handleBlur}
                            error={errors.age_group} // You may want to update validation for single selection
                        />
                    )}

                    {/* Gender Chip - Conditionally Rendered */}
                    {subcategoryDetails && subcategoryDetails.tags_required.includes('gender') && (
                        <SymMultiSelectChip
                            label="Gender"
                            placeholder="Select Applicable Gender"
                            options={genders}
                            selectedItems={getSelectedTagObjects('gender', genders)} 
                            setSelectedItems={(newSelectedObjects) => {
                                const newValues = newSelectedObjects.map(item => item.value);
                                setFieldValue('gender', newValues);
                            }}
                            onBlur={handleBlur}
                            error={errors.gender}
                        />
                    )}

                  </FlexBox>
                </Box>
              )}

              {/* Description */}
              <Box>
                <DynamicRichTextInputBox
                  label="Description"
                  name="description"
                  id='rich-editor'
                  placeholder="Write your description here..."
                  value={values.description}
                  onChange={(content) => setFieldValue('description', content)}
                  onBlur={handleBlur}
                  simple={false}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Box>

              {/* Product Variant */}
              <Box>
                <FlexBox gap={1} flexDirection="column">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography color='#FFF'>
                      Product Variant
                    </Typography>
                    <Tooltip title="Define product variations (Colors and Sizes)">
                      <IconButton>
                        <InfoOutlined sx={{ color: '#fff', fontSize: 10 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                
                  {/* Color */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <H1 color='#FFF' mr={1} minWidth='100px'>Color</H1>
                    <Autocomplete
                      disableCloseOnSelect
                      multiple
                      freeSolo
                      // 🔍 DEBUG POINT 1: Check the list of available options
                      options={(() => {
                          // FIX: Use selectedColors (which holds custom colors) instead of chipData2
                          const customColorNames = selectedColors
                            .filter(c => !baseColors.some(bc => bc.name === c.name))
                            .map(c => c.name);

                          const currentOptions = [
                                ...baseColors.map(c => c.name), 
                                ...customColorNames
                            ];
                            // Ensure only unique names are in the options list
                          return [...new Set(currentOptions)]; 
                      })()}
                      
                      // 🔍 DEBUG POINT 2: Check the value array being passed (should be an array of strings)
                      value={(() => {
                          const currentValue = selectedColors.map((color) => color.name);
                          return currentValue;
                      })()}                      
                      onChange={(_, newValue) => {
                          // Combine base colors and currently selected colors for the lookup source
                          const allColors = [...baseColors, ...selectedColors]; 

                          const updatedColors = newValue.map((name) => {
                              // Search for the object in the combined list
                              const colorObj = allColors.find((color) => color.name === name);
                              
                              return colorObj || { name, hex: '' }; // Return the object or a placeholder for new freeSolo entry
                          });
                          setSelectedColors(updatedColors);
                      }}
                      
                      renderOption={(props, option, { selected }) => (
                          <li {...props}>
                              <Checkbox checked={selected} style={{ marginRight: 8 }} />
                              {option}
                          </li>
                      )}
                      
                      renderTags={(chipNames, getTagProps) => { // Renamed 'value' to 'chipNames' for clarity
                        
                        // 1. Iterate over the array of strings (chipNames) provided by Autocomplete.
                        return chipNames.map((name, index) => {
                            
                            // 2. Find the full color object from your state using the name.
                            const option = selectedColors.find(color => color.name === name) || { name, hex: 'transparent' };
                            
                            // 3. Now render the Chip using the rich 'option' object.
                            return (
                                <Chip
                                    key={name} // Use the name as the key
                                    label={(
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box
                                                sx={{
                                                    width: 18, height: 18, borderRadius: '50%', marginRight: 1,
                                                    bgcolor: option.hex || 'transparent',
                                                    border: option.hex ? 'none' : '1px solid grey'
                                                }}
                                            />
                                            {option.name}
                                        </Box>
                                    )}
                                    // getTagProps uses the index of the Autocomplete's internal value array (chipNames)
                                    {...getTagProps({ index })} 
                                    onDelete={getTagProps({ index }).onDelete}
                                    color="info"
                                    variant="outlined"
                                    sx={{ color: 'grey' }}
                                />
                            );
                        });
                    }}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Select Colors"
                              sx={{ width: '500px' }}
                              InputProps={{ ...params.InputProps, style: { backgroundColor: 'white' } }}
                              InputLabelProps={{ style: { color: 'black' } }}
                          />
                      )}
                  />
                    <Button
                      onClick={handleOpenColorDialog}
                      sx={{
                        color: '#fff', padding: '5px 20px', width: '210px',
                        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)',
                        boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(50px)', borderRadius: '12px',
                      }}
                    >
                      Custom Color
                    </Button>
                  </Box>
                  
                  {/* Size */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <H1 sx={{ color: '#fff', mr: 1, minWidth: '100px' }}>Size</H1>
                    <Autocomplete
                      disableCloseOnSelect
                      multiple
                      freeSolo
                      
                      // 🔍 DEBUG 1: Check the list of available size options (should contain base sizes + API-loaded sizes for edit)
                      options={(() => {
                          // FIX: Ensure API-loaded sizes are included in options when in edit mode
                          const allSizes = [...baseSizes.map((option) => option.name), ...selectedSizes.map((size) => size.name)];
                          const uniqueSizeOptions = [...new Set(allSizes)];
                          
                          return uniqueSizeOptions;
                      })()}
                      
                      // 🔍 DEBUG 2: Check the current value being passed (should be an array of size names/strings)
                      value={(() => {
                          const currentValue = selectedSizes.map((size) => size.name);
                          return currentValue;
                      })()}
                      
                      onChange={(_, newValue) => {
                          // 🔍 DEBUG 3: Check what the user selected or removed
                          
                          const updatedSizes = newValue.map((name) => {
                              // Need to search across baseSizes AND any existing selectedSizes (if it was a custom size)
                              const allSources = [...baseSizes, ...selectedSizes]; 
                              const sizeObj = allSources.find((size) => size.name === name);
                              
                              // 🔍 DEBUG 3A: Check if the size object was found in the source lists
                              return sizeObj || { name };
                          });
                          setSelectedSizes(updatedSizes);
                      }}
                      
                      renderOption={(props, option, { selected }) => (
                          <li {...props}>
                              <Checkbox checked={selected} style={{ marginRight: 8 }} />
                              {option}
                          </li>
                      )}
                      
                      renderTags={(value, getTagProps) => {
                          // 🔍 DEBUG 4: Check the final array used to render the chips (should be objects: [{ name: 'S' }])
                          
                          return selectedSizes.map((option, index) => (
                              <Chip
                                  label={option.name}
                                  {...getTagProps({ index })}
                                  onDelete={getTagProps({ index }).onDelete}
                                  color="info"
                                  variant="outlined"
                                  sx={{ color: 'grey' }}
                              />
                          ))
                      }}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Select Sizes"
                              sx={{ width: '500px' }}
                              InputProps={{ ...params.InputProps, style: { backgroundColor: 'white' } }}
                              InputLabelProps={{ style: { color: 'black' } }}
                          />
                      )}
                    />
                    <Button
                      onClick={handleOpenSizeDialog}
                      sx={{
                        color: '#fff', padding: '5px 20px', width: '210px',
                        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)',
                        boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(50px)', borderRadius: '12px',
                      }}
                    >
                      Add Size
                    </Button>
                  </Box>
                </FlexBox>
              </Box>
            </FlexBox>
          </Box>
        </Box>
      </FlexBox>

      {/* Dialogs */}
      <ColorDialog
        color={color}
        setColor={setColor}
        open={openColorDialog}
        onClose={handleCloseColorDialog}
        newColor={newColor}
        onChangeColor={(e) => setNewColor(e.target.value)}
        handleColorChange={handleColorChange}
        handleCloseColorDialog={handleCloseColorDialog}
        handleAddCustomColor={handleAddCustomColor}
      />
      
      <SizeDialog
        newSize={newSize}
        sizeChartUrl={sizeChartUrl}
        open={openSizeDialog}
        onClose={handleCloseSizeDialog}
        handleChangeSize={(e) => setNewSize(e.target.value)}
        handleAddCustomSize={handleAddCustomSize}
        handleChangeSizeChartUrl={(file) => setSizeChartUrl(file)}
      />
    </form>
  )
});

export default ProductForm1;