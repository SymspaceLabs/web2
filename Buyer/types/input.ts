// =========================================
// Input Types
// =========================================

export interface SymPasswordInputProps {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEdit?: boolean;
  placeholder?: string;
  error?: string;
  showError?: boolean;
  forceValidate?: boolean;
}

export interface SymTextFieldProps {
  title: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export interface LoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  isChecked?: boolean;
  setIsChecked?: (value: boolean) => void;
}