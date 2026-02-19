"use client";

// import { SymDatePicker } from "@/components/custom-inputs";
import SymTextField from "../inputs/sym-textfield";

// ==============================================================
// Type Definitions
// ==============================================================
interface ProfileFormProps {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  email: string;
  dob: string;
  setDob: (value: string) => void;
  isEdit?: boolean;
}

// ==============================================================
// ProfileForm Component
// ==============================================================
const ProfileForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  dob,
  setDob,
  isEdit = true
}: ProfileFormProps) => {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width:600px)').matches;

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLastName(event.target.value);
  };

  const handleDateChange = (date: string) => {
    setDob(date);
  };

  return (
    <div className={`flex ${isMobile ? 'justify-center flex-col gap-2' : 'justify-start flex-row gap-3'} mt-3 w-full`}>
      {/* First Name */}
      <div className="flex flex-col gap-1 flex-1">
        <SymTextField
          title="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
          isEdit={isEdit}
        />
      </div>

      {/* Last Name */}
      <div className="flex flex-col gap-1 flex-1">
        <SymTextField
          title="Last Name"
          value={lastName}
          onChange={handleLastNameChange}
          isEdit={isEdit}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1 flex-1">
        <SymTextField
          title="Email"
          value={email}
          onChange={() => {}}
          isEdit={false}
        />
      </div>

      {/* DOB */}
      <div className="flex flex-col gap-1 flex-1">
        {/* <SymDatePicker
          title="Date Of Birth"
          value={dob}
          onChange={handleDateChange}
          isEdit={isEdit}
        /> */}
      </div>
    </div>
  );
};

export default ProfileForm;