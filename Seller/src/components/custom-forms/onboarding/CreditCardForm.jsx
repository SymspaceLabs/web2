import { FlexBox } from '@/components/flex-box';
import { SymTextField } from '@/components/custom-inputs';

function CreditCardForm ({
    cardNo,
    setCardNo,
    expiryMonth,
    setExpiryMonth,
    expiryYear,
    setExpiryYear,
    cvv,
    setCvv,
    cardHolderName,
    setCardHolderName,

}) {
       
    const handleCardNoChange = (event) => setCardNo(event.target.value);
    const handleExpiryMonthChange = (event) => setExpiryMonth(event.target.value);
    const handleExpiryYearChange = (event) => setExpiryYear(event.target.value);
    const handleCvvChange = (event) => setCvv(event.target.value);


    const handleCardHolderNameChange = (event) => setCardHolderName(event.target.value);
    
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            
            {/* Acc No || Routing No || Wire Routing No */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="Card Number" value={cardNo} placeholder="Card Number" onChange={handleCardNoChange} toolTipText={toolTipText.cardNo} />
                <SymTextField title="Expires On" value={expiryMonth} placeholder="Month" onChange={handleExpiryMonthChange} toolTipText={toolTipText.ExpiryMonth} />
                <SymTextField title="&nbsp;" value={expiryYear} placeholder="Year" onChange={handleExpiryYearChange} toolTipText={toolTipText.expiryYear} />
                <SymTextField title="CVV" value={cvv} placeholder="Three Digit Code" onChange={handleCvvChange} toolTipText={toolTipText.cvv} charLimit={3} />
            </FlexBox>

            {/* Bank Name || Acc Holder Name */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="Card Holders Name" value={cardHolderName} placeholder="Card Holder Name" onChange={handleCardHolderNameChange} toolTipText={toolTipText.cardHolderName} />
            </FlexBox>

        </FlexBox>
    );
}

export default CreditCardForm;


const toolTipText = {
    entityName : 'Entity Name is the DBA “Doing Business As” name the entity is using to conduct business under for marketing and branding purposes. This can be different from the entity’s legal name.',
    accountHolderName : 'Entity Legal Name is the official name of the business entity, as registered with the relevant authorities (e.g., state, county) and appears on official documents like articles of incorporation or organization.',
    cvv: 'How to find the CVV? Visa, Mastercard, Discover, and UnionPay display the three-digit CVV number on the back of the card, to the right of the signature.',
    cardHolderName: 'The Credit Card’s Name can be under an individual or the entity’s name as seen on bank statements.'

}
