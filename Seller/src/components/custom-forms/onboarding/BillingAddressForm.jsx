// =========================================================
// Blling Address Form
// =========================================================

import countryList from '@/data/countryList';
import { FlexBox } from '@/components/flex-box';
import { SymTextField, SymAutoComplete } from '@/components/custom-inputs';

// =========================================================

function BillingAddressForm ({
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

}) {
       
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            
            {/* Address Line 1 */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="Business Address" value={address1} placeholder="Business Address" onChange={(e) => setAddress1(e.target.value)} toolTipText={toolTipText.address} />
            </FlexBox>

            {/* Address Line 2 */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="Business Address Line 2 (Optional)" value={address2} placeholder="Business Address Line 2" onChange={(e) => setAddress2(e.target.value)} />
            </FlexBox>

            {/* City || State || Country || ZIP code */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="City" value={city} placeholder="City" onChange={(e) => setCity(e.target.value)} />
                <SymTextField title="State" value={state} placeholder="State" onChange={(e) => setState(e.target.value)} />
                <SymAutoComplete
                    title="Country"
                    placeholder="Country"
                    value={countryList.find((item) => item.value === country)}
                    onChange={(val) => setCountry(val?.value ?? "")}
                    options={countryList}
                />
                <SymTextField title="Zip Code" value={zip} placeholder="Zip Code" onChange={(e) => setZip(e.target.value)} />
            </FlexBox>

        </FlexBox>
    );
}

export default BillingAddressForm;

const toolTipText = {
    entityName : 'Entity Name is the DBA “Doing Business As” name the entity is using to conduct business under for marketing and branding purposes. This can be different from the entity’s legal name.',
    legalName : 'Entity Legal Name is the official name of the business entity, as registered with the relevant authorities (e.g., state, county) and appears on official documents like articles of incorporation or organization.',
    ein: 'An Employer Identification Number (EIN) is a nine-digit number that IRS assigns to a business entity. EINs allow the IRS to easily identify businesses for tax reporting purposes.',
    address : 'Registered Business Address: Registered business address’ i.e. this address represents your primary place of business (e.g. head office or branch) which will be displayed on your public seller profile page.',
    gmv: 'Average Annual Gross Merchandise Value (GMV) is the total value of all goods sold on a platform over a year on average, before any deductions for fees, discounts, or returns.',
    owner: 'A beneficial owner is a natural person who directly or indirectly owns more than 25% of the shares or voting rights of the business, or that own the business via other means. If no individual qualifies under the criteria mentioned then any individual who holds the position of senior manager is considered a beneficial owner.'
}
