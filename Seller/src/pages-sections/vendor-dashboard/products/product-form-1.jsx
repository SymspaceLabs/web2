import React, { useState } from "react";
import { Autocomplete, TextField, MenuItem, Box, Card, Typography, Button, Grid, Tooltip, IconButton, Chip, Dialog, DialogTitle,  DialogContent, DialogActions, Checkbox } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { FlexBox } from "../../../components/flex-box";
import ProductVariantsTable from './components/product-variants-1';
import SymTextField from './components/SymTextField';
import SymRadioButton from './components/SymRadioButton';
import SymRichTextInputBox from './components/SymRichTextInputBox';
import SymMultiSelectChip from './components/SymMultiSelectChip';
import SymMultiLevelSelect from './components/SymMultiLevelSelect';
import ColorDialog from './components/ColorDialog';
import SizeDialog from './components/SizeDialog';

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required!"),
  category: yup.array().min(1).required("Category is required!"),
  description: yup.string().required("Description is required!"),
  status: yup.string().required("Status is required!")
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
  const { initialValues, handleFormSubmit } = props;

  const [chipData2, setChipData2] = useState([]);
  const [openColorDialog, setOpenColorDialog] = useState(false);
  const [openSizeDialog, setOpenSizeDialog] = useState(false); // State to handle size dialog visibility
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');
  const [color, setColor] = useState('#fff');
  const [size, setSize] = useState();
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Store the selected category in state
    console.log("Selected category:", category); // You can log it or perform other actions
  };

  //COLOR
  const handleOpenColorDialog = () => {
    setOpenColorDialog(true);
  };

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
      // Also update selectedColors for Autocomplete
      setSelectedColors((prevSelected) => [
        ...prevSelected,
        customColor
      ]);
      handleCloseColorDialog();
    }
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  //SIZE
  const handleOpenSizeDialog = () => {
    setOpenSizeDialog(true);
  };
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

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={VALIDATION_SCHEMA}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{pr: 4}}>
            
            {/*Left Card STARTS*/}
            <Grid item lg={9} md={12}>
              <Card sx={{ p: 6, background: 'transparent' }}>
                <Grid container spacing={3}>

                  {/* Product Name */}
                  <Grid item sm={12} xs={12}>
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
                  </Grid>

                  {/* Category */}
                  <Grid item sm={12} xs={12} sx={{ mt: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap:2  }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', minWidth:'250px' }}>
                        <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff' }}>
                          Product Category 
                        </Typography>
                        <Tooltip title="Choose a category for the product">
                          <IconButton>
                            <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>

                      <SymMultiLevelSelect
                        onCategorySelect={handleCategorySelect} 
                        selectedCategory={selectedCategory}
                      />
                    </Box>
                  </Grid>

                  {/* Product Type */}
                  <Grid item sm={12} xs={12} sx={{ mt: 2.5 }}>
                    <SymRadioButton
                      label="Product Type"
                      name="productType"
                      id="product-type-label"
                      value={values.productType}  // Controlled by Formik
                      options={[
                        { value: "static", label: "Static" },
                        { value: "dynamic", label: "Dynamic" },
                      ]}
                      onChange={handleChange}  // Use Formik's handleChange
                    />
                    
                  </Grid>

                  {/* Dimensions */}
                  {values.productType === "static" && (
                    <Grid item sm={12} xs={12} sx={{ mt: 2.5 }}>
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
                    </Grid>
                  )}

                  {/* Product Sizechart */}
                  {values.productType === "dynamic" && (
                    <Grid item sm={12} xs={12} sx={{ mt: 2.5 }}>
                      <SymTextField
                        label="Product Sizechart"
                        name="productSizechart"
                        placeholder="Enter product sizechart"
                        value={values.productSizechart}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.productSizechart && !!errors.productSizechart}
                        helperText={touched.productSizechart && errors.productSizechart}
                      />
                    </Grid>
                  )}

                  {/* Category Tags */}
                  {selectedCategory  && (
                    <Grid item sm={12} xs={12} sx={{ mt: 5 }}>
                      <FlexBox gap={1} flexDirection="column">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1 }}>
                            Category Tags
                          </Typography>
                          <Tooltip title="Choose a category for the product">
                            <IconButton>
                              <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      
                        {/* Age group */}
                        <SymMultiSelectChip
                          options={ageGroups}
                          selectedItems={selectedAgeGroup}
                          setSelectedItems={setSelectedAgeGroup}
                          label="Age group"
                          allLabel="All ages"
                        />
                        
                        {/* Gender */}
                        <SymMultiSelectChip
                          options={genders}
                          selectedItems={selectedGender}
                          setSelectedItems={setSelectedGender}
                          label="Gender"
                          allLabel="Unisex"
                        />
                      </FlexBox>
                    </Grid>
                  )}

                  {/* Description */}
                  <Grid item xs={12} sx={{ mt: 2.5 }}>
                    <SymRichTextInputBox
                      label="Dimensions"
                      id='rich-editor'
                      placeholder="Write your description here..." 
                      value={values.description}
                      onChange={handleChange}
                      simple={false}
                    />
                  </Grid>

                  {/* Product Variant */}
                  <Grid item sm={12} xs={12} sx={{ mt: 5 }}>
                    <FlexBox gap={1} flexDirection="column">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff' }}>
                          Product Variant
                        </Typography>
                        <Tooltip title="Choose a category for the product">
                          <IconButton>
                            <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    
                      {/* Color */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1, minWidth: '100px' }}>
                          Color
                        </Typography>
                        <Autocomplete
                          disableCloseOnSelect  
                          multiple
                          freeSolo
                          options={baseColors.map((option) => option.name)} // Options as array of strings
                          value={selectedColors.map((color) => color.name)} // Use only names as value for Autocomplete
                          onChange={(event, newValue) => {
                            const updatedColors = newValue.map((name) => {
                              const colorObj = baseColors.find((color) => color.name === name) ||
                                              chipData2.find((color) => color.name === name); // Handle custom colors
                              return colorObj || { name, hex: '' }; // Handle custom (freeSolo) entries
                            });
                            setSelectedColors(updatedColors); // Update the full color objects
                          }}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                checked={selected}
                                style={{ marginRight: 8 }}
                              />
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
                                        width: 18,
                                        height: 18,
                                        borderRadius: '50%',
                                        bgcolor: option.hex || 'transparent', // Use hex color
                                        marginRight: 1,
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
                              InputProps={{
                                ...params.InputProps,
                                style: {
                                  backgroundColor: 'white',
                                },
                              }}
                              InputLabelProps={{
                                style: { color: 'black' },
                              }}
                            />
                          )}
                        />
                        <Button
                          onClick={handleOpenColorDialog}
                          sx={{
                            color: '#fff',
                            fontFamily: 'Elemental End',
                            textTransform: 'lowercase',
                            padding: '5px 20px',
                            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)',
                            boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
                            backdropFilter: 'blur(50px)',
                            borderRadius: '12px',
                            width: '210px',
                          }}
                        >
                          Custom Color
                        </Button>
                      </Box>
                      {/**/}
                      
                      {/* Size */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1, minWidth: '100px' }}>
                          Size
                        </Typography>
                        <Autocomplete
                          disableCloseOnSelect  
                          multiple
                          freeSolo
                          options={baseSizes.map((option) => option.name)} // Options as array of strings
                          value={selectedSizes.map((size) => size.name)} // Use only names as value for Autocomplete
                          onChange={(event, newValue) => {
                            const updatedSizes = newValue.map((name) => {
                              const sizeObj = baseSizes.find((size) => size.name === name) ||
                                              chipData2.find((size) => size.name === name);
                              return sizeObj || { name }; // Handle custom (freeSolo) entries
                            });
                            setSelectedSizes(updatedSizes); // Update the full size objects
                          }}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                checked={selected}
                                style={{ marginRight: 8 }}
                              />
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
                              InputProps={{
                                ...params.InputProps,
                                style: {
                                  backgroundColor: 'white',
                                },
                              }}
                              InputLabelProps={{
                                style: { color: 'black' },
                              }}
                            />
                          )}
                        />
                        <Button
                          onClick={handleOpenSizeDialog}
                          sx={{
                            color: '#fff',
                            fontFamily: 'Elemental End',
                            textTransform: 'lowercase',
                            padding: '5px 20px',
                            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)',
                            boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
                            backdropFilter: 'blur(50px)',
                            borderRadius: '12px',
                            width: '210px',
                          }}
                        >
                          Custom Size
                        </Button>
                      </Box>

                      {/**/}
                    </FlexBox>
                  </Grid>
                 
                  {/* Product Variant Table*/}
                  <Grid item sm={12} xs={12} sx={{ mt: 5 }}>
                    {!(selectedColors.length==0 && selectedSizes.length==0) ?(
                      <ProductVariantsTable
                        colors={selectedColors.map((color) => color.name)}
                        sizes={selectedSizes.map((size) => size.name)}
                      />
                      ) : null
                    }
                    
                  </Grid>

                </Grid>
              </Card>
            </Grid>

            {/*RIGHT CARD START*/}
            <Grid item lg={3} md={12}>
              <Card
                sx={{
                  mt: 10,
                  p: 4,
                  background:
                    'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
                  boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '15px',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Elemental End',
                    textTransform: 'lowercase',
                    color: '#fff',
                    fontSize: 14,
                    pb: 2,
                  }}
                >
                  Status
                </Typography>
                <Grid container spacing={3}>
                  <Grid item sm={12} xs={12}>
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
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            {/*RIGHT CARD ENDS*/}

          </Grid>

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
      )}
    </Formik>
  );
};


export default ProductForm1;
 
