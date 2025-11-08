//========================================================================
// Creare Product Form 1
//========================================================================

import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { H1, Paragraph } from "@/components/Typography";
import { FlexBox } from "@/components/flex-box";
import { InfoOutlined } from "@mui/icons-material";
import { Autocomplete, TextField, MenuItem, Box, Card, Typography, Button, Tooltip, IconButton, Chip, Checkbox } from "@mui/material"; 

import dynamic from "next/dynamic";
import slugify from "@/services/slugify";
import SizeDialog from './components/SizeDialog';
import ColorDialog from './components/ColorDialog';
import SymTextField from './components/SymTextField';
import SymRadioButton from './components/SymRadioButton';
import SymMultiSelectChip from './components/SymMultiSelectChip';
import SymMultiLevelSelect from './components/SymMultiLevelSelect';
import ProductVariantsTable from './components/product-variants-1';

//========================================================================

const DynamicRichTextInputBox = dynamic(
  () => import("./components/SymRichTextInputBox"),
  { 
    // This is the CRUCIAL part: prevent it from running on the server
    ssr: false, 
    // Optional: Add a placeholder while it loads on the client
    loading: () => <p>Loading editor...</p> 
  }
);

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Product Name is required!"),
  // category should be an array of strings (e.g., ['electronics', 'phones']) to satisfy array validation
  category: yup.array().min(1, "At least one category must be selected!").required("Category is required!"),
  description: yup.string().min(20, "Description must be at least 20 characters.").required("Description is required!"),
  status: yup.string().required("Status is required!"),

  // Conditional Validation for Static Products
  dimensions: yup.string().when("productType", {
    is: "static",
    then: (schema) => schema.required("Dimensions are required for Static products."),
    otherwise: (schema) => schema.notRequired(),
  }),
  // Conditional Validation for Dynamic Products
  productSizechart: yup.string().when("productType", {
    is: "dynamic",
    then: (schema) => schema.required("Sizechart is required for Dynamic products."),
    otherwise: (schema) => schema.notRequired(),
  }),
});

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

const ProductForm1 = props => {
  const { 
    initialValues: initialValuesProp, 
    handleFormSubmit,
    selectedColors,
    setSelectedColors,
    selectedSizes,
    setSelectedSizes
  } = props;

    // Enhance initialValues to include defaults for new validated fields
  const initialValues = {
    name: initialValuesProp.name || "",
    category: initialValuesProp.category || [], // Must be an array for validation
    description: initialValuesProp.description || "",
    status: initialValuesProp.status || "draft",
    productType: initialValuesProp.productType || "static", // Added for validation
    dimensions: initialValuesProp.dimensions || "",
    productSizechart: initialValuesProp.productSizechart || "",
  };

  const [chipData2, setChipData2] = useState([]);
  const [openColorDialog, setOpenColorDialog] = useState(false);
  const [openSizeDialog, setOpenSizeDialog] = useState(false); // State to handle size dialog visibility
  // selectedCategory will now hold the full path string for display
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');
  const [color, setColor] = useState('#fff');
  const [size, setSize] = useState();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);

  // ✨ NEW STATE TO STORE API RESPONSE DETAILS
  const [subcategoryDetails, setSubcategoryDetails] = useState(null);

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

  // --- Updated Function for API Request ---------
  const fetchCategoryItems = async (categorySlug) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/subcategory-items/slug/${categorySlug}`;
    
    console.log(`🚀 Fetching category items from: ${url}`);
    
    try {
        const response = await fetch(url);

        if (!response.ok) {
            // Throw a custom error with the status for easier debugging downstream
            throw new Error(`Failed to fetch category items. HTTP status: ${response.status}`);
        }

        const data = await response.json();
        
        console.log('✅ Fetched Subcategory Record:', data);

        // ✨ NEW: Store the fetched data in state
        setSubcategoryDetails(data);
        
        return data;
    } catch (error) {
        console.error('❌ Error fetching subcategory items:', error);
        // Clear the state on error
        setSubcategoryDetails(null);
        throw error; 
    }
  };
  // ---------------------------------------------

  return (
    <Formik 
      onSubmit={handleFormSubmit} 
      initialValues={initialValues} 
      validationSchema={VALIDATION_SCHEMA}
      enableReinitialize={true} 
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched 
      }) => {
        
        /**
         * Category Selection handler - Now assumes it receives an object containing id, name, path, and slug.
         * It uses the extracted categorySlug (string) to call the API.
         * @param {object | null} categoryObject { id, name, path, slug }
         */
        const handleCategorySelect = async (categoryObject) => { // ✨ MADE ASYNC
          let categoryArray = [];

          if (categoryObject && typeof categoryObject === 'object' && categoryObject.id) {

            // 1. ✨ DESTRUCTURE & EXTRACT VALUES
            const { name: categoryName, path: pathString, slug: apiSlug } = categoryObject;

            // 2. CREATE THE SLUGIFIED VERSION OF THE NAME
            const slugifiedName = slugify(categoryName);
            
            // NOTE: Using the simple slugifiedName for the API call to match the simple response slug structure.
            // const finalCategorySlug = `${slugifiedName}-${apiSlug}`; 
            const finalCategorySlug = slugifiedName;


            // Optional Check: Ensure the slug exists before proceeding.
            if (!finalCategorySlug || typeof finalCategorySlug !== 'string') {
                console.error("❌ Error: Category slug is missing or invalid in the selected object.", categoryObject);
                // Clean up Formik state and exit if slug is vital.
                setSelectedCategory(null);
                setFieldValue('category', []);
                setFieldTouched('category', true);
                return;
            }

            // 3. Extract the final category name for Formik validation (optional)
            const pathParts = pathString.split(' > ').map(p => p.trim()).filter(p => p.length > 0);
            const finalCategoryName = pathParts.pop();
            categoryArray = finalCategoryName ? [finalCategoryName] : [];

            // 4. Update local state for display
            setSelectedCategory(pathString); 
            
            // 5. **CALL API AND WAIT FOR DATA**
            console.log("🚀 Calling API with Slug:", finalCategorySlug); 
            
            try {
                const apiData = await fetchCategoryItems(finalCategorySlug); // ✨ AWAIT the data

                // 6. **POPULATE PRODUCT TYPE FIELD BASED ON AR_TYPE**
                if (apiData?.tag_defaults?.ar_type) {

                  setFieldValue('productType', arType);
                  
                } else {
                    // Default to 'static' if ar_type is missing
                    setFieldValue('productType', 'static');
                    console.log("⚠️ ar_type not found in defaults, defaulting productType to static.");
                }

            } catch (error) {
                console.error("Error setting product type after category fetch:", error);
                setFieldValue('productType', 'static'); // Default on failure
            }
            
            // 7. LOG THE OBJECT
            console.log("Selected Category Object:", categoryObject);

          } else {
            // Handle deselection or null case
            setSelectedCategory(null);
            categoryArray = [];
            setFieldValue('productType', 'static'); // Reset product type on deselection
          }

          // 8. Update Formik field value
          setFieldValue('category', categoryArray); 
          setFieldTouched('category', true);
        };

        return (
          <form onSubmit={handleSubmit}>
            {/* Main Flex Container: Stack Left Card and Status Card vertically */}
            <FlexBox flexDirection="column" gap={3} sx={{ pr: 4, position: 'relative' }}>
              
              {/*Left Card STARTS - Full Width*/}
              <Box 
                sx={{ 
                  // Removed flexBasis and flexGrow - defaults to full width
                  overflow: 'visible', 
                  position: 'relative', 
                  zIndex: 2 
                }}
              >
                <Card sx={{ p: 6, background: 'transparent' }}>
                  {/* REPLACED Grid container with FlexBox column layout. Gap defines vertical spacing. */}
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
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
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
                              <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                            </IconButton>
                          </Tooltip>
                        </Box>

                        <SymMultiLevelSelect
                          onCategorySelect={handleCategorySelect}
                          selectedCategory={selectedCategory}
                          error={!!touched.category && !!errors.category}
                          helperText={touched.category && errors.category}
                        />
                      </Box>
                    </Box>
                    
                    {/* Product Type */}
                    {values.category.length > 0 && (
                      <FlexBox alignItems="center" gap={2}>
                        <H1 sx={{ color:'#FFF' }}>
                          Product Type
                        </H1>
                        <TextField
                          InputProps={{
                            style: {
                                backgroundColor: 'white',
                                color: '#000',
                                boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)',
                                borderRadius: '8px'
                              }
                          }}
                          color="info"
                          size="medium"
                          value={values.productType}
                        />      
                      </FlexBox>
                    )}

                    {/* Dimensions */}
                    {values.productType === "static" && (
                      <Box>
                        <SymTextField
                          label="Dimensions"
                          name="dimensions"
                          placeholder="Enter dimensions"
                          value={values.dimensions}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.dimensions && !!errors.dimensions}
                          helperText={touched.dimensions && errors.dimensions}
                        />
                      </Box>
                    )}

                    {/* Product Sizechart (Conditional for Dynamic) */}
                    {values.productType === "dynamic" && (
                      <Box>
                        <SymTextField
                          label="Product Sizechart URL"
                          name="productSizechart"
                          placeholder="Enter URL to size chart document"
                          value={values.productSizechart}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.productSizechart && !!errors.productSizechart}
                          helperText={touched.productSizechart && errors.productSizechart}
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
                                <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </Box>

                          {/* Age group (Validation not required by schema, managed by local state) */}
                          <SymMultiSelectChip
                            options={ageGroups}
                            selectedItems={selectedAgeGroup}
                            setSelectedItems={setSelectedAgeGroup}
                            label="Age group"
                            allLabel="All ages"
                          />

                          {/* Gender (Validation not required by schema, managed by local state) */}
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
                        label="Description" // Corrected label from "Dimensions"
                        name="description"
                        id='rich-editor'
                        placeholder="Write your description here..."
                        value={values.description}
                        // IMPORTANT: Use setFieldValue for custom inputs
                        onChange={(content) => setFieldValue('description', content)}
                        onBlur={() => setFieldTouched('description', true)} // Manually set touched on blur
                        simple={false}
                        error={!!touched.description && !!errors.description}
                        helperText={touched.description && errors.description}
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
                              <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
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
                            options={[...baseColors.map(c => c.name), ...chipData2.map(c => c.name)]} // Include custom colors
                            value={selectedColors.map((color) => color.name)}
                            onChange={(_, newValue) => {
                              const allColors = [...baseColors, ...chipData2];
                              const updatedColors = newValue.map((name) => {
                                const colorObj = allColors.find((color) => color.name === name);
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
                            renderTags={(value, getTagProps) =>
                              selectedColors.map((option, index) => (
                                <Chip
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
                                  {...getTagProps({ index })}
                                  onDelete={getTagProps({ index }).onDelete}
                                  color="info"
                                  variant="outlined"
                                  sx={{ color: 'grey' }}
                                />
                              ))
                            }
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
                        
                        {/* Size Autocomplete */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <H1 sx={{ color: '#fff', mr: 1, minWidth: '100px' }}>Size</H1>
                          <Autocomplete
                            disableCloseOnSelect
                            multiple
                            freeSolo
                            options={baseSizes.map((option) => option.name)}
                            value={selectedSizes.map((size) => size.name)}
                            onChange={(_, newValue) => {
                              const updatedSizes = newValue.map((name) => {
                                const sizeObj = baseSizes.find((size) => size.name === name);
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
                            renderTags={(value, getTagProps) =>
                              selectedSizes.map((option, index) => (
                                <Chip
                                  label={option.name}
                                  {...getTagProps({ index })}
                                  onDelete={getTagProps({ index }).onDelete}
                                  color="info"
                                  variant="outlined"
                                  sx={{ color: 'grey' }}
                                />
                              ))
                            }
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
                  </FlexBox> {/* End FlexBox */}
                </Card>
              </Box>
              {/*Left Card ENDS*/}

              {/*STATUS CARD START - Full Width, now positioned below the main form*/}
              {/* <Box sx={{ 
                // Removed flexBasis and minWidth - defaults to full width
                position: 'relative', 
                zIndex: 1 
              }}>
                <Card
                  sx={{
                    // Removed mt: 10
                    p: 4,
                    background:
                      'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 255, 0.367354) 4.2%, rgba(224, 224, 254, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
                    boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '15px',
                  }}
                >
                  <H1 color='#FFF' fontSize={14} pb={2} >
                    Status
                  </H1>

                  <Box>
                    <TextField
                      select
                      fullWidth
                      color="info"
                      size="medium"
                      name="status"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.status}
                      label=""
                      InputProps={{ style: { backgroundColor: 'white' } }}
                      SelectProps={{ multiple: false }}
                      error={!!touched.status && !!errors.status}
                      helperText={touched.status && errors.status}
                    >
                      <MenuItem value="draft">Draft</MenuItem>
                      <Tooltip title="This option is currently disabled" arrow placement="right">
                        <span>
                          <MenuItem value="active" disabled>
                            Active
                          </MenuItem>
                        </span>
                      </Tooltip>
                    </TextField>
                  </Box>
                </Card>
              </Box> */}
              {/*STATUS CARD ENDS*/}

            </FlexBox> {/* Closed the main FlexBox wrapper */}

            {/* Custom Color Dialog */}
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
            
            {/* Custom Size Dialog */}
            <SizeDialog
              newSize={newSize}
              open={openSizeDialog}
              onClose={handleCloseSizeDialog}
              handleChangeSize={(e) => setNewSize(e.target.value)}
              handleAddCustomSize={handleAddCustomSize}
            />
          </form>
        )
      }}
    </Formik>
  );
};


export default ProductForm1;