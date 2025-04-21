import { FlexBox } from '@/components/flex-box';
import { SymFileUploader } from '@/components/custom-inputs';

function UploadFileForm ({
    uploadedFile,
    setUploadedFile,
}) {
           
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            
            {/* File Upload Field */}
            <SymFileUploader
                title=""
                setUploadedFile={setUploadedFile}
                uploadedFile={uploadedFile}
                multiple={true}
            />

        </FlexBox>
    );
}

export default UploadFileForm;
