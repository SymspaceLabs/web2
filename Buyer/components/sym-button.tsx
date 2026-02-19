import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SymButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const SymButton: React.FC<SymButtonProps> = ({
  onClick,
  loading = false,
  fullWidth = true,
  className = '',
  children,
  ...rest
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      className={cn(
        'font-elemental min-h-[58px] flex items-center justify-center',
        fullWidth && 'w-full',
        className
      )}
      {...rest}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin text-white" />
      ) : (
        children
      )}
    </Button>
  );
};

export default SymButton;