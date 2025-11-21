// New file: ./components/ModelSortableList.jsx (or internal to the main file)

import { SortableContainer } from "react-sortable-hoc";
import { Box } from "@mui/material";
import ModelVariantDropZone from './ModelVariantDropZone'; // Import the new DropZone
import { SortableItem } from "./ImageUploadComponents"; // Reuse the SortableItem (it should handle non-image files if possible, see Note below)
import ModelSortableItem from './ModelSortableItem'; // Use the dedicated component

// ========================================================================
// 5. SortableList Component for Models
// ========================================================================
const ModelSortableList = SortableContainer(({ files, handleFileDelete, maxFiles = 1, handleDrop }) => {
    const canUpload = files.length < maxFiles;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, flexWrap: 'wrap', gap: 2 }}>
            {/* Render Uploaded Models (using the same SortableItem for dragging/deleting) */}
            {files.map((file, index) => (
                <ModelSortableItem 
                    key={`model-item-${index}`} 
                    index={index} 
                    file={file}
                    fileIndex={index} 
                    handleFileDelete={handleFileDelete} 
                    // Note: selected/handleClick props are often unnecessary for single models
                />
            ))}
            
            {/* Render Model DropZone Placeholder */}
            {canUpload && (
                <ModelVariantDropZone
                    onChange={handleDrop}
                    filesCount={files.length}
                    maxFiles={maxFiles}
                />
            )}
        </Box>
    );
});

export default ModelSortableList;

// NOTE: You must ensure that the existing 'SortableItem' (Section 4 in your original code) 
// can handle files that are NOT images, otherwise it will try to render a preview URL 
// that doesn't work for 3D models. For 3D files, it should probably show a placeholder 
// icon instead of an image component. For this example, I assume SortableItem 
// just shows the file index and delete button.