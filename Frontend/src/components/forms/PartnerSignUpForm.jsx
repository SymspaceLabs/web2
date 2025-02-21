import { FlexBox } from '../flex-box';
import { SymPasswordInput, SymTextField, SymCheckbox } from '../custom-inputs';
import { Span } from '../Typography';
import BoxLink from '@/pages-sections/sessions/components/box-link';
import { useMediaQuery } from '@mui/material';

function PartnerSignUpForm ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    businessName,
    setBusinessName,
    website,
    setWebsite,
    password,
    setPassword,
    retypePassword,
    setRetypePassword,
    retypeError,
    setRetypeError,
    isChecked,
    setIsChecked
}) {
    const isMobile = useMediaQuery('(max-width:600px)');
    
    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleBusinessNameChange = (event) => setBusinessName(event.target.value);
    const handleWebsiteChange = (event) => setWebsite(event.target.value);

    const handleAgreementChange = (event) => setIsChecked(event.target.checked);

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
            <SymTextField title="Business Email" value={email} placeholder="Email" onChange={handleEmailChange} />

            {/* FIRST & LAST NAME */}
            <FlexBox justifyContent="center" flexDirection={isMobile? "column" : "row"} gap={3} width="100%">
                <SymTextField title="First Name" value={firstName} placeholder="First Name" onChange={handleFirstNameChange} />
                <SymTextField title="Last Name" value={lastName} placeholder="Last Name" onChange={handleLastNameChange} />
            </FlexBox>

            {/* BUSINESS NAME & WEBSITE */}
            <FlexBox justifyContent="center" flexDirection={isMobile? "column" : "row"} gap={3} width="100%">
                <SymTextField title="Business Name" value={businessName} placeholder="Business Name" onChange={handleBusinessNameChange} />
                <SymTextField title="Website" value={website} placeholder="Website" onChange={handleWebsiteChange} />
            </FlexBox>

            {/* PASSWORD */}
            <FlexBox justifyContent="center" flexDirection={isMobile? "column" : "row"} gap={3} width="100%">
                <SymPasswordInput title="Password" value={password} placeholder="Password" onChange={handlePasswordChange} error={retypeError} />
                <SymPasswordInput title="Retype Password" value={retypePassword} placeholder="Retype Password" onChange={handleRetypePasswordChange} error={retypeError} />
            </FlexBox>

            {/* Checkbox */}
            <SymCheckbox
                onChange={handleAgreementChange} 
                checked={isChecked}
                content={
                    <Span display={{ color:'#fff', sm: "inline-block" }}>
                        By clicking Sign Up, you agree to our <BoxLink title="Terms" href="/legal#terms" />, <BoxLink title="Privacy Policy" href="/legal#privacy-policy" /> and <BoxLink title="Cookies" href="/legal#cookies" />. You may receive SMS Notifications from us and can opt out any time.
                    </Span>     
                }
            />
        </FlexBox>
    );
}

export default PartnerSignUpForm;
