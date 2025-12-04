//========================================================================
// Create Product Form 1
//========================================================================

import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { H1 } from "@/components/Typography";
import { FlexBox, FlexCol } from "@/components/flex-box";
import { InfoOutlined } from "@mui/icons-material";
import { Autocomplete, TextField, Box, Card, Typography, Button, Tooltip, IconButton, Chip, Checkbox } from "@mui/material"; 
import { 
  baseColors, 
  baseSizes, 
  ageGroups, 
  genders, 
  TAG_CONFIG
} from "@/utils/product-form-constants"; 

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
    // Add state for all potential tags to be submitted, even if they aren't visible
    ar_type: initialValuesProp.ar_type || '', 
    age_group: initialValuesProp.age_group || [], 
    gender: initialValuesProp.gender || [], 
    // season: initialValuesProp.season || [], 
    // occasion: initialValuesProp.occasion || [], 
    // material: initialValuesProp.material || [],
    color: initialValuesProp.color || [], 
    // pattern: initialValuesProp.pattern || [], 
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
  
  // 👇🏼 REMOVE dedicated state for ageGroup and gender, use `values` state instead
  // const [selectedAgeGroup, setSelectedAgeGroup] = useState([]);
  // const [selectedGender, setSelectedGender] = useState([]);
  const [subcategoryDetails, setSubcategoryDetails] = useState(null);

  // --- CUSTOM PLAIN REACT HANDLERS (Replacing Formik handlers) ---

  // 1. Generic Change Handler (for SymTextFields)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error on change if it exists
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };
  
  // 2. Manual Set Value Handler (for Rich Text Editor, Autocomplete, and Tags)
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
    
    // 👇🏼 NEW CHECK: Validate required tags
    if (subcategoryDetails?.tags_required) {
      subcategoryDetails.tags_required.forEach(tag => {
        // For tags like age_group and gender, we expect an array of selected values.
        // For tags like ar_type, we expect a single string value (which is already handled by setFieldValue('productType')).
        if (['age_group', 'gender'].includes(tag)) {
          if (!currentValues[tag] || currentValues[tag].length === 0) {
            newErrors[tag] = `The '${tag.replace('_', ' ')}' tag is required for this category.`;
            isValid = false;
          }
        }
      });
    }

    setErrors(newErrors);

    if(newErrors.age_group){
      alert(newErrors.age_group);
    } else if (newErrors.gender) {
      alert(newErrors.gender);
    }

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

  const handleAddCustomSize = (finalUrl) => { // ⬅️ 1. Must accept the final URL from the dialog
    if (newSize) {
        // 2. Create the new size object including the uploaded URL
        const customSize = { 
            name: newSize, 
            sizeChartUrl: finalUrl || null, // Ensure the URL is stored
        };
        
        // 3. Update the main list of selected sizes
        setSelectedSizes((prevSelected) => [...prevSelected, customSize]);
        
        // 4. Clean up parent state for the next use
        setNewSize('');       // Reset the size name input field
        setSizeChartUrl(null); // ⬅️ CRITICAL: Reset the size chart image reference
        
        // 5. Close the dialog
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
        
        setSubcategoryDetails(data); // Storing the full response
        
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

            // --- 🆕 CRITICAL: RESET TAG VALUES FOR THE NEW CATEGORY ---
            // Reset multi-select tags to empty array
            setFieldValue('age_group', []); 
            setFieldValue('gender', []);
            setFieldValue('season', []);
            setFieldValue('occasion', []);
            setFieldValue('material', []);
            setFieldValue('color', []);
            setFieldValue('pattern', []);
            // Reset single-select tags (productType is handled below, ar_type is likely redundant)
            setFieldValue('ar_type', ''); 
            // --- END RESET ---
            
            // 🆕 1. Set loading state to true before API call

            // 🆕 1. Set loading state to true before API call
            setIsCategoryLoading(true); 
            
            
            try {
                const apiData = await fetchCategoryItems(finalCategorySlug); // Fetches and sets subcategoryDetails

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
            } finally {
                // 🆕 2. Set loading state to false after API call completes (success or failure)
                setIsCategoryLoading(false); 
            }
            

          } else {
            setSelectedCategory(null);
            categoryArray = [];
            setFieldValue('productType', 'static');
            setFieldValue('category', ""); // ✅ IMPORTANT: Clears the field value when no object is selected
          }
  };
  
    // 🆕 EFFECT TO HANDLE DEFAULT TAGS WHEN CATEGORY DETAILS ARE LOADED
    useEffect(() => {
    if (subcategoryDetails) {
        const defaults = subcategoryDetails.tag_defaults || {};
        const requiredTags = subcategoryDetails.tags_required || [];

        // Iterate over all possible multi-select tags defined in the config
        Object.keys(TAG_CONFIG).forEach(tagFieldName => {
        const config = TAG_CONFIG[tagFieldName];
        const isRequired = requiredTags.includes(tagFieldName);
        const defaultValue = defaults[tagFieldName];

        if (isRequired) {
            if (defaultValue) {
            // Attempt to find the option object based on the default value
            const defaultObject = config.options.find(opt => opt.value === defaultValue);
            if (defaultObject) {
                // Set the form value to an array containing the single default value
                setFieldValue(tagFieldName, [defaultObject.value]);
            } else {
                // Default value is invalid, clear it
                setFieldValue(tagFieldName, []);
            }
            } else {
            // Required but no default, initialize to an empty array
            setFieldValue(tagFieldName, []);
            }
        } else {
            // Not required, ensure it's cleared from state
            setFieldValue(tagFieldName, []);
        }
        });
    }
    }, [subcategoryDetails]); // Dependency on subcategoryDetails

  

    // Helper function for SymMultiSelectChip onChange (around line 385)
    const handleTagSelect = (tagFieldName, newSelectedItems) => {
        // SymMultiSelectChip returns an array of label/value objects.
        // We only want to store the values (strings) in the `values` state for submission.
        const newValues = newSelectedItems.map(item => item.value);
        setFieldValue(tagFieldName, newValues);
    };

    // Helper function to convert stored string values back to objects for SymMultiSelectChip (around line 394)
    const getSelectedTagObjects = (tagFieldName, options) => {
        return (values[tagFieldName] || [])
            .map(value => options.find(opt => opt.value === value))
            .filter(item => item); // Filter out undefined/null if a value doesn't match an option
    };

    // 🆕 EFFECT TO HANDLE DEFAULT TAGS WHEN CATEGORY DETAILS ARE LOADED
    useEffect(() => {
    if (subcategoryDetails) {
        const defaults = subcategoryDetails.tag_defaults || {};
        const requiredTags = subcategoryDetails.tags_required || [];
        
        // --- 1. Handle Gender Default ---
        if (requiredTags.includes('gender')) {
        const defaultGender = defaults.gender;
        if (defaultGender) {
            // The SymMultiSelectChip expects an array of values (strings) in the form state.
            // We find the option object to ensure it's a valid value, then store the value.
            const defaultGenderObject = genders.find(g => g.value === defaultGender);
            if (defaultGenderObject) {
            setFieldValue('gender', [defaultGenderObject.value]); // Store as an array of values (strings)
            } else {
            setFieldValue('gender', []); // Default value is invalid, so clear it
            }
        } else {
            // If required but no default, clear it to an empty array
            setFieldValue('gender', []); 
        }
        } else {
        // If not required/present, ensure it's cleared from state
        setFieldValue('gender', []); 
        }
        
        // --- 2. Handle Age Group Default ---
        if (requiredTags.includes('age_group')) {
        const defaultAgeGroup = defaults.age_group;
        if (defaultAgeGroup) {
            // Find the option object from the ageGroups array
            const defaultAgeGroupObject = ageGroups.find(g => g.value === defaultAgeGroup);
            if (defaultAgeGroupObject) {
            // Set the form value to an array containing the single default value
            setFieldValue('age_group', [defaultAgeGroupObject.value]); 
            } else {
            setFieldValue('age_group', []); // Default value is invalid, so clear it
            }
        } else {
            // If required but no default (like in your example), initialize to an empty array
            setFieldValue('age_group', []); 
        }
        } else {
        // If not required/present, ensure it's cleared from state
        setFieldValue('age_group', []);
        }
        
        // Note: You may need to add similar logic for other tags like 'season', 'occasion', etc.
        // if they can also have default values from the API.
    }
    }, [subcategoryDetails]); // Re-run when subcategory details are fetched


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
                    selectedCategory={selectedCategory}
                    error={!!errors.category}
                    helperText={errors.category}
                  />
                </FlexCol>
              

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
                        <SymMultiSelectChip
                            options={ageGroups}
                            // Use the helper function to convert stored values to objects for the chip
                            selectedItems={getSelectedTagObjects('age_group', ageGroups)}
                            // Use the helper function to convert selected objects back to values for state
                            setSelectedItems={(items) => handleTagSelect('age_group', items)}
                            label="Age group"
                            allLabel="All ages"
                            error={errors.age_group}
                        />
                    )}

                    {/* Gender Chip - Conditionally Rendered */}
                    {subcategoryDetails && subcategoryDetails.tags_required.includes('gender') && (
                        <SymMultiSelectChip
                            options={genders}
                            // Use the helper function to convert stored values to objects for the chip
                            selectedItems={getSelectedTagObjects('gender', genders)}
                            // Use the helper function to convert selected objects back to values for state
                            setSelectedItems={(items) => handleTagSelect('gender', items)}
                            label="Gender"
                            allLabel="Unisex"
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