import { useCallback, useState } from "react";
import { H1 } from "@/components/Typography";
import { useDropzone } from "react-dropzone";
import Close from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { InfoOutlined, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/CloudUpload";
import { 
    Box, 
    Typography, 
    Tooltip, 
    IconButton, 
    Accordion, 
    AccordionSummary, 
    AccordionDetails,
    Chip // Added Chip for visual feedback on the color
} from "@mui/material"; 
import { SortableContainer, SortableElement } from "react-sortable-hoc"; 


// ========================================================================
// 1. Helper Functions (Unchanged)
// ========================================================================
const getImageUrl = (file) => {
    return file.preview || (typeof file === 'string' ? file : null);
}


// ========================================================================
// 2. Styled Components (Unchanged)
// ========================================================================

// Styled Box for the image container (unchanged)
const ImageWrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isPrimary' && prop !== 'isPlaceholder',
})(({ isPrimary, isPlaceholder, theme }) => ({
    position: 'relative',
    width: 150, 
    height: 150, 
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: isPlaceholder ? 'pointer' : 'grab',
    border: isPlaceholder 
        ? `2px dashed ${theme.palette.grey[400]}` 
        : (isPrimary ? `2px solid ${theme.palette.text.primary}` : `1px solid ${theme.palette.grey[300]}`),
    transition: 'border 0.2s',
    '&:hover .delete-button': {
        opacity: 1,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isPlaceholder ? theme.palette.grey[50] : 'transparent',
}));

// Styled Box for the index number in a circle (unchanged)
const IndexCircle = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 8,
    left: 8,
    width: 24,
    height: 24,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main, 
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 700,
    zIndex: 10,
}));

// Styled IconButton for delete (unchanged)
const DeleteButton = styled(IconButton)({
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 0,
    width: 24,
    height: 24,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0, 
    transition: 'opacity 0.2s',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    '& svg': {
        fontSize: 16,
    },
    zIndex: 11,
});


// ========================================================================
// 3. DropZone Component (Internal - Unchanged)
// ========================================================================
const SimpleDropZone = ({
    onChange,
    filesCount,
    maxFiles = 10,
    title = "Upload Image",
    acceptFormats = { "image/*": [".png", ".gif", ".jpeg", ".jpg"] }
}) => {
    const onDrop = useCallback(acceptedFiles => onChange(acceptedFiles), [onChange]);
    const {
        getRootProps,
        getInputProps
    } = useDropzone({
        onDrop,
        maxFiles: maxFiles - filesCount, 
        multiple: true,
        accept: acceptFormats,
        disabled: filesCount >= maxFiles
    });

    return (
        <ImageWrapper 
            isPlaceholder 
            sx={{ 
                opacity: filesCount >= maxFiles ? 0.5 : 1, 
                transition: "all 250ms ease-in-out",
                outline: "none"
            }} 
            {...getRootProps()}
        >
            <input {...getInputProps()} />

            <Box display="flex" flexDirection="column" alignItems="center">
                <UploadIcon sx={{ fontSize: 40, color: 'grey.500' }} />
                <Typography variant="caption" color="grey.600" mt={1}>
                    {title}
                </Typography>
                <Typography variant="caption" fontWeight={600} color="grey.700">
                    {filesCount}/{maxFiles}
                </Typography>
            </Box>
        </ImageWrapper>
    );
}


// ========================================================================
// 4. SortableItem Component (Unchanged)
// ========================================================================
export const SortableItem = SortableElement(({ file, fileIndex, isDragging, selected, handleClick, handleFileDelete }) => {
    const isPrimary = fileIndex === 0;
    const imageUrl = getImageUrl(file);
    
    // Content of the image item
    const ImageContent = (
        <ImageWrapper 
            isPrimary={isPrimary} 
            sx={{ opacity: isDragging ? 0.7 : 1 }}
            onClick={() => handleClick && handleClick(fileIndex)}
        >
            {/* Display the sequence number */}
            <IndexCircle>{fileIndex + 1}</IndexCircle>
            
            {/* Delete button: e.stopPropagation() is crucial here! */}
            <DeleteButton 
                className="delete-button" 
                onClick={(e) => { 
                    e.stopPropagation(); 
                    console.log('--- DEBUG: Delete Clicked for:', file.name);
                    handleFileDelete(file); 
                }} 
                size="small"
            >
                <Close />
            </DeleteButton>
            
            {/* Image content */}
            {imageUrl && (
                <Box 
                    component="img" 
                    src={imageUrl} 
                    alt={`Product Image ${fileIndex + 1}`} 
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
            )}
        </ImageWrapper>
    );

    return (
        <Box sx={{ p: 0.5 }}>
            {isPrimary ? (
                // Primary Image: Wrap in Tooltip
                <Tooltip title="This image will be used as the primary thumbnail for this variant" placement="top">
                    {ImageContent}
                </Tooltip>
            ) : (
                // Other images: Just render content
                ImageContent
            )}
        </Box>
    );
});


// ========================================================================
// 5. SortableList Component (Unchanged)
// ========================================================================
export const SortableList = SortableContainer(({ files, selectedImage, handleClick, handleFileDelete, maxFiles = 10, handleDrop }) => {
    const canUpload = files.length < maxFiles;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, flexWrap: 'wrap', gap: 2 }}>
            {/* Render Uploaded Images */}
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
            
            {/* Render DropZone Placeholder */}
            {canUpload && (
                <SimpleDropZone
                    onChange={handleDrop}
                    filesCount={files.length}
                    maxFiles={maxFiles}
                />
            )}
        </Box>
    );
});


// ========================================================================
// 6. Accordion Uploader Component (Renamed/Modified for Clarity)
// ========================================================================
/**
 * A self-contained image uploader wrapped in an MUI Accordion for a single variant.
 */
const ColorVariantImageUploader = ({ 
    colorName, // The color variant name (e.g., 'blue')
    files, 
    handleDrop, 
    handleDelete, 
    handleSortEnd,
    selectedImage,
    handleClick,
    maxFiles = 10
}) => {
    const title = `${colorName.charAt(0).toUpperCase() + colorName.slice(1)} Images`;
    
    // Simple color style for the chip based on the color name
    const colorStyle = {
        bgcolor: colorName,
        color: ['white', 'black', 'yellow', 'lime'].includes(colorName.toLowerCase()) ? 'black' : 'white',
    };

    return (
        <Accordion sx={{ mb: 2, bgcolor: 'background.paper', borderRadius: '8px !important' }} defaultExpanded>
            {/* Accordion Summary/Header */}
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    bgcolor: 'grey.100', 
                    borderRadius: '8px 8px 0 0 !important',
                    '& .MuiAccordionSummary-content': { my: 1 }
                }}
            >
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" fontWeight={600} color="text.primary" mr={2}>
                        {title}
                    </Typography>
                    {/* Visual representation of the color variant */}
                    <Chip 
                        label={colorName} 
                        size="small"
                        sx={colorStyle}
                    />
                    <Typography variant="body2" color="grey.600" ml={2}>
                        ({files.length} / {maxFiles} images)
                    </Typography>
                </Box>
            </AccordionSummary>

            {/* Accordion Details/Content */}
            <AccordionDetails>
                {/* SortableList which now includes the DropZone placeholder */}
                <SortableList 
                    files={files} 
                    selectedImage={selectedImage}
                    handleClick={handleClick}
                    handleFileDelete={handleDelete} 
                    onSortEnd={handleSortEnd}
                    handleDrop={handleDrop} 
                    maxFiles={maxFiles}
                    axis="xy" 
                    distance={1}
                />
                
                {/* Text for no images uploaded */}
                {files.length === 0 && (
                    <Typography variant="body2" color="text.disabled" mt={2}>
                        Upload images specific to the **{colorName}** variant.
                    </Typography>
                )}
            </AccordionDetails>
        </Accordion>
    );
};


// ========================================================================
// 7. MultiAccordionProductImageUploader (Default Export - Dynamic)
// ========================================================================

/**
 * Main component to display multiple image uploaders, one for each color variant.
 * * @param {string[]} colorVariants - An array of color names (e.g., ['blue', 'red', 'green']).
 * @param {object} imageHandlerMap - An object containing files and handlers mapped by color name.
 * * * Example of imageHandlerMap structure:
 * {
 * 'blue': {
 * files: state.blueFiles, 
 * handleDrop: handleBlueDrop, 
 * handleDelete: handleBlueDelete, 
 * ...
 * },
 * 'red': {
 * files: state.redFiles, 
 * handleDrop: handleRedDrop, 
 * handleDelete: handleRedDelete, 
 * ...
 * }
 * }
 */
const MultiAccordionProductImageUploader = ({ colorVariants, imageHandlerMap, maxFiles = 10 }) => {

    if (!colorVariants || colorVariants.length === 0) {
        return (
            <Box>
                <H1 color='#FFF' mb={1}>
                    Product Variant Images
                </H1>
                <Typography variant="body1" color="text.disabled">
                    No color variants selected. Please define product variants to upload corresponding images.
                </Typography>
            </Box>
        );
    }
    
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <H1 color='#FFF' mr={1}>
                    Product Variant Images
                </H1>
                <Tooltip title="Upload and manage images separately for each product color variant.">
                    <IconButton>
                        <InfoOutlined sx={{ color: '#fff', fontSize: 18 }} />
                    </IconButton>
                </Tooltip>
            </Box>
            
            {/* Render one image uploader for each color variant */}
            {colorVariants.map((colorName) => {
                const handlers = imageHandlerMap[colorName.toLowerCase()] || {};
                
                return (
                    <ColorVariantImageUploader
                        key={colorName}
                        colorName={colorName}
                        files={handlers.files || []} // Use files from the map or an empty array
                        handleDrop={handlers.handleDrop || (() => console.warn(`No drop handler for ${colorName}`))}
                        handleDelete={handlers.handleDelete || (() => console.warn(`No delete handler for ${colorName}`))}
                        handleSortEnd={handlers.handleSortEnd || (() => console.warn(`No sort handler for ${colorName}`))}
                        selectedImage={handlers.selectedImage || -1}
                        handleClick={handlers.handleClick || (() => {})}
                        maxFiles={maxFiles}
                    />
                );
            })}

        </Box>
    );
};

export default MultiAccordionProductImageUploader;