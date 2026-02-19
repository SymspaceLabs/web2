import React from 'react';
import SymDropdown from '../inputs/sym-dropdown';
import SymTextField from '../inputs/sym-textfield';

interface ContactUsFormProps {
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  topic: string;
  setTopic: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  formSubmitted: boolean;
}

const ContactUsForm: React.FC<ContactUsFormProps> = ({
  fullName,
  setFullName,
  email,
  setEmail,
  topic,
  setTopic,
  message,
  setMessage,
  formSubmitted,
}) => {
  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setFullName(event.target.value);
  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setEmail(event.target.value);
  
  const handleTopicChange = (event: { target: { value: string } }) => 
    setTopic(event.target.value);
  
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setMessage(event.target.value);

  // Helper function to determine if an error should be shown for a field
  const showError = (value: string) => 
    formSubmitted && (!value || value.trim() === '');

  return (
    <div className="flex flex-col gap-6 w-full">
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
        error={showError(topic)}
        helperText={showError(topic) ? "Please select a topic." : ""}
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
    </div>
  );
};

export default ContactUsForm;