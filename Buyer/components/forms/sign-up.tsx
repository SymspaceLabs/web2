// =========================================
// SignUpForm Component
// =========================================

import { SymPasswordInput } from "../inputs/sym-password";
import SymTextField from "../inputs/sym-textfield";

interface SignUpFormProps {
  email: string;
  setEmail: (value: string) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  retypePassword: string;
  setRetypePassword: (value: string) => void;
  retypeError: string;
  setRetypeError: (value: string) => void;
  errors: Record<string, string>;
  isFormSubmitted: boolean;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  email,
  setEmail,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  password,
  setPassword,
  retypePassword,
  setRetypePassword,
  retypeError,
  setRetypeError,
  errors,
  isFormSubmitted
}) => {
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (retypePassword && newPassword !== retypePassword) {
      setRetypeError("Passwords do not match");
    } else {
      setRetypeError("");
    }
  };

  const handleRetypePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newRetypePassword = e.target.value;
    setRetypePassword(newRetypePassword);

    if (password && newRetypePassword !== password) {
      setRetypeError("Passwords do not match");
    } else {
      setRetypeError("");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* EMAIL */}
      <SymTextField
        title="Email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        error={!!errors.email}
        helperText={errors.email}
      />

      {/* FIRST NAME & LAST NAME - Responsive: column on mobile, row on tablet+ */}
      <div className="flex flex-col sm:flex-col md:flex-row justify-center gap-6 w-full">
        <SymTextField
          title="First Name"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <SymTextField
          title="Last Name"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </div>

      {/* PASSWORD & RETYPE PASSWORD - Responsive: column on mobile, row on sm+ */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 w-full">
        <SymPasswordInput
          title="Password"
          value={password}
          placeholder="Password"
          onChange={handlePasswordChange}
          error={retypeError}
          showError={true}
          forceValidate={isFormSubmitted}
        />
        <SymPasswordInput
          title="Retype Password"
          value={retypePassword}
          placeholder="Retype Password"
          onChange={handleRetypePasswordChange}
          error={retypeError}
          showError={true}
          forceValidate={isFormSubmitted}
        />
      </div>
    </div>
  );
};