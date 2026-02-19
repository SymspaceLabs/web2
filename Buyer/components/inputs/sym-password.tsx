// =========================================
// SymPasswordInput Component
// =========================================
 
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SymPasswordInputProps } from '@/types/input';

export const SymPasswordInput: React.FC<SymPasswordInputProps> = ({
  title,
  value,
  onChange,
  isEdit = true,
  placeholder = "",
  error,
  showError = true,
  forceValidate = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Must be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Must include an uppercase letter";
    if (!/[a-z]/.test(password)) return "Must include a lowercase letter";
    if (!/[0-9]/.test(password)) return "Must include a number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Must include a special character";
    return "";
  };

  const errorMessage = showError && (touched || forceValidate) 
    ? validatePassword(value) || error 
    : "";

  return (
    <div className="flex flex-col flex-1 w-full">
      <Label htmlFor={title} className="text-white text-[12px] font-elemental lowercase mb-2 text-left">
        {title}
      </Label>
      <div className="relative">
        <Input
          id={title}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={() => setTouched(true)}
          disabled={!isEdit}
          placeholder={placeholder}
          className={`bg-black text-white border-gray-700 pr-10 ${
            errorMessage ? 'border-red-500' : ''
          }`}
        />
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};