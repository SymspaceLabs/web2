// ======================================================================================
// Form 2
// ======================================================================================

import { Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { FlexBox } from '@/components/flex-box';
import CreditCardForm from '@/components/custom-forms/onboarding/CreditCardForm';
import BankAccountForm from '@/components/custom-forms/onboarding/BankAccountForm';
import BillingAddressForm from '@/components/custom-forms/onboarding/BillingAddressForm';

// ======================================================================================

function Form2 ({
    setFormData,
    user,
    step,
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
        setExpiryMonth(user?.creditCards[0]?.expiryMonth || "");
        setExpiryYear(user?.creditCards[0]?.expiryYear || "");
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
            <Divider />
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
            <Divider />
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


        </FlexBox>
    );
}

export default Form2;
