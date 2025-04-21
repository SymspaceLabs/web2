// =========================================================
// Seller Settings Form
// =========================================================

import { FlexBox } from '@/components/flex-box';
import { SymTextField, SymImageUploader } from '@/components/custom-inputs';

// =========================================================

function SellerSettingsForm ({
    emailSupport,
    setEmailSupport,
    phoneSupport,
    setPhoneSupport,
    entityName,
    setEntityName,
    description,
    setDescription,
    tagLine,
    setTagLine,
    uploadedLogo,
    setUploadedLogo,
    uploadedBanner,
    setUploadedBanner,
    web,
    setWeb,
    instagram,
    setInstagram,
    twitter,
    setTwitter,
    youtube,
    setYoutube,
    facebook,
    setFacebook,
}) {
           
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            
            {/* Email Support | Phone Support */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="email address for customer support" value={emailSupport} placeholder="Customer Support Email Address" onChange={(e) => setEmailSupport(e.target.value)} />
                <SymTextField title="phone number for customer support" value={phoneSupport} placeholder="Customer Support Phone Number" onChange={(e) => setPhoneSupport(e.target.value)} />
            </FlexBox>

            {/* ENTITY NAME */}
            <SymTextField title="Entity Name" value={entityName} placeholder="Entity Name to be Displayed" onChange={(e) => setEntityName(e.target.value)} />

            {/* Description */}
            <SymTextField title="Description" value={description} placeholder="Company Description (200 Character Limit)" onChange={(e) => setDescription(e.target.value)} />

            {/* Description */}
            <SymTextField title="Tag Line" value={tagLine} placeholder="Company Tag Line (100 Character Limit)" onChange={(e) => setTagLine(e.target.value)} />

            {/* Logo Uploader */}
            <SymImageUploader
                title="logo"
                subtitle="Upload a logo for brand recognition and your visual identity. (Recommended Size 400 px x 400 px)"
                setUploadedFile={setUploadedLogo}
                uploadedFile={uploadedLogo}
            />

            {/* Banner Uploader Field */}
            <SymImageUploader
                title="banner image"
                subtitle="Upload a banner for brand recognition and a more polished storefront. (Recommended Size 1025 px x 120 px)"
                setUploadedFile={setUploadedBanner}
                uploadedFile={uploadedBanner}
            />

            {/* Website */}
            <SymTextField title="Website" value={web} placeholder="Website link beginning with “https”" onChange={(e) => setWeb(e.target.value)} />

            {/* Instagram */}
            <SymTextField title="Instagram" value={instagram} placeholder="Instagram profile link beginning with “https”" onChange={(e) => setInstagram(e.target.value)} />

            {/* Twitter */}
            <SymTextField title="Twitter" value={twitter} placeholder="twitter profile link beginning with “https”" onChange={(e) => setTwitter(e.target.value)} />

            {/* Youtube */}
            <SymTextField title="Youtube" value={youtube} placeholder="Youtube profile  link beginning with “https”" onChange={(e) => setYoutube(e.target.value)} />

            {/* Facebook */}
            <SymTextField title="Facebook" value={facebook} placeholder="Facebook profile link beginning with “https”" onChange={(e) => setFacebook(e.target.value)} />

        

        </FlexBox>
    );
}

export default SellerSettingsForm;
