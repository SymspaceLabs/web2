//========================================================================
// Create Product Form 1
//========================================================================

import { useState, useEffect, useImperativeHandle, forwardRef } from "react";import { H1 } from "@/components/Typography";
import { FlexBox } from "@/components/flex-box";
import { InfoOutlined } from "@mui/icons-material";
import { Autocomplete, TextField, Box, Card, Typography, Button, Tooltip, IconButton, Chip, Checkbox } from "@mui/material"; 

import dynamic from "next/dynamic";
import slugify from "@/services/slugify";
import SizeDialog from './components/SizeDialog';
import ColorDialog from './components/ColorDialog';
import SymTextField from './components/SymTextField';
import SymMultiSelectChip from './components/SymMultiSelectChip';
import SymMultiLevelSelect from './components/SymMultiLevelSelect';

//========================================================================

const DynamicRichTextInputBox = dynamic(
  () => import("./components/SymRichTextInputBox"),
  { 
    ssr: false, 
    loading: () => <p>Loading editor...</p> 
  }
);

const baseColors = [
  { name: 'Red', hex: '#f44336' },
  { name: 'Blue', hex: '#2196f3' },
  { name: 'Green', hex: '#4caf50' },
];

const baseSizes = [
  { name: 'S' },
  { name: 'M' },
  { name: 'L' },
  { name: 'XL' },
  { name: 'XXL' },
];

const ageGroups = [
  { label: '0-6 months', value:'0-6 months'   },
  { label: '6-12 months', value:'6-12 months'  },
  { label: 'Adults', value:'adults' },
  { label: 'All ages', value:'all' },
];

const genders = [
  { label: 'Male', value: 'male'   },
  { label: 'Female', value: 'female' },
  { label: 'Unisex', value: 'unisex' },
];

const ProductForm1 = forwardRef((props, ref) => {
  const { 
    initialValues: initialValuesProp, 
    handleFormSubmit,
    selectedColors,
    setSelectedColors,
    selectedSizes,
    setSelectedSizes,
  } = props;

  // 🕵️ CHILD DEBUG 1: Log Props Received from Parent
  useEffect(() => {
  }, [selectedColors, selectedSizes]);

  // ➡️ 1. NEW LOGIC TO CONSTRUCT THE INITIAL PATH FROM NESTED DATA ⬅️
  const getInitialCategoryPath = (initialData) => {
      // Fallback 1: If categoryPath is directly provided
      if (initialData.categoryPath) {
          return initialData.categoryPath;
      }

      // Fallback 2: Construct path from nested data (used upon page refresh/edit load)
      const item = initialData.subcategoryItem;
      const sub = item?.subcategory;
      const cat = sub?.category;

      if (cat && sub && item) {
          // Path structure: Category > Subcategory > SubcategoryItem
          return `${cat.name} > ${sub.name} > ${item.name}`;
      }
      
      // Fallback 3: Use the raw category value (e.g., the ID/slug) or null
      return initialData.category || null;
  };

  // Use the new function to derive the correct starting value for the display field
  const initialCategoryValue = getInitialCategoryPath(initialValuesProp);

  // --- LOCAL STATE FOR FORM DATA AND ERRORS (Formik replacements) ---
  const [values, setValues] = useState(() => ({
    name: initialValuesProp.name || "",
    category: initialValuesProp.subcategoryItem?.id || initialValuesProp.category || "",
    description: initialValuesProp.description || "",
    status: initialValuesProp.status || "draft",
    productType: initialValuesProp.productType || "static",
    productSizechart: initialValuesProp.productSizechart || "",
  }));
  const [errors, setErrors] = useState({});

  // --- ADDITIONAL NON-FORM STATE ---
  const [chipData2, setChipData2] = useState([]);
  const [openColorDialog, setOpenColorDialog] = useState(false);
  const [openSizeDialog, setOpenSizeDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryValue);
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');
  const [sizeChartUrl, setSizeChartUrl] = useState('');
  const [color, setColor] = useState('#fff');
  const [size, setSize] = useState();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [subcategoryDetails, setSubcategoryDetails] = useState(null);

  // --- CUSTOM PLAIN REACT HANDLERS (Replacing Formik handlers) ---

  // 1. Generic Change Handler (for SymTextFields)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error on change if it exists
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };
  
  // 2. Manual Set Value Handler (for Rich Text Editor, Autocomplete)
  const setFieldValue = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error on change if it exists
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };
  
  // 3. Blur Handler (Runs validation on blur)
  const handleBlur = () => {
    // Run validation on the current values when a field loses focus
    validateForm(values);
  };

  // 4. IMPERATIVE VALIDATION LOGIC
  // Now takes currentValues as an argument (or uses the state `values`)
  const validateForm = (currentValues) => {
    let newErrors = {};
    let isValid = true;

    // CHECK: Product Name is required
    if (!currentValues.name || currentValues.name.trim() === '') {
      newErrors.name = "Product Name is required!";
      isValid = false;
    }

    // ✅ NEW CHECK: Product Category is required (Check for the ID)
    if (!currentValues.category || currentValues.category === '') {
      newErrors.category = "Product Category is required!";
      isValid = false;
    }

    // NOTE: You can add conditional checks for dimensions/sizechart here if needed

    setErrors(newErrors);
    return isValid;
  };
  
  // 5. EXPOSE METHODS TO PARENT VIA REF
  useImperativeHandle(ref, () => ({
    getFormValues: () => values,

    // No Formik validation needed, the exposed function simply checks validity
    validateForm: () => {
      // Just run the validation check
      return validateForm(values);
    },

    /**
     * Submit the form programmatically (Called by parent's handleNext)
     */
    submit: () => {
      
      const isValid = validateForm(values);
      
      if (isValid) {
        // ✅ PASS THE LATEST VALUES BACK TO THE PARENT
        handleFormSubmit(values); 
      }
    }
  }));

  //COLOR
  const handleOpenColorDialog = () => setOpenColorDialog(true);

  const handleCloseColorDialog = () => {
    setOpenColorDialog(false);
    setNewColor('');
    setColor('#ffffff');
  };
  
  const handleAddCustomColor = () => {
    if (newColor && color) {
      const customColor = { name: newColor, hex: color };
      setChipData2((prevChipData) => [
        ...prevChipData,
        customColor
      ]);
      setSelectedColors((prevSelected) => [
        ...prevSelected,
        customColor
      ]);
      handleCloseColorDialog();
    }
  };

  const handleColorChange = (newColor) => setColor(newColor);

  //SIZE
  const handleOpenSizeDialog = () => setOpenSizeDialog(true);

  const handleCloseSizeDialog = () => {
    setOpenSizeDialog(false);
    setNewSize('');
  };

  const handleAddCustomSize = () => {
    if (newSize) {
      const customSize = { name: newSize };
      setSelectedSizes((prevSelected) => [...prevSelected, customSize]);
      handleCloseSizeDialog();
    }
  };

  const fetchCategoryItems = async (categorySlug) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/subcategory-items/slug/${categorySlug}`;
    
    
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch category items. HTTP status: ${response.status}`);
        }

        const data = await response.json();
        
        setSubcategoryDetails(data);
        
        return data;
    } catch (error) {
        console.error('❌ Error fetching subcategory items:', error);
        setSubcategoryDetails(null);
        throw error; 
    }
  };
  
  const handleCategorySelect = async (categoryObject) => {
          let categoryArray = [];

          if (categoryObject && typeof categoryObject === 'object' && categoryObject.id) {
            const { name: categoryName, path: pathString, slug: apiSlug } = categoryObject;
            const slugifiedName = slugify(categoryName);
            const finalCategorySlug = slugifiedName;

            if (!finalCategorySlug || typeof finalCategorySlug !== 'string') {
                console.error("❌ Error: Category slug is missing or invalid in the selected object.", categoryObject);
                setSelectedCategory(null);
                setFieldValue('category', ""); // ⬅️ Ensures 'category' is cleared
                // setFieldTouched('category', true);
                return;
            }

            const pathParts = pathString.split(' > ').map(p => p.trim()).filter(p => p.length > 0);
            const finalCategoryName = pathParts.pop();
            categoryArray = finalCategoryName ? [finalCategoryName] : [];

            setSelectedCategory(pathString); 
            
            
            try {
                const apiData = await fetchCategoryItems(finalCategorySlug);

                if (apiData?.tag_defaults?.ar_type) {
                  const arType = apiData.tag_defaults.ar_type;
                  setFieldValue('productType', arType);
                  setFieldValue('category', apiData?.id); // ✅ SETS THE ID ON SUCCESS
                } else {
                    setFieldValue('productType', 'static');
                    setFieldValue('category', apiData?.id); // ✅ Still set the ID even if no AR type
                }

            } catch (error) {
                console.error("Error setting product type after category fetch:", error);
                setFieldValue('productType', 'static');
                setFieldValue('category', ""); // ⬅️ Clear 'category' on API failure
            }
            

          } else {
            setSelectedCategory(null);
            categoryArray = [];
            setFieldValue('productType', 'static');
            setFieldValue('category', ""); // ✅ IMPORTANT: Clears the field value when no object is selected
          }

          // setFieldValue('subcategoryItem', categoryArray); 
          // setFieldTouched('category', true);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); /* Ensure no accidental submission */ }}>
      <FlexBox flexDirection="column" gap={3} sx={{ pr: 4, position: 'relative' }}>
        
        <Box sx={{ overflow: 'visible', position: 'relative', zIndex: 2 }}>
          <Card sx={{ p: 6, background: 'transparent' }}>
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

              {/* Category */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap:2  }}>
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
                    selectedCategory={selectedCategory}
                    error={!!errors.category}
                    helperText={errors.category}
                  />
                </Box>
              </Box>
              
              {/* Product Type */}
              {/* {values.category.length > 0 && (
                <FlexBox alignItems="center" gap={2}>
                  <H1 sx={{ color:'#FFF' }}>
                    Product Type
                  </H1>
                  <TextField
                    InputProps={{
                      readOnly: true, 
                      style: {
                        backgroundColor: 'white',
                        color: '#000',
                        boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)',
                        borderRadius: '8px',
                        pointerEvents: 'none', 
                      }
                    }}
                    color="info"
                    size="medium"
                    value={values.productType}
                  />
                </FlexBox>
              )} */}

              {/* Dimensions */}
              {/* {values.productType === "static" && (
                <Box>
                  <SymTextField
                    label="Dimensions"
                    name="dimensions"
                    placeholder="Enter dimensions"
                    value={values.dimensions}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!errors.dimensions}
                    helperText={errors.dimensions}
                  />
                </Box>
              )} */}

              {/* Product Sizechart */}
              {values.productType === "dynamic" && (
                <Box>
                  <SymTextField
                    label="Product Sizechart URL"
                    name="productSizechart"
                    placeholder="Enter URL to size chart document"
                    value={values.productSizechart}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!errors.productSizechart}
                    helperText={errors.productSizechart}
                  />
                </Box>
              )}

              {/* Category Tags */}
              {selectedCategory && (
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

                    <SymMultiSelectChip
                      options={ageGroups}
                      selectedItems={selectedAgeGroup}
                      setSelectedItems={setSelectedAgeGroup}
                      label="Age group"
                      allLabel="All ages"
                    />

                    <SymMultiSelectChip
                      options={genders}
                      selectedItems={selectedGender}
                      setSelectedItems={setSelectedGender}
                      label="Gender"
                      allLabel="Unisex"
                    />
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
                          const currentOptions = [...baseColors.map(c => c.name), ...chipData2.map(c => c.name)];
                          return currentOptions;
                      })()}
                      
                      // 🔍 DEBUG POINT 2: Check the value array being passed (should be an array of strings)
                      value={(() => {
                          const currentValue = selectedColors.map((color) => color.name);
                          return currentValue;
                      })()}                      
                      onChange={(_, newValue) => {
                          // 🔍 DEBUG POINT 3: Check what the user selected or removed
                          
                          const allColors = [...baseColors, ...chipData2];
                          const updatedColors = newValue.map((name) => {
                              const colorObj = allColors.find((color) => color.name === name);
                              // 🔍 DEBUG POINT 3A: Check if the color object was found in the source lists
                              if (!colorObj) {
                                  console.warn(`🕵️ DEBUG 3A: Color object not found for name: ${name}`);
                              }
                              return colorObj || { name, hex: '' };
                          });
                          setSelectedColors(updatedColors);
                      }}
                      
                      renderOption={(props, option, { selected }) => (
                          <li {...props}>
                              <Checkbox checked={selected} style={{ marginRight: 8 }} />
                              {option}
                          </li>
                      )}
                      
                      // You can also place a log here to confirm the selectedColors state is populated correctly
                      // renderTags={(value, getTagProps) => {
                      //     // 🔍 DEBUG POINT 4: Check the final array used to render the chips

                      //     return selectedColors.map((option, index) => (
                      //         <Chip
                      //             label={(
                      //                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      //                     <Box
                      //                         sx={{
                      //                             width: 18, height: 18, borderRadius: '50%', marginRight: 1,
                      //                             bgcolor: option.hex || 'transparent',
                      //                             border: option.hex ? 'none' : '1px solid grey'
                      //                         }}
                      //                     />
                      //                     {option.name}
                      //                 </Box>
                      //             )}
                      //             {...getTagProps({ index })}
                      //             onDelete={getTagProps({ index }).onDelete}
                      //             color="info"
                      //             variant="outlined"
                      //             sx={{ color: 'grey' }}
                      //         />
                      //     ))
                      // }}
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
                              if (!sizeObj) {
                                  console.warn(`🕵️ SIZE DEBUG 3A: Size object not found for name: ${name}`);
                              }
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
          </Card>
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
        handleChangeSizeChartUrl={(e) => setSizeChartUrl(e.target.value)}
      />
    </form>
  )
});

export default ProductForm1;