// New file: ./components/ModelSortableItem.jsx

import React from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import { Delete, Reorder, ViewInAr } from '@mui/icons-material';

// ========================================================================
// 1. Drag Handle Component 
// ========================================================================
const DragHandle = SortableHandle(() => (
    <Reorder sx={{ color: 'grey.500', mr: 2, cursor: 'grab', '&:active': { cursor: 'grabbing' } }} />
));

// ========================================================================
// 2. Base Component (The visual representation)
// ========================================================================
const ModelSortableItemComponent = ({ modelFile, handleFileDelete }) => {
    
    // Check if the item is a temporary file object (during upload) or a permanent URL string
    const isFileObject = typeof modelFile !== 'string';

    // 🛑 CRITICAL FIX: Use optional chaining to safely access 'preview' and avoid the crash.
    // If modelFile.preview is undefined, tempPreviewUrl will be undefined.
    const tempPreviewUrl = modelFile?.preview;
    
    // The key/URL used for display and deletion
    // If it's a temp object, use its preview property; otherwise, use the permanent URL string itself.
    const deleteKey = isFileObject ? tempPreviewUrl : modelFile;
    
    // Fallback display logic: Use the file name if the URL is not ready or is just a temp file
    // Note: displayUrl is only for rendering purposes, deleteKey is for state operations.
    const fileName = modelFile?.name // For file object
        ? modelFile.name
        : (typeof modelFile === 'string' 
            ? modelFile.split('/').pop().split('?')[0] // For permanent URL
            : 'Uploading File'); // Safest fallback

    // The status flags are also accessed safely
    const isUploading = isFileObject && modelFile?.isUploading;
    

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                p: 1.5, 
                mb: 1,
                borderRadius: '4px', 
                border: `1px solid ${isUploading ? 'warning.main' : 'grey.300'}`,
                bgcolor: 'background.default',
                transition: 'border 0.3s',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, flexGrow: 1 }}>
                <DragHandle /> 
                
                <ViewInAr color="primary" sx={{ mr: 1, fontSize: 24 }} />
                
                <Box sx={{ minWidth: 0, overflow: 'hidden' }}>
                    <Typography variant="body2" fontWeight={500} noWrap title={fileName}>
                        {fileName}
                    </Typography>
                    <Typography variant="caption" color={isUploading ? 'warning.main' : 'text.secondary'}>
                        {isUploading ? 'Uploading...' : 'Uploaded'}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                {isUploading && <CircularProgress size={20} sx={{ mr: 1 }} />}

                <IconButton 
                    size="small" 
                    // Use the safer deleteKey
                    onClick={() => handleFileDelete(deleteKey)}
                    disabled={isUploading} 
                    title="Remove model"
                >
                    <Delete color="error" sx={{ fontSize: 18 }} />
                </IconButton>
            </Box>
        </Box>
    );
};

// ========================================================================
// 3. Export as Sortable Element
// ========================================================================
export default SortableElement(ModelSortableItemComponent);