// ===============================================================
// Add Size Dialog
// ===============================================================

import { H1 } from '@/components/Typography';
import React, { useRef, useState } from 'react'
import { FlexBox, FlexCol } from '@/components/flex-box';
import { uploadFileToBackend } from '@/services/productService';
import { InfoOutlined, CloudUpload as CloudUploadIcon, Image as ImageIcon } from "@mui/icons-material";
import { TextField, MenuItem, Box, Typography, Button, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";

// ===============================================================

// Base size options (unchanged)
const baseSizes = [
    { name: 'S' },
    { name: 'M' },
    { name: 'L' },
    { name: 'XL' },
    { name: 'XXL' },
];

// --- CORE COMPONENT ---
const SizeDialog = ({
    newSize,
    open,
    onClose,
    sizeChartUrl, // Current size chart URL (string) or temporary File object (from parent state)
    handleChangeSize, // Function to update the size name (newSize)
    handleAddCustomSize, // Parent function: EXPECTS final URL string as argument now
    handleChangeSizeChartUrl // Parent function: TEMPORARILY updates size chart state with File/URL for display
}) => {
    // --- LOCAL STATE ---
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    
    const fileInputRef = useRef(null);

    // 1. Trigger the hidden file input click
    const handleUploadClick = () => {
        if (!isUploading) {
            fileInputRef.current.click();
        }
    };

    // 2. Handle file selection: store the File object locally and update parent state for display
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file); // Store the actual File object
            handleChangeSizeChartUrl(file); // Update parent state for display
        }
        event.target.value = null; // Clear input value
    };
    
    // Helper to display file name
    const getFileName = (urlOrFile) => {
        if (selectedFile) return selectedFile.name; 
        
        if (!urlOrFile) return 'No image uploaded';
        
        if (typeof urlOrFile === 'string') {
            const parts = urlOrFile.split('/');
            const filename = parts[parts.length - 1]; 
            return filename.length > 30 ? `${filename.substring(0, 30)}...` : filename;
        }
        
        if (urlOrFile instanceof File) {
            return urlOrFile.name;
        }

        return 'Image uploaded';
    };

    // 3. COMBINED HANDLER: Uploads file using the reusable API function and then adds the size.
    const handleUploadAndAddSize = async () => {
        if (!newSize) {
            alert("Please enter a size name.");
            return;
        }
        
        let finalUrl = sizeChartUrl; // Start with the existing URL (if in edit mode)

        if (selectedFile) {
            // --- 1. S3/MinIO Upload Logic using the shared helper ---
            setIsUploading(true);
            try {
                // Call the existing reusable upload function
                const uploadedUrl = await uploadFileToBackend(selectedFile);
                finalUrl = uploadedUrl; // Capture the final public URL
                
            } catch (error) {
                // The API helper handles console logging; just show an alert here.
                alert("Size Chart Upload failed. Please check the console for details.");
                setIsUploading(false);
                return; 
            }
        }
        
        // --- 2. Add Size to Parent State ---
        // Pass the new size name and the final URL back to the parent
        handleAddCustomSize(finalUrl); 
        
        // --- 3. Clean up and close ---
        setSelectedFile(null); // Reset local file state
        setIsUploading(false);
        onClose();
    };

    return (
        <div>
            <Dialog 
                open={open} 
                onClose={onClose} 
                PaperProps={{ 
                    sx: { 
                        background: "rgba(255, 255, 255, 0.4)", 
                        boxShadow: "inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)", 
                        backdropFilter: "blur(10.0285px)", 
                        borderRadius: "80px", 
                        width: "1039px", 
                    }, 
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: "20px 46px", gap: "5px", background: "rgba(188, 188, 188, 0.1)", boxShadow: "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)", backdropFilter: "blur(50px)" }}>
                    <DialogTitle sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#000' }}>Size selection</DialogTitle>
                    <DialogContent sx={{ width:'100%', px:0 }}>
                        
                        {/* Size name */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <H1 sx={{ color: '#000' }}>
                                Size name
                            </H1>
                            <Tooltip title="Enter the product's name">
                                <IconButton>
                                    <InfoOutlined sx={{ color: '#000', fontSize: 10 }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <TextField 
                            fullWidth 
                            label="" 
                            value={newSize} 
                            onChange={handleChangeSize} 
                            InputProps={{ style: { backgroundColor: 'white', color: '#000', borderRadius: '2px', },}} 
                        />

                        {/* Base size */}
                        <Box sx={{ display: 'flex', alignItems: 'center', pt: 3 }}>
                            <H1 sx={{ color: '#000' }}>
                                Base size
                            </H1>
                            <Tooltip title="Select a base size">
                                <IconButton>
                                    <InfoOutlined sx={{ color: '#000', fontSize: 10 }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <TextField
                            select
                            fullWidth
                            size="medium"
                            InputProps={{
                                style: {
                                backgroundColor: 'white',
                                color: '#000',
                                boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)',
                                borderRadius: '8px',
                                },
                            }}
                        >
                            {baseSizes.map((baseSize) => (
                                <MenuItem key={baseSize.name} value={baseSize.name}>
                                {baseSize.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Size Chart Upload Functionality */}
                        <FlexCol sx={{ pt: 3 }}>
                            <FlexBox sx={{ alignItems: 'center' }}>
                                <H1 sx={{ color: '#000' }}>
                                    Size Chart Image
                                </H1>
                                <Tooltip title="Upload the size chart image. This will be uploaded to S3/MinIO immediately upon selecting 'Add'.">
                                <IconButton>
                                    <InfoOutlined sx={{ color: '#000', fontSize: 10 }} />
                                </IconButton>
                                </Tooltip>
                            </FlexBox>

                            {/* Hidden File Input */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            
                            {/* Upload Button */}
                            <Button
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                                onClick={handleUploadClick}
                                fullWidth
                                disabled={isUploading}
                                sx={{ 
                                    mt: 1,
                                    py: 1.5,
                                    backgroundColor: 'white',
                                    color: '#000',
                                    borderRadius: '8px',
                                    boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    }
                                }}
                            >
                                {isUploading ? 'Uploading...' : (sizeChartUrl || selectedFile) ? 'Change Size Chart Image' : 'Upload Size Chart Image'}
                            </Button>

                            {/* Display uploaded file name or a placeholder */}
                            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                {isUploading ? (
                                    <CircularProgress size={20} sx={{ color: '#000' }} />
                                ) : (
                                    <ImageIcon sx={{ color: (sizeChartUrl || selectedFile) ? 'green' : '#000' }} fontSize="small" />
                                )}
                                <Typography variant="body2" sx={{ color: '#000' }}>
                                    {getFileName(sizeChartUrl)}
                                </Typography>
                            </Box>
                        </FlexCol>
                    </DialogContent>
                    <DialogActions sx={{ width:'100%'}}>
                        <Button onClick={onClose} disabled={isUploading}>Cancel</Button>
                        <Button 
                            onClick={handleUploadAndAddSize} // ⬅️ The combined handler
                            variant="contained" 
                            color="info" 
                            type="submit" 
                            disabled={isUploading || !newSize} // Disable if uploading or size name is missing
                            sx={{ padding: '5px 46px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px' }}
                        >
                            {isUploading ? 'Adding...' : 'Add'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    )
}

export default SizeDialog;