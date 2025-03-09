import { useMediaQuery } from '@mui/material';
import { Span } from '@/components/Typography';
import { FlexBox } from '@/components/flex-box';
import { BoxLink } from '@/pages-sections/sessions/components';
import { SymPasswordInput, SymTextField } from '@/components/custom-inputs';

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
    location,
    setLocation,
    ein,
    setEin
}) {
    const isMobile = useMediaQuery('(max-width:600px)');
    
    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleBusinessNameChange = (event) => setBusinessName(event.target.value);
    const handleWebsiteChange = (event) => setWebsite(event.target.value);

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

    const handleLocationChange = (event) => setLocation(event.target.value);
    const handleEinChange = (event) => setEin(event.target.value);

    
    
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            
            {/* EMAIL */}
            <SymTextField title="Business Email" value={email} placeholder="Email" onChange={handleEmailChange} />

            {/* FIRST & LAST NAME */}
            <FlexBox justifyContent="center" flexDirection={isMobile? "column" : "row"} gap={3} width="100%">
                <SymTextField title="First Name" value={firstName} placeholder="First Name" onChange={handleFirstNameChange} />
                <SymTextField title="Last Name" value={lastName} placeholder="Last Name" onChange={handleLastNameChange} />
            </FlexBox>

            {/* ENTITY NAME & WEBSITE */}
            <FlexBox justifyContent="center" flexDirection={isMobile? "column" : "row"} gap={3} width="100%">
                <SymTextField title="Entity Name" value={businessName} placeholder="Business Name" onChange={handleBusinessNameChange} />
                <SymTextField title="Website" value={website} placeholder="Website" onChange={handleWebsiteChange} />
            </FlexBox>

            {/* PASSWORD */}
            <FlexBox justifyContent="center" flexDirection={isMobile? "column" : "row"} gap={3} width="100%">
                <SymPasswordInput title="Password" value={password} placeholder="Password" onChange={handlePasswordChange} error={retypeError} />
                <SymPasswordInput title="Retype Password" value={retypePassword} placeholder="Retype Password" onChange={handleRetypePasswordChange} error={retypeError} />
            </FlexBox>

            {/* BUSINESS LOCATION & EIN */}
            <FlexBox justifyContent="center" flexDirection={isMobile? "column" : "row"} gap={3} width="100%">
                <SymTextField title="Business Location" value={location} placeholder="City, State" onChange={handleLocationChange} />
                <SymTextField title="Employer Identification Number" value={ein} placeholder="EIN" onChange={handleEinChange} />
            </FlexBox>

            {/* Checkbox */}
            <Span display={{ color:'#fff', sm: "inline-block" }}>
                By clicking Sign Up, you agree to our <BoxLink title="Terms" href="/legal#terms" />, <BoxLink title="Privacy Policy" href="/legal#privacy-policy" /> and <BoxLink title="Cookies" href="/legal#cookies" />. You may receive SMS Notifications from us and can opt out any time.
            </Span> 
        </FlexBox>
    );
}

export default PartnerSignUpForm;
