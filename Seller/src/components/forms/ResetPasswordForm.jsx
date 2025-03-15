import { FlexBox } from '../../components/flex-box';
import { SymPasswordInput } from '../../components/custom-inputs';

function ResetPasswordForm ({
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    retypeError,
    setRetypeError,
}) {
   
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    
        if (repeatPassword && newPassword !== retypePassword) {
            setRetypeError("Passwords do not match");
        } else {
            setRetypeError("");
        }
    };
    const handleRepeatPasswordChange = (e) => {
        const newRetypePassword = e.target.value;
        setRepeatPassword(newRetypePassword);
    
        if (password && newRetypePassword !== password) {
            setRetypeError("Passwords do not match");
        } else {
            setRetypeError("");
        }
    };
       
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            
            {/* PASSWORD */}
            <SymPasswordInput
                title="Password" 
                value={password} 
                placeholder="Password" 
                onChange={handlePasswordChange}
                error={retypeError}
            />
            
            {/* Confirm Password */}
            <SymPasswordInput
                title="Confirm password" 
                value={repeatPassword} 
                placeholder="Confirm password" 
                onChange={handleRepeatPasswordChange}
                error={retypeError}
            />

        </FlexBox>
    );
}

export default ResetPasswordForm;
