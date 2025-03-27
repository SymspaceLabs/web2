// ==================================================================================
// Contact Form in Onboarding Multi Step Form
// ==================================================================================

import { Span } from '@/components/Typography';
import { FlexBox } from '@/components/flex-box';
import { SymCheckbox, SymTextField, SymDatePicker } from '@/components/custom-inputs';

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
    isChecked,
    setIsChecked,
}) {
   
    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleDobChange = (date) => setDob(date);
    const handlePhoneChange = (event) => setPhone(event.target.value);
    const handleBusinessPhoneChange = (event) => setBusinessPhone(event.target.value);
    const handleAgreementChange = (event) => setIsChecked(event.target.checked);
    
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

            {/* CHECKBOX */}
            <SymCheckbox onChange={handleAgreementChange} checked={isChecked} toolTipText={toolTipText.owner} content={<Span display={{ color:'#fff', sm: "inline-block" }}>
                By checking the box, you confirm the Primary Contact is a beneficial owner of the business</Span>}
            />

        </FlexBox>
    );
}

export default ContactForm;

const toolTipText = {
    contactPerson: 'The Primary contact person is the person who has access to the Selling on Symspace payment account, provides the registration information on behalf of the account holder (the registered seller) and initiates transactions such as disbursements and refunds. Actions taken by the Primary point of contact are deemed to be taken by the account holder.',
    gmv: 'Average Annual Gross Merchandise Value (GMV) is the total value of all goods sold on a platform over a year on average, before any deductions for fees, discounts, or returns.',
    owner: 'A beneficial owner is a natural person who directly or indirectly owns more than 25% of the shares or voting rights of the business, or that own the business via other means. If no individual qualifies under the criteria mentioned then any individual who holds the position of senior manager is considered a beneficial owner.'
}
