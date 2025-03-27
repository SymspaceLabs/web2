// ===================================================================
// Onboarding Multi Step Form
// ===================================================================

import Form1 from './Form1';
import Form2 from './Form2';
import WelcomeCard from './WelcomeCard';
import { FlexBox } from '@/components/flex-box';

const OnboardingMultiStepForm = ({ 
    step,
    user,
    setFormData,
    setIsChecked,
    isChecked
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
                />
            }
            {/* {step === 3 && <Form3 /> }
            {step === 4 && <Form4 /> } */}
        </FlexBox>
    );
}

export default OnboardingMultiStepForm;
