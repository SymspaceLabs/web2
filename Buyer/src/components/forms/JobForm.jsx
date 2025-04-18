import { FlexBox } from '../flex-box';
import { SymTextField, SymMultiFileUploader } from '@/components/custom-inputs';
import SymDropdown from '@/components/custom-inputs/SymDropdown';
import SymCheckbox from '@/components/custom-inputs/SymCheckbox';
import { Span } from '../Typography';
import BoxLink from '@/pages-sections/sessions/components/box-link';

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
    isAuthenticated
}) {
    
     
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            {/* ROW 1 */}
            <SymTextField title="Email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

            {/* ROW 2 */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="First Name" value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                <SymTextField title="Last Name" value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
            </FlexBox>

            {/* ROW 3 */}
            {!isAuthenticated &&
                <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                    <SymTextField title="Password" value={password} placeholder="******" onChange={(e) => setPassword(e.target.value)} />
                    <SymTextField title="Repeat password" value={repeatPassword} placeholder="******" onChange={(e) => setRepeatPassword(e.target.value)} />
                </FlexBox>
            }
            
            {/* ROW 4 */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="LinkedIn" value={linkedInUrl} placeholder="Linkedin URL" onChange={(e) => setLinkedInUrl(e.target.value)} />
                <SymDropdown title="Role" value={role} onChange={(e) => setRole(e.target.value)} options={["Option 1","Option 2"]} isEdit={true} />
            </FlexBox>

            
            <SymTextField title="Comment" value={comments} placeholder="Enter Comment here" onChange={(e) => setComments(e.target.value)} multiline={true} />

            {/* File Upload Field */}
            <SymMultiFileUploader
                title="Upload Resume"
                setUploadedFile={setUploadedFile}
                uploadedFile={uploadedFile}
            />

            <Span display={{ color:'#fff', sm: "inline-block" }}>
                By clicking Submit, you agree to our <BoxLink title="Terms" href="/terms-and-conditions#terms" />, <BoxLink title="Privacy Policy" href="/terms-and-conditions#privacy" /> and <BoxLink title="Cookies" href="/terms-and-conditions#cookies" />. You may receive SMS Notifications from us and can opt out any time.
            </Span>

        </FlexBox>
    );
}

export default JobForm;
