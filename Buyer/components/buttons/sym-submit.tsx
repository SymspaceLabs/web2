// =========================================
// SymSubmitButton Component
// =========================================

import { Button } from "../ui/button";

interface SubmitButtonProps {
  isValid: boolean;
  onClick: () => void;
  loading: boolean;
  children: React.ReactNode;
}

export const SymSubmitButton: React.FC<SubmitButtonProps> = ({
  isValid,
  onClick,
  loading,
  children
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={!isValid || loading}
      // Remove size prop entirely - control sizing via className
      style={{
        background: !isValid
          ? "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)"
          : "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)",
        boxShadow:
          "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(50px)",
      }}
      className={`
        font-elemental
        w-full 
        px-4
        py-3
        h-auto
        font-medium 
        lowercase 
        text-sm
        sm:text-lg
        rounded-xl 
        text-white
        ${!isValid ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      `}
    >
      {loading ? "Loading..." : children}
    </Button>
  );
};