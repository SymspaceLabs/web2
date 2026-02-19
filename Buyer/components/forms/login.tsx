// =========================================
// LoginForm Component
// =========================================

import { LoginFormProps } from "@/types/input";
import SymTextField from "../inputs/sym-textfield";
import { Checkbox } from '@/components/ui/checkbox';
import { SymPasswordInput } from "../inputs/sym-password";

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  isChecked,
  setIsChecked
}) => {
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setEmail(event.target.value);
  
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setPassword(event.target.value);

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

      {/* PASSWORD */}
      <SymPasswordInput
        title="Password"
        value={password}
        placeholder="Password"
        onChange={handlePasswordChange}
        error=""
        showError={false}
      />

      {/* Remember Me & Forgot Password */}
      <div className="flex justify-between items-center gap-4 py-2">
        {setIsChecked && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={isChecked}
              onCheckedChange={setIsChecked}
              className="border-white data-[state=checked]:bg-purple-600"
            />
            <label
              htmlFor="remember"
              className="text-white text-xs cursor-pointer"
            >
              Remember me
            </label>
          </div>
        )}
        
          <a href="/forgot-password"
            className="text-white text-xs underline cursor-pointer hover:text-gray-300"
          >
            Forgot your password?
          </a>
      </div>
    </div>
  );
};