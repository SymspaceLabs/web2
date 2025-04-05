// ======================================================================================
// Form 4
// ======================================================================================

import { useEffect } from 'react';
import { FlexBox } from '@/components/flex-box';
import UploadFileForm from '@/components/custom-forms/onboarding/UploadFileForm';

// ======================================================================================

function Form4 ({
    setFormData,
    user,
    step,
    uploadedFile,
    setUploadedFile
}) {

    useEffect(() => {
        setUploadedFile(user?.files || []);
    }, [user]); // Depend on `user` so it updates after submission

    
    // Update formData whenever state changes
    useEffect(() => {
        setFormData({
            "files": uploadedFile
        });
    }, [uploadedFile]);
    
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            <UploadFileForm
                uploadedFile={uploadedFile}
                setUploadedFile={setUploadedFile}
            />
        </FlexBox>
    );
}

export default Form4;