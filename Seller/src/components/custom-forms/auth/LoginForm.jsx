
import Link from 'next/link';
import { Span } from '@/components/Typography';
import { FlexBox } from '@/components/flex-box';
import { FormControlLabel, Checkbox } from "@mui/material";
import { SymPasswordInput, SymTextField } from '@/components/custom-inputs';

function LoginForm ({
    email,
    setEmail,
    password,
    setPassword,
    setIsChecked
}) {
   
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleAgreementChange = (event) => setIsChecked(event.target.checked);
    const handlePasswordChange = (e) => setPassword(e.target.value);
       
    
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            
            {/* EMAIL */}
            <SymTextField
                title="Email" 
                value={email} 
                placeholder="Email" 
                onChange={handleEmailChange}
            />

            {/* PASSWORD */}
            <SymPasswordInput
                title="Password" 
                value={password} 
                placeholder="Password" 
                onChange={handlePasswordChange}
                error=''
                showError={false}
            />
            
            {/* Additional Controls: Remember Me, Error Label, Forgot Password */}
            <FlexBox sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, py: 2 }}>
                <FormControlLabel
                    name="agreement"
                    sx={{ margin: 0 }}
                    onChange={handleAgreementChange}
                    control={<Checkbox size="small" color="secondary" sx={{ color:'#fff' }} />}
                    label={<Span sx={{ color:'#fff' }}>Remember me</Span>}
                />
                                
                <Link href="/forgot-password" passHref>
                    <Span sx={{ textDecoration: 'underline', cursor: 'pointer', color:'#fff' }}>
                        Forgot your password?
                    </Span>
                </Link>
            </FlexBox>
        </FlexBox>
    );
}

export default LoginForm;
