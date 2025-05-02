// =================================================================================
// Form 1
// =================================================================================

import { useState, useEffect } from 'react';
import { FlexBox } from '@/components/flex-box';
import { SymDivider } from '@/components/custom-inputs';
import ContactForm from '@/components/custom-forms/onboarding/ContactForm';
import BasicInfoForm from '@/components/custom-forms/onboarding/BasicInfoForm';
import countryList from '@/data/countryList';

// =================================================================================

function Form1 ({
  setFormData, 
  user, 
  isChecked, 
  setIsChecked
}) {

  // Company
  const [email, setEmail] = useState(user?.email);
  const [entityName, setEntityName] = useState(user?.company.entityName);
  const [legalName, setLegalName] = useState(user?.company.legalName);
  const [ein, setEin] = useState(user?.company.ein);
  const [website, setWebsite] = useState(user?.company.website);
  const [address1, setAddress1] = useState(user?.company.address1);
  const [address2, setAddress2] = useState(user?.company.address2);
  const [city, setCity] = useState(user?.company.city);
  const [state, setState] = useState(user?.company.state);
  const [country, setCountry] = useState(null);

  const [zip, setZip] = useState(user?.company.zip);
  const [gmv, setGmv] = useState(user?.company.gmv || "");
  const [category, setCategory] = useState(user?.company.category || "");
  const [businessPhone, setBusinessPhone] = useState(user?.company.businessPhone)

  // Basic Info
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [dob, setDob] = useState(user?.dob)
  const [phone, setPhone] = useState(user?.phone);

  useEffect(() => {
  
    //Set Country
    const matchedCountry = countryList.find((item) => item.value === user?.company.country);
    setCountry(matchedCountry || null);

    // Company
    setEmail(user?.email || "");
    setEntityName(user?.company.entityName || "");
    setLegalName(user?.company.legalName || "");
    setEin(user?.company.ein || "");
    setWebsite(user?.company.website || "");
    setAddress1(user?.company.address1 || "");
    setAddress2(user?.company.address2 || "");
    setCity(user?.company.city || "");
    setState(user?.company.state || "");
    setZip(user?.company.zip || "");
    setGmv(user?.company.gmv || "");
    setCategory(user?.company.category  || "");
    setBusinessPhone(user?.company.businessPhone || "")

    // Basic Info
    setFirstName(user?.firstName || "")
    setLastName(user?.lastName || "")
    setDob(user?.dob || "")
    setPhone(user?.phone || "");
  }, [user]);

  useEffect(() => {
    setIsChecked(user?.isSellerOnboardingFormFilled1 ?? false)
  }, [user])
  

  // Update formData whenever state changes
  useEffect(() => {
    setFormData({
      "basicInfo": {
        email,
        firstName,
        lastName,
        dob,
        phone
      },
      "company" : {
        entityName,
        legalName,
        ein,
        website,
        address1,
        address2,
        city,
        state,
        country: country?.value || "",
        zip,
        gmv,
        category,
        businessPhone,
      }
      
    });
  }, [
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
    firstName,
    lastName,
    dob,
    phone,
    businessPhone,
  ]);

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
        <ContactForm
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          dob={dob}
          setDob={setDob}
          phone={phone}
          setPhone={setPhone}
          businessPhone={businessPhone}
          setBusinessPhone={setBusinessPhone}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />

    </FlexBox>
  );
}

export default Form1;
