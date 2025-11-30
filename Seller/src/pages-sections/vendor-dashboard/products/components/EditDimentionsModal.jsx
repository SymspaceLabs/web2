import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    Box, TextField, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { H4 } from '@/components/Typography'; // Assuming H4 is imported from your Typography component

// --- MODAL COMPONENT ---
const EditDimensionsModal = ({ variant, open, handleClose, handleSave }) => {
    const [localDimensions, setLocalDimensions] = useState(variant?.dimensions || { L: 0, W: 0, H: 0 });
    const [sizeChartFile, setSizeChartFile] = useState(variant?.sizeChartFile);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // Map the backend dimensions structure to the local state structure
        setLocalDimensions({
            L: variant?.dimensions?.length || 0,
            W: variant?.dimensions?.width || 0,
            H: variant?.dimensions?.height || 0,
        });
        setSizeChartFile(variant?.sizeChart); // Assuming 'sizeChart' is the prop name from the parent
    }, [variant]);
    
    const handleDimensionInput = (field, value) => {
        const numValue = Math.max(0, Number(value));
        setLocalDimensions(prev => ({ ...prev, [field]: numValue }));
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit check
                alert("File size exceeds 5MB limit.");
                return;
            }
            // NOTE: In a real application, you would upload the file here and get a URL/path back.
            // For now, we'll just store the file object or its name.
            setSizeChartFile(file); 
        }
    };

    const onSave = async () => {
        if (!variant || isSaving) return;

        // 1. Prepare data for API
        const dimensionsPayload = {
            L: localDimensions.L,
            W: localDimensions.W,
            H: localDimensions.H,
        };
        
        // NOTE: If sizeChartFile is a File object, you must upload it first and get the URL/path.
        // For this example, we assume sizeChartFile is either a string URL/path or a File object.
        // We will pass the current string URL/path or null if a new file was selected but not uploaded yet.
        let finalSizeChartFile = sizeChartFile;
        if (sizeChartFile && typeof sizeChartFile !== 'string') {
            // Placeholder for file upload logic:
            alert("File upload logic needs to be implemented before calling the dimensions API.");
            return;
        }

        try {
            setIsSaving(true);

            // 3. Update parent state and close modal
            // The parent component needs to know the new dimensions and sizeChart value.
            // We call the original handleSave with the new data structure.
            handleSave(
                {
                    unit: 'cm', // Assuming 'cm' is the unit
                    length: dimensionsPayload.L,
                    width: dimensionsPayload.W,
                    height: dimensionsPayload.H,
                }, 
                finalSizeChartFile
            );

        } catch (error) {
            console.error("Error updating variant dimensions:", error);
            alert("An error occurred while saving dimensions. Check console for details.");
        } finally {
            setIsSaving(false);
        }
    };

    if (!variant) return null;

    const fileName = sizeChartFile && typeof sizeChartFile !== 'string' ? sizeChartFile.name : sizeChartFile;
    const uploadText = fileName ? fileName : 'Upload Size Chart';

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <H4 sx={{ fontWeight: 'bold', fontSize: '18px', color: '#000' }}>SIZE SELECTION</H4>
                <Box component="span" sx={{ color: 'text.secondary', fontSize: '14px', mt: 0.5, display: 'block' }}>
                    {variant.color} {variant.size || ''}
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box mb={3}>
                    <H4 mb={1} sx={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>Dimensions (cm)</H4>
                    <Box display="flex" gap={2}>
                        <TextField
                            label="Length (L)"
                            type="number"
                            size="small"
                            value={localDimensions.L}
                            onChange={(e) => handleDimensionInput('L', e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Width (W)"
                            type="number"
                            size="small"
                            value={localDimensions.W}
                            onChange={(e) => handleDimensionInput('W', e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Height (H)"
                            type="number"
                            size="small"
                            value={localDimensions.H}
                            onChange={(e) => handleDimensionInput('H', e.target.value)}
                            fullWidth
                        />
                    </Box>
                </Box>
                
                <Box>
                    <H4 mb={1} sx={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>Size Chart</H4>
                    <Box 
                        sx={{ 
                            border: '2px dashed #ccc', 
                            borderColor: '#ccc',
                            borderRadius: '8px',
                            padding: '40px', 
                            textAlign: 'center', 
                            cursor: 'pointer',
                            backgroundColor: '#f9f9f9',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        component="label"
                        htmlFor={`size-chart-upload-${variant.color}-${variant.size}`}
                    >
                        <FileUploadIcon sx={{ fontSize: 40, color: '#007bff' }} />
                        <Box sx={{ mt: 1, fontWeight: 'bold', color: '#000' }}>
                            {uploadText}
                        </Box>
                        <Box sx={{ fontSize: '12px', color: 'text.secondary' }}>
                            PNG, JPG up to 5MB
                        </Box>
                        <input
                            id={`size-chart-upload-${variant.color}-${variant.size}`}
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                        />
                    </Box>
                    {fileName && (
                        <Box mt={1} sx={{ fontSize: '12px', textAlign: 'center' }}>
                            Currently uploaded: **{fileName}** <Button size="small" onClick={() => setSizeChartFile(null)}>Remove</Button>
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                {/* Cancel Button with custom styling */}
                <Button 
                    onClick={handleClose} 
                    variant="contained"
                    disabled={isSaving}
                    sx={{
                        backgroundColor: '#E0E0E0',
                        color: 'black',
                        borderRadius: 10,
                        padding: '10px 20px',
                        '&:hover': {
                            backgroundColor: '#D0D0D0',
                        }
                    }}
                >
                    Cancel
                </Button>
                {/* Save Button with custom styling */}
                <Button 
                    onClick={onSave} 
                    variant="contained" 
                    color="primary"
                    disabled={isSaving}
                    sx={{ 
                        borderRadius: 10,
                        padding: '10px 20px',
                    }}
                >
                    {isSaving ? 'Saving...' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDimensionsModal;
