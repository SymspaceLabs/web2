// New file: ./components/ProductModelUploader.jsx

import React from 'react';
import { Box, Typography, Tooltip, IconButton, Accordion, AccordionSummary, AccordionDetails, Chip } from "@mui/material"; 
import { H1 } from "@/components/Typography"; 
import { InfoOutlined, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import ModelSortableList from './ModelSortableList'; // Import the new list component

// ========================================================================
// Accordion for a Single Model Variant
// ========================================================================
const ColorVariantModelUploader = ({ 
    colorName,
    files, 
    handleDrop, 
    handleDelete, 
    handleSortEnd,
    maxFiles = 1 // Enforce a max of 1 model per variant
}) => {
    const title = `${colorName.charAt(0).toUpperCase() + colorName.slice(1)} 3D Model`;
    
    const colorStyle = {
        bgcolor: colorName,
        color: ['white', 'black', 'yellow', 'lime'].includes(colorName.toLowerCase()) ? 'black' : 'white',
    };

    return (
        <Accordion sx={{ mb: 2, bgcolor: 'background.paper', borderRadius: '8px !important' }} >
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
                    <Chip 
                        label={colorName} 
                        size="small"
                        sx={colorStyle}
                    />
                    <Typography variant="body2" color="grey.600" ml={2}>
                        ({files.length} / {maxFiles} models)
                    </Typography>
                </Box>
            </AccordionSummary>

            {/* Accordion Details/Content */}
            <AccordionDetails>
                <ModelSortableList // Use the specialized list component
                    files={files} 
                    handleFileDelete={handleDelete} 
                    onSortEnd={handleSortEnd}
                    handleDrop={handleDrop} 
                    maxFiles={maxFiles}
                    axis="xy" 
                    distance={1}
                />
                
                {files.length === 0 && (
                    <Typography variant="body2" color="text.disabled" mt={2}>
                        Upload the 3D model (GLB file) specific to the **{colorName}** variant.
                    </Typography>
                )}
            </AccordionDetails>
        </Accordion>
    );
};


// ========================================================================
// Main Component (Dynamic Model Uploader)
// ========================================================================

/**
 * @param {object[]} colorVariants - An array of color variant objects from state.
 * @param {object} modelHandlerMap - An object containing files and handlers mapped by color name.
 */
const ProductModelUploader = ({ colorVariants, modelHandlerMap, maxFiles = 1 }) => {

    if (!colorVariants || colorVariants.length === 0) {
        return (
            <Box>
                <H1 color='#FFF' mb={1}>
                    Product Variant 3D Models
                </H1>
                <Typography variant="body1" color="text.disabled">
                    No color variants selected. Please define product variants to upload corresponding 3D models.
                </Typography>
            </Box>
        );
    }
    
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <H1 color='#FFF' mr={1}>
                    Product Variant 3D Models
                </H1>
                <Tooltip title="Upload and manage 3D models separately for each product color variant (GLB files only).">
                    <IconButton>
                        <InfoOutlined sx={{ color: '#fff', fontSize: 18 }} />
                    </IconButton>
                </Tooltip>
            </Box>
            
            {/* Render one model uploader for each color variant */}
            {colorVariants.map((colorVariantObject) => {
                const colorName = colorVariantObject.name;

                if (typeof colorName !== 'string') return null;

                const handlers = modelHandlerMap[colorName.toLowerCase()] || {};
                
                return (
                    <ColorVariantModelUploader
                        key={colorName}
                        colorName={colorName}
                        files={handlers.files || []} 
                        handleDrop={handlers.handleDrop || (() => {})}
                        handleDelete={handlers.handleDelete || (() => {})}
                        handleSortEnd={handlers.handleSortEnd || (() => {})}
                        maxFiles={maxFiles}
                    />
                );
            })}

        </Box>
    );
};

export default ProductModelUploader;