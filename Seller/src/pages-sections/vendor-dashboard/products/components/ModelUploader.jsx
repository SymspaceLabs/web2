// ./components/ModelUploader.jsx

import React from 'react';
import { Box, Tooltip, IconButton } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { H1 } from "@/components/Typography"; // Assuming H1 is imported correctly
import DropZone3D from './DropZone3D'; // Path adjustment might be needed
import { SortableList } from "./ImageUploadComponents"; // Path adjustment might be needed

const ModelUploader = ({ files, handleDrop, handleDelete, handleSortEnd, title }) => {
    
    // Create a curry function for handleFileDelete to match the SortableList prop structure
    const curriedHandleDelete = (file) => () => {
        handleDelete(file);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <H1 color='#FFF' mr={1}>
                    {title}
                </H1>
                <Tooltip title="Upload 3D model files like .glb">
                    <IconButton>
                        <InfoOutlined sx={{ color: '#fff', fontSize: 10 }} />
                    </IconButton>
                </Tooltip>
            </Box>
            <DropZone3D
                onChange={handleDrop}
                title="Drag & drop 3D model here"
                imageSize="Upload .glb file only"
                acceptFormats={{ "model/glb": [".glb"] }}
                multiple={true}
            />
            {/* The SortableList uses the passed handlers and files */}
            <SortableList 
                files={files} 
                handleFileDelete={curriedHandleDelete} 
                onSortEnd={handleSortEnd} 
                axis="xy" 
            />
        </Box>
    );
};

export default ModelUploader;