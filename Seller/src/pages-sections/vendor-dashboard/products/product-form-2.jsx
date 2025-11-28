// In ProductForm2.jsx

//========================================================================
// Create Product Form 2
//========================================================================

import styles from './styles';
import SymTextField from './components/SymTextField';
import ProductVariantsTable from "./components/ProductVariantsTable";
import ProductImageUploader from './components/ProductImageUploader';
import ProductModelUploader from './components/ProductModelUploader';

import { arrayMove } from "react-sortable-hoc";
import { Box, Card } from "@mui/material"; 
import { uploadFileToBackend, uploadProductModel } from '@/services/productService';
import { useState, useCallback, useMemo, forwardRef, useImperativeHandle } from "react";

//========================================================================

const validateField = (name, value) => {
    let error = "";
    if (name === "composition") {
        if (!value || String(value).trim() === "") {
            error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required!`;
        }
    }
    return error;
};

//========================================================================

const ProductForm2 = forwardRef((props, ref) => {
    const { 
        initialValues, 
        handleFormSubmit,
        selectedColors, // This contains { name, hex } from the parent
        selectedSizes,
        setParentVariants,
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
        // Use 'threeDModels' from the API response
        const models = initialValues.threeDModels || []; 
        
        // ➡️ DEBUG: Check the map built from selectedColors
        console.log("DEBUG: Color Code to Name Map:", colorCodeToNameMap);
        
        return (models).reduce((acc, model) => {
            // Ensure colorCode from API is standardized for lookup (e.g., lowercase)
            const colorCode = model.colorCode ? model.colorCode.toLowerCase() : null;
            
            // ➡️ DEBUG: Check model data coming from initialValues
            console.log(`DEBUG: Processing Model URL: ${model.url} with ColorCode: ${colorCode}`);
            
            // Look up the color name using the code map
            const colorName = colorCodeToNameMap[colorCode]; 
            
            // ➡️ DEBUG: Check lookup result
            if (!colorName) {
                console.warn(`WARNING: Could not find color name for code ${colorCode}. Model will not be prepopulated.`);
            }

            if (model.url && colorName) {
                // Group models by the actual colorName (e.g., 'green')
                const lowerCaseName = colorName.toLowerCase();
                acc[lowerCaseName] = [...(acc[lowerCaseName] || []), model.url];
                
                // ➡️ DEBUG: Model successfully mapped
                console.log(`DEBUG: Mapped Model to Color: ${lowerCaseName}`);
            }
            return acc;
        }, {});
    }, [initialValues.threeDModels, colorCodeToNameMap]); // This dependency array looks correct

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


    // 🚨 1. Use a dedicated state for variants based on initialValues.variants
    const [variants, setVariants] = useState(initialValues.variants || []);

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
    // 4. 3D MODEL UPLOAD LOGIC (UPDATED TO CALL updateProduct)
    // ----------------------------------------------------------------------------------
    const handleModelDropUploadAndUpdateState = useCallback(async (acceptedFiles, colorName) => {
        const lowerCaseName = colorName.toLowerCase();
        
        // 1. Preview: Create temporary file objects for UI feedback
        const filesWithPreviews = acceptedFiles.map(file => 
            Object.assign(file, { preview: URL.createObjectURL(file), isUploading: true })
        );
        
        // 2. Update State: Show temporary preview immediately
        setVariantModels(prev => ({
            ...prev,
            [lowerCaseName]: [...(prev[lowerCaseName] || []).filter(item => typeof item === 'string'), ...filesWithPreviews] 
        }));
        
        // 3. Upload: Send to S3 (using product ID if available, or 'temp')
        const productId = formValues.id || 'temp';
        const uploadPromises = acceptedFiles.map(file => uploadProductModel(file, productId));
        
        try {
            const uploadedUrls = await Promise.all(uploadPromises);
            
            // 4. Success: Replace temporary previews with permanent S3 URLs in local state
            setVariantModels(prev => {
                const existingPermanentFiles = (prev[lowerCaseName] || []).filter(item => typeof item === 'string');
                const finalFiles = [...existingPermanentFiles, ...uploadedUrls];
                return { ...prev, [lowerCaseName]: finalFiles };
            });
            
            // Clean up previews
            filesWithPreviews.forEach(file => URL.revokeObjectURL(file.preview));

            // 🛑 NO API CALL (updateProduct) HERE. 
            // The URL is now in local state, waiting for the user to click "Next".

        } catch (error) {
            console.error(`Failed to upload models for ${colorName}:`, error);
            // Revert state on error
            setVariantModels(prev => ({
                ...prev,
                [lowerCaseName]: (prev[lowerCaseName] || []).filter(item => typeof item === 'string')
            }));
        }
    }, [formValues.id, uploadProductModel]); // Removed updateProduct dependency


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
        
        const fieldsToCheck = ["composition"]; 
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

            // ⭐ CALL TRANSFORMATION FUNCTION HERE
            const finalVariantsForAPI = getTransformedVariantsForAPI(variants);
            
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

            // ⭐ THIS LOGIC SENDS THE URLS TO THE PARENT ⭐
            // It reads from the local 'variantModels' state we updated in step 1 & 2
            // 1. Prepare 3D Models Data for API Payload
            const allProductModels = Object.entries(variantModels).flatMap(([colorKey, urls]) => {
                const colorVariant = selectedColors.find(c => c.name.toLowerCase() === colorKey);
                
                // Use the color code associated with the color name
                const colorCode = colorVariant ? colorVariant.hex : '#FFFFFF'; 

                // Filter out any files still uploading (objects) and keep only S3 URLs (strings)
                return urls.filter(item => typeof item === 'string').map(url => ({
                    // ⭐ FIELD NAME CHANGE: API requires 'url'
                    url: url, 
                    // ⭐ FIELD NAME CHANGE: API requires 'colorCode'
                    colorCode: colorCode, 
                    // We omit 'key' and 'colorName' as they are not needed in this specific API format.
                }));
            });

            const finalData = {
                ...formValues,
                productImages: allProductImages, 
                threeDModels: allProductModels,
                variants: finalVariantsForAPI,
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

    // --- FIX: Updated handleModelDelete to persist deletion ---
    const handleModelDelete = useCallback((colorName, fileKeyToDelete) => {
        const lowerCaseName = colorName.toLowerCase();
        
        setVariantModels(prev => {
            const currentFiles = prev[lowerCaseName] || [];
            
            // Filter out the item (whether it's a string URL or a File object)
            const updatedFiles = currentFiles.filter(item => {
                if (typeof item === 'string') return item !== fileKeyToDelete;
                if (item && item.preview) return item.preview !== fileKeyToDelete;
                return true;
            });
            
            return { ...prev, [lowerCaseName]: updatedFiles };
        });
        
        // 🛑 NO API CALL HERE.
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

    // ⭐ TRANSFORMER FUNCTION (Adjusted to final API structure) ⭐
    const getTransformedVariantsForAPI = useCallback((currentRawVariantValues) => {
        return Object.values(currentRawVariantValues).map(v => {
            // NOTE: We only keep the fields required by the final API structure.
            
            // Ensure price fields are converted from string inputs back to numbers
            const priceValue = parseFloat(v.price) || 0;
            const salePriceValue = parseFloat(v.salePrice) || 0;
            const costValue = parseFloat(v.cost) || 0;
            
            // Ensure 'supply' is mapped to 'stock' and converted to a number
            const stockValue = parseInt(v.supply) || 0;
            const materialValue = v.material || "";

            return {
                // Keep the ID for updating existing records
                "id": v.id, 
                
                // Map the cleaned numerical values
                "price": priceValue,
                "stock": stockValue, 
                "salePrice": salePriceValue,
                "cost": costValue,
                "material": materialValue
                // CRITICAL: We DO NOT include 'color', 'size', 'cost', or 'material' 
                // as they are not in your desired final structure.
            };
        });
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <Card sx={{ ...styles.leftCard, mb: 3 }}>

                {/* Product Variants Table */}
                {!(selectedColors.length === 0 && selectedSizes.length === 0) ? (
                        <ProductVariantsTable
                            initialVariants={initialValues.variants || []}
                            colors={selectedColors.map((color) => color.name)}
                            sizes={selectedSizes.map((size) => size.name)}
                            onVariantsChange={(newVariants) => {
                                // 🚨 Update the local state
                                setVariants(newVariants);
                                // 🚨 Update the parent state immediately (optional, but safer)
                                setParentVariants(newVariants); 
                            }}
                        />
                    ) : null
                }
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    
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