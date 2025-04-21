import React, { useState } from "react";
import { Autocomplete, TextField, Menu, MenuItem, Box, Card, Typography, Button, Grid, Tooltip, IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import SymTextField from './components/SymTextField';
import styles from './styles';  // Import the styles
import { FlexBox } from "../../../components/flex-box"; 
import DropZone from "../../../components/DropZone";
import { UploadImageBox, StyledClear } from "../styles"; // FORM FIELDS VALIDATION SCHEMA
import { InfoOutlined } from "@mui/icons-material";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
import DropZone3D from './components/DropZone3D';
import { H1 } from "@/components/Typography";

// SortableItem component to render each image with label and highlight effect
const SortableItem = SortableElement(({ file, index, fileIndex, isDragging, selected, handleClick, handleFileDelete }) => (
  <UploadImageBox 
    key={index} 
    onClick={() => handleClick(index)} 
    sx={{
      position: 'relative',
      border: selected ? '3px solid white' : 'none', // Highlight on click
      opacity: isDragging ? 0.7 : 1, // Dim while dragging
      cursor: 'grab',
    }}
  >
    {/* Image with numbered label */}
    <Box component="img" src={file.preview} width="100%" />
    <Typography 
      variant="caption" 
      sx={{
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: 'white',
        padding: '2px 5px',
        borderRadius: '4px',
      }}
    >
      {fileIndex + 1} {/* Label with the index number */}
    </Typography>
    <StyledClear onClick={() => handleFileDelete(file)} />
  </UploadImageBox>
));

// SortableList component for the sortable image list
const SortableList = SortableContainer(({ files, selectedImage, handleClick, handleFileDelete }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, flexWrap: 'wrap', gap: 1 }}>
      {files.map((file, index) => (
        <SortableItem 
          key={`item-${index}`} 
          index={index} 
          file={file}
          fileIndex={index}
          selected={selectedImage === index} 
          handleClick={handleClick}
          handleFileDelete={handleFileDelete} 
        />
      ))}
    </Box>
  );
});

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required!"),
  category: yup.array().min(1).required("Category is required!"),
  description: yup.string().required("Description is required!"),
  status: yup.string().required("Status is required!"),
});

const ProductForm2 = props => {
  const { initialValues, handleFormSubmit } = props;
  const [productImages, setProductImages] = useState([]);
  const [modelFiles, setModelFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // To store the clicked image index


  // Append new files instead of overwriting
  const handleImageDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setProductImages(prevImages => [...prevImages, ...newFiles]);
  };
  

  const handleModelDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setModelFiles(prevModels => [...prevModels, ...newFiles]);
  };

  // Handle file deletion
  const handleFileDelete = (file, setFiles) => () => {
    setFiles(files => files.filter(item => item.name !== file.name));
  };

  // Reorder files when sorting
  const onSortEnd = (setFiles) => ({ oldIndex, newIndex }) => {
    setFiles((prevFiles) => arrayMove(prevFiles, oldIndex, newIndex));
  };


  // Handle image click
  const handleClick = (index) => {
    setSelectedImage(index);
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
          <Grid container spacing={3} sx={styles.gridContainer}>
            
            {/*Left Card STARTS*/}
            <Grid item sm={8} xs={12}>
              <Card sx={styles.leftCard}>
                <Grid container spacing={3}>
                  {/* Bullet Points 1 */}
                  <Grid item sm={12} xs={12}>
                    <SymTextField
                      label="Bullet Points"
                      name="bulletPoints"
                      placeholder="Begin listing key bullet points describing your product for customers to quickly view"
                      value={values.bulletPoints}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.bulletPoints && !!errors.bulletPoints}
                      helperText={touched.bulletPoints && errors.bulletPoints}
                      multiline={true}
                    />
                  </Grid>

                  {/* Composition */}
                  <Grid item sm={12} xs={12}>
                    <SymTextField
                      label="Composition"
                      name="composition"
                      placeholder="Describe material and any unique specifications for product"
                      value={values.composition}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.composition && !!errors.composition}
                      helperText={touched.composition && errors.composition}
                    />
                  </Grid>

                  {/* IMAGES */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <H1 color='#FFF' mr={1}>
                        Product Images
                      </H1>
                      <Tooltip title="Choose a category for the product">
                        <IconButton>
                          <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <DropZone
                      onChange={handleImageDrop}
                      title="Drag & drop product images here"
                      imageSize="Upload 280*280 images"
                      acceptFormats={{ "image/*": [".png", ".jpeg", ".jpg", ".gif"] }}  // Only accept images
                      multiple={true} // Enable multiple image uploads
                    />
                    <SortableList 
                      files={productImages} 
                      selectedImage={selectedImage} 
                      handleClick={handleClick} 
                      handleFileDelete={handleFileDelete(productImages, setProductImages)} 
                      onSortEnd={onSortEnd(setProductImages)} // This was missing the function connection
                      axis="xy" 
                    />

                  </Grid>

                  {/* 3D MODELS */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <H1 color='#FFF' mr={1}>
                        3D Models
                      </H1>
                      <Tooltip title="Upload 3D model files like .glb">
                        <IconButton>
                          <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <DropZone3D
                      onChange={handleModelDrop}
                      title="Drag & drop 3D model here"
                      imageSize="Upload .glb file only"
                      acceptFormats={{ "model/glb": [".glb"] }}  // Only accept .glb files
                      multiple={true}  // Enable multiple 3D model uploads
                    />

                    <SortableList files={modelFiles} handleFileDelete={handleFileDelete(modelFiles, setModelFiles)} onSortEnd={onSortEnd(setModelFiles)} axis="xy" />
                  </Grid>
                </Grid>
              </Card>
            </Grid>          
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default ProductForm2;
