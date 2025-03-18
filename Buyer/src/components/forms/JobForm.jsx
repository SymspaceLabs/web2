import { FlexBox } from '../flex-box';
import { SymTextField, SymMultiFileUploader } from '@/components/custom-inputs';
import SymDropdown from '@/components/custom-inputs/SymDropdown';
import SymCheckbox from '@/components/custom-inputs/SymCheckbox';
import { Span } from '../Typography';
import BoxLink from '@/pages-sections/sessions/components/box-link';
import { useMediaQuery } from '@mui/material';

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
    linkedInUrl,
    setLinkedInUrl,
    role,
    setRole,
    comments,
    setComments,
    uploadedFile,
    setUploadedFile,
    isChecked,
    setIsChecked,
    isAuthenticated
}) {
    const isMobile = useMediaQuery('(max-width:600px)');
    
    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleRepeatPasswordChange = (event) => setRepeatPassword(event.target.value);
    const handleLinkedInChange = (event) => setLinkedInUrl(event.target.value);
    const handleRoleChange = (event) => setRole(event.target.value);
    const handleCommentsChange = (event) => setComments(event.target.value);
    const handleAgreementChange = (event) => setIsChecked(event.target.checked);
      
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
            {!isAuthenticated &&
                <FlexBox justifyContent="center" flexDirection={isMobile? "column" : "row"} gap={3} width="100%">
                    <SymTextField title="Password" value={password} placeholder="******" onChange={handlePasswordChange} />
                    <SymTextField title="Repeat password" value={repeatPassword} placeholder="******" onChange={handleRepeatPasswordChange} />
                </FlexBox>
            }
            
            {/* ROW 4 */}
            <FlexBox justifyContent="center" flexDirection={isMobile? "column" : "row"} gap={3} width="100%">
                <SymTextField title="LinkedIn" value={linkedInUrl} placeholder="Linkedin URL" onChange={handleLinkedInChange} />
                <SymDropdown title="Role" value={role} onChange={handleRoleChange} options={["Option 1","Option 2"]} isEdit={true} />
            </FlexBox>

            
            <SymTextField title="Comment" value={comments} placeholder="Enter Comment here" onChange={handleCommentsChange} multiline={true} />

            {/* File Upload Field */}
            <SymMultiFileUploader
                title="Upload Resume"
                setUploadedFile={setUploadedFile}
                uploadedFile={uploadedFile}
            />

            <SymCheckbox onChange={handleAgreementChange} checked={isChecked} content={<Span display={{ color:'#fff', sm: "inline-block" }}>
                By clicking Submit, you agree to our <BoxLink title="Terms" href="/legal#terms" />, <BoxLink title="Privacy Policy" href="/legal#privacy-policy" /> and <BoxLink title="Cookies" href="/legal#cookies" />. You may receive SMS Notifications from us and can opt out any time.</Span>}
            />
        </FlexBox>
    );
}

export default JobForm;

const fileCardStyle = {
    width: '100%',
    p: 1, 
    borderRadius: '8px',
    boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
    fontFamily: 'Elemental End',
    background:'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)',
    color: '#fff',
    fontSize:'20px',
    fontWeight:400,
    border:'1px solid #FFF'
}
