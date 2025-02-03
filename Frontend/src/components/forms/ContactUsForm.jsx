import React from 'react';
import { FlexBox } from '../flex-box';
import { SymTextField } from '../custom-inputs';
import SymDropdown from '../custom-inputs/SymDropdown';
import SymCheckbox from '../custom-inputs/SymCheckbox';
import { Span } from '../Typography';
import BoxLink from '@/pages-sections/sessions/components/box-link';
import { useMediaQuery } from '@mui/material';

function ContactUsForm ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    topic,
    setTopic,
    message,
    setMessage,
    isChecked,
    setIsChecked
}) {
    const isMobile = useMediaQuery('(max-width:600px)');
    
    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleTopicChange = (event) => setTopic(event.target.value);
    const handleMessageChange = (event) => setMessage(event.target.value);
    const handleAgreementChange = (event) => setIsChecked(event.target.checked);
    
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            <FlexBox justifyContent="center" flexDirection={isMobile? "column" : "row"} gap={3} width="100%">
                <SymTextField title="First Name" value={firstName} placeholder="First Name" onChange={handleFirstNameChange} />
                <SymTextField title="Last Name" value={lastName} placeholder="Last Name" onChange={handleLastNameChange} />
            </FlexBox>

            <SymTextField title="Email" value={email} placeholder="Email" onChange={handleEmailChange} />
            
            <SymDropdown
                title="How can we help?"
                value={topic}
                onChange={handleTopicChange}
                options={[
                    '3D Product Creation',
                    'AR Marketplace',
                    'Staging Homes/Rentals',
                    'Plans and Pricing Information',
                    'FAQs',
                    'Book a Demo',
                    'Getting Started',
                    'Help with Symspace Platform',
                    'Careers'
                ]}
            />
            <SymTextField title="Message" value={message} placeholder="Enter your message here" onChange={handleMessageChange} multiline={true} />
            <SymCheckbox
                onChange={handleAgreementChange} 
                checked={isChecked}
                content={
                    <Span display={{ color:'#fff', sm: "inline-block" }}>
                        By clicking Submit, you agree to our <BoxLink title="Terms" href="/legal#terms" />, <BoxLink title="Privacy Policy" href="/legal#privacy-policy" /> and <BoxLink title="Cookies" href="/legal#cookies" />. You may receive SMS Notifications from us and can opt out any time.
                    </Span>     
                }
            />
        </FlexBox>
    );
}

export default ContactUsForm;
