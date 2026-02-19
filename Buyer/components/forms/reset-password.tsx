// =========================================
// ResetPasswordForm Component
// =========================================

import { SymPasswordInput } from "../inputs/sym-password";

interface ResetPasswordFormProps {
  password: string;
  setPassword: (value: string) => void;
  repeatPassword: string;
  setRepeatPassword: (value: string) => void;
  retypeError: string;
  setRetypeError: (value: string) => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  password,
  setPassword,
  repeatPassword,
  setRepeatPassword,
  retypeError,
  setRetypeError,
}) => {
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (repeatPassword && newPassword !== repeatPassword) {
      setRetypeError("Passwords do not match");
    } else {
      setRetypeError("");
    }
  };

  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRepeatPassword = e.target.value;
    setRepeatPassword(newRepeatPassword);

    if (password && newRepeatPassword !== password) {
      setRetypeError("Passwords do not match");
    } else {
      setRetypeError("");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* PASSWORD */}
      <SymPasswordInput
        title="Password"
        value={password}
        placeholder="Password"
        onChange={handlePasswordChange}
        error={retypeError}
        showError={true}
      />

      {/* Confirm Password */}
      <SymPasswordInput
        title="Confirm password"
        value={repeatPassword}
        placeholder="Confirm password"
        onChange={handleRepeatPasswordChange}
        error={retypeError}
        showError={true}
      />
    </div>
  );
};