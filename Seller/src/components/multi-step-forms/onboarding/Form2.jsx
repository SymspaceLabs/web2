import { Divider, useMediaQuery } from '@mui/material';
import { FlexBox } from '@/components/flex-box';
import { SymPasswordInput, SymTextField } from '@/components/custom-inputs';
import BasicInfoForm from '@/components/custom-forms/onboarding/BasicInfoForm';
import ContactForm from '@/components/custom-forms/onboarding/ContactForm';

function Form2 ({
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

            <BasicInfoForm />
            <Divider />
            <ContactForm />

        </FlexBox>
    );
}

export default Form2;
