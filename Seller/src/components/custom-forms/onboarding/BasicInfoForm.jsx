// =========================================================
// Basic Info Form
// =========================================================

import countryList from '@/data/countryList';
import { FlexBox } from '@/components/flex-box';
import { SymDropdown, SymTextField, SymAutoComplete, CategorySelector } from '@/components/custom-inputs';
import { CATEGORIES_DATA } from '@/data/categoryMenus';

// =========================================================

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
       
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            
            {/* EMAIL */}
            <SymTextField title="Business Email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

            {/* ENTITY NAME || LEGAL NAME || EIN || WEBSITE */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="Entity Name" value={entityName} placeholder="Entity DBA Name" onChange={(e) => setEntityName(e.target.value)} toolTipText={toolTipText.entityName} />
                <SymTextField title="Entity Legal Name" value={legalName} placeholder="Entity Legal Name" onChange={(e) => setLegalName(e.target.value)} toolTipText={toolTipText.legalName} />
                <SymTextField title="EIN" value={ein} placeholder="EIN" onChange={(e) => setEin(e.target.value)} toolTipText={toolTipText.ein} />
                <SymTextField title="Website" value={website} placeholder="Website" onChange={(e) => setWebsite(e.target.value)} />
            </FlexBox>

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
                    value={country}
                    onChange={(val) => setCountry(val)}
                    options={countryList}
                />
                <SymTextField title="Zip Code" value={zip} placeholder="Zip Code" onChange={(e) => setZip(e.target.value)} />
            </FlexBox>

            {/* GMV || Category */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymDropdown title="Average Gross Merchandise Value (GMV)" value={gmv} placeholder="GMV" onChange={(e) => setGmv(e.target.value)} options={options.gmv}  toolTipText={toolTipText.gmv}  />
                {/* <SymDropdown title="Highest Performing Category" value={category} onChange={(e) => setCategory(e.target.value)} options={options.topPerformingCategory} /> */}
                <CategorySelector
                    title="Highest Performing Category"
                    categories={CATEGORIES_DATA}
                    value={category}
                    onChange={(val) => setCategory(val)}
                    error={false}
                    placeholder="Select a category"
                />
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
    ],
    topPerformingCategory : [
        "Dresses",
        "Tops",
        "Shirts",
        "Bottoms",
        "Outerwear",
        "Activewear",
        "Intimates",
        "Shoes",
        "Skincare",
        "Moisturizers",
        "Cleansers",
        "Serums",
        "Masks",
        "Haircare",
        "Shampoos",
        "Conditioners",
        "Hair Treatments",
        "Styling Tools",
        "Makeup",
        "Foundations",
        "Lipsticks",
        "Eyeshadows",
        "Mascaras",
        "Blushes",
        "Makeup Tools",
        "Concealers",
        "Powders",
        "Eyeliners",
        "Brow Products",
        "Fragrances",
        "Perfumes",
        "Body Sprays",
        "Vitamins & Supplements",
        "Medical Equipment",
        "Fitness Equipment",
        "Health Monitors",
        "Oral Care",
        "Toothbrushes",
        "Toothpaste",
        "Bath & Body",
        "Body Wash",
        "Lotions",
        "Hand Sanitizers",
        "Shaving & Hair Removal",
        "Razors",
        "Shaving Cream",
        "Hair Removal Devices",
        "Diapers",
        "Disposable Diapers",
        "Cloth Diapers",
        "Feeding",
        "Bottles",
        "Breastfeeding Accessories",
        "Baby Gear",
        "Strollers",
        "Car Seats",
        "Carriers",
        "Nursery",
        "Cribs",
        "Changing Tables",
        "Baby Monitors",
        "Educational",
        "Learning Toys",
        "Fitness Equipment",
        "Outdoor Recreation",
        "Team Sports",
        "Vehicle Parts & Accessories",
        "Mobility Aids",
        "Daily Living Aids",
        "Accessibility Equipment"
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
