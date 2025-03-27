import { FlexBox } from '@/components/flex-box';
import { SymDropdown, SymTextField } from '@/components/custom-inputs';

function BasicInfoForm ({
    email,
    setEmail,
    entityName,
    setEntityName,
    legalName,
    setLegalName,
    ein,
    setEin,
    website,
    setWebsite,

    address1,
    setAddress1,
    address2,
    setAddress2,

    city,
    setCity,
    state,
    setState,
    country,
    setCountry,
    zip,
    setZip,

    gmv,
    setGmv,

    category,
    setCategory

}) {
       
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleEntityNameChange = (event) => setEntityName(event.target.value);
    const handleLegalNameChange = (event) => setLegalName(event.target.value);
    const handleEinChange = (event) => setEin(event.target.value);
    const handleWebsiteChange = (event) => setWebsite(event.target.value);
    const handleAddress1Change = (event) => setAddress1(event.target.value);
    const handleAddress2Change = (event) => setAddress2(event.target.value);
    const handleCityChange = (event) => setCity(event.target.value);
    const handleStateChange = (event) => setState(event.target.value);
    const handleCountryChange = (event) => setCountry(event.target.value);
    const handleZipChange = (event) => setZip(event.target.value);
    const handleGmvChange = (event) => setGmv(event.target.value);
    const handleCategoryChange = (event) => setCategory(event.target.value);

    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            
            {/* EMAIL */}
            <SymTextField title="Business Email" value={email} placeholder="Email" onChange={handleEmailChange} />

            {/* ENTITY NAME || LEGAL NAME || EIN || WEBSITE */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="Entity Name" value={entityName} placeholder="Entity DBA Name" onChange={handleEntityNameChange} toolTipText={toolTipText.entityName} />
                <SymTextField title="Entity Legal Name" value={legalName} placeholder="Entity Legal Name" onChange={handleLegalNameChange} toolTipText={toolTipText.legalName} />
                <SymTextField title="EIN" value={ein} placeholder="EIN" onChange={handleEinChange} toolTipText={toolTipText.ein} />
                <SymTextField title="Website" value={website} placeholder="Website" onChange={handleWebsiteChange} />
            </FlexBox>

            {/* Address Line 1 */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="Business Address" value={address1} placeholder="Business Address" onChange={handleAddress1Change} toolTipText={toolTipText.address} />
            </FlexBox>

            {/* Address Line 2 */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="Business AddressLine 2 (Optional)" value={address2} placeholder="Business Address Line 2" onChange={handleAddress2Change} />
            </FlexBox>

            {/* City || State || Country || ZIP code */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="City" value={city} placeholder="City" onChange={handleCityChange} />
                <SymTextField title="State" value={state} placeholder="State" onChange={handleStateChange} />
                <SymTextField title="Country" value={country} placeholder="Country" onChange={handleCountryChange} />
                <SymTextField title="Zip" value={zip} placeholder="Zip" onChange={handleZipChange} />
            </FlexBox>

            {/* GMV || Category */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymDropdown title="Average Gross Merchandise Value (GMV)" value={gmv} placeholder="GMV" onChange={handleGmvChange} options={options.gmv}  toolTipText={toolTipText.gmv}  />
                <SymDropdown title="Highest Performing Category" value={category} onChange={handleCategoryChange} options={["Option 1","Option 2"]} />
                
            </FlexBox>

        </FlexBox>
    );
}

export default BasicInfoForm;

const options = {
    gmv : [
        "$0 - $1,000",
        "$1,001 - $10,000",
        "$10,001 - $50,000",
        "$50,001 - $100,000",
        "$100,001 - $500,000",
        "$500,001 - $1,000,000",
        "$1,000,001 and above",
    ]
}

const toolTipText = {
    entityName : 'Entity Name is the DBA “Doing Business As” name the entity is using to conduct business under for marketing and branding purposes. This can be different from the entity’s legal name.',
    legalName : 'Entity Legal Name is the official name of the business entity, as registered with the relevant authorities (e.g., state, county) and appears on official documents like articles of incorporation or organization.',
    ein: 'An Employer Identification Number (EIN) is a nine-digit number that IRS assigns to a business entity. EINs allow the IRS to easily identify businesses for tax reporting purposes.',
    address : 'Registered Business Address: Registered business address’ i.e. this address represents your primary place of business (e.g. head office or branch) which will be displayed on your public seller profile page.',
    gmv: 'Average Annual Gross Merchandise Value (GMV) is the total value of all goods sold on a platform over a year on average, before any deductions for fees, discounts, or returns.',
    owner: 'A beneficial owner is a natural person who directly or indirectly owns more than 25% of the shares or voting rights of the business, or that own the business via other means. If no individual qualifies under the criteria mentioned then any individual who holds the position of senior manager is considered a beneficial owner.'


}
