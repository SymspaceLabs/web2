
import { FlexBox } from '@/components/flex-box';
import { SymDivider } from '@/components/custom-inputs';
import BasicInfoForm from '@/components/custom-forms/onboarding/BasicInfoForm';
import ContactForm from '@/components/custom-forms/onboarding/ContactForm';

function Form1 ({
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
    setCategory,
}) {

    const handleSubmit = async () => {
        const requestBody = {
            email,
            entityName,
            legalName,
            ein,
            website,
            address1,
            address2,
            city,
            state,
            country,
            zip,
            gmv,
            category,
        };
        try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding/seller/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
              }
            );
      
            const data = await response.json();
        
            if (!response.ok) {  
              // Show error notification 
              // showSnackbar(data.message,"error")
            } else {
              // Show success notification and redirect
              // showSnackbar(data.message, "success");
            }
          } catch (error) {
            console.error('Error during Signin:', error);
          }
    }
       
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            <BasicInfoForm
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
            <SymDivider
                title="Primary Contact"
                toolTipText="The Primary contact person is the person who has access to the Selling on Symspace payment account, provides the registration information on behalf of the account holder (the registered seller) and initiates transactions such as disbursements and refunds. Actions taken by the Primary point of contact are deemed to be taken by the account holder."
            />
            <ContactForm />

        </FlexBox>
    );
}

export default Form1;
