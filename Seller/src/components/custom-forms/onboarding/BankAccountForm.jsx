// =============================================================
// Bank Account Form
// =============================================================

import { FlexBox } from '@/components/flex-box';
import { SymTextField } from '@/components/custom-inputs';

// =============================================================

function BankAccountForm ({
    accountNo,
    setAccountNo,
    routingNo,
    setRoutingNo,
    wireRoutingNo,
    setWireRoutingNo,
    bankName,
    setBankName,
    accHolderName,
    setAccHolderName,
}) {
       
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            
            {/* Acc Number || Routing Number || Wire Routing Number */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="Account Number" value={accountNo} placeholder="Account Number" onChange={(e) => setAccountNo(e.target.value)} toolTipText={toolTipText.accountNo} />
                <SymTextField title="Routing Number" value={routingNo} placeholder="Routing Number" onChange={(e) => setRoutingNo(e.target.value)} toolTipText={toolTipText.routingNo} />
                <SymTextField title="Wire Routing Number" value={wireRoutingNo} placeholder="Wire Routing Number" onChange={(e) => setWireRoutingNo(e.target.value)} toolTipText={toolTipText.wireRoutingNo} />
            </FlexBox>

            {/* Bank Name || Acc Holder Name */}
            <FlexBox justifyContent="center" flexDirection={{xs:"column", sm:"row"}} gap={3} width="100%">
                <SymTextField title="Bank Name" value={bankName} placeholder="Bank Name" onChange={(e) => setBankName(e.target.value)} toolTipText={toolTipText.bankName} />
                <SymTextField title="Account Holders Name" value={accHolderName} placeholder="Entity Legal Name" onChange={(e) => setAccHolderName(e.target.value)} toolTipText={toolTipText.accountHolderName} />
            </FlexBox>

        </FlexBox>
    );
}

export default BankAccountForm;


const toolTipText = {
    entityName : 'Entity Name is the DBA “Doing Business As” name the entity is using to conduct business under for marketing and branding purposes. This can be different from the entity’s legal name.',
    accountHolderName : 'Entity Legal Name is the official name of the business entity, as registered with the relevant authorities (e.g., state, county) and appears on official documents like articles of incorporation or organization.',


}
