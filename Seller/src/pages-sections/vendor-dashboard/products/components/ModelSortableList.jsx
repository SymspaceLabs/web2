// components/ModelSortableList.jsx

import React from 'react';
import { Box, Typography, CircularProgress, IconButton, Paper } from "@mui/material"; 
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Delete, DragIndicator, CheckCircle, CloudUpload } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

// ========================================================================
// 1. ModelSortableItem (Internal Component with Status Logic)
// ========================================================================
const ModelSortableItem = ({ file, id, handleDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 20 : 1,
    };

    // ⭐ CRITICAL: Check if file is a String (URL) or Object (File)
    // If it is a string, the upload is done.
    // If it is an object, it is still uploading.
    const isUploadComplete = typeof file === 'string';
    
    // Extract filename safely
    const fileName = isUploadComplete 
        ? file.split('/').pop() // Extract from URL
        : file.name;            // Extract from File Object

    return (
        <Paper
            ref={setNodeRef}
            style={style}
            elevation={isDragging ? 4 : 0}
            sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                mb: 1,
                border: '1px solid',
                borderColor: 'grey.200',
                bgcolor: 'background.paper',
                position: 'relative'
            }}
        >
            {/* Drag Handle */}
            <Box {...attributes} {...listeners} sx={{ cursor: 'grab', mr: 2, display: 'flex', alignItems: 'center', color: 'grey.400' }}>
                <DragIndicator fontSize="small" />
            </Box>

            {/* Icon Box */}
            <Box sx={{ 
                width: 40, 
                height: 40, 
                borderRadius: 1, 
                bgcolor: 'primary.main', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mr: 2
            }}>
               {/* ⭐ TOGGLE: Spinner vs Icon */}
               {!isUploadComplete ? (
                   <CircularProgress size={20} sx={{ color: 'white' }} />
               ) : (
                   <CloudUpload sx={{ color: 'white', fontSize: 20 }} /> 
               )}
            </Box>

            {/* Text Content */}
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <Typography variant="subtitle2" noWrap fontWeight={600}>
                    {fileName}
                </Typography>
                
                <Box display="flex" alignItems="center" gap={0.5}>
                    {/* ⭐ TOGGLE: Uploading Text vs Success Text */}
                    {isUploadComplete ? (
                        <>
                            <CheckCircle sx={{ fontSize: 14, color: 'success.main' }} />
                            <Typography variant="caption" color="success.main" fontWeight={600}>
                                Uploaded
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography variant="caption" color="warning.main" fontWeight={600}>
                                Uploading to Server...
                            </Typography>
                        </>
                    )}
                </Box>
            </Box>

            {/* Delete Button */}
            <IconButton 
                size="small" 
                // Pass the specific file/url to the delete handler
                onClick={() => handleDelete(file)} 
                sx={{ color: 'error.main', bgcolor: 'error.lighter', ml: 1 }}
            >
                <Delete fontSize="small" />
            </IconButton>
        </Paper>
    );
};

// ========================================================================
// 2. ModelSortableList (The Main Component)
// ========================================================================
const ModelSortableList = ({ files, handleDrop, handleFileDelete, onSortEnd, maxFiles = 1 }) => {
    
    // Initialize Dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        // Only accept 3D model files
        accept: { 'model/gltf-binary': ['.glb', '.gltf'] }, 
        maxFiles: maxFiles,
        disabled: files.length >= maxFiles
    });

    // Initialize DND Sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    // Handle Reordering
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            // Normalize items to IDs for index calculation
            const items = files.map(f => (typeof f === 'string' ? f : f.preview));
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);
            onSortEnd({ oldIndex, newIndex });
        }
    };

    // Prepare items for DndKit Context
    // We use the URL (string) or the Preview URL (object) as the unique ID
    const items = files.map(f => (typeof f === 'string' ? f : f.preview));
    const canUpload = files.length < maxFiles;

    return (
        <Box>
            {/* DND Context Wrapper */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    {files.map((file) => {
                        // Determine unique key
                        const key = typeof file === 'string' ? file : file.preview;
                        return (
                            <ModelSortableItem 
                                key={key} 
                                id={key} 
                                file={file} 
                                handleDelete={handleFileDelete} 
                            />
                        );
                    })}
                </SortableContext>
            </DndContext>

            {/* Dropzone Area (Hidden if maxFiles reached) */}
            {canUpload && (
                <Box
                    {...getRootProps()}
                    sx={{
                        mt: 2,
                        border: '2px dashed',
                        borderColor: isDragActive ? 'primary.main' : 'grey.300',
                        borderRadius: 2,
                        p: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                        bgcolor: isDragActive ? 'primary.lighter' : 'grey.50',
                        transition: 'all 0.2s',
                        '&:hover': { borderColor: 'primary.main', bgcolor: 'grey.100' }
                    }}
                >
                    <input {...getInputProps()} />
                    <CloudUpload sx={{ fontSize: 40, color: 'grey.400', mb: 1 }} />
                    <Typography variant="body2" color="textSecondary">
                        Drag & drop your 3D Model (.glb) here
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default ModelSortableList;