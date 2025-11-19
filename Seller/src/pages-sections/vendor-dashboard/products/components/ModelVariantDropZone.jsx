// New file: ./components/ModelVariantDropZone.jsx (or internal to the main file)

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material"; 
import UploadIcon from "@mui/icons-material/CloudUpload";
import { ImageWrapper } from "./ImageUploadComponents"; // Re-using ImageWrapper styles

// --- Component Definition ---
const ModelVariantDropZone = ({
    onChange,
    filesCount,
    maxFiles = 1, // Typically only one 3D model per variant is needed
    title = "Upload .GLB Model",
}) => {
    
    // Define GLB acceptance format
    const acceptFormats = { "model/gltf-binary": [".glb"] };

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
                outline: "none",
                // Adjust size for better fit or keep it the same as images
                width: 150, 
                height: 150, 
            }} 
            {...getRootProps()}
        >
            <input {...getInputProps()} />

            <Box display="flex" flexDirection="column" alignItems="center" p={1}>
                <UploadIcon sx={{ fontSize: 40, color: 'grey.500' }} />
                <Typography variant="caption" color="grey.600" mt={1} textAlign="center">
                    {title}
                </Typography>
                <Typography variant="caption" fontWeight={600} color="grey.700">
                    {filesCount}/{maxFiles}
                </Typography>
            </Box>
        </ImageWrapper>
    );
}

export default ModelVariantDropZone;