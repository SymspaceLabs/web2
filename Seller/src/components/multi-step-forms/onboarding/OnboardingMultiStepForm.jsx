// ===================================================================
// Onboarding Multi Step Form
// ===================================================================

import Form1 from './Form1';
import { useState } from 'react';
import { FlexBox } from '@/components/flex-box';

const OnboardingMultiStepForm = ({ step }) => {

    //FORM 1
    const [email, setEmail] =useState("");
    const [entityName, setEntityName] =useState("");
    const [legalName, setLegalName] =useState("");
    const [ein, setEin] =useState("");
    const [website, setWebsite] =useState("");
    const [address1, setAddress1] =useState("");
    const [address2, setAddress2] =useState("");
    const [city, setCity] =useState("");
    const [state, setState] =useState("");
    const [country, setCountry] =useState("");
    const [zip, setZip] =useState("");
    const [gmv, setGmv] =useState("");
    const [category, setCategory] =useState("");

    
   
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            <Form1
                email={email}
                setEmail={setEmail}
                entityName={entityName}
                setEntityName={setEntityName}
                legalName={legalName}
                setLegalName={setLegalName}
                ein={ein}
                setEin={setEin}
                website={website}
                setWebsite={setWebsite}
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
                gmv={gmv}
                setGmv={setGmv}
                category={category}
                setCategory={setCategory}
            />
            {/* <Form2 /> */}
        </FlexBox>
    );
}

export default OnboardingMultiStepForm;
