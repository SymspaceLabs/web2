
import { useRef, useState } from "react";
import { FlexBox } from "../flex-box";
import { H1 } from "../Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const SymFileUploader = ({ title, uploadedFile, setUploadedFile, multiple=false }) => {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setUploadedFile((prevFiles) => (Array.isArray(prevFiles) ? [...prevFiles, ...newFiles] : [...newFiles]));
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
        setUploadedFile((prevFiles) => (Array.isArray(prevFiles) ? [...prevFiles, ...droppedFiles] : [...droppedFiles]));
    };

    return (
        <FlexBox flexDirection="column" gap={1}>
            <H1 color="white" mb={0.5}>
                {title}  
            </H1>
            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileChange} 
                accept=".pdf,.doc,.docx"
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

            {uploadedFile.length > 0 && (
                <FlexBox flexDirection="column" gap={2}>
                    {uploadedFile.map((file, index) => (
                        <FlexBox key={index} justifyContent="space-between" alignItems="center" sx={fileCardStyle}>
                            <H1 color="#FFF" fontSize='14px'>
                                {file.name}  
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

export default SymFileUploader;

const fileCardStyle = {
    width: '100%',
    p: 1, 
    borderRadius: '8px',
    boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
    background:'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)',
    color: '#fff',
    fontSize:'20px',
    border:'1px solid #FFF'
};
