import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup"; // GLOBAL CUSTOM COMPONENTS
import { H3 } from "../../../components/Typography"; // Local CUSTOM COMPONENT

import DropZone from "../../../components/DropZone";
import { FlexBox } from "../../../components/flex-box"; // STYLED COMPONENTS

import { UploadImageBox, StyledClear } from "../styles"; // FORM FIELDS VALIDATION SCHEMA

const VALIDATION_SCHEMA = yup.object().shape({
  firstName: yup.string().required("Name is required!"),
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

  return <Card sx={{ p: 6 }}>
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={VALIDATION_SCHEMA}>
        {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
      }) => <form onSubmit={handleSubmit}>
              <Box>
                <H3 mb={2}>Contact Information</H3>
                <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <TextField fullWidth name="firstName" label="First Name" color="info" size="medium" placeholder="First Name" value={values.firstName} onBlur={handleBlur} onChange={handleChange} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField fullWidth name="lastName" label="Last Name" color="info" size="medium" placeholder="Last Name" value={values.lastName} onBlur={handleBlur} onChange={handleChange} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField fullWidth name="businessPhone" label="Business Phone" color="info" size="medium" placeholder="Business Phone" value={values.businessPhone} onBlur={handleBlur} onChange={handleChange} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{pt:5}} >
                <H3 mb={2}>Business Information</H3>
                <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <TextField fullWidth name="businessName" label="Business Name" color="info" size="medium" placeholder="Business Name" value={values.businessName} onBlur={handleBlur} onChange={handleChange} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField select fullWidth color="info" size="medium" name="businessType" onBlur={handleBlur} placeholder="Business Type" onChange={handleChange} value={values.businessType} label="Business Type" SelectProps={{ multiple: false }} error={!!touched.businessType && !!errors.businessType} helperText={touched.businessType && errors.businessType}>
                      <MenuItem value="Sole Proprietorship">Sole Proprietorship</MenuItem>
                      <MenuItem value="LLC">LLC</MenuItem>
                      <MenuItem value="Corporation">Corporation</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField fullWidth name="businessEmail" label="Business Email" color="info" size="medium" placeholder="Business Email" value={values.businessEmail} onBlur={handleBlur} onChange={handleChange} error={!!touched.businessEmail && !!errors.businessEmail} helperText={touched.businessEmail && errors.businessEmail} />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField fullWidth name="ein" label="EIN" color="info" size="medium" placeholder="EIN" value={values.ein} onBlur={handleBlur} onChange={handleChange} error={!!touched.ein && !!errors.ein} helperText={touched.ein && errors.ein} />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{pt:5}} >
                <H3 mb={2}>Business Information</H3>
                <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <TextField fullWidth name="streetAddress" label="Street Address" color="info" size="medium" placeholder="Street Address" value={values.streetAddress} onBlur={handleBlur} onChange={handleChange} error={!!touched.streetAddress && !!errors.streetAddress} helperText={touched.streetAddress && errors.streetAddress} />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField fullWidth name="unit" label="Suite/Unit" color="info" size="medium" placeholder="Suite/Unit" value={values.unit} onBlur={handleBlur} onChange={handleChange} error={!!touched.unit && !!errors.unit} helperText={touched.unit && errors.unit} />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField fullWidth name="city" label="City" color="info" size="medium" placeholder="City" value={values.city} onBlur={handleBlur} onChange={handleChange} error={!!touched.city && !!errors.city} helperText={touched.city && errors.city} />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField fullWidth name="state" label="State" color="info" size="medium" placeholder="State" value={values.state} onBlur={handleBlur} onChange={handleChange} error={!!touched.state && !!errors.state} helperText={touched.state && errors.state} />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField fullWidth name="zipCode" label="ZIP Code" color="info" size="medium" placeholder="ZIP Code" value={values.zipCode} onBlur={handleBlur} onChange={handleChange} error={!!touched.zipCode && !!errors.zipCode} helperText={touched.zipCode && errors.zipCode} />
                  </Grid>

                </Grid>
              </Box>


              <Grid container justifyContent="flex-end" sx={{ pt: 5 }} item xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Save & next
                </Button>
              </Grid>

          </form>}
      </Formik>
    </Card>;
};

export default ProductForm;