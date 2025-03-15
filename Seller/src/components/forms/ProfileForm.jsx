import React, { useState } from 'react';
import { SymDatePicker, SymTextField } from "../../components/custom-inputs";
import FlexBox from "../../components/flex-box/flex-box";
import useMediaQuery from "@mui/material/useMediaQuery"; // GLOBAL CUSTOM COMPONENTS

const ProfileForm = ({ 
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  dob,
  setDob,
  isEdit = true
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleDateChange = (date) => {
    setDob(date);
  };

  return (
    <FlexBox
      justifyContent={isMobile ? 'center' : 'flex-start'}
      flexDirection={isMobile ? 'column' : 'row'}
      gap={isMobile ? 2 : 3}
      mt={3}
      width="100%"
    >
      {/* First Name */}
      <FlexBox flexDirection="column" gap={1} flex={1}>
        <SymTextField
          title="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
          isEdit={isEdit}
        />
      </FlexBox>

      {/* Last Name */}
      <FlexBox flexDirection="column" gap={1} flex={1}>
        <SymTextField
          title="Last Name"
          value={lastName}
          onChange={handleLastNameChange}
          isEdit={isEdit}
        />
      </FlexBox>

      {/* Email */}
      <FlexBox flexDirection="column" gap={1} flex={1}>
        <SymTextField
          title="Email"
          value={email}
          onChange={()=>{}}
          isEdit={false}
        />
      </FlexBox>

      {/* DOB */}
      <FlexBox flexDirection="column" gap={1} flex={1}>
        <SymDatePicker
          title="Date Of Birth"
          value={dob}
          onChange={handleDateChange}
          isEdit={isEdit}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default ProfileForm;
