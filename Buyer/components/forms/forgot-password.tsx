// =========================================
// ForgotPasswordForm Component
// =========================================

import SymTextField from "../inputs/sym-textfield";

interface ForgotPasswordFormProps {
  email: string;
  setEmail: (value: string) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  email,
  setEmail
}) => {
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setEmail(event.target.value);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* EMAIL */}
      <SymTextField
        title="Email"
        value={email}
        placeholder="Email"
        onChange={handleEmailChange}
        type="email"
      />
    </div>
  );
};