import { FlexBox } from '@/components/flex-box';
import { SymPasswordInput, SymTextField, SymDatePicker } from '@/components/custom-inputs';

function ContactForm ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    dob,
    setDob,

    phone, 
    setPhone,
    businessPhone, 
    setBusinessPhone,

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
   
    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleDobChange = (event) => setDob(event.target.value);

    const handlePhoneChange = (event) => setPhone(event.target.value);
    const handleBusinessPhoneChange = (event) => setBusinessPhone(event.target.value);



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
            
            {/* First & Last Name */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="First Name" value={firstName} placeholder="First Name" onChange={handleFirstNameChange} />
                <SymTextField title="Last Name" value={lastName} placeholder="Last Name" onChange={handleLastNameChange} />
                <SymDatePicker title="Date Of Birth" value={dob} onChange={handleDobChange} />
            </FlexBox>

            {/* Phone & Business Phone */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="Phone Number" value={phone} placeholder="Phone Number" onChange={handlePhoneChange} />
                <SymTextField title="Business Phone Number" value={businessPhone} placeholder="Business Phone Number" onChange={handleBusinessPhoneChange} />
            </FlexBox>

        </FlexBox>
    );
}

export default ContactForm;

const toolTipText = {
    contactPerson: 'The Primary contact person is the person who has access to the Selling on Symspace payment account, provides the registration information on behalf of the account holder (the registered seller) and initiates transactions such as disbursements and refunds. Actions taken by the Primary point of contact are deemed to be taken by the account holder.',
    gmv: 'Average Annual Gross Merchandise Value (GMV) is the total value of all goods sold on a platform over a year on average, before any deductions for fees, discounts, or returns.',
    owener: 'A beneficial owner is a natural person who directly or indirectly owns more than 25% of the shares or voting rights of the business, or that own the business via other means. If no individual qualifies under the criteria mentioned then any individual who holds the position of senior manager is considered a beneficial owner.'
}
