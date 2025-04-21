

import { FlexBox } from '@/components/flex-box';
import { SymTextField } from '@/components/custom-inputs';

function ForgotPasswordForm ({ email, setEmail }) {
   
    const handleEmailChange = (event) => setEmail(event.target.value);      
    
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            {/* EMAIL */}
            <SymTextField
                title="Email" 
                value={email} 
                placeholder="Email" 
                onChange={handleEmailChange}
            />
        </FlexBox>
    );
}

export default ForgotPasswordForm;
