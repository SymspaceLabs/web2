// =======================================
// ContactUsForm
// =======================================

import { FlexBox } from '@/components/flex-box';
import { SymDropdown, SymTextField } from '@/components/custom-inputs';

// =======================================

function ContactUsForm ({
    fullName,
    setFullName,
    email,
    setEmail,
    topic,
    setTopic,
    message,
    setMessage,
    formSubmitted,
}) {

    const handleFullNameChange = (event) => setFullName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleTopicChange = (event) => setTopic(event.target.value);
    const handleMessageChange = (event) => setMessage(event.target.value);

    // Helper function to determine if an error should be shown for a field
    const showError = (value) => formSubmitted && (!value || (typeof value === 'string' && value.trim() === ''));

    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            {/* Using SymTextField's built-in error/helperText props */}
            <SymTextField
                title="Full Name"
                value={fullName}
                placeholder="Full Name"
                onChange={handleFullNameChange}
                error={showError(fullName)}
                helperText={showError(fullName) ? "Full Name is required." : ""}
            />

            <SymTextField
                title="Email"
                value={email}
                placeholder="Email"
                onChange={handleEmailChange}
                error={showError(email)}
                helperText={showError(email) ? "Email is required." : ""}
            />

            {/*
                IMPORTANT: You mentioned SymDropdown as well.
                For SymDropdown to show errors similarly, it MUST also
                accept `error` and `helperText` props and internally
                render a FormHelperText based on them, just like SymTextField does.
                If it doesn't, you'll need to update SymDropdown's component code.
            */}
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
                error={showError(topic)} // Pass error prop
                helperText={showError(topic) ? "Please select a topic." : ""} // Pass helperText prop
            />

            <SymTextField
                title="Message"
                value={message}
                placeholder="Enter your message here"
                onChange={handleMessageChange}
                multiline={true}
                error={showError(message)}
                helperText={showError(message) ? "Message is required." : ""}
            />
        </FlexBox>
    );
}

export default ContactUsForm;