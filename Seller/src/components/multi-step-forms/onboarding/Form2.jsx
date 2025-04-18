// ======================================================================================
// Form 2
// ======================================================================================

import { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { H1, Paragraph } from '@/components/Typography';
import { GlassBanner } from '@/components/custom-banner';
import { FlexBox, FlexCol, FlexColCenter } from '@/components/flex-box';
import CreditCardForm from '@/components/custom-forms/onboarding/CreditCardForm';
import BankAccountForm from '@/components/custom-forms/onboarding/BankAccountForm';
import BillingAddressForm from '@/components/custom-forms/onboarding/BillingAddressForm';
import LazyImage from '@/components/LazyImage';
import { SymAccordion } from '@/components/custom-components';

// ======================================================================================

function Form2 ({
    setFormData,
    user,
    step,
    handleContinue
}) {

    // BANK ACCOUNT
    const [accountNo, setAccountNo] = useState(user?.banks[0]?.accountNo);
    const [routingNo, setRoutingNo] = useState(user?.banks[0]?.routingNo);
    const [wireRoutingNo, setWireRoutingNo] = useState(user?.banks[0]?.wireRoutingNo);
    const [bankName, setBankName] = useState(user?.banks[0]?.bankName);
    const [accHolderName, setAccHolderName] = useState(user?.banks[0]?.accHolderName);

    // CREDIT CARD
    const [cardNo, setCardNo] = useState(user?.creditCards[0]?.cardNo);
    const [expiryMonth, setExpiryMonth] = useState(user?.creditCards[0]?.expiryMonth);
    const [expiryYear, setExpiryYear] = useState(user?.creditCards[0]?.expiryYear);
    const [cvv, setCvv] = useState(user?.creditCards[0]?.cvv);
    const [cardHolderName, setCardHolderName] = useState(user?.creditCards[0]?.cardHolderName);

    // BILLING ADDRESS
    const [address1, setAddress1] = useState(user?.billingAddresses[0]?.address1);
    const [address2, setAddress2] = useState(user?.billingAddresses[0]?.address2);
    const [city, setCity] = useState(user?.billingAddresses[0]?.city);
    const [state, setState] = useState(user?.billingAddresses[0]?.state);
    const [country, setCountry] = useState(user?.billingAddresses[0]?.country);
    const [zip, setZip] = useState(user?.billingAddresses[0]?.zip);
    
    useEffect(() => {
        // CREDIT CARD
        setAccountNo(user?.banks[0]?.accountNo || "");
        setRoutingNo(user?.banks[0]?.routingNo || "");
        setWireRoutingNo(user?.banks[0]?.wireRoutingNo || "");
        setBankName(user?.banks[0]?.bankName || "");
        setAccHolderName(user?.banks[0]?.accHolderName || "");

        // CREDIT CARD
        setCardNo(user?.creditCards[0]?.cardNo || "");
        setExpiryMonth(user?.creditCards[0]?.expiryMonth || null);
        setExpiryYear(user?.creditCards[0]?.expiryYear || null);
        setCvv(user?.creditCards[0]?.cvv || "");
        setCardHolderName(user?.creditCards[0]?.cardHolderName || "");

        // BILLING ADDRESS
        setAddress1(user?.billingAddresses[0]?.address1 || "");
        setAddress2(user?.billingAddresses[0]?.address2 || "");
        setCity(user?.billingAddresses[0]?.city || "");
        setState(user?.billingAddresses[0]?.state || "");
        setCountry(user?.billingAddresses[0]?.country || "");
        setZip(user?.billingAddresses[0]?.zip || "");
    
    }, [user]); // Depend on `user` so it updates after submission

    
    // Update formData whenever state changes
    useEffect(() => {
        setFormData({
            "bankInfo": {
                accountNo,
                routingNo,
                wireRoutingNo,
                bankName,
                accHolderName 
            },
            "creditCard" : {
                cardNo,
                expiryMonth,
                expiryYear,
                cvv,
                cardHolderName
            },
            "billingAddress" : {
                address1,
                address2,
                city,
                state,
                country,
                zip,
            }

        });
    }, [accountNo, routingNo, wireRoutingNo, bankName, accHolderName, cardNo,
        expiryMonth,
        expiryYear,
        cvv,
        cardHolderName,
        address1,
        address2,
        city,
        state,
        country,
        zip,
        step,
     ]);
    
   
    
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>

            {/* Banner Card 1 */}
            <GlassBanner>
                <FlexBox flexDirection={{ xs:'column', sm:'row' }} justifyContent='space-between' gap={2}>
                    <FlexCol>
                        <H1 fontSize={{xs:14, sm:16}} color="#FFF" pb={1} >
                            at this time, completing the billing step is not required to register your business account on our symspace marketplace. 
                        </H1>
                    </FlexCol>
                    <FlexColCenter sx={{ maxWidth:{xs:'100%', sm:'350px'} }}>
                        <Button sx={styles.btn} onClick={handleContinue}>
                            skip
                        </Button>
                    </FlexColCenter>
                </FlexBox>
            </GlassBanner>

            {/* Banner Card 2 */}
            <GlassBanner sx={{background:'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)'}}>
                <FlexCol justifyContent='space-between' gap={2}>
                    <H1 fontSize={15} color="#FFF" pb={1} >
                        you would need the following information to complete this section 
                    </H1>
                    
                    <FlexCol>
                        <H1 fontSize={15} color="#FFF" pb={1} >
                            bank account information
                        </H1>
                        {requirements.map((text, index) => (
                            <FlexBox key={index} gap={1}>
                                <Box sx={{ width: 25 }}>
                                    <LazyImage
                                        src="/assets/images/onboarding/white-checkbox.png"
                                        alt="white-checkbox"
                                        width={500}
                                        height={500}
                                    />
                                </Box>
                                <Paragraph color="#FFF">
                                    {text}
                                </Paragraph>
                            </FlexBox>
                        ))}
                    </FlexCol>
                    <FlexCol>
                        <H1 fontSize={15} color="#FFF" pb={1} >
                            credit card information
                        </H1>
                        <FlexBox gap={1}>
                            <Box sx={{ width: 25 }}>
                                <LazyImage
                                    src="/assets/images/onboarding/white-checkbox.png"
                                    alt="white-checkbox"
                                    width={500}
                                    height={500}
                                />
                            </Box>
                            <Paragraph color="#FFF">
                                a valid Credit Card Number which will be used to pay for Symspace’s subscription and services
                            </Paragraph>
                        </FlexBox>
                    </FlexCol>

                    
                    <FlexCol>
                        
                    </FlexCol>

                </FlexCol>
            </GlassBanner>

            <FlexCol>
                <SymAccordion title="bank account - checking info">
                    <BankAccountForm
                        accountNo={accountNo}
                        setAccountNo={setAccountNo}
                        routingNo={routingNo}
                        setRoutingNo={setRoutingNo}
                        wireRoutingNo={wireRoutingNo}
                        setWireRoutingNo={setWireRoutingNo}
                        bankName={bankName}
                        setBankName={setBankName}
                        accHolderName={accHolderName}
                        setAccHolderName={setAccHolderName}
                    />
                </SymAccordion>
                <SymAccordion title="credit card">
                    <CreditCardForm
                        cardNo={cardNo}
                        setCardNo={setCardNo}
                        expiryMonth={expiryMonth}
                        setExpiryMonth={setExpiryMonth}
                        expiryYear={expiryYear}
                        setExpiryYear={setExpiryYear}
                        cvv={cvv}
                        setCvv={setCvv}
                        cardHolderName={cardHolderName}
                        setCardHolderName={setCardHolderName}
                    />
                </SymAccordion>
                <SymAccordion title="billing address">
                    <BillingAddressForm
                        address1={address1}
                        setAddress1={setAddress1}
                        address2={address2}
                        setAddress2={setAddress2}
                        city={city}
                        setCity={setCity}
                        state={state}
                        setState={setState}
                        country={country}
                        setCountry={setCountry}
                        zip={zip}
                        setZip={setZip}
                    />
                </SymAccordion>
            </FlexCol>


            

        </FlexBox>
    );
}

export default Form2;


const styles = {
    bannerButton : { 
        background:'linear-gradient(97.04deg, #666666 0%, #1D1D1D 100%)',
        borderRadius: '50px',
        px:5,
        py:1.5,
        color: '#fff',
        fontSize:{ xs:12, sm:14 },
        border:'1px solid #FFF',
        minWidth:{sm:'200px'}
    },
    btn: {
        background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
        boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(50px)',
        borderRadius: '30px',
        color: '#FFF',
        fontFamily: 'Elemental End',
        textTransform: 'lowercase',
        px: 2,
        fontSize: { xs: 12, sm: 16 },
        fontWeight: 500,
        '&:hover': {
            background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)'
        }
    }
}

const requirements = [
    "a valid Bank Account Number which will be used to easily deposit and withdraw money between your bank account and your Symspace payments account",
    "your Bank Account should be in the name of the Primary Contact or Business Name provided to Symspace",
    "to verify your Bank Account you will need your online banking credentials or provide Symspace with a bank statement"
];