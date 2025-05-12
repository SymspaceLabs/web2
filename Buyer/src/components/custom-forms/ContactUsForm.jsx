// =======================================
// Contadt
// =======================================

import { useMediaQuery } from '@mui/material';
import { FlexBox } from '@/components/flex-box';
import { SymDropdown, SymTextField } from '@/components/custom-inputs';

// =======================================

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
}) {

    const isMobile = useMediaQuery('(max-width:600px)');
    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleTopicChange = (event) => setTopic(event.target.value);
    const handleMessageChange = (event) => setMessage(event.target.value);
    
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
                    'Investor Relations',
                    'Careers',
                    'Other'
                ]}
            />
            <SymTextField title="Message" value={message} placeholder="Enter your message here" onChange={handleMessageChange} multiline={true} />
        </FlexBox>
    );
}

export default ContactUsForm;
