import React, { useRef } from "react";
import { FlexBox } from '../flex-box';
import { SymTextField } from '@/components/custom-inputs';
import SymDropdown from '@/components/custom-inputs/SymDropdown';
import SymCheckbox from '@/components/custom-inputs/SymCheckbox';
import { Span } from '../Typography';
import BoxLink from '@/pages-sections/sessions/components/box-link';
import { useMediaQuery, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function JobForm ({
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    linkedin,
    setLinkedin,
    role,
    setRole,
    comments,
    setComments,
    uploadedFile,
    setUploadedFile,
    isChecked,
    setIsChecked
}) {
    const isMobile = useMediaQuery('(max-width:600px)');
    
    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleRepeatPasswordChange = (event) => setRepeatPassword(event.target.value);
    const handleLinkedinChange = (event) => setLinkedin(event.target.value);
    const handleRoleChange = (event) => setRole(event.target.value);
    const handleCommentsChange = (event) => setComments(event.target.value);
    const handleAgreementChange = (event) => setIsChecked(event.target.checked);
    const handleFileChange = (event) => setUploadedFile(event.target.files[0]);

    const fileInputRef = useRef(null);
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger file input click
        }
    };

    
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            {/* ROW 1 */}
            <SymTextField title="Email" value={email} placeholder="Email" onChange={handleEmailChange} />

            {/* ROW 2 */}
            <FlexBox justifyContent="center" flexDirection={isMobile? "column" : "row"} gap={3} width="100%">
                <SymTextField title="First Name" value={firstName} placeholder="First Name" onChange={handleFirstNameChange} />
                <SymTextField title="Last Name" value={lastName} placeholder="Last Name" onChange={handleLastNameChange} />
            </FlexBox>

            {/* ROW 3 */}
            <FlexBox justifyContent="center" flexDirection={isMobile? "column" : "row"} gap={3} width="100%">
                <SymTextField title="Password" value={password} placeholder="******" onChange={handlePasswordChange} />
                <SymTextField title="Repeat password" value={repeatPassword} placeholder="******" onChange={handleRepeatPasswordChange} />
            </FlexBox>

            {/* ROW 4 */}
            <FlexBox justifyContent="center" flexDirection={isMobile? "column" : "row"} gap={3} width="100%">
                <SymTextField title="Linkedin" value={linkedin} placeholder="Linkedin URL" onChange={handleLinkedinChange} />
                <SymDropdown title="Role" value={role} onChange={handleRoleChange} options={roleOptions} />
            </FlexBox>

            
            <SymTextField title="Comment" value={comments} placeholder="Enter Comment here" onChange={handleCommentsChange} multiline={true} />

            {/* File Upload Field */}
            <FlexBox flexDirection="column" gap={1}>
                <label style={{ color: "#fff", fontWeight: "bold" }}>Upload Resume</label>
                <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />

                {/*Click here to upload*/}
                <FlexBox justifyContent="center" gap={1} sx={{ background: '#000', width: '100%', p: 2, borderRadius: '5px', cursor: 'pointer' }} onClick={handleUploadClick}>
                    <CloudUploadIcon style={{ color: '#fff', fontSize: 22 }} />
                    <Typography fontFamily='Elemental End' color="#fff" height={10}>
                        Upload files
                    </Typography>
                </FlexBox>
                {uploadedFile && <Span>{uploadedFile.name}</Span>}
            </FlexBox>

            <SymCheckbox onChange={handleAgreementChange} checked={isChecked} content={<Span display={{ color:'#fff', sm: "inline-block" }}>By clicking Sign Up, you agree to our <BoxLink title="Terms" href="/legal#terms" />, <BoxLink title="Privacy Policy" href="/legal#privacy-policy" /> and <BoxLink title="Cookies" href="/legal#cookies" />. You may receive SMS Notifications from us and can opt out any time.</Span>} />
        </FlexBox>
    );
}

export default JobForm;

const roleOptions = [
    '3D Product Creation',
    'AR Marketplace',
    'Staging Homes/Rentals',
    'Plans and Pricing Information',
    'FAQs',
    'Book a Demo',
    'Getting Started',
    'Help with Symspace Platform',
    'Careers'
]
