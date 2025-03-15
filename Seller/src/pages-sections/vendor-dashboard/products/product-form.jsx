import { useState } from "react";
import { TextField, MenuItem, Box, Card, Typography, Button, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Tooltip, IconButton } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import DropZone from "../../../components/DropZone";
import { FlexBox } from "../../../components/flex-box";
import { UploadImageBox, StyledClear } from "../styles";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required!"),
  category: yup.array().min(1).required("Category is required!"),
  description: yup.string().required("Description is required!"),
  status: yup.string().required("Status is required!")
});

const ProductForm = props => {
  const {
    initialValues,
    handleFormSubmit,
    handleNext,
    handleBack
  } = props;
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState('');

  const handleChangeDropZone = files => {
    files.forEach(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(files);
  };

  const handleFileDelete = file => () => {
    setFiles(files => files.filter(item => item.name !== file.name));
  };

  return <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={VALIDATION_SCHEMA}>
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
          <Grid item sm={8} xs={12}>
            <Card sx={{ p: 6, background: 'transparent' }}>
              <Grid container spacing={3}>

                {/* Product Name */}
                <Grid item sm={12} xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1 }}>
                      Product Name
                    </Typography>
                    <Tooltip title="Enter the product's name">
                      <IconButton>
                        <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <TextField InputProps={{ style: { backgroundColor: 'white', color: '#000', boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)', borderRadius: '8px' }}} fullWidth name="name" color="info" size="medium" placeholder="Enter product name" value={values.name} onBlur={handleBlur} onChange={handleChange} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
                </Grid>

                {/* Product Type */}
                <Grid item sm={12} xs={12} sx={{ mt: 2.5 }}>
                  <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', gap: 5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FormLabel id="product-type-label" sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff' }}>
                        Product Type
                      </FormLabel>
                      <Tooltip title="Select the product type">
                        <IconButton>
                          <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <RadioGroup row aria-labelledby="product-type-label" name="productType">
                      <FormControlLabel value="static" control={<Radio />} label="Static" />
                      <FormControlLabel value="dynamic" control={<Radio />} label="Dynamic" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {/* Dimensions */}
                <Grid item sm={12} xs={12} sx={{ mt: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1 }}>
                      Dimensions
                    </Typography>
                    <Tooltip title="Specify the dimensions">
                      <IconButton>
                        <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <TextField InputProps={{ style: { backgroundColor: 'white', color: '#000', boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)', borderRadius: '8px' }}} fullWidth name="dimensions" color="info" size="medium" placeholder="Enter dimensions" value={values.dimensions} onBlur={handleBlur} onChange={handleChange} error={!!touched.dimensions && !!errors.dimensions} helperText={touched.dimensions && errors.dimensions} />
                </Grid>

                {/* Category */}
                <Grid item sm={12} xs={12} sx={{ mt: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1 }}>
                      Category
                    </Typography>
                    <Tooltip title="Choose a category for the product">
                      <IconButton>
                        <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <TextField select fullWidth size="medium" name="category" onBlur={handleBlur} SelectProps={{multiple: false}}  onChange={handleChange} value={values.category} error={!!touched.category && !!errors.category} helperText={touched.category && errors.category} InputProps={{ style: { backgroundColor: 'white', color: '#000', boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)', borderRadius: '8px' }}}>
                    <MenuItem value="clothing">Clothing</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="active">Draft</MenuItem>
                  </TextField>
                </Grid>

                {/* Description */}
                  <Grid item xs={12} sx={{ mt: 2.5 }}>
                    <FormControl sx={{ width: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <FormLabel sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1, }}>
                          Description
                        </FormLabel>
                        <Tooltip title="Provide a detailed description of the product">
                          <IconButton>
                            <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        style={{ height: '150px',
                          backgroundColor: 'white', // Set background color to white
                          color: 'black', // Set text color to black
                          borderRadius: '8px',
                          // boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)',
                          border:'1px solid transparent'
                        }}
                      />
                    </FormControl>
                  </Grid>


              </Grid>
            </Card>
          </Grid>

          {/*RIGHT CARD START*/}
          <Grid item sm={4} xs={12}>
            <Card sx={{ mt:2, p: 4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)',  borderRadius: '15px'   }}>
              <Typography sx={{ fontFamily: 'Elemental End', textTransform:'lowercase', color:'#fff', fontSize: 14, pb:2 }} >
                Status
              </Typography>
              <Grid container spacing={3}>
                <Grid item sm={12} xs={12}>
                <TextField select fullWidth color="info"
                  size="medium"
                  name="status"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.status}
                  label="Select Status"
                  SelectProps={{ multiple: false }}
                  error={!!touched.status && !!errors.status}
                  helperText={touched.status && errors.status}
                >
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>


                </Grid>
              </Grid>
            </Card>
          </Grid>
          {/*RIGHT CARD ENDS*/}

        </Grid>
      </form>
    )}
  </Formik>;
};

export default ProductForm;
