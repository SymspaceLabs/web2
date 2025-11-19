//========================================================================
// Create Product Form 2
//========================================================================

import styles from './styles';
import SymTextField from './components/SymTextField';
import ProductVariantsTable from "./components/product-variants-1";
import ProductImageUploader from './components/ProductImageUploader';
import ProductModelUploader from './components/ProductModelUploader';

import { H1 } from "@/components/Typography";
import { arrayMove } from "react-sortable-hoc";
import { InfoOutlined } from "@mui/icons-material";
import { Box, Card, Tooltip, IconButton } from "@mui/material"; 
import { uploadFileToBackend } from '@/services/productService';
import { useState, useCallback, useMemo, forwardRef, useImperativeHandle } from "react";

//========================================================================

const validateField = (name, value) => {
    let error = "";
    if (name === "bulletPoints" || name === "composition") {
        if (!value || String(value).trim() === "") {
            error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required!`;
        }
    }
    return error;
};

//========================================================================

const ProductVariantsTableComponent = ({ variants, setFormValues, selectedColors, selectedSizes }) => (
    
    <Box sx={{ p: 4, textAlign: 'center' }}>
        {!(selectedColors.length === 0 && selectedSizes.length === 0) ? (
            <>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <H1 color='#FFF' mr={1}>
                        Product Variants
                    </H1>
                    <Tooltip title="Manage variations like Color, Size, and corresponding SKUs/Prices">
                        <IconButton>
                            <InfoOutlined sx={{ color: '#fff', fontSize: 10 }} />
                        </IconButton>
                    </Tooltip>
                </Box>
                {/* * NOTE: ProductVariantsTable must handle its own internal state 
                  * or manage variants via the `variants` prop and update via `setFormValues`.
                 */}
                <ProductVariantsTable
                    initialVariants={variants} // Use initialVariants if the component handles internal initialization
                    colors={selectedColors.map((color) => color.name)}
                    sizes={selectedSizes.map((size) => size.name)}
                    // Assuming the table component provides a mechanism to update variants back to the form's state:
                    onVariantsChange={(newVariants) => {
                        setFormValues(prev => ({ ...prev, variants: newVariants }));
                    }}
                />
            </>
        ) : null
        }
    </Box>
);
// ---------------------------------------------

const ProductForm2 = forwardRef((props, ref) => {
    const { 
        initialValues, 
        handleFormSubmit,
        selectedColors, // This contains { name, hex } from the parent
        selectedSizes
    } = props;

    // =============================================================================
    // ⭐ 1. INITIALIZATION HELPERS (Color Code Mapping) ⭐
    // =============================================================================

    const colorCodeToNameMap = useMemo(() => {
        return selectedColors.reduce((acc, color) => {
            // Note: Use the `hex` from the `selectedColors` prop as the key
            acc[color.hex.toLowerCase()] = color.name.toLowerCase();
            return acc;
        }, {});
    }, [selectedColors]);

    // =============================================================================
    // ⭐ 2. INITIALIZE STATE (Media Transformation) ⭐
    // =============================================================================
    
    const initialVariantImages = useMemo(() => {
        // Use 'images' from the API response
        const images = initialValues.images || []; 
        
        return (images).reduce((acc, img) => {
            // API image object has colorCode, not colorName
            const colorCode = img.colorCode ? img.colorCode.toLowerCase() : null;
            
            // Look up the color name using the code map
            const colorName = colorCodeToNameMap[colorCode]; 
            
            if (img.url && colorName) {
                // Group images by the actual colorName (e.g., 'blue')
                acc[colorName] = [...(acc[colorName] || []), img.url];
            }
            return acc;
        }, {});
    }, [initialValues.images, colorCodeToNameMap]);


    const initialVariantModels = useMemo(() => {
        // Use 'threeDModels' from the API response (or 'models' if renamed)
        const models = initialValues.threeDModels || []; 
        
        return (models).reduce((acc, model) => {
            // Assuming 3D models ALSO use colorCode
            const colorCode = model.colorCode ? model.colorCode.toLowerCase() : null;
            const colorName = colorCodeToNameMap[colorCode]; 
            
            if (model.url && colorName) {
                acc[colorName] = [...(acc[colorName] || []), model.url];
            }
            return acc;
        }, {});
    }, [initialValues.threeDModels, colorCodeToNameMap]);

    const [formValues, setFormValues] = useState(() => ({
        ...initialValues,
        variants: initialValues.variants || [], 
    }));
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // ⭐ Initialize media state using the calculated useMemo results ⭐
    const [variantImages, setVariantImages] = useState(initialVariantImages);
    const [variantModels, setVariantModels] = useState(initialVariantModels); 
    const [selectedImage, setSelectedImage] = useState(null); // For image selection/preview

    // ----------------------------------------------------------------------------------
    // 3. IMAGE UPLOAD LOGIC 
    // ----------------------------------------------------------------------------------
    const handleDropUploadAndUpdateState = useCallback(async (acceptedFiles, colorName) => {
        const lowerCaseName = colorName.toLowerCase();
        
        const filesWithPreviews = acceptedFiles.map(file => 
            Object.assign(file, { preview: URL.createObjectURL(file), isUploading: true })
        );
        
        setVariantImages(prev => ({
            ...prev,
            [lowerCaseName]: [...(prev[lowerCaseName] || []).filter(item => typeof item === 'string'), ...filesWithPreviews] 
        }));
        
        const uploadPromises = acceptedFiles.map(file => uploadFileToBackend(file));
        
        try {
            const uploadedUrls = await Promise.all(uploadPromises);
            
            setVariantImages(prev => {
                const existingPermanentFiles = (prev[lowerCaseName] || []).filter(item => typeof item === 'string');
                const finalFiles = [...existingPermanentFiles, ...uploadedUrls];
                return { ...prev, [lowerCaseName]: finalFiles };
            });
            
            filesWithPreviews.forEach(file => URL.revokeObjectURL(file.preview));

        } catch (error) {
            console.error(`Failed to upload images for ${colorName}:`, error);
            setVariantImages(prev => ({
                ...prev,
                [lowerCaseName]: (prev[lowerCaseName] || []).filter(item => typeof item === 'string')
            }));
        }
    }, [uploadFileToBackend]);

    // ----------------------------------------------------------------------------------
    // 4. 3D MODEL UPLOAD LOGIC 
    // ----------------------------------------------------------------------------------
    const handleModelDropUploadAndUpdateState = useCallback(async (acceptedFiles, colorName) => {
        const lowerCaseName = colorName.toLowerCase();
        
        const filesWithPreviews = acceptedFiles.map(file => 
            Object.assign(file, { preview: URL.createObjectURL(file), isUploading: true })
        );
        
        setVariantModels(prev => ({
            ...prev,
            [lowerCaseName]: [...(prev[lowerCaseName] || []).filter(item => typeof item === 'string'), ...filesWithPreviews] 
        }));
        
        const uploadPromises = acceptedFiles.map(file => uploadFileToBackend(file));
        
        try {
            const uploadedUrls = await Promise.all(uploadPromises);
            
            setVariantModels(prev => {
                const existingPermanentFiles = (prev[lowerCaseName] || []).filter(item => typeof item === 'string');
                const finalFiles = [...existingPermanentFiles, ...uploadedUrls];
                return { ...prev, [lowerCaseName]: finalFiles };
            });
            
            filesWithPreviews.forEach(file => URL.revokeObjectURL(file.preview));

        } catch (error) {
            console.error(`Failed to upload models for ${colorName}:`, error);
            setVariantModels(prev => ({
                ...prev,
                [lowerCaseName]: (prev[lowerCaseName] || []).filter(item => typeof item === 'string')
            }));
        }
    }, [uploadFileToBackend]);


    // --- FORM HANDLERS (Manual Implementation) ---
    const handleChange = useCallback((e) => {
        e.persist();
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
        
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    }, [touched]);

    const handleBlur = useCallback((e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    }, []);

    // ----------------------------------------------------------------------------------
    // 5. SUBMISSION HANDLER (Transforms media data for parent component)
    // ----------------------------------------------------------------------------------
    const handleSubmit = useCallback((e) => {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        
        const fieldsToCheck = ["bulletPoints", "composition"]; 
        let newErrors = {};
        let formIsValid = true;

        fieldsToCheck.forEach(name => {
            const value = formValues[name];
            const error = validateField(name, value);
            if (error) {
                newErrors[name] = error;
                formIsValid = false;
            }
        });

        const newTouched = fieldsToCheck.reduce((acc, name) => ({ ...acc, [name]: true }), {});
        setTouched(prev => ({ ...prev, ...newTouched }));
        setErrors(newErrors);

        if (formIsValid) {
            
            // Transform variantImages into a flat array of { url, colorCode, colorName }
            const allProductImages = Object.entries(variantImages).flatMap(([colorKey, urls]) => {
                // Find the color variant using the normalized key
                const colorVariant = selectedColors.find(c => c.name.toLowerCase() === colorKey);
                const colorCode = colorVariant ? colorVariant.hex : '#FFFFFF'; 
                const originalColorName = colorVariant ? colorVariant.name : colorKey;

                // Filter out non-string items (i.e., temporary file objects) before submitting
                return urls.filter(item => typeof item === 'string').map(url => ({
                    url: url,
                    colorCode: colorCode,
                    colorName: originalColorName, 
                }));
            });

            // Transform variantModels into a flat array of { url, colorCode, colorName }
            const allProductModels = Object.entries(variantModels).flatMap(([colorKey, urls]) => {
                const colorVariant = selectedColors.find(c => c.name.toLowerCase() === colorKey);
                const colorCode = colorVariant ? colorVariant.hex : '#FFFFFF';
                const originalColorName = colorVariant ? colorVariant.name : colorKey;

                // Filter out non-string items (i.e., temporary file objects) before submitting
                return urls.filter(item => typeof item === 'string').map(url => ({
                    url: url,
                    colorCode: colorCode, // Include colorCode for models too, for consistency
                    colorName: originalColorName, 
                }));
            });

            const finalData = {
                ...formValues,
                productImages: allProductImages, // Transformed for API payload
                productModels: allProductModels, // Transformed for API payload
            };
            
            handleFormSubmit(finalData);
        }
    }, [formValues, handleFormSubmit, variantImages, variantModels, selectedColors]);


    // --- UTILITY/MEDIA HANDLERS ---
    const onSortEndUtility = useCallback((filesArray, oldIndex, newIndex) => {
        return arrayMove(filesArray, oldIndex, newIndex);
    }, []);

    // Image-specific handlers
    const handleClick = useCallback((index) => {
        setSelectedImage(index);
    }, []);

    const handleVariantDelete = useCallback((colorName, urlToDelete) => {
        const lowerCaseName = colorName.toLowerCase();
        setVariantImages(prev => ({
            ...prev,
            [lowerCaseName]: (prev[lowerCaseName] || []).filter(item => item !== urlToDelete)
        }));
    }, []);

    const handleVariantSortEnd = useCallback((colorName, { oldIndex, newIndex }) => {
        const lowerCaseName = colorName.toLowerCase();
        setVariantImages(prev => {
            const currentFiles = prev[lowerCaseName] || [];
            const sortedFiles = onSortEndUtility(currentFiles, oldIndex, newIndex);
            return { ...prev, [lowerCaseName]: sortedFiles };
        });
    }, [onSortEndUtility]);

    // **⭐ NEW: Model-specific handlers (Extracted using useCallback for stability) ⭐**
    const handleModelDelete = useCallback((colorName, urlToDelete) => {
        const lowerCaseName = colorName.toLowerCase();
        setVariantModels(prev => ({
            ...prev,
            [lowerCaseName]: (prev[lowerCaseName] || []).filter(item => item !== urlToDelete)
        }));
    }, []);

    const handleModelSortEnd = useCallback((colorName, { oldIndex, newIndex }) => {
        const lowerCaseName = colorName.toLowerCase();
        setVariantModels(prev => {
            const currentFiles = prev[lowerCaseName] || [];
            const sortedFiles = onSortEndUtility(currentFiles, oldIndex, newIndex);
            return { ...prev, [lowerCaseName]: sortedFiles };
        });
    }, [onSortEndUtility]);


    // --- DYNAMICALLY BUILD THE imageHandlerMap ---
    const imageHandlerMap = useMemo(() => {
        return selectedColors.reduce((map, colorVariantObject) => {
            const colorName = colorVariantObject.name;
            const lowerCaseName = colorName.toLowerCase();

            map[lowerCaseName] = {
                files: variantImages[lowerCaseName] || [], 
                handleDrop: (acceptedFiles) => handleDropUploadAndUpdateState(acceptedFiles, colorName), 
                handleDelete: (urlToDelete) => handleVariantDelete(colorName, urlToDelete),
                handleSortEnd: (sortProps) => handleVariantSortEnd(colorName, sortProps),
                selectedImage: selectedImage, 
                handleClick: handleClick
            };
            return map;
        }, {});
    }, [selectedColors, variantImages, selectedImage, handleClick, handleVariantDelete, handleVariantSortEnd, handleDropUploadAndUpdateState]); 

    // --- DYNAMICALLY BUILD THE modelHandlerMap (3D MODEL LOGIC) ---
    const modelHandlerMap = useMemo(() => {
        return selectedColors.reduce((map, colorVariantObject) => {
            const colorName = colorVariantObject.name;
            const lowerCaseName = colorName.toLowerCase();

            map[lowerCaseName] = {
                files: variantModels[lowerCaseName] || [],
                handleDrop: (acceptedFiles) => handleModelDropUploadAndUpdateState(acceptedFiles, colorName),
                handleDelete: (urlToDelete) => handleModelDelete(colorName, urlToDelete), // Using stable callback
                handleSortEnd: (sortProps) => handleModelSortEnd(colorName, sortProps), // Using stable callback
            };
            return map;
        }, {});
    }, [selectedColors, variantModels, handleModelDelete, handleModelSortEnd, handleModelDropUploadAndUpdateState]); // Added new dependencies

    // ⭐ 6. Expose handleSubmit via ref
    useImperativeHandle(ref, () => ({
        submit: handleSubmit,
    }));

    return (
        <form onSubmit={handleSubmit}>
            {/* 1. First Form Card (Product Details & Media) */}
            <Card sx={{ ...styles.leftCard, mb: 3 }}>
                
                {/* Product Variants Table (Updates formValues.variants) */}
                <ProductVariantsTableComponent
                    variants={formValues.variants}
                    setFormValues={setFormValues} 
                    selectedColors={selectedColors}
                    selectedSizes={selectedSizes}
                />
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    
                    {/* Bullet Points */}
                    <SymTextField
                        label="Bullet Points"
                        name="bulletPoints"
                        placeholder="Begin listing key bullet points describing your product for customers to quickly view"
                        value={formValues.bulletPoints || ''} 
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
                        value={formValues.composition || ''} 
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.composition && !!errors.composition}
                        helperText={touched.composition && errors.composition}
                        multiline={true}
                    />

                    {/* IMAGES */}
                    <ProductImageUploader
                        colorVariants={selectedColors}
                        imageHandlerMap={imageHandlerMap}
                    />

                    {/* 3D MODELS SECTION */}
                    <ProductModelUploader
                        colorVariants={selectedColors}
                        modelHandlerMap={modelHandlerMap}
                    />

                </Box>
            </Card>
        </form>
    );
});

export default ProductForm2;