import { FlexBox } from '@/components/flex-box';
import { SymMultiFileUploader } from '@/components/custom-inputs';

function UploadFileForm ({
    uploadedFile,
    setUploadedFile,
}) {
           
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            
            {/* File Upload Field */}
            <SymMultiFileUploader
                title=""
                setUploadedFile={setUploadedFile}
                uploadedFile={uploadedFile}
            />

        </FlexBox>
    );
}

export default UploadFileForm;
