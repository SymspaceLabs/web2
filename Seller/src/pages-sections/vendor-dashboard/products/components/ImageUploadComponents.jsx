import { useCallback } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Close from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";
import { SortableContainer, SortableElement } from "react-sortable-hoc"; // Import necessary Sortable functions
import { H5, Small } from "@/components/Typography";

// --- Helper Functions ---
const getImageUrl = (file) => {
    return file.preview || (typeof file === 'string' ? file : null);
}

// --- DropZone Component ---
export function DropZone({
    onChange,
    title = "Drag & drop product image here",
    imageSize = "Upload 280*280 image",
    acceptFormats = { "image/*": [".png", ".gif", ".jpeg", ".jpg"] }
}) {
    const onDrop = useCallback(acceptedFiles => onChange(acceptedFiles), [onChange]);
    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        onDrop,
        maxFiles: 10,
        multiple: true,
        accept: acceptFormats
    });

    return (
        <Box py={4} px={{
            md: 10,
            xs: 4
        }} display="flex" minHeight="200px" alignItems="center" borderRadius="10px" border="1.5px dashed" flexDirection="column" borderColor="grey.300" justifyContent="center" textAlign="center" bgcolor={isDragActive ? "grey.200" : "grey.100"} sx={{
            transition: "all 250ms ease-in-out",
            outline: "none"
        }} {...getRootProps()}>
            <input {...getInputProps()} />

            <H5 mb={1} color="grey.600">
                {title}
            </H5>

            <Divider sx={{
                "::before, ::after": {
                    borderColor: "grey.300",
                    width: 70
                }
            }}>
                <Small color="text.disabled" px={1}>
                    OR
                </Small>
            </Divider>

            <Button type="button" variant="outlined" color="info" sx={{
                px: 4,
                my: 4
            }}>
                Select files
            </Button>

            <Small color="grey.600">{imageSize}</Small>
        </Box>
    );
}

// --- SortableItem Component ---

// Styled Box for the image container, to handle the primary image border
export const ImageWrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isPrimary',
})(({ isPrimary }) => ({
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'grab',
    border: isPrimary ? '2px solid black' : '2px solid transparent',
    transition: 'border 0.2s',
    '&:hover .delete-button': {
        opacity: 1,
    },
}));

// Styled Box for the index number in a circle
export const IndexCircle = styled(Box)({
    position: 'absolute',
    top: 4,
    left: 4,
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 600,
    zIndex: 10,
});

// Styled IconButton for delete
export const DeleteButton = styled(IconButton)({
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
        fontSize: 14,
    },
    zIndex: 11,
});

// SortableItem component... (KEEP UNCHANGED)
export const SortableItem = SortableElement(({ file, index, fileIndex, isDragging, selected, handleClick, handleFileDelete }) => (
    <UploadImageBox 
        key={index} 
        onClick={() => handleClick(index)} 
        sx={{
            position: 'relative',
            border: selected ? '3px solid white' : 'none', 
            opacity: isDragging ? 0.7 : 1, 
            cursor: 'grab',
        }}
    >
        <Box component="img" src={file.preview} width="100%" />
        <Typography 
            variant="caption" 
            sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                padding: '2px 5px',
                borderRadius: '4px',
            }}
        >
            {fileIndex + 1} 
        </Typography>
        <StyledClear onClick={() => handleFileDelete(file)} />
    </UploadImageBox>
));


// --- SortableList Component ---
export const SortableList = SortableContainer(({ files, selectedImage, handleClick, handleFileDelete }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, flexWrap: 'wrap', gap: 1 }}>
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
        </Box>
    );
});