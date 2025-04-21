//============================================================
// Custom Image Uploader
//============================================================

import { FlexBox, FlexCol } from "../flex-box";
import { H1, Paragraph } from "../Typography";
import React, { useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LazyImage } from "../lazy-image";

//============================================================

const SymImageUploader = ({ title, subtitle, uploadedFile, setUploadedFile, multiple=false }) => {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        if (multiple) {
            setUploadedFile((prevFiles) =>
                Array.isArray(prevFiles) ? [...prevFiles, ...newFiles] : [...newFiles]
            );
        } else {
            setUploadedFile([newFiles[0]]);
        }
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleRemoveFile = (index) => {
        setUploadedFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(event.dataTransfer.files);
        if (multiple) {
            setUploadedFile((prevFiles) =>
                Array.isArray(prevFiles) ? [...prevFiles, ...droppedFiles] : [...droppedFiles]
            );
        } else {
            setUploadedFile([droppedFiles[0]]);
        }
    };

    return (
        <FlexBox flexDirection="column" gap={1}>
            <FlexCol>
                <H1 color="white" mb={0.5}>
                    {title}
                </H1>
                <Paragraph color="white" mb={0.5}>
                    {subtitle}
                </Paragraph>  
            </FlexCol>

            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileChange} 
                accept="image/*"
                multiple={multiple}
            />

            <FlexBox 
                justifyContent="center" 
                gap={1} 
                sx={{
                    background: isDragging ? '#222' : '#000',
                    width: '100%', 
                    p: 2, 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    border: isDragging ? '2px dashed #fff' : '2px solid transparent',
                    transition: 'background 0.3s ease-in-out, border 0.3s ease-in-out'
                }}
                onClick={handleUploadClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <CloudUploadIcon style={{ color: '#fff', fontSize: 22 }} />
                <H1 color="#fff" height={10}>
                    {isDragging ? "Drop files here" : "Upload files"}
                </H1>
            </FlexBox>

            {uploadedFile?.length > 0 && (
                <FlexBox flexDirection="column" gap={2}>
                    {uploadedFile?.map((file, index) => (
                        <FlexBox key={index} justifyContent="space-between" alignItems="center" sx={styles.fileCard}>
                            <LazyImage
                                // src={URL.createObjectURL(file)}
                                src={file instanceof File ? URL.createObjectURL(file) : file}
                                width={500}
                                height={500}
                                alt={file?.name}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    marginRight: '16px',
                                }}
                            />
                            <H1 fontSize="14px" mb={0.5}>
                                {file instanceof File ? file.name : file?.split('/').pop()}
                            </H1>

                            <DeleteIcon 
                                onClick={() => handleRemoveFile(index)}
                                sx={{ color: '#fff', cursor: 'pointer', fontSize: 22 }}
                            />
                        </FlexBox>
                    ))}
                </FlexBox>
            )}
        </FlexBox>
    );
};

export default SymImageUploader;

const styles = {
    fileCard : {
        width: '100%',
        p: 1, 
        borderRadius: '8px',
        boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
        background:'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)',
        color: '#fff',
        fontSize:'20px',
        border:'1px solid #FFF'
    }
};
