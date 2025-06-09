import { useMediaQuery } from '@mui/material';
import { FlexBox } from '@/components/flex-box';
import { SymPasswordInput, SymTextField } from '@/components/custom-inputs';

function SignUpForm ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    retypePassword,
    setRetypePassword,
    retypeError,
    setRetypeError,
    errors,
    isFormSubmitted
}) {
    const isMobile = useMediaQuery('(max-width:600px)');
    
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    
        if (retypePassword && newPassword !== retypePassword) {
            setRetypeError("Passwords do not match");
        } else {
            setRetypeError("");
        }
    };
    
    const handleRetypePasswordChange = (e) => {
        const newRetypePassword = e.target.value;
        setRetypePassword(newRetypePassword);
    
        if (password && newRetypePassword !== password) {
            setRetypeError("Passwords do not match");
        } else {
            setRetypeError("");
        }
    };
    
    
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            
            {/* EMAIL */}
            <SymTextField
                title="Email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
            />

            {/* FIRST & LAST NAME */}
            <FlexBox justifyContent="center" flexDirection={{sm:"column", md:"row"}} gap={3} width="100%">
                <SymTextField
                    title="First Name"
                    value={firstName}
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                />
                <SymTextField
                    title="Last Name"
                    value={lastName}
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                />
            </FlexBox>

            {/* PASSWORD */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymPasswordInput
                    title="Password"
                    value={password}
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    error={retypeError}
                    forceValidate={isFormSubmitted}
                />
                <SymPasswordInput
                    title="Retype Password"
                    value={retypePassword}
                    placeholder="Retype Password"
                    onChange={handleRetypePasswordChange}
                    error={retypeError}
                    forceValidate={isFormSubmitted}
                />
            </FlexBox>
        </FlexBox>
    );
}

export default SignUpForm;
