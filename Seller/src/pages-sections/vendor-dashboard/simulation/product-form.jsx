import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup"; // GLOBAL CUSTOM COMPONENTS
import { Box, Card, Typography, Button, Grid } from '@mui/material';

import DropZone from "../../../components/DropZone";
import { FlexBox } from "../../../components/flex-box"; // STYLED COMPONENTS

import { UploadImageBox, StyledClear } from "../styles"; // FORM FIELDS VALIDATION SCHEMA

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required!"),
  category: yup.array().min(1).required("Category is required!"),
  description: yup.string().required("Description is required!"),
  stock: yup.number().required("Stock is required!"),
  price: yup.number().required("Price is required!"),
  sale_price: yup.number().optional(),
  tags: yup.string().required("Tags is required!")
}); // ================================================================

// ================================================================
const ProductForm = props => {
  const {
    initialValues,
    handleFormSubmit
  } = props;
  const [files, setFiles] = useState([]); // HANDLE UPDATE NEW IMAGE VIA DROP ZONE

  const handleChangeDropZone = files => {
    files.forEach(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(files);
  }; // HANDLE DELETE UPLOAD IMAGE


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
      }) => <form onSubmit={handleSubmit}>
            <Box sx={{ py:4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '15px' }}>
              <Grid container spacing={3}>
                {/*Left Card*/}
                <Grid item sm={8} xs={12}>

                  {/*Card 1*/}
                  <Card sx={{ p: 6, background:'transparent' }}>
                    <Grid container spacing={3}>

                      {/*Title*/}
                      <Grid item sm={12} xs={12}>
                        <Typography sx={{fontFamily:'Elemental End', textTransform:'lowercase', color:'#fff'}}>
                          Product Name
                        </Typography>
                        <TextField InputProps={{ style: { backgroundColor: 'white', color:'#000' },}} fullWidth name="name" color="info" size="medium" placeholder="Enter product name" value={values.name} onBlur={handleBlur} onChange={handleChange} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
                      </Grid>

                      {/*Description*/}
                      <Grid item xs={12}>
                        <Typography sx={{fontFamily:'Elemental End', textTransform:'lowercase', color:'#fff'}}>
                          Description
                        </Typography>
                        <TextField InputProps={{ style: { backgroundColor: 'white', color:'#000' },}} rows={6} multiline fullWidth color="info" size="medium" name="description" onBlur={handleBlur} onChange={handleChange} placeholder="Enter description" value={values.description} error={!!touched.description && !!errors.description} helperText={touched.description && errors.description} />
                      </Grid>

                      {/*File Upload*/}
                      <Grid item xs={12}>
                        <DropZone onChange={files => handleChangeDropZone(files)} />

                        <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                          {files.map((file, index) => {
                        return <UploadImageBox key={index}>
                                <Box component="img" src={file.preview} width="100%" />
                                <StyledClear onClick={handleFileDelete(file)} />
                              </UploadImageBox>;
                      })}
                        </FlexBox>
                      </Grid>

                        {/*Product type*/}
                        <Grid item sm={12} xs={12}>
                        <TextField select fullWidth color="info" size="medium" name="category" onBlur={handleBlur} placeholder="Product Type" onChange={handleChange} value={values.category} label="Product Type" SelectProps={{
                      multiple: true
                    }} error={!!touched.category && !!errors.category} helperText={touched.category && errors.category}>
                          <MenuItem value="electronics">Electronics</MenuItem>
                          <MenuItem value="fashion">Fashion</MenuItem>
                        </TextField>
                      </Grid>
                      

                      {/*Category*/}
                      <Grid item sm={12} xs={12}>
                        <TextField select fullWidth color="info" size="medium" name="category" onBlur={handleBlur} placeholder="Category" onChange={handleChange} value={values.category} label="Category" SelectProps={{
                      multiple: true
                    }} error={!!touched.category && !!errors.category} helperText={touched.category && errors.category}>
                          <MenuItem value="electronics">Electronics</MenuItem>
                          <MenuItem value="fashion">Fashion</MenuItem>
                        </TextField>
                      </Grid>

                      {/*SubCategory*/}
                      <Grid item sm={12} xs={12}>
                        <TextField select fullWidth color="info" size="medium" name="subcategory" onBlur={handleBlur} placeholder="Category" onChange={handleChange} value={values.category} label="SubCategory" SelectProps={{
                      multiple: true
                    }} error={!!touched.category && !!errors.category} helperText={touched.category && errors.category}>
                          <MenuItem value="electronics">Electronics</MenuItem>
                          <MenuItem value="fashion">Fashion</MenuItem>
                        </TextField>
                      </Grid>

                      {/*SubCategory Item*/}
                      <Grid item sm={12} xs={12}>
                        <TextField select fullWidth color="info" size="medium" name="subcategoryItem" onBlur={handleBlur} placeholder="Category" onChange={handleChange} value={values.category} label="SubCategory Item" SelectProps={{
                      multiple: true
                    }} error={!!touched.category && !!errors.category} helperText={touched.category && errors.category}>
                          <MenuItem value="electronics">Electronics</MenuItem>
                          <MenuItem value="fashion">Fashion</MenuItem>
                        </TextField>
                      </Grid>

                    </Grid>
                  </Card>

                  {/*Card 2 : Pricing */}
                  <Card sx={{ p: 6, mt:5 }}>
                    <Typography sx={{ fontFamily: 'Helvetica', fontSize: 14, fontWeight: 'bold', pb:2 }} >
                      Pricing
                    </Typography>

                    <Grid container spacing={3}>
                      {/*Regular Price*/}
                      <Grid item sm={6} xs={12}>
                        <TextField fullWidth name="price" color="info" size="medium" type="number" onBlur={handleBlur} value={values.price} label="Regular Price" onChange={handleChange} placeholder="Regular Price" error={!!touched.price && !!errors.price} helperText={touched.price && errors.price} />
                      </Grid>

                      {/*Sale Price*/}
                      <Grid item sm={6} xs={12}>
                        <TextField fullWidth color="info" size="medium" type="number" name="sale_price" label="Sale Price" onBlur={handleBlur} onChange={handleChange} placeholder="Sale Price" value={values.sale_price} error={!!touched.sale_price && !!errors.sale_price} helperText={touched.sale_price && errors.sale_price} />
                      </Grid>

                    </Grid>
                    <Grid container spacing={1} sx={{mt:2}}>
                      {/*Cost per item*/}
                      <Grid item sm={4} xs={12}>
                        <TextField fullWidth name="price" color="info" size="medium" type="number" onBlur={handleBlur} value={values.price} label="Cost per item" onChange={handleChange} placeholder="Cost per item" error={!!touched.price && !!errors.price} helperText={touched.price && errors.price} />
                      </Grid>

                      {/*Profit*/}
                      <Grid item sm={4} xs={12}>
                        <TextField fullWidth color="info" size="medium" type="number" name="sale_price" label="Profit" onBlur={handleBlur} onChange={handleChange} placeholder="Profit" value={values.sale_price} error={!!touched.sale_price && !!errors.sale_price} helperText={touched.sale_price && errors.sale_price} />
                      </Grid>

                      {/*Margin*/}
                      <Grid item sm={4} xs={12}>
                        <TextField fullWidth color="info" size="medium" type="number" name="sale_price" label="Margin" onBlur={handleBlur} onChange={handleChange} placeholder="Margin" value={values.sale_price} error={!!touched.sale_price && !!errors.sale_price} helperText={touched.sale_price && errors.sale_price} />
                      </Grid>

                    </Grid>
                  </Card>

                  {/*Card 3 : Product Variants*/}
                  <Card sx={{ p: 6, mt:5 }}>
                    <Typography sx={{ fontFamily: 'Helvetica', fontSize: 14, fontWeight: 'bold', pb:2 }} >
                      Product Variants
                    </Typography>

                    <Grid container spacing={3}>
                      
                      {/*Color*/}
                      <Grid item sm={12} xs={12}>
                        <TextField fullWidth name="stock" color="info" size="medium" label="Color" placeholder="Color" onBlur={handleBlur} value={values.stock} onChange={handleChange} error={!!touched.stock && !!errors.stock} helperText={touched.stock && errors.stock} />
                      </Grid>

                      {/*Size*/}
                      <Grid item sm={12} xs={12}>
                        <TextField fullWidth name="tags" label="Size" color="info" size="medium" placeholder="Size" onBlur={handleBlur} value={values.tags} onChange={handleChange} error={!!touched.tags && !!errors.tags} helperText={touched.tags && errors.tags} />
                      </Grid>

                      {/*Material*/}
                      <Grid item sm={12} xs={12}>
                        <TextField fullWidth name="tags" label="Material" color="info" size="medium" placeholder="Material" onBlur={handleBlur} value={values.tags} onChange={handleChange} error={!!touched.tags && !!errors.tags} helperText={touched.tags && errors.tags} />
                      </Grid>

                      {/*Dimension*/}
                      <Grid item sm={12} xs={12}>
                        <TextField fullWidth name="tags" label="Dimension" color="info" size="medium" placeholder="Dimension" onBlur={handleBlur} value={values.tags} onChange={handleChange} error={!!touched.tags && !!errors.tags} helperText={touched.tags && errors.tags} />
                      </Grid>

                      {/*Insurance*/}
                      <Grid item sm={12} xs={12}>
                        <TextField fullWidth name="tags" label="Insurance" color="info" size="medium" placeholder="Insurance" onBlur={handleBlur} value={values.tags} onChange={handleChange} error={!!touched.tags && !!errors.tags} helperText={touched.tags && errors.tags} />
                      </Grid>

                      <Grid item sm={12} xs={12}>
                        <Button variant="contained" color="info" type="submit">
                          Save product
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>


                </Grid>

                {/*Right Card*/}
                <Grid item sm={4} xs={12}>
                  <Card sx={{ p: 6 }}>
                    <Typography sx={{ fontFamily: 'Helvetica', fontSize: 14, fontWeight: 'bold', pb:2 }} >
                      Status
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item sm={12} xs={12}>
                        <TextField select fullWidth color="info" size="medium" name="status" onBlur={handleBlur} placeholder="Status" onChange={handleChange} value={values.category} label="Select Status" SelectProps={{
                      multiple: true
                    }} error={!!touched.category && !!errors.category} helperText={touched.category && errors.category}>
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                          <MenuItem value="active">Draft</MenuItem>
                        </TextField>
                      </Grid>
                    </Grid>
                  </Card>
                  <Card sx={{ p: 6, mt:5 }}>
                    <Typography sx={{ fontFamily: 'Helvetica', fontSize: 14, fontWeight: 'bold', pb:2 }} >
                      Product Organization
                    </Typography>
                    <Grid container spacing={3}>

                      {/*Product Type*/}
                      <Grid item sm={12} xs={12}>
                        <TextField select fullWidth color="info" size="medium" name="status" onBlur={handleBlur} placeholder="Product Type" onChange={handleChange} value={values.category} label="Product Type" SelectProps={{ multiple: true }} error={!!touched.category && !!errors.category} helperText={touched.category && errors.category}>
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                          <MenuItem value="active">Draft</MenuItem>
                        </TextField>
                      </Grid>

                      {/*Tags*/}
                      <Grid item sm={12} xs={12}>
                        <TextField fullWidth name="tags" label="Tags" color="info" size="medium" placeholder="Tags" onBlur={handleBlur} value={values.tags} onChange={handleChange} error={!!touched.tags && !!errors.tags} helperText={touched.tags && errors.tags} />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </form>}
      </Formik>;
};

export default ProductForm;