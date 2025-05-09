// ===================================================================
// Onboarding Multi Step Form
// ===================================================================

import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import Form4 from './Form4';
import WelcomeCard from './WelcomeCard';
import CongratsCard from './CongratsCard';
import { FlexBox } from '@/components/flex-box';

// ===================================================================

const OnboardingMultiStepForm = ({ 
    step,
    user,
    setFormData,
    setIsChecked,
    isChecked,
    uploadedFile,
    setUploadedFile,
    handleContinue,
    handleOpenStoreDialog
}) => {

    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            
            {/* Show WelcomeDialog, step==0 */}
            {step === 0 && 
                <WelcomeCard />
            } 
            {step === 1 && 
                <Form1 
                    setFormData={setFormData}
                    user={user} 
                    setIsChecked={setIsChecked} 
                    isChecked={isChecked}
                />
            }
            {step === 2 && 
                <Form2
                    setFormData={setFormData}
                    user={user}
                    step={step}
                    handleContinue={handleContinue}
                />
            }
            {step === 3 && 
                <Form3
                    setFormData={setFormData}
                    user={user}
                    step={step}
                    handleContinue={handleContinue}
                />
            }
           
            {step === 4 && 
                <Form4
                    setFormData={setFormData}
                    user={user}
                    step={step}
                    uploadedFile={uploadedFile}
                    setUploadedFile={setUploadedFile}
                    handleContinue={handleContinue}
                /> 
            }

            {/* Show Congrats, step==0 */}
            {step === 5 && 
                <CongratsCard
                    openStoreDialog={handleOpenStoreDialog}
                />
            } 

        </FlexBox>
    );
}

export default OnboardingMultiStepForm;
