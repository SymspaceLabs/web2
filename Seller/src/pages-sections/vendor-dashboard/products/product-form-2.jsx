//========================================================================
// Create Product Form 2 (Revised)
//========================================================================

import * as yup from "yup";
import styles from './styles';
import DropZone3D from './components/DropZone3D';
import DropZone from "../../../components/DropZone";
import SymTextField from './components/SymTextField';

import { Formik } from "formik";
import { useState } from "react";
import { H1 } from "@/components/Typography";
import { InfoOutlined } from "@mui/icons-material";
import { UploadImageBox, StyledClear } from "../styles";
import { Box, Card, Typography, Tooltip, IconButton } from "@mui/material"; 
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
import ProductVariantsTable from "./components/product-variants-1";

//========================================================================

// --- Placeholder for ProductVariantsTable ---
// You should replace this with your actual ProductVariantsTable component
const ProductVariantsTablePlaceholder = ({selectedColors,selectedSizes}) => (
    
    <Box sx={{ p: 4, textAlign: 'center' }}>
        {!(selectedColors.length == 0 && selectedSizes.length == 0) ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <H1 color='#FFF' mr={1}>
                  Product Variants
              </H1>
              <Tooltip title="Manage variations like Color, Size, and corresponding SKUs/Prices">
                  <IconButton>
                      <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                  </IconButton>
              </Tooltip>
            </Box>
            <ProductVariantsTable
              colors={selectedColors.map((color) => color.name)}
              sizes={selectedSizes.map((size) => size.name)}
            />
          </>
        ) : null
        }
    </Box>

);
// ---------------------------------------------


// SortableItem component... (KEEP UNCHANGED)
const SortableItem = SortableElement(({ file, index, fileIndex, isDragging, selected, handleClick, handleFileDelete }) => (
    <UploadImageBox 
        key={index} 
        onClick={() => handleClick(index)} 
        sx={{
            position: 'relative',
            border: selected ? '3px solid white' : 'none', 
            opacity: isDragging ? 0.7 : 1, 
            cursor: 'grab',
        }}
    >
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
            {fileIndex + 1} 
        </Typography>
        <StyledClear onClick={() => handleFileDelete(file)} />
    </UploadImageBox>
));

// SortableList component... (KEEP UNCHANGED)
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
    const { 
      initialValues, 
      handleFormSubmit,
      selectedColors,
      selectedSizes
    } = props;
    const [productImages, setProductImages] = useState([]);
    const [modelFiles, setModelFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); 

    // ... (KEEP ALL HANDLERS UNCHANGED)
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

    const handleFileDelete = (file, setFiles) => () => {
        setFiles(files => files.filter(item => item.name !== file.name));
    };

    const onSortEnd = (setFiles) => ({ oldIndex, newIndex }) => {
        setFiles((prevFiles) => arrayMove(prevFiles, oldIndex, newIndex));
    };

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
                    {/* 1. First Form Card (Product Details & Media) */}
                    <Card sx={{ ...styles.leftCard, mb: 3 }}>
                      {/* 🌟 ProductVariantsTable is placed here 🌟 */}
                      <ProductVariantsTablePlaceholder
                        selectedColors={selectedColors}
                        selectedSizes={selectedSizes}
                      />
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            
                            {/* Bullet Points */}
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

                            {/* Composition */}
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

                            {/* IMAGES */}
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
                                    acceptFormats={{ "image/*": [".png", ".jpeg", ".jpg", ".gif"] }}
                                    multiple={true}
                                />
                                <SortableList 
                                    files={productImages} 
                                    selectedImage={selectedImage} 
                                    handleClick={handleClick} 
                                    handleFileDelete={handleFileDelete(productImages, setProductImages)} 
                                    onSortEnd={onSortEnd(setProductImages)}
                                    axis="xy" 
                                />
                            </Box>

                            {/* 3D MODELS */}
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
                                    acceptFormats={{ "model/glb": [".glb"] }}
                                    multiple={true}
                                />
                                <SortableList files={modelFiles} handleFileDelete={handleFileDelete(modelFiles, setModelFiles)} onSortEnd={onSortEnd(setModelFiles)} axis="xy" />
                            </Box>
                        </Box>
                    </Card>
                </form>
            )}
        </Formik>
    );
};

export default ProductForm2;